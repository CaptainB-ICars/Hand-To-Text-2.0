pre1=""; 
pre2="";

Webcam.set({
width:300,
height:300,
image_format:'png',
png_quality:1
});

camera=document.getElementById("camera")
Webcam.attach('#camera')

function takesnapshot()
{
    Webcam.snap(function(data_uri){
    document.getElementById("camera2").innerHTML='<img id="capturedimg" src="'+data_uri+'">';
    });
}

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/YyeTF75sJ/model.json",modalLoaded)
function modalLoaded()
{
    console.log("modelLoaded")
}

function speak()
{
    var synth=window.speechSynthesis
    speak1="You O not so great one are saying"+pre1
    speak2="You O not so great one are saying"+pre2
    var utterthis=new SpeechSynthesisUtterance(speak1+speak2)
    synth.speak(utterthis)
}

function predict()
{
    img=document.getElementById("capturedimg")
    classifier.classify(img,gotresult)
}

function gotresult(result)
{
    if(result>0)
    {
        document.getElementById("prediction1").innerhtml=result[0].label
        document.getElementById("prediction2").innerhtml=result[1].label
        pre1=result[0].label
        pre2=result[1].label
        speak()
    }
}