const passport = require('passport');
const Authentication = require('./authentication');
const passportService = require('../../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

export default server => {
  // server.get('/', requireAuth, (req, res) => {
  //   res.send({ message: 'Super secret code is ABC123' });
  // });
  server.post('/signin', requireSignin, Authentication.signin);
  server.post('/signup', Authentication.signup);
};
