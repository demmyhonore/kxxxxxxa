import React from 'react';
import { render } from '../../../test-utils';
import RegularScreen from '../regular-screen';

const testID = 'regular-screen-container';

let mockIsTablet;
afterEach(() => {
  mockIsTablet = false;
});
jest.mock('../../hooks/use-detect-tablet', () => ({
  useDetectTablet: () => mockIsTablet,
}));

describe('<RegularScreen />', () => {
  it('applies the custom style that is passed as prop', () => {
    const randomStyle = { color: 'red' };
    const { queryByTestId } = render(<RegularScreen style={randomStyle} />);

    expect(queryByTestId(testID)).toHaveStyle(randomStyle);
  });

  it('applies a max width of 70% if tablet is detected', () => {
    mockIsTablet = true;
    const { queryByTestId } = render(<RegularScreen />);

    expect(queryByTestId(testID)).toHaveStyle({ width: '70%' });
  });
});
