import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";

import {usePost} from "../../containers/post/PostProvider";
import {useAuth} from "../../containers/auth/AuthProvider";
import UpdatePostModal from "./subs/UpdatePostModal";

import {ROLES} from "../../helpers/auth";
import usePostActions from "./usePostActions";

const Posts = () => {
    const {
        getPostData,
        postData,
    } = usePost();

    const auth = useAuth();
    const {deleteHandler, updateHandler, onSubmitHandler, postToEdit} = usePostActions();

    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);

    useEffect(() => {
        getPostData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="posts" data-testid="component-posts">
            <div className="container">
                <Table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {postData?.map((post) => (
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
                                    data-testid="update-button"
                                >
                                    Update
                                </Button>
                            </td>
                            <td>
                                <Button
                                    onClick={() => deleteHandler(post)}
                                    className="btn btn-danger"
                                    disabled={!auth.hasPermission([ROLES.Admin])}
                                    data-testid="delete-button"
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </div>

            <UpdatePostModal
                show={showUpdatePostModal}
                onHide={() => setShowUpdatePostModal(false)}
                onSubmit={onSubmitHandler}
                postToEdit={postToEdit}
            />
        </div>
    );
};

export default Posts;
