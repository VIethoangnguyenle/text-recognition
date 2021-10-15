"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.http = exports.detect = exports.post = void 0;
async function post(path, body, args = { method: "post", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }) {
    return await http(new Request(path, args));
}
exports.post = post;
;
async function detect() {
    removeAllTag();
    var data = document.getElementById('display_image');
    const input = {
        attachment: data.src.split(",")[1]
    };
    const response = await post('http://localhost:8099/recognize', input);
    var result = response.parsedBody.data.result;
    var imageOutput = response.parsedBody.data.output;
    imageOutput = 'data:image/png;base64,' + imageOutput.split("'")[1];
    document.getElementById("result_image").setAttribute("src", imageOutput);
    showText(result);
}
exports.detect = detect;
function showText(params) {
    for (let index = 0; index < params.length; index++) {
        console.log("voo");
        const element = params[index];
        const para = document.createElement("p");
        const node = document.createTextNode("Text " + index + " :" + "'" + element.text + "'" + "  " + " Accuracy " + index + " : " + element.accuracy);
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
async function http(request) {
    const response = await fetch(request);
    response.parsedBody = await response.json();
    return response;
}
exports.http = http;
function loadImage(event) {
    console.log(event.files);
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById("display_image").setAttribute('src', e.target.result);
    };
    reader.readAsDataURL(event.files[0]);
}
//# sourceMappingURL=demo.js.map