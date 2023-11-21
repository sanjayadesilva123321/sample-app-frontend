import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';

import Unauthorized from './Unauthorized';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Unauthorized Component', () => {
  test('renders the component with the correct text', () => {
    render(<Unauthorized />);
    const title = screen.getByText('Unauthorized');
    const message = screen.getByText('You do not have access to the requested page.');
    const goBackButton = screen.getByTestId('go-back-button');

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(goBackButton).toBeInTheDocument();
  });

  test('clicking the "Go Back" button triggers navigation', () => {
    const navigate = jest.fn();
    useNavigate.mockReturnValue(navigate);
    render(<Unauthorized />);
    const goBackButton = screen.getByTestId('go-back-button');

    fireEvent.click(goBackButton);

    expect(navigate).toHaveBeenCalledWith(-1);
  });
});
