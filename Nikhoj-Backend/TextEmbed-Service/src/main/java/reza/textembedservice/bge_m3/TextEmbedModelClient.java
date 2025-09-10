package reza.textembedservice.bge_m3;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class TextEmbedModelClient {

    @Bean
    public RestTemplate TextEmbedModelRestTemplate() {
        return new RestTemplate();
    }




}
