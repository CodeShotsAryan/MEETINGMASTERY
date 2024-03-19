
var speech = true;
    window.SpeechRecognition = window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    recognition.continuous = true;
    

click_to_convert.addEventListener('click',function(){
    

    recognition.addEventListener('result',e=>{
        const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)

        convert_text.innerHTML = transcript;

    })

    if(speech == true){
        recognition.start();
    }
})
click_to_end.addEventListener('click',function(){
    recognition.stop();
})