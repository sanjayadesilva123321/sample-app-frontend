import { renderHook, act } from '@testing-library/react-hooks';
import usePostActions from './usePostActions';
import { usePost } from '../../containers/post/PostProvider';

jest.mock('../../containers/post/PostProvider'); // Mock the usePost hook

describe('usePostActions', () => {
    const mockedUsePost = usePost; // Mocked usePost implementation

    beforeEach(() => {
        mockedUsePost.mockReturnValue({
            setPostData: jest.fn(),
            updatePost: jest.fn(),
            deletePostData: jest.fn(),
            postData: [
                { id: '1', title: 'Title 1', content: 'Content 1' },
                { id: '2', title: 'Title 2', content: 'Content 2' },
            ],
        });
    });

    test('should handle delete action correctly', async () => {
        const { result } = renderHook(() => usePostActions());

        act(() => {
            result.current.deleteHandler({id: '1'});
        });

        expect(mockedUsePost().setPostData).toHaveBeenCalledWith([
            { id: '2', title: 'Title 2', content: 'Content 2' },
        ]);
        expect(mockedUsePost().deletePostData).toHaveBeenCalledWith('1');
    });

    test('should handle update action correctly', async () => {
        const { result } = renderHook(() => usePostActions());

        act(() => {
            result.current.updateHandler({id: '1', title: 'Updated Title', content: 'Updated Content'});
        });

        expect(result.current.postToEdit).toEqual({
            id: '1',
            title: 'Updated Title',
            content: 'Updated Content',
        });
    });

    test('should handle form submission correctly', async () => {
        const { result } = renderHook(() => usePostActions());

        act(() => {
            result.current.updateHandler({id: '1', title: 'Updated Title', content: 'Updated Content'});
        });

        expect(result.current.postToEdit).toEqual({
            id: '1',
            title: 'Updated Title',
            content: 'Updated Content',
        });

        act(() => {
            result.current.onSubmitHandler({title: 'Title from form', content: 'content from form'});
        });

        expect(mockedUsePost().updatePost).toHaveBeenCalledWith('1', {
            title: 'Title from form',
            content: 'content from form',
        });
    });
});
