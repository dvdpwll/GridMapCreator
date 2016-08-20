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

//upon newMap make elements for map
const newElement = (data) => $.ajax({
  url: appVar.app.api + 'elements/',
  method: 'POST',
  headers: {
    Authorization: 'Token token=' + appVar.app.user.token,
  },
  //data: data,
  data,
});

//see all maps by user id
const seeAllMaps = () => $.ajax({
  url: appVar.app.api + 'users/' + appVar.app.user.id + '/maps/',
  method: 'GET',
  headers: {
    Authorization: 'Token token=' + appVar.app.user.token,
  },
});

//get all elements linked to a map id
const seeElements = (data) => $.ajax({
  url: appVar.app.api + 'maps/' + data + '/elements/',
  method: 'GET',
  headers: {
    Authorization: 'Token token=' + appVar.app.user.token,
  },
});

//patch each element to save the map
const saveElement = (data, id) => $.ajax({
  url: appVar.app.api + 'elements/' + id,
  method: 'PATCH',
  headers: {
    Authorization: 'Token token=' + appVar.app.user.token,
  },
  //data: data,
  data,
});

//delete an element
const deleteElement = (m, e) => $.ajax({
  url: appVar.app.api + 'maps/' + m + '/elements/' + e,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + appVar.app.user.token,
  },
});

//delete a map
const delMap = (m) => $.ajax({
  url: appVar.app.api + 'maps/' + m,
  method: 'DELETE',
  headers: {
    Authorization: 'Token token=' + appVar.app.user.token,
  },
});

//patch the name of the map
const patchMapName = (data, id) => $.ajax({
  url: appVar.app.api + 'maps/' + id,
  method: 'PATCH',
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
  newElement,
  seeAllMaps,
  seeElements,
  saveElement,
  deleteElement,
  delMap,
  patchMapName,
  appVar,
};
