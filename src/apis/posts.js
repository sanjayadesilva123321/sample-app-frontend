import { get, del, patch } from "../libs/api/apiWrapper";

import APIs from "../helpers/apiRoutes";

/**
 * Get posts by role id
 * @param {number} id - The role ID for which to retrieve posts.
 * @returns {Promise} A Promise that resolves to the post data or rejects with an error.
 */
const getPosts = async () => {
  try {
    const response = await get(`${APIs.POSTS.GET_POSTS}`, {
      detachRoleToken: false,
      detachAccessToken: false,
    });
    return response.data;
  } catch (e) {
    console.log("User fetching error", e);
    throw e;
  }
};

/**
 * Delete post by post id
 * @param {number} id - The ID of the post to delete.
 * @returns {Promise} A Promise that resolves to a response indicating the deletion success or rejects with an error.
 */
const deletePost = async (id) => {
  try {
    console.log("Deleting post by id", id);
    const response = await del(`${APIs.POSTS.DELETE_POST}/${id}`);
    return response;
  } catch (e) {
    console.log("Deleting post error", e);
    throw e;
  }
};

/**
 * Update post
 * @param {number} id - The ID of the post to update.
 * @param {object} payload - The data to update the post with.
 * @returns {Promise} A Promise that resolves to a response indicating the update success or rejects with an error.
 */
const updatePostData = async (id, payload) => {
  try {
    const response = await patch(`${APIs.POSTS.UPDATE_POST}/${id}`, payload);
    return response;
  } catch (e) {
    console.log("Updating post error", e);
    throw e;
  }
};

export { getPosts, deletePost, updatePostData };
