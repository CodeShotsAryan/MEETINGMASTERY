import { useEffect, useState } from 'react';

export const useSpeechRecognition = () => {
  const [speech, setSpeech] = useState(true);
  const [recognition, setRecognition] = useState(null);
  let [lastTranscript, setLastTranscript] = useState('');
  const [recordedData, setRecordedData] = useState(new Set());
  const [blob, setBlob] = useState(null); // Update state for blob
  const [stringToReturn, setStringToReturn] = useState('');

  useEffect(() => {
    if (window.webkitSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.interimResults = true;
      recognition.continuous = true;
      setRecognition(recognition);
    } else {
      console.error('SpeechRecognition API not supported');
    }
  }, []);

  const handleRecognitionResult = (e) => {
    const transcript = Array.from(e.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');

    if (transcript !== lastTranscript) {
      setRecordedData(new Set([...recordedData, transcript]));
      setLastTranscript(transcript); // Correct assignment
      console.log(transcript);
      const uniqueData = [...recordedData].join('\n');
      const newBlob = new Blob([uniqueData], { type: 'text/plain' });
      setBlob(newBlob); // Update blob state
      setRecordedData(new Set());
    }
  };

  const clickToConvert = () => {
    if (recognition) {
      recognition.addEventListener('result', handleRecognitionResult);
      if (speech) {
        recognition.start();
        console.log("recording started");
      }
    }
  };

  const clickToEnd = () => {
    if (recognition) {
      recognition.stop();
      console.log("recording ended");
    }
  };

  const clickToDownload = () => {
    if (blob) { // Check if blob is not null
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'Recorded_data.txt'; // Provide a filename with extension
      downloadLink.click();
      setStringToReturn(lastTranscript);
      document.getElementById('data').value = lastTranscript;
    }
  };

  return { clickToConvert, clickToEnd, clickToDownload };
};
