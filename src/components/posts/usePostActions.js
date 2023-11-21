// usePostActions.js
import {useState} from "react";
import {usePost} from "../../containers/post/PostProvider";

const usePostActions = () => {
    const {
        setPostData,
        updatePost,
        deletePostData,
        postData
    } = usePost();

    const [postToEdit, setPostToEdit] = useState({
        id: "",
        title: "",
        content: "",
    });

    const deleteHandler = async (post) => {
        setPostData(postData.filter((p) => p.id !== post.id));
        deletePostData(post.id);
    };

    const updateHandler = async (post) => {
        setPostToEdit({
            id: post.id,
            title: post.title,
            content: post.content,
        });
    };

    const onSubmitHandler = async (values) => {
        const modifiedPost = {
            title: values.title,
            content: values.content,
        };
        updatePost(postToEdit?.id, modifiedPost);
    };

    return {
        deleteHandler,
        updateHandler,
        onSubmitHandler,
        postToEdit,
    };
};

export default usePostActions;
