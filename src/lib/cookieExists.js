import Cookies from 'universal-cookie';

const cookies = new Cookies();
const cookieName = 'groupy';

const cookieExists = () => {
  if (cookies.get(cookieName)) {
    return true;
  } else {
    return false;
  }
};


export default cookieExists;
