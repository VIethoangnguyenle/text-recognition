function loadImg(params) {
    const image_input = document.querySelector("#image_input");
    var uploaded_image;

    image_input.addEventListener('change', function() {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        uploaded_image = reader.result;
        document.querySelector("#display_image").style.backgroundImage = `url(${uploaded_image})`;
    });

    reader.readAsDataURL(this.files[0]);
    });
}

// function callAPI(params) {
//     const dataInput = document.getElementById('image_input');
//     var input = document.querySelector("#display_image").style.backgroundImage.split(',')[1].split('"')[0];
//     console.log("vooo");
//     const recognize = async () => {
//         const response = await fetch('http://localhost:8080/recognize', {
//             method: 'POST',
//             body: String
//         });

//         const json = await response.json();
//         console.log(json);
//     }

// }


async function postData(url = '') {
    const response = await fetch(url, {
        method: 'POST'});
    const data = await response.json();
    return data;
}

function callAPI() {    
    const dataInput = document.getElementById('image_input');
    var input = document.querySelector("#display_image").style.backgroundImage.split(',')[1].split('"')[0];
    let data = postData('http://localhost:8080/recognize');
    console.log(data);
}
