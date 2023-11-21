// UpdatePostModal.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For additional matchers

import UpdatePostModal from './UpdatePostModal';

describe('UpdatePostModal', () => {
  const defaultProps = {
    show: true,
    onHide: jest.fn(),
    onSubmit: jest.fn(),
    postToEdit: {
      id: '1',
      title: 'Test Title',
      content: 'Test Content',
    },
  };

  it('renders with correct props', () => {
    render(<UpdatePostModal {...defaultProps} />);

    expect(screen.getByText('Update Post')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Title...')).toHaveValue('Test Title');
    expect(screen.getByPlaceholderText('Content...')).toHaveValue('Test Content');
  });
});
