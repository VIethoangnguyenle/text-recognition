package com.hoang.textRecognize.controller;

import com.hoang.textRecognize.dto.MessageDto;
import com.hoang.textRecognize.dto.RequestDto;
import com.hoang.textRecognize.dto.RestResponseDto;
import com.hoang.textRecognize.service.TextRecognizeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/recognize")
public class Controller {

    @Autowired
    TextRecognizeService recognizeService;

    @PostMapping
    public RestResponseDto<Object> textRecognize(@RequestBody RequestDto request) {
        log.info("Call");
        return recognizeService.recognition(request.getAttachment());
    }
}
