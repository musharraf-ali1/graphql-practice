import React, { Component } from 'react';
import { graphql, compose, Query } from 'react-apollo';
import { gql } from 'apollo-boost';

import {
  getBooksQuery,
  markTheBookAsRead,
  markTheBookAsUnRead
  // getBookQuery
} from '../queries/queries';
// import PropTypes from 'prop-types';

// components
import BookDetails from './BookDetails';
import SingleBook from './SingleBook';
// import { get } from 'https';
// import { propType } from 'graphql-anywhere';
// import Switch from './Switch';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }

  selectedBook = id => {
    this.setState({ selected: id });
  };
  // static propTypes = {
  //   getBooksQuery: PropTypes.func
  // };

  displayBooks(data1, client) {
    var data = this.props.getBooksQuery;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      // console.log(this.props.getBooksQuery.nothing);
      return data.books.map(book => {
        return (
          <SingleBook
            key={book.id}
            book={book}
            selectedBook={this.selectedBook}
          />
        );
      });
    }
  }
  render() {
    console.log('this is rendering again or not see for it ');
    return (
      <Query query={GET_VISIBILITY_FILTER}>
        {({ data, client }) => (
          <div>
            {/* {console.log(
              'this is everything ',
              client.cache.data.data.ROOT_QUERY,
              'this is book id',
              this.state.selected
            )} */}
            <ul id="book-list">{this.displayBooks(data, client)}</ul>
            <BookDetails bookId={this.state.selected} />
          </div>
        )}
      </Query>
    );
  }
}
const GET_VISIBILITY_FILTER = gql`
  {
    visibilityFilter @client
  }
`;

export default compose(
  graphql(getBooksQuery, { name: 'getBooksQuery' }),
  graphql(markTheBookAsRead, { name: 'markTheBookAsRead' }),
  graphql(markTheBookAsUnRead, { name: 'markTheBookAsUnRead' }),
  // graphql(getBookQuery, { name: 'getBookQuery' }),
  graphql(GET_VISIBILITY_FILTER)
)(BookList);
