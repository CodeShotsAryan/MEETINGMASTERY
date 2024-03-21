var speech = true;
window.SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;

let lastTranscript = ''; 
let recordedData = new Set(); 
let blob; 
let blob2; 
let stringtoreturn ;

export function click_to_convert (){
    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
           
        if (transcript !== lastTranscript) {
            recordedData.add(transcript); // Add transcript to Set (unique entries only)
            lastTranscript = transcript;
             // Update lastTranscript
            //convert_text.innerHTML = transcript; 
            // Update UI with transcript
            const uniqueData = [...recordedData].join('\n');

            blob2 = new Blob([uniqueData], { type: 'text/plain' }); // Define blob variable here

            blob = new Blob([uniqueData], { type: 'text/plain' }); // Define blob variable here
            recordedData.clear(); // Clear recordedData set after creating blob
        }
    });

    if (speech == true) {
        recognition.start();
    }
};

function click_to_end (){
    recognition.stop();
};

function click_to_download(){
    if (blob) {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "Recorded_data";
        
        downloadLink.click();
         stringtoreturn = lastTranscript;


         document.getElementById('data').value = stringtoreturn;
    }
   
};
