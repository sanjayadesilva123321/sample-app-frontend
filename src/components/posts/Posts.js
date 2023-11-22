import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';

import UpdatePostModal from './subs/UpdatePostModal';

import { usePost } from '../../containers/post/PostProvider';
import { useAuth } from '../../containers/auth/AuthProvider';

// eslint-disable-next-line import/order
import usePostActions from './usePostActions';

import { ROLES } from '../../helpers/auth';
import { TABLE } from '../../helpers/posts/posts';

function Posts() {
  const { getPostData, postData } = usePost();

  const auth = useAuth();
  const { deleteHandler, updateHandler, onSubmitHandler, postToEdit } = usePostActions();

  const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="posts" data-testid="component-posts">
      <div className="container">
        <Table className="table">
          <thead>
            <tr>
              <th>{TABLE.TITLE}</th>
              <th>{TABLE.DESCRIPTION}</th>
              <th>{TABLE.UPDATE}</th>
              <th>{TABLE.DELETE}</th>
            </tr>
          </thead>
          <tbody>
            {postData?.map(post => (
              <tr key={post.id}>
                <td> {post.title} </td>
                <td> {post.content} </td>
                <td>
                  <Button
                    onClick={() => {
                      setShowUpdatePostModal(true);
                      updateHandler(post);
                    }}
                    className="btn btn-primary"
                    data-testid="component-posts-update_button"
                  >
                    {TABLE.UPDATE}
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      deleteHandler(post);
                    }}
                    className="btn btn-danger"
                    disabled={!auth.hasPermission([ROLES.Admin])}
                    data-testid="component-posts-delete_button"
                  >
                    {TABLE.DELETE}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <UpdatePostModal
        show={showUpdatePostModal}
        onHide={() => {
          setShowUpdatePostModal(false);
          getPostData();
        }}
        onSubmit={onSubmitHandler}
        postToEdit={postToEdit}
      />
    </div>
  );
}

export default Posts;
