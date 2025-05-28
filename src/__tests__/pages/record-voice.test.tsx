import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { AppWrapper as wrapper, mswMock } from '../../core/test.utils';
import * as useOpenAIVoice from '../../Features/RecordVoice/hooks/useOpenAIVoice';
import RecordVoicePage from '../../pages/record-voice';

jest.mock('../../Features/RecordVoice/hooks/useOpenAIVoice', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('RecordVoicePage', () => {
  mswMock();

  const mockUseOpenAIVoice = ({ isRecording, text } = { isRecording: false, text: '' }) => {
    const useOpenAIVoiceMock = {
      isRecording,
      text,
      startRecording: jest.fn(),
      stopRecording: jest.fn(),
    };
    jest.spyOn(useOpenAIVoice, 'default').mockImplementation(() => useOpenAIVoiceMock);

    return { useOpenAIVoiceMock };
  };

  const clickButton = async label => {
    // arrange
    const user = userEvent.setup();

    const buttonElement = screen.getByRole('button', { name: label });

    // act
    // assert
    await user.click(buttonElement);
  };

  const renderComponent = () => {
    // arrange
    // act
    // assert
    render(<RecordVoicePage />, { wrapper });
  };

  it('should render', () => {
    // arrange
    mockUseOpenAIVoice();
    // act
    // assert
    renderComponent();
  });

  it('should call start and stop recording when microphone button is clicked', async () => {
    // arrange
    const { useOpenAIVoiceMock } = mockUseOpenAIVoice();
    // act
    renderComponent();

    await clickButton('microphone');

    // assert
    expect(useOpenAIVoiceMock.startRecording).toHaveBeenCalled();
    expect(useOpenAIVoiceMock.stopRecording).toHaveBeenCalled();
  });

  it('should call start and stop recording when microphone button is clicked', async () => {
    // arrange
    const { useOpenAIVoiceMock } = mockUseOpenAIVoice();

    // act
    renderComponent();

    await clickButton('microphone');

    // const microphoneButton = screen.getByRole('button', { name: 'microphone' });
    // await act(() => fireEvent.mouseDown(microphoneButton));

    // assert
    expect(useOpenAIVoiceMock.startRecording).toHaveBeenCalled();
    expect(useOpenAIVoiceMock.stopRecording).toHaveBeenCalled();
  });

  it('should render microphone button in off state when user is not recording', async () => {
    // arrange
    const isRecording = false;
    const text = '';
    mockUseOpenAIVoice({ isRecording, text });

    // act
    renderComponent();

    await clickButton('microphone');

    // assert
    screen.getByAltText('Microphone On');
  });

  it('should render microphone button in off state when user isRecording', async () => {
    // arrange
    const isRecording = true;
    const text = '';
    mockUseOpenAIVoice({ isRecording, text });

    // act
    renderComponent();

    await clickButton('microphone');

    // assert
    screen.getByAltText('Microphone Off');
  });
});
