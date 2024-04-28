/**
 * Routes file to backend endpoints, always fnish routes with out slash symbol
 */
const bases = 'http://143.198.168.244:3000/api/users';

const user = {
  createAccount: `${bases}/register/v2`,
  login: `${bases}/login`,
  updateUser: `${bases}/profile`,
  getUser: `${bases}`,
  getAllUsers: `${bases}/fetch/dummy/user-v2`,
};

const routes = {
  user,
};

export default routes;
