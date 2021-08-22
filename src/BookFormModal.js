import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddBook from './AddBook.js';


class BookFormModal extends React.Component {
  render() {
    return (
      <>
        <Modal show={this.props.showModal} onHide={this.props.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Enter A Book</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <AddBook handleCreate={this.props.handleCreate} handleCloseModal={this.props.handleCloseModal} />
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

export default BookFormModal;