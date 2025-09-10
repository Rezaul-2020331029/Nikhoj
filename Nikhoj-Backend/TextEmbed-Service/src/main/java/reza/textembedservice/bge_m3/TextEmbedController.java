package reza.textembedservice.bge_m3;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/text")
public class TextEmbedController {

    private final TextEmbedService textEmbedService;
    public TextEmbedController(TextEmbedService textEmbedService) {
        this.textEmbedService = textEmbedService;
    }


    @PostMapping("/embed")
    public ResponseEntity<TextEmbedResponse> post(@RequestBody TextEmbedRequest textEmbedRequest) {

        return textEmbedService.textEmbed(textEmbedRequest);

    }
}
