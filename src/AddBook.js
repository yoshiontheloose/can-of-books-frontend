'use strict';

import React from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { withAuth0 } from "@auth0/auth0-react";


class AddBook extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let description = e.target.description.value;
    let status = e.target.status.value;
    let email = this.props.auth0.user.email;
    console.log(title, description, status, email);
    this.props.handleCreate({ title, description, status, email });
    this.props.handleCloseModal();
  }

  render() {
    return (
      <>
        <Container>

          <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="title">
              <Form.Label>Title of Book</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description of Book</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status of Book</Form.Label>
              <Form.Control type="text" />
            </Form.Group>

            <Button type="submit" >
              Add Book
            </Button>

          </Form>
        </Container>
      </>
    );
  }
};

export default withAuth0(AddBook);