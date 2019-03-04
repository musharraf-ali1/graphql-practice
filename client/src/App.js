import React, { Component, Fragment } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// import { InMemoryCache } from 'apollo-cache-inmemory';

// components
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import LoginPage from './components/Login';

// apollo cache initialized
// const cache = new InMemoryCache();

// apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  clientState: {
    defaults: {
      visibilityFilter: false
    }
  }
  // ,cache
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <h1>Ninja's Reading List</h1>
            <Route
              exact
              path="/main"
              render={() => {
                return (
                  <div id="main">
                    <BookList />
                    <AddBook />
                  </div>
                );
              }}
            />
            <Route
              exact
              path="/"
              render={() => {
                return <LoginPage />;
              }}
            />
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
