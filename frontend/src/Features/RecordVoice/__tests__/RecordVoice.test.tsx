import { render } from '@testing-library/react';

import * as useOpenAIVoice from '../../../hooks/useOpenAIVoice';
import RecordVoice from '../RecordVoice';

jest.mock('../../../hooks/useOpenAIVoice', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('RecordVoice', () => {
  const mockUseOpenAIVoice = ({ isRecording, text } = { isRecording: false, text: '' }) => {
    const useOpenAIVoiceMock = {
      isRecording,
      text,
      startRecording: jest.fn(),
      stopRecording: jest.fn(),
    };
    jest.spyOn(useOpenAIVoice, 'default').mockImplementation(() => useOpenAIVoiceMock);
  };

  const renderComponent = () => {
    // arrange

    // act
    render(<RecordVoice />);

    // assert
  };

  it('should render', () => {
    // arrange
    mockUseOpenAIVoice();

    // act
    renderComponent();
    // assert
  });
});
