function preload() {
    classifier = ml5.imageClassifier("DoodleNet");
}

function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
    background("white");
}

function draw() {
    strokeWeight(12);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}

function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("label").innerHTML = "Label: "+results[0].label;
        document.getElementById("confidence").innerHTML = "Confidence: "+Math.floor(results[0].confidence * 100)+"%";

        utter = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utter);
    }

}

function clearCanvas(){
    background("white");
}