import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";
import PropTypes from "prop-types";

import * as postAPIs from "../../apis/posts";
import { showSuccessAlert } from "../../store/directDispatches/common";

const PostContext = createContext({});

function PostProvider(props) {
  const { children } = props;
  const [postData, setPostData] = useState([]);

  const getPostData = useCallback(async () => {
    try {
      console.log("Initiating retrieving admin posts");
      const { success, data } = await postAPIs.getPosts();
      if (success) {
        setPostData(data);
        console.log("Successfully retrieved admin posts", data);
      }
    } catch (e) {
      console.log("Unable to retrieve admin posts", e);
    }
  }, [setPostData]);

  const deletePostData = useCallback(
    async (id) => {
      try {
        console.log("Initiating retrieving admin posts");
        const { data } = await postAPIs.deletePost(id);
        if (data?.success) {
          showSuccessAlert(data?.message);
          getPostData();
          console.log("Successfully deleted admin posts", data);
        }
      } catch (e) {
        console.log("Unable to retrieve admin posts", e);
      }
    },
    [getPostData]
  );

  const updatePost = useCallback(
    async (id, payload) => {
      try {
        console.log("Initiating updating posts");
        const { data } = await postAPIs.updatePostData(id, payload);
        if (data?.success) {
          showSuccessAlert(data?.message);
          getPostData();
          console.log("Successfully updated posts", data?.data);
        }
      } catch (e) {
        console.log("Unable to update posts", e);
      }
    },
    [getPostData]
  );

  /* -------------------------------------------------------------------------- */
  /*                                Return values                               */
  /* -------------------------------------------------------------------------- */
  const value = useMemo(
    () => ({
      getPostData,
      postData,
      setPostData,
      deletePostData,
      updatePost,
    }),
    [getPostData, postData, setPostData, deletePostData, updatePost]
  );

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
}

function usePost() {
  return useContext(PostContext);
}

PostProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { PostProvider, usePost, PostContext };
