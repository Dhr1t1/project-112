prediction="";

Webcam.set({
    width:360,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_img" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version",ml5.version);

var classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/MPOYWI0m0/model.json',modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!!!");
}

function speak(){
    var synth= window.speechSynthesis;
    speak_data="the prediction is "+prediction;
    var utterthis=new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterthis);
}

function check(){
    img=document.getElementById('captured_img');
    classifier.classify(img,gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        prediction==results[0].label;
        speak();
        if(results[0].label=="Happy"){
            document.getElementById("update_emoji").innerHTML="";
        }
        if(results[0].label=="Sad"){
            document.getElementById("update_emoji").innerHTML="";
        }
        if(results[0].label=="Angry"){
            document.getElementById("update_emoji").innerHTML="";
        }
    }
}