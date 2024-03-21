var speech = true;
window.SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.continuous = true;

let lastTranscript = ''; // Variable to store the last recorded transcript
let recordedData = new Set(); // Use a Set to store unique recorded data
let blob; // Define blob variable outside the event listener

click_to_convert.addEventListener('click', function(){
    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        if (transcript !== lastTranscript) {
            recordedData.add(transcript); // Add transcript to Set (unique entries only)
            lastTranscript = transcript; // Update lastTranscript
            convert_text.innerHTML = transcript; // Update UI with transcript
            const uniqueData = [...recordedData].join('\n');

            blob = new Blob([uniqueData], { type: 'text/plain' }); // Define blob variable here
            recordedData.clear(); // Clear recordedData set after creating blob
        }
    });

    if (speech == true) {
        recognition.start();
    }
});

click_to_end.addEventListener('click', function(){
    recognition.stop();
});

click_to_download.addEventListener('click', function(){
    if (blob) {
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'recorded_data.txt';
        downloadLink.click();
    }
});
