package reza.postservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/post")
public class ProductController {

    @GetMapping("/all")
    public String product(){
        return "This is posts";
    }
}
