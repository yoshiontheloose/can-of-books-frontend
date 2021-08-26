'use strict';

import React from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import { withAuth0 } from "@auth0/auth0-react";


class UpdateAddBook extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.selectedBook._id,
      title: this.props.selectedBook.title,
      description: this.props.selectedBook.description,
      status: this.props.selectedBook.status,
      email: this.props.selectedBook.email,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleUpdate(this.state);
    this.props.handleCloseUpdatedModal();
  }

  //

  handleTitle = (e) => {
    e.preventDefault();
    this.setState({
      title: e.target.value,
    })
  }

  handleDescription = (e) => {
    e.preventDefault();
    this.setState({
      description: e.target.value,
    })
  }

  handleStatus = (e) => {
    e.preventDefault();
    this.setState({
      status: e.target.value,
    })
  }

  handleEmail = (e) => {
    e.preventDefault();
    this.setState({
      email: e.target.value,
    })
  }


  render() {
    return (
      <>
        <Container>

          <Form onSubmit={this.handleSubmit}>

            <Form.Group controlId="title">
              <Form.Label>Title of Book</Form.Label>
              <Form.Control type="text"
                onChange={this.handleTitle}
                value={this.state.title} />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description of Book</Form.Label>
              <Form.Control type="text"
                onChange={this.handleDescription}
                value={this.state.description} />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status of Book</Form.Label>
              <Form.Control type="text"
                onChange={this.handleStatus}
                value={this.state.status} />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text"
                onChange={this.handleEmail}
                value={this.state.email} />
            </Form.Group>

            <Button type="submit" >
              Save Changes
            </Button>

          </Form>
        </Container>
      </>
    );
  }
};

export default withAuth0(UpdateAddBook);