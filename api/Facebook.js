/**
 * @providesModule Facebook
 */

'use strict';

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState(callback, errorCallback) {
  FB.login(function(response) {
    if (response.status === 'connected') {
      callback(response);
    } else if (response.status === 'not_authorized') {
      if (errorCallback) {
        errorCallback(response);
      }
    } else {
      if (errorCallback) {
        errorCallback(response);
      }
    }
  });
}


function getLoginStatus() {
  return new Promise((resolve, reject) => {
    FB.getLoginStatus((response) => {
      if (response.status == 'connected') {
        resolve(response);
      } else {
        reject();
      }
    });
  });
}


function getProfilePhotoUrl() {
  return new Promise((resolve, reject) => {
    FB.getLoginStatus((response) => {
      if (response.status == 'connected') {
        FB.api('/me/picture?type=normal', (response) => {
          if (response.data) {
            resolve(response.data.url);
          } else {
            reject();
          }
        });
      } else {
        reject();
      }
    });
  });
}


function login() {
  return new Promise(function(resolve, reject) {
    checkLoginState(resolve, reject);
  });
}

function logout() {
  return new Promise((resolve, reject) => {
    if (FB) {
      FB.getLoginStatus((loginResponse) => {
        FB.logout((response) => {
          resolve(response);
        });
      });
    } else {
      resolve();
    }
  });
}

module.exports = {
  login,
  logout,
  getLoginStatus,
  getProfilePhotoUrl
};