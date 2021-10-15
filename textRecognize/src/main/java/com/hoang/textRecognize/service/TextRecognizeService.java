package com.hoang.textRecognize.service;

import com.hoang.textRecognize.dto.*;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

@Slf4j
@Component
public class TextRecognizeService {

    @Value("${ai.url}")
    private String aiUrl;

    public RestResponseDto<Object> recognition(String attachment) {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("attachment", attachment);
        HttpEntity<String> httpEntity = new HttpEntity<>(jsonObject.toString());

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.exchange(aiUrl + "text/recognize", HttpMethod.POST, httpEntity, String.class);
        log.info("{}", responseEntity);
        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            JSONObject object = new JSONObject(responseEntity.getBody());
            if (object.getInt("code") == 200) {
                JSONArray array = object.getJSONArray("data");
                ArrayList<MessageDto> messageDtoArrayList = new ArrayList<>();
                for (int i = 0 ; i < array.length() ; i++) {
                    MessageDto messageDto = new MessageDto()
                            .setText(array.getJSONObject(i).getString("text"))
                            .setAccuracy(Float.parseFloat(array.getJSONObject(i).getString("accuracy")))
                            .setPosition(new Position()
                                    .setBottomLeft(array.getJSONObject(i).getJSONObject("position").getString("bottom_left"))
                                    .setBottomRight(array.getJSONObject(i).getJSONObject("position").getString("bottom_right"))
                                    .setTopLeft(array.getJSONObject(i).getJSONObject("position").getString("top_left"))
                                    .setTopRight(array.getJSONObject(i).getJSONObject("position").getString("top_right")));
                    messageDtoArrayList.add(messageDto);
                }
                DataRes dataRes = new DataRes()
                        .setResult(messageDtoArrayList)
                        .setOutput(object.getString("output"));

                return new RestResponseDto<>().success(dataRes);
            }
        }
        return new RestResponseDto<>().badRequest();
    }
}
