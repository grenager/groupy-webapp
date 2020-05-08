import Cookies from 'universal-cookie';
import groupyCookie from './cookie';

const cookieExists = require('./cookieExists');

test('can we instantiate universal cookie?', () => {
  const cookies = new Cookies();
  expect(cookies.HAS_DOCUMENT_COOKIE).toBe(true);
});

test('proper cookie data is correct', () => {
  expect(groupyCookie).toMatchSnapshot();
  expect(groupyCookie.userID).toEqual('5e62ade15014b544a50af943');
});

test('groupyCookie object should have properties token and userID', () => {
  expect(groupyCookie).toHaveProperty('token');
  expect(groupyCookie).toHaveProperty('userID');
})
