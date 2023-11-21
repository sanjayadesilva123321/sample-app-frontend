import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";

const UpdatePostModal = ({ show, onHide, onSubmit, postToEdit }) => {
  return (
    <Modal show={show} onHide={onHide} data-testid="update-post-modal">
      <Modal.Header>
        <Modal.Title>Update Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="post__wrapper">
          <div className="container">
            <Formik
              initialValues={postToEdit}
              onSubmit={onSubmit}
              enableReinitialize
            >
              <Form className="post">
                <Field type="text" name="title" placeholder="Title..." />
                <Field type="text" name="content" placeholder="Content..." />
                <div className="action-button-wrapper">
                  <Button
                    type="submit"
                    data-testid="modal-update-button"
                    variant="primary"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={onHide}
                    variant="danger"
                    data-testid="modal-update-close"
                  >
                    Close
                  </Button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

UpdatePostModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  postToEdit: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    content: PropTypes.string,
  }),
};

export default UpdatePostModal;
