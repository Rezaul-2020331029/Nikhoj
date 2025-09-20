package reza.monolithicbackend.POST.config;

import com.google.cloud.storage.Acl;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.Bucket;
import com.google.firebase.cloud.StorageClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.UUID;

@Service
public class FireBaseService {


    public String uploadBase64File(String base64Data) throws IOException {
        // Extract file type and data
        String[] parts = base64Data.split(",");
        String header = parts[0]; // data:image/jpeg;base64
        String data = parts[1];   // actual base64 data

        String fileType = header.split(";")[0].split("/")[1];
        String fileName = UUID.randomUUID() + "." + fileType;

        byte[] fileBytes = Base64.getDecoder().decode(data);

        Bucket bucket = StorageClient.getInstance().bucket();
        Blob blob = bucket.create(fileName, fileBytes, "image/" + fileType);

        blob.createAcl(Acl.of(Acl.User.ofAllUsers(), Acl.Role.READER));

        String encodedFileName = URLEncoder.encode(fileName, StandardCharsets.UTF_8);
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
