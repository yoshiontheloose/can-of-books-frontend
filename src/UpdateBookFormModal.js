import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import UpdateAddBook from './UpdateAddBook';


class UpdateBookFormModal extends React.Component {
  render() {
    console.log(this.props);
    return (
      <>
        <Modal show={this.props.showUpdateModal} onHide={this.props.handleCloseUpdatedModal}>
          <Modal.Header closeButton>
            <Modal.Title>Enter A Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <UpdateAddBook
              handleCreate={this.props.handleCreate}
              handleCloseUpdatedModal={this.props.handleCloseUpdatedModal}
              selectedBook={this.props.selectedBook}
              handleUpdate={this.props.handleUpdate} />
          </Modal.Body>

          {/* <Modal.Footer>
            <Button variant="secondary">Close</Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );
  }
}

export default UpdateBookFormModal;