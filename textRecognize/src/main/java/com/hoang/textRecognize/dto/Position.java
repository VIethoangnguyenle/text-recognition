package com.hoang.textRecognize.dto;

import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(chain = true)
public class Position {
    private String topLeft;
    private String topRight;
    private String bottomLeft;
    private String bottomRight;
}
