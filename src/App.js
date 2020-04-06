/* eslint no-undef: 0 */
import React from 'react';
import { HashRouter } from 'react-router-dom';
import GridNexus from './gridNexus';

// Apollo
import { ApolloProvider } from '@apollo/react-hooks';
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink
} from 'apollo-boost';

const token = process.env.REACT_APP_GROUPY_TOKEN;

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      }
    });
    return forward(operation);
  }).concat(
    new HttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'same-origin',
      resolvers: {},
    })
  ),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <HashRouter>
        <div>
          <GridNexus />
        </div>
      </HashRouter>
    </ApolloProvider>
  )
}


export default App;
