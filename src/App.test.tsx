import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('./screen/Screen', () => () => <h1>SCREEN</h1>);
jest.mock('./controller/Controller', () => () => <h1>CONTROLLER</h1>);

beforeAll(() => {
  delete window.location;
  window.location = {} as Location;
})

test('routes to screen', () => {
  window.location.pathname = '/screen.html'
  const app = render(<App />);
  expect(app.getByText('SCREEN')).toBeInTheDocument();
  expect(app.queryByText('CONTROLLER')).not.toBeInTheDocument();
});

test('routes to controller', () => {
  window.location.pathname = '/controller.html'
  const app = render(<App />);
  expect(app.getByText('CONTROLLER')).toBeInTheDocument();
  expect(app.queryByText('SCREEN')).not.toBeInTheDocument();
});