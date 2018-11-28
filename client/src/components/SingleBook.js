import React, { Fragment } from 'react';
import { graphql, compose } from 'react-apollo';

import {
  getBooksQuery,
  markTheBookAsRead,
  markTheBookAsUnRead
  // getBookQuery
} from '../queries/queries';

class SingleBook extends React.Component {
  subscribeBook(id) {
    this.props.markTheBookAsRead({
      variables: {
        bookId: id
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    // .then(()=>client
    // this.props.getBooksQuery.refetch()
    // );
  }
  unsubscribeBook(id) {
    this.props.markTheBookAsUnRead({
      variables: {
        bookId: id
      },
      refetchQueries: [{ query: getBooksQuery }]
    });
    // .then(()=>
    // this.props.getBooksQuery.refetch()
    // );
  }
  shouldComponentUpdate(a) {
    if (a.book.subscribed === this.props.book.subscribed) return false;
    return true;
  }
  render() {
    console.log('this is rendering how many times ');
    const { book, selectedBook } = this.props;
    return (
      <Fragment>
        <li>
          <span onClick={() => selectedBook(book.id)}>{book.name}</span>
          {book.subscribed ? (
            <button
              className="btn btn-danger"
              onClick={() => this.unsubscribeBook(book.id)}
            >
              click to mark as Unread
            </button>
          ) : (
            <button
              className="btn btn-success"
              onClick={() => this.subscribeBook(book.id)}
            >
              click to mark as read
            </button>
          )}
        </li>
      </Fragment>
    );
  }
}
export default compose(
  graphql(getBooksQuery, { name: 'getBooksQuery' }),
  graphql(markTheBookAsRead, { name: 'markTheBookAsRead' }),
  graphql(markTheBookAsUnRead, { name: 'markTheBookAsUnRead' })
  // graphql(getBookQuery, { name: 'getBookQuery' }),
  // graphql(GET_VISIBILITY_FILTER)
)(SingleBook);
