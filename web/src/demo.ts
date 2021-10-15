import { response } from "express";
import { blob } from "stream/consumers";

interface responseAPI {
    data: dataDetect;
    code: number
}

interface dataDetect {
    result: [message],
    output: string
}

interface message {
    accuracy: number,
    text:string,
    position: string
}


export async function post<T>(
    path: string,
    body: any,
    args: RequestInit = { method: "post",  headers: {'Content-Type': 'application/json'}, body: JSON.stringify(body)}
  ): Promise<HttpResponse<T>>  {
    return await http<T>(new Request(path, args));
};

export async function detect(): Promise<void> {
    removeAllTag();
    var data = document.getElementById('display_image') as HTMLImageElement;
    const input = {
        attachment: data.src.split(",")[1]
    }
    const response = await post<responseAPI>(
        'http://localhost:8099/recognize',
        input
    );
    
    var result = response.parsedBody.data.result;
    var imageOutput = response.parsedBody.data.output;
    
    imageOutput = 'data:image/png;base64,' + imageOutput.split("'")[1];
    document.getElementById("result_image").setAttribute("src", imageOutput);
    showText(result);
}

function showText(params: [message]) {
    for (let index = 0; index < params.length; index++) {
        console.log("voo");
        const element = params[index];
        const para = document.createElement("p");
        const node = document.createTextNode("Text " + index  +" :" + "'" +element.text+ "'"+ "  " + " Accuracy " + index + " : " + element.accuracy);
        para.appendChild(node);
        const tag = document.getElementById("text-result");
        tag.appendChild(para);
    }
}

function removeAllTag() {
    const tag = document.getElementById("text-result");
    var b = tag.getElementsByTagName("p");
    while (b.length > 0) {
        tag.removeChild(b[0]);
    }
}

interface HttpResponse<T> extends Response {
    parsedBody?: T;
}

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(
      request
    );
    response.parsedBody = await response.json();
    return response;
}

function loadImage(event: HTMLInputElement): void {
    console.log(event.files);
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("display_image").setAttribute('src', e.target.result as string);
    }
    reader.readAsDataURL(event.files[0]);
}

