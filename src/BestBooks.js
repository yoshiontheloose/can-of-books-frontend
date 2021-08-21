import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Jumbotron, Carousel, Card } from 'react-bootstrap';
import './BestBooks.css';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";

class MyFavoriteBooks extends React.Component {

  // hitting the books route
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    }
  }

  componentDidMount = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    // just how it works
    const jwt = tokenClaims.__raw;
    console.log('jwt: ', jwt);
    const config = {
      headers: { "Authorization": `Bearer ${jwt}` },
    }
    const results = await axios.get('http://localhost:3001/books', config);
    console.log(results.data);
    this.setState({
      books: results.data,
    });
  };

  render() {
    console.log(this.state);
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {this.props.isAuthenticated ?
          <button onClick={this.props.makeRequest}>Make Request to Server</button> : ''}
        <Carousel>
          <Carousel.Item>
            {
              this.state.books.length > 0 ?
                this.state.books.map(book => (
                  <Card key={book._id} className="bookCard">
                    <Card.Body>
                    <Card.Text>{book.title}</Card.Text>
                    <Card.Text>{book.description}</Card.Text>
                    <Card.Text>{book.status}</Card.Text>
                    <Card.Text>{book.email}</Card.Text>
                    </Card.Body>
                  </Card>
                ))
                : ''
            }
          </Carousel.Item>
        </Carousel>
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
