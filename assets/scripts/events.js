'use strict';
const api = require('./api');
const ui = require('./ui');

//global variables, add new variables when adding new images
let grassImg = '<img data-thing="grass" src="./assets/grass.png">';//change this if you change the img file for grass.
let rockImg = '<img data-thing="rock" src="./assets/rock.png">';//change this if you change the img file for rock.
let rocksImg = '<img data-thing="rocks" src="./assets/rocks.png">';//change this if you change the img file for rocks.
let treeImg = '<img data-thing="tree" src="./assets/tree.png">';//change this if you change the img file for tree.
let treesImg = '<img data-thing="trees" src="./assets/trees.png">';//change this if you change the img file for trees.
let waterImg = '<img data-thing="water" src="./assets/water.png">';//change this if you change the img file for water.
let water2Img = '<img data-thing="water2" src="./assets/water2.png">';//change this if you change the img file for water2.

//user log in
const onLogIn2 = function (email, password) {
    //put information into data object
    let data = {
      "credentials": {
        "email": email,
        "password": password,
      }
    };
    console.log(data);

    //send data to api
    api.logIn(data)
      .done(ui.signInSuccess)
      .fail(ui.failure);
};

//user sign up
const onSignUp = function () {
  //open sign up modal
  $('#sign-up-modal').modal('show');

  //on submit
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
      .done(onLogIn2(email, password))
      .fail(ui.failure);

    //clear text fields
    $('#sign-up-email').val('');
    $('#sign-up-password').val('');
    $('#sign-up-confirm-password').val('');

    //close modal
    $('#sign-up-modal').modal('hide');
  });
};

//user log in
const onLogIn = function () {
  //show login modal
  $('#log-in-modal').modal('show');

  //on submit
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

    //clear text field
    $('#log-in-email').val('');
    $('#log-in-password').val('');

    //close modal
    $('#log-in-modal').modal('hide');
  });
};

//user log out
const onLogOut = function () {
  //send request
  api.signOut()
    .done(ui.signOutSuccess)
    .fail(ui.failure);
};

//user changes password
const onChangePassword = function () {
  //show change password modal
  $('#change-password-modal').modal('show');

  //on submit
  $('#change-password-submit').on('click',function(){
    //get text fields
    let oldPassword = $('#current-password').val();
    let NewPassword = $('#new-password').val();

    //put info in data object
    let data = {
      "passwords": {
        "old": oldPassword,
        "new": NewPassword,
      }
    };

    //send data to api
    api.changePassword(data)
      .done(ui.passwordSuccess)
      .fail(ui.passwordFailure);

    //clear text fields
    $('#current-password').val('');
    $('#new-password').val('');

    //close modal
    $('#change-password-modal').modal('hide');
  });
};

//place a thing
const onMap = function () {
  //get the selected thing
  let selected = $("input[name='thing']:checked").val();

  //switch statement to place an image of thing
  switch(selected) {
      case 'grass':
          $(this).empty();
          $(this).prepend(grassImg);
          break;
      case 'rock':
          $(this).empty();
          $(this).prepend(rockImg);
          break;
      case 'rocks':
          $(this).empty();
          $(this).prepend(rocksImg);
          break;
      case 'tree':
          $(this).empty();
          $(this).prepend(treeImg);
          break;
      case 'trees':
          $(this).empty();
          $(this).prepend(treesImg);
          break;
      case 'water':
          $(this).empty();
          $(this).prepend(waterImg);
          break;
      case 'water2':
          $(this).empty();
          $(this).prepend(water2Img);
          break;
      default:
          $(this).empty();
  }
};

//send save data
const sendSave = function (t, id, i) {
  //put info in data object
  let data = {
    "element": {
      "thing": t,
    }
  };

  //send data and data id to api
  api.saveElement(data, id)
    .done(ui.saveElementsSuccess(i))
    .fail(ui.failure);
};

//save a map
const onSaveMap = function () {
  //increment
  let i = 0;

  //checks each square
  $('.square').each(function(){
    //get id of element
    let id = api.appVar.app.elements[i];

    //extracts the data-thing value from the img
    let thing = $(this).children().data('thing');

    //if an image exists then send thing, if no img then send none
    if (thing) {
      sendSave(thing, id, i);
    }
    else {
      sendSave('none', id, i);
    }

    //increment
    i++;
  });
};

//clear the board of all images
const onClearBoard = function () {
  $('.square').empty();
};

//erase the grid
const eraseGrid = function () {
  $('.gameboard').empty();
};

//create new grid
const createGrid = function (l, h) {
  //create the rows of the grid
  for (let i = 0; i < h; i++) {
    $('.gameboard').append('<div class="row"></div>');
  }

  $('.row').each(function(){
    //create the columns of the grid in each row
    for (let i = 0; i < l; i++) {
      $(this).append('<div id="T' + i + '" class="col-xs-1 square" data-square="' + i + '" data-image="0"></div>');
    }
  });
};

//erase the grid
const addGridHandlers = function () {
  $('.square').on('click', onMap);
};

//make a new map
const newElements = function (data) {
  //save new map info
  api.appVar.app.map = data.map;

  //get map name and id and add to screen
  let name = api.appVar.app.map.name;
  let mapId = api.appVar.app.map.id;
  let length = api.appVar.app.map.length;
  let height = api.appVar.app.map.height;
  $('.mapName').empty();
  $('.mapName').append("<h1>" + mapId + ' : ' + name + "</h1>");

  //clear board
  onClearBoard();
  eraseGrid();
  createGrid(length, height);
  addGridHandlers();


  //for each element make a data with a thing of none
  $('.square').each(function(){
    //get index of square
    let i = $(this).data('square');

    //put info in data
    let data = {
      "element": {
        "thing": 'none',
        "order": i,
        "map_id": mapId
      }
    };

    // send data to api, make an element for each square
    api.newElement(data)
      .done(ui.newElementSuccess)
      .fail(ui.failure);
  });
};

//make a new map
const onNewMap = function () {
  //show new map modal
  $('#new-map-modal').modal('show');

  //on submit
  $('#new-map-submit').on('click',function(){
    //get text fields
    let name = $('#new-map-id').val();
    let length = $('#new-map-length').val();
    let height = $('#new-map-height').val();

    //min and max for length
    if (length > 10) {
      length = 10;
    }
    if (length < 2) {
      length = 2;
    }
    //min and max for height
    if (height > 10) {
      height = 10;
    }
    if (height < 2) {
      height = 2;
    }

    //put info in data
    let data = {
      "map": {
        "name": name,
        "length": length,
        "height": height,
        "user_id": api.appVar.app.user.id
      }
    };

    console.log(data);

    //send data to api
    api.newMap(data)
      .done(newElements)
      .fail(ui.failure);

    //clear text fields
    $('#new-map-id').val('');
    $('#new-map-length').val('');
    $('#new-map-height').val('');

    //close modal
    $('#new-map-modal').modal('hide');
  });
};

//display the maps in the all maps modal
const displayAllMaps = function (data) {
  //empty the body of the show all maps modal
  $('#show-all-maps-body').empty();

  //add header for list
  $('#show-all-maps-body').append("<p>Map #:    Name: </p>");

  //add info for each map for user
  for (let i = 0; i < data.maps.length; i++) {
    $('#show-all-maps-body').append("<p>" + data.maps[i].id + " " +  data.maps[i].name + "</p>");
  }
};

//see all maps the user has made
const onSeeAllMaps = function () {
  //show the all maps modal
  $('#show-all-maps-modal').modal('show');

  //get all maps for user
  api.seeAllMaps()
    .done(displayAllMaps)
    .fail(ui.failure);
};

//display one map
const displayMap = function (data) {
  //save map id
  api.appVar.app.map = data.elements[0].map;

  //get map name and add to screen
  let name = api.appVar.app.map.name;
  let mapId = api.appVar.app.map.id;
  $('.mapName').empty();
  $('.mapName').append("<h1>" + mapId + ' : ' + name + "</h1>");

  //checks each square
  $('.square').each(function(){
    //get index of square
    let index = $(this).data('square');

    //loop through elements array
    for (let i = 0; i < data.elements.length; i++) {
      //if element order # is same as square index number insert img
      if (data.elements[i].order === index) {
        let thing = data.elements[i].thing;

        //switch statement to place an image of thing
        switch(thing) {
            case 'grass':
                $(this).empty();
                $(this).prepend(grassImg);
                break;
            case 'rock':
                $(this).empty();
                $(this).prepend(rockImg);
                break;
            case 'rocks':
                $(this).empty();
                $(this).prepend(rocksImg);
                break;
            case 'tree':
                $(this).empty();
                $(this).prepend(treeImg);
                break;
            case 'trees':
                $(this).empty();
                $(this).prepend(treesImg);
                break;
            case 'water':
                $(this).empty();
                $(this).prepend(waterImg);
                break;
            case 'water2':
                $(this).empty();
                $(this).prepend(water2Img);
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
  //show load map modal
  $('#load-map-modal').modal('show');

  //on submit
  $('#load-map-submit').on('click',function(){
    //get text field
    let mapId = $('#load-map-id').val();

    //get map by id
    api.seeElements(mapId)
      .done(displayMap)
      .fail(ui.failure);

    //empty text field
    $('#load-map-id').val('');

    //close modal
    $('#load-map-modal').modal('hide');
  });
};

//delete the map after finished deleteing all elements
const deleteMap = function () {
  //get map id
  let mapId = api.appVar.app.map.id;

  //delete map by id
  api.delMap(mapId)
    .done(ui.deleteMapSuccess)
    .fail(ui.failure);

  onClearBoard();
};

//delete elements of map id
const deleteElements = function (data) {
  //get map id
  let mapId = api.appVar.app.map.id;

  //delete all elements of a map
  for (let i = 0; i < data.elements.length; i++) {
    //get element id
    let elementId = data.elements[i].id;

    //if last element delete map, else continue to delete elements
    if (i === 24) {
      api.deleteElement(mapId, elementId)
        .done(deleteMap)
        .fail(ui.failure);
    }
    else {
      api.deleteElement(mapId, elementId)
        .done(ui.success)
        .fail(ui.failure);
    }
  }
};

//delete the currently viewed map
const onDeleteMap2 = function () {
  //get the mapId
  let mapId = api.appVar.app.map.id;

  //use map id to find all elements of a map
  if (mapId) {
    api.seeElements(mapId)
      .done(deleteElements)
      .fail(ui.failure);
  }
};

//delete the currently viewed map confirm
const onDeleteMap1 = function () {
  // show confirm delete modal
  $('#confirm-delete-modal').modal('show');

  //on submit
  $('#confirm-delete-submit').on('click',function(){
    onDeleteMap2();

    //close modal
    $('#load-map-modal').modal('hide');
  });
};

//change the map name
const onChangeMapName = function () {
  //show new map modal
  $('#change-map-name-modal').modal('show');

  //on submit
  $('#change-map-name-submit').on('click',function(){
    //get text fields
    let name = $('#change-map-name-id').val();

    //get map id
    let id = api.appVar.app.map.id;

    //put info in data
    let data = {
      "map": {
        "name": name,
      }
    };

    //send data to api
    api.patchMapName(data, id)
      .done(ui.nameChangeSuccess(name))
      .fail(ui.failure);

    //clear text fields
    $('#change-map-name-id').val('');

    //close modal
    $('#change-map-name-modal').modal('hide');
  });
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
  $('#change-map-name').on('click', onChangeMapName);
  $('#load-map').on('click', onLoadMap);
  $('#delete-map').on('click', onDeleteMap1);
  $('#save-map').hide();
  $('#new-map').hide();
  $('#clear-board').hide();
  $('.dropdown-toggle').hide();
  addGridHandlers();

};

module.exports = {
  addHandlers,
};
