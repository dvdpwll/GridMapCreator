'use strict';
const api = require('./api');
const ui = require('./ui');

//global variables, add new variables when adding new images
// let noneImg = '<img src="./assets/none.png">';//change this if you change the img file for none.
let rockImg = '<img data-thing="rock" src="./assets/rock.png">';//change this if you change the img file for rock.
let treeImg = '<img data-thing="tree" src="./assets/tree.png">';//change this if you change the img file for tree.

//user sign up
const onSignUp = function () {
  $('#sign-up-modal').modal('show');
  $('#sign-up-submit').on('click',function(){
    //get text fields
    let email = $('#sign-up-email').val();
    let password = $('#sign-up-password').val();
    let password_confirmation = $('#sign-up-confirm-password').val();

    //put information into data object
    let data = {
      "credentials": {
        "email": email,
        "password": password,
        "password_confirmation": password_confirmation
      }
    };

    //send data to api
    api.signUp(data)
      .done(ui.success)
      .fail(ui.failure);

    //close modal
    $('#sign-up-modal').modal('hide');
  });
};

//user log in
const onLogIn = function () {
  $('#log-in-modal').modal('show');
  $('#log-in-submit').on('click',function(){
    //get text fields
    let email = $('#log-in-email').val();
    let password = $('#log-in-password').val();

    //put information into data object
    let data = {
      "credentials": {
        "email": email,
        "password": password,
      }
    };

    //send data to api
    api.logIn(data)
      .done(ui.signInSuccess)
      .fail(ui.failure);

    //close modal
    $('#log-in-modal').modal('hide');
  });
};

//user log out
const onLogOut = function () {
  api.signOut()
    .done(ui.signOutSuccess)
    .fail(ui.failure);
};

//user changes password
const onChangePassword = function () {
  $('#change-password-modal').modal('show');
  $('#change-password-submit').on('click',function(){
    //get text fields
    let oldPassword = $('#current-password').val();
    let NewPassword = $('#new-password').val();

    let data = {
      "passwords": {
        "old": oldPassword,
        "new": NewPassword,
      }
    };

    //send data to api
    api.changePassword(data)
      .done(ui.success)
      .fail(ui.failure);

    //close modal
    $('#change-password-modal').modal('hide');
  });
};

//send save data
//change to patch
const sendSave = function (t, id) {
  let data = {
    "element": {
      "thing": t,
    }
  };

  api.saveElement(data, id)
    .done(ui.success)
    .fail(ui.failure);
};

//save a map
//remove delete, change to patch
const onSaveMap = function () {
  let i = 0;
  //checks each square
  $('.square').each(function(){
    let id = api.appVar.app.elements[i];

    //extracts the data-thing value from the img
    let thing = $(this).children().data('thing');
    if (thing) {
      sendSave(thing, id);
    }
    else {
      sendSave('none', id);
    }
    i++;
  });
};

//make a new map
const newElements = function (data) {
  api.appVar.app.map = data.map;
  let mapId = api.appVar.app.map.id;

  $('.square').each(function(){
    let i = $(this).data('square');
    let data = {
      "element": {
        "thing": 'none',
        "order": i,
        "map_id": mapId
      }
    };

    api.newElement(data)
      .done(ui.newElementSuccess)
      .fail(ui.failure);
  });
};

//make a new map
const onNewMap = function () {
  let data = {
    "map": {
      "name": 'NewMap Test',
      "user_id": api.appVar.app.user.id
    }
  };
  api.newMap(data)
    .done(newElements)
    .fail(ui.failure);
};

//clear the board of all images
const onClearBoard = function () {
  $('.square').empty();
};

//display the maps in the all maps modal
const displayAllMaps = function (data) {
  $('#show-all-maps-body').empty();
  $('#show-all-maps-body').append("<p>Map #:    Name: </p>");
  for (let i = 0; i < data.maps.length; i++) {
    $('#show-all-maps-body').append("<p>" + data.maps[i].id + " " +  data.maps[i].name + "</p>");
  }
};

//see all maps the user has made
const onSeeAllMaps = function () {
  $('#show-all-maps-modal').modal('show');

  api.seeAllMaps()
    .done(displayAllMaps)
    .fail(ui.failure);
};

//display one map
const displayMap = function (data) {
  console.log('displayMap data');
  console.log(data);
  api.appVar.app.map = data.elements[0].map;
  //checks each square
  $('.square').each(function(){
    let index = $(this).data('square');
    for (let i = 0; i < data.elements.length; i++) {
      if (data.elements[i].order === index) {
        let thing = data.elements[i].thing;

        //switch statement to place an image of thing
        switch(thing) {
            case 'rock':
                $(this).empty();
                $(this).prepend(rockImg);
                break;
            case 'tree':
                $(this).empty();
                $(this).prepend(treeImg);
                break;
            default:
                $(this).empty();
        }
      }
    }
  });
};

//load one map
const onLoadMap = function () {
  $('#load-map-modal').modal('show');

  $('#load-map-submit').on('click',function(){
    //get text field
    let mapId = $('#load-map-id').val();

    api.seeElements(mapId)
      .done(displayMap)
      .fail(ui.failure);

    //close modal
    $('#load-map-modal').modal('hide');
  });
};

//place a thing
const onMap = function () {
  //get the selected thing
  let selected = $("input[name='thing']:checked").val();

  //switch statement to place an image of thing
  switch(selected) {
      case 'rock':
          $(this).empty();
          $(this).prepend(rockImg);
          break;
      case 'tree':
          $(this).empty();
          $(this).prepend(treeImg);
          break;
      default:
          $(this).empty();
  }
};

const addHandlers = () => {
  $('#sign-up').on('click', onSignUp);
  $('#log-in').on('click', onLogIn);
  $('#log-out').on('click', onLogOut);
  $('#change-password').on('click', onChangePassword);
  $('#save-map').on('click', onSaveMap);
  $('#new-map').on('click', onNewMap);
  $('#clear-board').on('click', onClearBoard);
  $('#see-all-maps').on('click', onSeeAllMaps);
  $('#load-map').on('click', onLoadMap);
  $('#save-map').hide();
  $('#new-map').hide();
  $('#clear-board').hide();
  $('.dropdown-toggle').hide();
  $('#T00').on('click', onMap);
  $('#T01').on('click', onMap);
  $('#T02').on('click', onMap);
  $('#T03').on('click', onMap);
  $('#T04').on('click', onMap);
  $('#T05').on('click', onMap);
  $('#T06').on('click', onMap);
  $('#T07').on('click', onMap);
  $('#T08').on('click', onMap);
  $('#T09').on('click', onMap);
  $('#T10').on('click', onMap);
  $('#T11').on('click', onMap);
  $('#T12').on('click', onMap);
  $('#T13').on('click', onMap);
  $('#T14').on('click', onMap);
  $('#T15').on('click', onMap);
  $('#T16').on('click', onMap);
  $('#T17').on('click', onMap);
  $('#T18').on('click', onMap);
  $('#T19').on('click', onMap);
  $('#T20').on('click', onMap);
  $('#T21').on('click', onMap);
  $('#T22').on('click', onMap);
  $('#T23').on('click', onMap);
  $('#T24').on('click', onMap);
};

module.exports = {
  addHandlers,
};
