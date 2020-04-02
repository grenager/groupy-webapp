/* eslint no-undef: 0 */

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
// Apollo
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-boost';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import * as queries from '../../../../../../graphql/queries';

const userQuery = gql(queries.users.getUser.graphql);

let user = {};
const token = process.env.REACT_APP_GROUPY_TOKEN;
const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
  // const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
});

client
  .query({
    query: userQuery
  })
  .then(result => {
    // console.log(result)
    // console.log(`first:${result.data.user[0].first}`);
    user = {
      first: result.data.user[0].first,
      last: result.data.user[0].last,
      phone: result.data.user[0].phone,
    }
    console.log('USER IS', user);
  });

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  // const user = {
  //   name: 'Joe Schmoe',
  //   avatar: '/images/avatars/avatar_11.png',
  //   bio: '94942'
  // };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={user.avatar}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {user.name}
      </Typography>
      <Typography variant="body2">{user.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
