package com.hoang.textRecognize.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class MessageDto {
    private String text;
    private Float accuracy;
    private Position position;
}
