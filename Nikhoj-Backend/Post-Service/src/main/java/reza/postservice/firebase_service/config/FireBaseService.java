package reza.postservice.firebase_service.config;

import com.google.api.services.storage.Storage;
import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.cloud.storage.StorageOptions;
import com.google.firebase.cloud.StorageClient;
import org.apache.http.auth.AuthScope;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

@Service
public class FireBaseService {


    public String uploadFile(MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();
        if (originalFileName == null) {
            throw new IllegalArgumentException("File name cannot be null");
        }

        // Create unique filename to avoid collisions
        String fileName = UUID.randomUUID() + "_" + originalFileName;

        Bucket bucket = StorageClient.getInstance().bucket();
        Blob blob = bucket.create(fileName, file.getBytes(), file.getContentType());

        // Make file publicly readable
        blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));

        // Encode the filename for safe URL usage
        String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8);

        // Return public URL without token
        return String.format(
                "https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
                bucket.getName(),
                encodedFileName
        );
    }

    /**
     * Deletes a file from Firebase Storage using its public URL.
     */
    public boolean deleteFileByUrl(String fileUrl) {
        try {
            String bucketName = StorageClient.getInstance().bucket().getName();

            // Extract and decode filename from URL
            String filePath = fileUrl
                    .replace(String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/", bucketName), "")
                    .replace("?alt=media", "");

            String decodedFileName = URLDecoder.decode(filePath, StandardCharsets.UTF_8);

            Bucket bucket = StorageClient.getInstance().bucket();
            return bucket.get(decodedFileName) != null && bucket.get(decodedFileName).delete();
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
