import React, { Fragment, Component } from 'react';
import { graphql,compose } from 'react-apollo';
import { getBooksQuery, markTheBookAsRead, markTheBookAsUnRead, getBookQuery } from '../queries/queries';
// import PropTypes from 'prop-types';

// components
import BookDetails from './BookDetails';
// import { propType } from 'graphql-anywhere';
// import Switch from './Switch';

class BookList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    };
  }
  // static propTypes = {
  //   getBooksQuery: PropTypes.func
  // };
 
  subscribeBook(){

  }
  unsubscribeBook(){
    
  }
  displayBooks() {
    var data = this.props.getBooksQuery;
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.books.map(book => {
        return (
          <Fragment key={book.id}>
            <li>
              <span onClick={e => this.setState({ selected: book.id })}>
                {book.name}
              </span>
              {book.subscribed ? <button className="btn btn-danger" 
                  onClick = {()=> {this.props.markTheBookAsUnRead({
                    variables:{
                      bookId: book.id
                    },
                    refetchQueries: [{ query: getBooksQuery }]
                  });
                  // .then(()=>
                  // this.props.getBooksQuery.refetch()
                  // );
                
                }
                  
                }
              >
              click to mark as Unread
              
              </button>: <button className="btn btn-success" 
                  onClick = {()=>{ this.props.markTheBookAsRead({
                    variables:{
                      bookId: book.id
                    },
                    refetchQueries: [{ query: getBooksQuery }]
                  });
                  // .then(()=>
                  // this.props.getBooksQuery.refetch()
                  // );
                }}
              >
              click to mark as read
              
              </button>}
            </li>
          </Fragment>
        );
      });
    }
  }
  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    );
  }
}

export default compose(
  graphql(getBooksQuery, { name: 'getBooksQuery' }),
  graphql(markTheBookAsRead, { name: 'markTheBookAsRead' }),
  graphql(markTheBookAsUnRead, { name: 'markTheBookAsUnRead' }),
  graphql(getBookQuery, { name: 'getBookQuery' })

)(BookList);
  
  
