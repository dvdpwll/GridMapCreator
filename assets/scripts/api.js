'use strict';

//app object
const appVar = require('./app');

//sign up
const signUp = (data) => $.ajax({
    url: appVar.app.api + 'sign-up/',
    method: 'POST',
    data,
  });

//log in
const logIn = (data) => $.ajax({
  url: appVar.app.api + 'sign-in/',
  method: 'POST',
  data,
});

//sign out
const signOut = () => $.ajax({
  url: appVar.app.api + 'sign-out/' + appVar.app.user.id,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + appVar.app.user.token,
  },
});

//change password
const changePassword = (data) => $.ajax({
  url: appVar.app.api + 'change-password/' + appVar.app.user.id,
  method: 'PATCH',
  headers: {
    Authorization: 'Token token=' + appVar.app.user.token,
  },
  data,
});

//new map
const newMap = (data) => $.ajax({
  url: appVar.app.api + 'maps/',
  method: 'POST',
  headers: {
    Authorization: 'Token token=' + appVar.app.user.token,
  },
  //data: data,
  data,
});

//save map
const saveElement = (data) => $.ajax({
  url: appVar.app.api + 'elements/',
  method: 'POST',
  headers: {
    Authorization: 'Token token=' + appVar.app.user.token,
  },
  //data: data,
  data,
});

module.exports = {
  signUp,
  logIn,
  signOut,
  changePassword,
  newMap,
  saveElement,
  appVar,
};
