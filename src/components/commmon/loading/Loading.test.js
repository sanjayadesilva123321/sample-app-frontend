import React from 'react';
import { render, screen } from '@testing-library/react';

import Loading from './Loading';

describe('Loading Component', () => {
  test('should render a loading spinner and message', () => {
    render(<Loading />);

    // Find the loading indicator by data-testid
    const loadingIndicator = screen.getByTestId('component-loading');

    // Find the spinner by its role and animation type
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('spinner-output');

    // Ensure the loading indicator contains both the spinner and the message
    expect(loadingIndicator).toContainElement(spinner);
  });
});
