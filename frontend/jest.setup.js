import '@testing-library/jest-dom';
import 'whatwg-fetch';

global.console.log = message => {
  throw message;
};

global.console.warn = message => {
  throw message;
};

global.console.error = message => {
  throw message;
};
