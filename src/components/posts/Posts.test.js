import { render, waitFor, act, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';

import Posts from './Posts';

import { PostContext } from '../../containers/post/PostProvider';
import { AuthContext } from '../../containers/auth/AuthProvider';

import { getByTestId } from '../../utils/TestUtils';

const defaultAuthContextValues = {
  isProcessing: false,
  hasPermission: jest.fn(() => true),
  setAuth: jest.fn(),
  setIsBackendAuthorized: jest.fn(),
};

const defaultPostContextValues = {
  getPostData: jest.fn(),
  postData: [
    {
      id: 1,
      title: 'sssas',
      content: 'sdaaaaa',
      created_by: 3,
      updated_by: null,
    },
  ],
  setPostData: jest.fn(),
  deletePostData: jest.fn(),
  updatePost: jest.fn(),
};

const setup = (authContextValues = {}, postContextValues = {}) => {
  const setupAuthContextValues = {
    ...defaultAuthContextValues,
    ...authContextValues,
  };
  const setupPostContextValues = {
    ...defaultPostContextValues,
    ...postContextValues,
  };
  return act(() => {
    render(
      <BrowserRouter>
        <AuthContext.Provider value={setupAuthContextValues}>
          <PostContext.Provider value={setupPostContextValues}>
            <Posts />
          </PostContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>,
    );
  });
};

describe('default component rendering tests', () => {
  test('Posts component should be available', async () => {
    setup();
    await waitFor(() => {
      const component = getByTestId(document.body, 'component-posts');
      expect(component).toBeInTheDocument();
    });
  });
});

describe('component functionality tests', () => {
  test('should update post data  on button click', () => {
    setup();
    waitFor(() => {
      fireEvent.click(screen.getByTestId('update-button'));
      expect(defaultPostContextValues.setPostData).toHaveBeenCalled(
        defaultPostContextValues.postData,
      );
    });
  });

  test('should update post data  on submit', () => {
    setup();
    const modifiedPost = {
      title: 'modified',
      content: 'content',
    };
    waitFor(() => {
      fireEvent.click(screen.getByTestId('modal-update-button'));
      expect(defaultPostContextValues.updatePost).toHaveBeenCalled(1, modifiedPost);
    });
  });
});

describe('Delete Button Tests', () => {
  test('should render a disabled delete button initially', () => {
    setup(); // Default setup with no permission

    const deleteButton = screen.getByTestId('delete-button');
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toBeDisabled();
  });

  test('should render an enabled delete button when user has permission', async () => {
    const hasPermission = jest.fn(() => true); // Set to have permission
    setup({ hasPermission });

    const deleteButton = screen.getByTestId('delete-button');
    expect(deleteButton).toBeInTheDocument();
    await waitFor(() => {
      expect(deleteButton).toBeEnabled();
    });
  });

  test('should not call deletePostData when the delete button is clicked without permission', async () => {
    const deletePostData = jest.fn();
    setup({}, { deletePostData });

    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deletePostData).not.toHaveBeenCalled();
    });
  });

  test('should hide the modal when onHide is called', async () => {
    setup();

    // Show the modal by clicking the "Update" button
    fireEvent.click(screen.getByTestId('update-button'));

    // Ensure that the modal is displayed
    const modal = screen.getByTestId('update-post-modal');
    expect(modal).toBeInTheDocument();

    // Hide the modal by calling onHide
    fireEvent.click(screen.getByTestId('modal-update-close'));
  });

  test('should call deletePostData when the delete button is clicked with permission', async () => {
    const deletePostData = jest.fn();
    const hasPermission = jest.fn(() => true); // Set to have permission
    setup({ hasPermission }, { deletePostData });

    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deletePostData).toHaveBeenCalledWith(1); // assuming post ID is 1
    });
  });
});
