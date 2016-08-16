'use strict';

const appVar = require('./app');

//general success
const success = (data) => {
  console.log(data);
};

//general failure
const failure = (error) => {
  console.error(error);
};

//success for sign in
const signInSuccess = (data) => {
  appVar.app.user = data.user;
  console.log(appVar);
};

//success for sign out
const signOutSuccess = () => {
  delete appVar.app.user;
  console.log(appVar);
};


module.exports = {
  success,
  failure,
  signInSuccess,
  signOutSuccess,
};
