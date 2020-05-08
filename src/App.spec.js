import Cookies from 'universal-cookie';

const App = require('./App')

test('new cookies', () => {
  const cookies = new Cookies();
  expect(cookies.HAS_DOCUMENT_COOKIE).toBe(true);
});

// retrieve token, create cookie and retrieve it
test('creation and retrieval of groupy cookie', () => {
  // const cookieExists = cookies.get('groupy');
  jest.mock("universal-cookie", () => {
    const mCookie = {
      get: jest.fn()
    };
    return jest.fn(() => mCookie);
  });
})
