package com.hoang.textRecognize.dto;

import lombok.Data;
import lombok.experimental.Accessors;

import java.util.ArrayList;

@Data
@Accessors(chain = true)
public class DataRes {
    private ArrayList<MessageDto> result;
    private String output;
}
