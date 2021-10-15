import cv2
import numpy as np
import easyocr
import base64
import io
from PIL import Image

class MessageDto:
    def __init__(self, text, accuracy , positon) -> None:
        self.text = text
        self.accuracy = accuracy
        self.position = positon

    def to_dict(self):
        pos = {"top_left": str(self.position[3]),
                "top_right": str(self.position[2]),
                "bottom_left": str(self.position[1]),
                "bottom_right":str(self.position[0])}

        return {"text": str(self.text),
                "accuracy": str(self.accuracy),
                "position": pos}

def stringToImage(base64_string):
    imgData  = base64.b64decode(base64_string)
    return Image.open(io.BytesIO(imgData))

class Status:
    def __init__(self, data, output, code) -> None:
        self.data = data
        self.code = code
        self.output = output

    def to_dict(self):
        return {"data": self.data,
                "output": self.output,
                "code": self.code}
    
class TextRecognize:

    def __init__(self, base64String):
        self.base64String = base64String

    def recognize(self):
        list_text = []
        result_list = []

        try:
            # Read base64
            img = stringToImage(self.base64String)
            img = np.array(img)
        except:
            return Status("cant_read_image", 400).to_dict()

        # Read text with ocr
        reader = easyocr.Reader(['en'], gpu=True)
        result = reader.readtext(img)

        # Got shape
        result_shape = np.array(result).shape

        for x in range(result_shape[0]):
            accuracy = result[0][2]
            position = result[x][0]
            text = result[x][1]

            img  = cv2.rectangle(img, position[0], position[2], (255,255,0), 4)
            outImg = cv2.putText(img, text, position[0], cv2.FONT_HERSHEY_SIMPLEX, 1, (255,0,0), 1, cv2.LINE_AA)
            
            # Convert to base64
            cv2.imwrite('savedImage.jpg', outImg)
            retval, buffer_img= cv2.imencode('.png', outImg)
            data = base64.b64encode(buffer_img)

            response = MessageDto(text=text, accuracy=accuracy, positon=position).to_dict()
            result_list.append(response)

            list_text.append(text)
            
        if(len(list_text) == 0):
            return Status("data_not_found", "none", 404).to_dict()

        return Status(result_list, str(data), 200).to_dict()

