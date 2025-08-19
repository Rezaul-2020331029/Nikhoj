package reza.postservice.firebase_service.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FireBaseConfig {



    @Bean
    FirebaseApp firebaseApp() throws IOException {

        ClassPathResource resource = new ClassPathResource("firebase_config.json");
        InputStream serviceAccount = resource.getInputStream();

        FirebaseOptions options = FirebaseOptions.builder()
                .setProjectId("javafest2024")
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setStorageBucket("javafest2024.appspot.com")
                .setDatabaseUrl("https://javafest2024-default-rtdb.asia-southeast1.firebasedatabase.app")
                .build();

        return FirebaseApp.initializeApp(options);
    }
}
