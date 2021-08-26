import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Carousel, Card, Button } from 'react-bootstrap';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
import BookFormModal from './BookFormModal';
import UpdateBookFormModal from './UpdateBookFormModal';

class MyFavoriteBooks extends React.Component {

  // hitting the books route
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showModal: false,
      showUpdateModal: false,
      selectedBook: null,
    }
  }

  componentDidMount = async () => {
    const { getIdTokenClaims, user } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    // just how it works
    const jwt = tokenClaims.__raw;
    console.log('jwt: ', jwt);
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
      params: { email: user.email }
    }
    const results = await axios.get('http://localhost:3001/books', config);
    console.log(results.data);
    this.setState({
      books: results.data,
    });
  };

  // Lab 13:1:5 
  handleCreate = async (bookInfo) => {
    try {
      let response = await axios.post('http://localhost:3001/post-books', bookInfo);
      const newBook = response.data;
      this.setState({
        books: [...this.state.books, newBook]
      })
    }
    catch (error) {
      console.log(error);
    }
  };

  // 13:2:6
  handleDelete = async (id) => {
    console.log(id);
    try {
      const { getIdTokenClaims, user } = this.props.auth0;
      let tokenClaims = await getIdTokenClaims();
      // just how it works
      const jwt = tokenClaims.__raw;
      console.log('jwt: ', jwt);
      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        params: { email: user.email }
      }
      await axios.delete(`http://localhost:3001/delete-books/${id}`, config);
      let remainingBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: remainingBooks
      });
    }
    catch (error) {
      console.log(error);
    }
  }


  // lab 14 updating book
  handleUpdate = async (book) => {
    await axios.put(`http://localhost:3001/put-books/${book._id}`, book);
    let updatedBooks = this.state.books.map(updatedBook => {
      if (updatedBook._id === book._id) {
        return book;
      }
      else {
        return updatedBook;
      }
    });
    this.setState({
      books: updatedBooks,
    })
  }

  // Modal buttons
  // Shows when "Add Book" button is clicked
  // Hide modal when closed

  handleShowModal = () => {
    this.setState({
      showModal: true,
    })
  }

  handleCloseModal = () => {
    this.setState({
      showModal: false,
    })
  }

  // for updated Modal

  handleShowUpdatedModal = (book) => {
    this.setState({
      showUpdateModal: true,
      selectedBook: book,
    })
  }

  handleCloseUpdatedModal = () => {
    this.setState({
      showUpdateModal: false,
    })
    // console.log(this.state.showUpdateModal);
  }


  render() {
    console.log(this.state.selectedBook);
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {this.props.isAuthenticated ?
          <Button onClick={this.props.makeRequest} variant="info">Make Request to Server</Button> : ''}
        {/* <AddBook handleCreate={this.handleCreate}/> */}
        {this.state.books.length > 0 ?
          <Carousel>
            {this.state.books.map(book => (
              <Carousel.Item>
                <Card key={book._id} className="bookCard">
                  <Card.Body>
                    <Card.Text>{book.title}</Card.Text>
                    <Card.Text>{book.description}</Card.Text>
                    <Card.Text>{book.status}</Card.Text>
                    <Card.Text>{book.email}</Card.Text>
                  </Card.Body>
                  <Button className="Update" variant="success" size="sm" onClick={() => this.handleShowUpdatedModal(book)}>Update</Button>
                  <Button className="deleteButton" variant="danger" size="sm" onClick={() => this.handleDelete(book._id)}>Delete Book</Button>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
          : ''}
        <BookFormModal
          handleCreate={this.handleCreate}
          showModal={this.state.showModal}
          handleCloseModal={this.handleCloseModal} />
        <Button onClick={this.handleShowModal}>Add Book</Button>
        <UpdateBookFormModal
          showUpdateModal={this.state.showUpdateModal}
          handleCloseUpdatedModal={this.handleCloseUpdatedModal}
          selectedBook={this.state.selectedBook}
          handleUpdate={this.handleUpdate} />
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);

//passing down on same page- this.
// passing to baby pages- this.props
