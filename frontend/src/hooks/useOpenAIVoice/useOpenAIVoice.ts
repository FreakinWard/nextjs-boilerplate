/* istanbul ignore file */ // TODO: determine a way to test
import { useCallback, useEffect, useRef, useState } from 'react';

// import { blobToBase64 } from '@/Features/RecordVoice/utils/audio';
import { blobToBase64 } from './utils/audio';

export default function useOpenAIVoice() {
  const [text, setText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  const getText = useCallback(
    async base64data => {
      try {
        const response = await fetch('/api/speechToText', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ audio: base64data }),
        });
        const data = await response.json();
        setText(data.text || '');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    },
    [setText]
  );

  const clearText = useCallback(() => {
    setText('');
  }, [setText]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = event => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        if (chunksRef.current.length > 0) {
          const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
          blobToBase64(audioBlob, getText);
        }
      };

      mediaRecorderRef.current = recorder;
    });

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [getText]);

  const startRecording = useCallback(() => {
    chunksRef.current = []; // Clear previous chunks
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'recording') {
      mediaRecorderRef.current.start(100);
      setIsRecording(true);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  }, []);

  return { isRecording, startRecording, stopRecording, text, clearText };
}
