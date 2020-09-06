import React from 'react';
import { render } from '@testing-library/react';
import Highlight from './Highlight';

test('wrapps children in highlight color', () => {
  const result = render(<p>This sentence has a <Highlight>highlight</Highlight></p>);
  expect(result.getByText('highlight')).toHaveStyle('color: #25A18E');
  expect(result.getByText('This sentence has a')).not.toHaveStyle('color: #25A18E');
  expect(result.baseElement).toHaveTextContent('This sentence has a highlight');
});