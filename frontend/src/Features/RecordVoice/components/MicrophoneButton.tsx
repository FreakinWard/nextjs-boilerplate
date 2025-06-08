import { Button } from '@mui/material';
import Image from 'next/image';

import useOpenAIVoice from '@/hooks/useOpenAIVoice';

import CapturedMemo from './CapturedMemo';

interface MicImageProps {
  src: string;
  alt: string;
}

const size = 48;

const MicImage = ({ src, alt }: MicImageProps) => (
  <Image src={src} alt={alt} width={size} height={size} />
);

export default function MicrophoneButton() {
  const { isRecording, startRecording, stopRecording, text } = useOpenAIVoice();

  return (
    <>
      <CapturedMemo value={text} />
      <Button
        aria-label="microphone"
        onMouseDown={startRecording} // Start recording when mouse is pressed
        onMouseUp={stopRecording} // Stop recording when mouse is released
        onTouchStart={startRecording} // Start recording when touch begins on a touch device
        onTouchEnd={stopRecording} // Stop recording when touch ends on a touch device
      >
        {isRecording ? (
          <MicImage src="/MicOff.svg" alt="Microphone Off" />
        ) : (
          <MicImage src="/MicOn.svg" alt="Microphone On" />
        )}
      </Button>
    </>
  );
}
