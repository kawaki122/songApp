const users = require('./users');
const authors = require('./authors');
const albums = require('./albums');
const songs = require('./songs');
const file = require('./file');

module.exports = (router) => {
  users(router);
  authors(router);
  file(router);
  albums(router);
  songs(router);
  return router;
};