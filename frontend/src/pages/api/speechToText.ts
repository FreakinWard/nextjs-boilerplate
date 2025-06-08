/* istanbul ignore file */ // TODO: determine a way to test

import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function speechToText(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body;

  const base64Audio = body.audio;

  // Convert the base64 audio data to a Buffer
  const audio = Buffer.from(base64Audio, 'base64');

  const tmpDir = path.join(process.cwd(), 'tmp');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }

  // Define the file path for storing the temporary WAV file
  const filePath = 'tmp/input.wav';

  try {
    // Write the audio data to a temporary WAV file synchronously
    fs.writeFileSync(filePath, audio);

    // Create a readable stream from the temporary WAV file
    const readStream = fs.createReadStream(filePath);

    const data = await openai.audio.transcriptions.create({
      file: readStream,
      model: 'whisper-1',
    });

    // Remove the temporary file after successful processing
    fs.unlinkSync(filePath);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error processing audio' });
  }
}
