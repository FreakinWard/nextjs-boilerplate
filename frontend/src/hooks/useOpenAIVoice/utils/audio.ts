/* istanbul ignore file */ // TODO: determine a way to test

//callback - where we want to get result
export function blobToBase64(blob: Blob, callback: (base64data: string) => void) {
  const reader = new FileReader();
  reader.onload = function () {
    if (typeof reader.result === 'string') {
      const base64data = reader.result.split(',')[1];
      callback(base64data);
    } else {
      throw new Error('Expected string result from FileReader');
    }
  };
  reader.readAsDataURL(blob);
}

// Function to calculate the peak level from the analyzer data
const getPeakLevel = analyzer => {
  // Create a Uint8Array to store the audio data
  const array = new Uint8Array(analyzer.fftSize);

  // Get the time domain data from the analyzer and store it in the array
  analyzer.getByteTimeDomainData(array);

  // Calculate the peak level by finding the maximum absolute deviation from 127
  return array.reduce((max, current) => Math.max(max, Math.abs(current - 127)), 0) / 128;
};

export const createMediaStream = (stream, isRecording, callback) => {
  // Create a new AudioContext
  const context = new AudioContext();

  // Create a media stream source node from the input stream
  const source = context.createMediaStreamSource(stream);

  // Create an analyzer node for audio analysis
  const analyzer = context.createAnalyser();

  // Connect the source node to the analyzer node
  source.connect(analyzer);

  // Function to continuously analyze audio data and invoke the callback
  const tick = () => {
    // Calculate the peak level using the getPeakLevel function
    const peak = getPeakLevel(analyzer);

    if (isRecording) {
      callback(peak);

      // Request the next animation frame for continuous analysis
      requestAnimationFrame(tick);
    }
  };

  // Start the continuous analysis loop
  tick();
};
