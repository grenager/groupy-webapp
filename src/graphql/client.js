/* eslint no-undef: 0 */

import ApolloClient from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const token = process.env.REACT_APP_GROUPY_TOKEN;

const dataIdFromObject = (result) => {
  if (result.id && result.__typename) {
    return result.__typename + result.id;
  }
  return null;
}

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
  dataIdFromObject,
})

export default apolloClient