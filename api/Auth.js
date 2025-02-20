/*
 * @providesModule Auth
 */

'use strict'

import {
  AsyncStorage
} from 'react-native'

import uuid from 'uuid'

import { g } from '../constants/Constants'

const BASE_URL = g.BASE_API_URL
const AUTH_KEY = "simplehabit:auth:token"
const LOCAL_ID_KEY = "simplehabit:auth:localid"


// From: http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
function uriSerialize (obj) {
  let str = []
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    }
  return str.join("&")
}


function currentToken() {
  return AsyncStorage.getItem(AUTH_KEY)
}


function clearToken() {
  return AsyncStorage.removeItem(AUTH_KEY)
}


function setToken(token) {
  return AsyncStorage.setItem(AUTH_KEY, token)
}


async function localId() {
  let id = await AsyncStorage.getItem(LOCAL_ID_KEY)
  if (!id) {
    let newId = uuid.v4()
    await AsyncStorage.setItem(LOCAL_ID_KEY, newId)
    return newId
  } else {
    return id
  }
}


async function handleAuthResponse(response) {
  // todo: handle response error
  let responseJson = await response.json()
  if (responseJson.success) {
    await setToken(responseJson.token)
  } else {
    // console.warn("Unsucessful response from authentication handler.")
    // todo: raise error?
  }
  return responseJson
}

async function loginWithPassword(email, password) {

  let authUrl = BASE_URL + '/api/authenticate'
  let data = { email, password }
  let response = await fetch(authUrl, {
    method: 'POST',
    body: uriSerialize(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return handleAuthResponse(response)
}

async function loginWithFacebook(accessToken) {
  let authUrl = BASE_URL + '/api/authenticate/facebook'
  let data = { access_token: accessToken }
  let response = await fetch(authUrl, {
    method: 'POST',
    body: uriSerialize(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  return handleAuthResponse(response)
}

export default {
  currentToken,
  clearToken,
  setToken,
  loginWithPassword,
  loginWithFacebook,
  localId
}