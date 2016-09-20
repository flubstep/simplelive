/*
 * @providesModule Api
 */

'use strict'

import React from 'react'
import urlFormat from 'url'
import { random, sortBy } from 'lodash'
import moment from 'moment'

import Auth from './Auth'
import Facebook from './Facebook'

import { g } from '../constants/Constants'

const BASE_URL = g.BASE_API_URL

/*
 * Scaffolding functions
 */

function asyncCachedFunction(f) {
  let cachedValue = null
  async function fCached() {
    if (!cachedValue) {
      cachedValue = await f()
    }
    return cachedValue
  }
  fCached.clear = () => {
    cachedValue = null
  }
  return fCached
}

const optionDefaults = {
  authenticated: true,
  cached: true,
  json: true,
  method: 'GET'
}


// From: http://stackoverflow.com/questions/1714786/querystring-encoding-of-a-javascript-object
function uriSerialize (obj) {
  let str = []
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]))
    }
  return str.join("&")
}


function serialize(params) {
  if (typeof(params) === 'undefined') {
    return 'undefined'
  }
  // todo: possibly use something that's not sensitive to ordering
  return JSON.stringify(params)
}


class PermissionDenied extends Error {
  constructor(m) {
    super(m)
    this.type = "PermissionDenied"
  }
}


function createApiCall(paramOptions) {
  let options = Object.assign({}, optionDefaults, paramOptions)
  let baseUrl = BASE_URL + options.path
  let baseHeaders = {}
  let json = options.json
  let cache = {}

  async function apiFetch(params) {

    let headers = Object.assign({}, baseHeaders)

    params = params || {}

    if (options.authenticated) {
      let token = await Auth.currentToken()
      if (token) {
        headers['x-access-token'] = token
      } else {
        // console.warn("Attempting to make authenticated API call without token.")
      }
    }

    let cacheKey = serialize(params)
    if (options.cached) {
      if (cache[cacheKey]) {
        return cache[cacheKey]
      } else {
        // console.log('cache miss', params, cacheKey, cache, cache[cacheKey])
      }
    }
    let url = baseUrl
    let body = null

    if (options.method == 'GET') {
      // todo: change to if params1 is a string, treat as path
      // if params1 is object, treat as parameters
      if (params && params.path) {
        url = url + params.path
      } else if (params) {
        url = url + urlFormat.format({query: params})
      }
    } else if (options.method == 'POST') {
      body = uriSerialize(params)
      headers['content-type'] = 'application/x-www-form-urlencoded'
    }
    let response = await fetch(url, {
      headers,
      method: options.method,
      body
    })
    let responseJson = await (json ? response.json() : response.text())
    if (options.authenticated && response.status == 403) {
      throw new PermissionDenied()
    }
    if (options.cached) {
      cache[cacheKey] = responseJson
    }
    return responseJson
  }

  apiFetch.clear = () => {
    cache = {}
  }

  return apiFetch
}


class RESTResource {
  constructor(resource) {
    this.resource = resource
    this.get = createApiCall({path: resource})
    this.post = createApiCall({path: resource, cached: false, method: 'POST'})
  }
}

/*
 * API definition functions
 */

const appInfo = createApiCall({path: '/api/app_info'})
const userInfo = createApiCall({path: '/api/userInfo', cached: false})
const getUrl = createApiCall({path: '/file/getUrl', json: false})
const getPublicUrl = createApiCall({path: '/file/getPublicUrl', json: false})
const days = createApiCall({path: '/api/days'})
const addStripe = createApiCall({path: '/api/addStripe', cached: false, method: 'POST'})
const updateUserStatus = createApiCall({path: '/api/updateUserStatus', cached: false, method: 'POST'})

const users = new RESTResource('/api/users')
const teachers = new RESTResource('/api/teachers')
const topics = new RESTResource('/api/topics')
const subtopics = new RESTResource('/api/subtopics')
const quotes = new RESTResource('/api/quotes')
const quoteImages = new RESTResource('/api/quoteImages')
const listens = new RESTResource('/api/listens')
const listenHistory = new RESTResource('/api/listenHistory')
const complete = new RESTResource('/api/complete')
const categories = new RESTResource('/api/categories')
const subcategories = new RESTResource('/api/subcategories')
const routing = new RESTResource('/api/routing')

/*
 * Derivative functions
 */

async function _profilePhotoUrl() {
  try {
    let url = await Facebook.getProfilePhotoUrl()
    return url
  } catch (e) {
    return '/static/default-profile.png'
  }
}
let profilePhotoUrl = asyncCachedFunction(_profilePhotoUrl)

const LOGGED_OUT_USER = {
  userInfo: {
    _id: 0
  },
  photoUrl: null
}

async function _currentUser() {
  if (!Auth.currentToken()) {
    return LOGGED_OUT_USER
  }
  try {
    let currentUserInfo = await userInfo()
    let photoUrl = await profilePhotoUrl()
    return Object.assign({}, currentUserInfo, {'photoUrl': photoUrl})
  } catch (e) {
    return LOGGED_OUT_USER
  }
}
let currentUser = asyncCachedFunction(_currentUser)

async function currentUserId() {
  let userInfo = await currentUser()
  return userInfo.userInfo._id
}

window.moment = moment

// Same as listen history except with dates converted
async function fullListenInfo() {
  try {
    let currentOffset = moment().utcOffset()
    let listens = await listenHistory.get()
    return listens.map((listen) => {
      let day = moment.utc(listen.listenDate).utcOffset(currentOffset)
      return Object.assign({}, listen, {
        listenDate: day
      })
    })
  } catch (e) {
    return []
  }
}

async function _fullDayInfo() {
  let info = {}
  let allDayInfo = await days()
  allDayInfo.forEach((day) => {
    info[day._id] = day
  })
  return info
}
let fullDayInfo = asyncCachedFunction(_fullDayInfo)


async function _fullSubtopicInfo() {
  let info = {}
  let subtopicsInfo = await subtopics.get()
  subtopicsInfo.forEach((subtopic) => {
    info[subtopic._id] = subtopic
  })
  return info
}
let fullSubtopicInfo = asyncCachedFunction(_fullSubtopicInfo)


async function _routingTable() {
  let allRoutes = await routing.get()
  let routingTable = {}
  allRoutes.forEach((route) => {
    routingTable[route.objectId] = route
  })
  return routingTable
}
let routingTable = asyncCachedFunction(_routingTable)


async function routeForObject(objectId) {
  let table = await routingTable()
  return table[objectId]
}

async function dayInfo(dayId) {
  let fullInfo = await fullDayInfo()
  return fullInfo[dayId]
}

async function subtopicInfo(subtopicId) {
  let subtopicInfo = await fullSubtopicInfo()
  return subtopicInfo[subtopicId]
}

async function randomQuote() {
  let allQuotes = await quotes.get()
  return allQuotes[random(0, allQuotes.length-1)]
}

async function getPlaylist(subtopic) {
  let playlist = await days({subtopic})
  return sortBy(playlist, (d) => d.order)
}

/*
// Making sure that we don't try to load a different
// quote image every time we resize a page or something
async function _randomQuoteImage() {
  let allQuoteImages = await quoteImages.get()
  return allQuoteImages[random(0, allQuoteImages.length-1)]
}
*/

async function _randomQuoteImage() {
  let allQuoteImages = [
    "http://www.simplehabitapp.com/static/images/photo100.jpeg",
    "http://www.simplehabitapp.com/static/images/photo101.jpeg",
    "http://www.simplehabitapp.com/static/images/photo102.jpeg",
    "http://www.simplehabitapp.com/static/images/photo103.jpeg",
    "http://www.simplehabitapp.com/static/images/photo104.jpeg",
    "http://www.simplehabitapp.com/static/images/photo105.jpeg",
    "http://www.simplehabitapp.com/static/images/photo106.jpeg",
    "http://www.simplehabitapp.com/static/images/photo107.jpeg",
    "http://www.simplehabitapp.com/static/images/photo108.jpeg",
    "http://www.simplehabitapp.com/static/images/photo109.jpeg",
    "http://www.simplehabitapp.com/static/images/photo110.jpeg",
    "http://www.simplehabitapp.com/static/images/photo111.jpeg",
    "http://www.simplehabitapp.com/static/images/photo112.jpeg",
    "http://www.simplehabitapp.com/static/images/photo113.jpeg"
  ]
  return {
    url: allQuoteImages[random(0, allQuoteImages.length-1)]
  }
}
let randomQuoteImage = asyncCachedFunction(_randomQuoteImage)


export default {
  appInfo,
  currentUser,
  addStripe,
  updateUserStatus,

  teachers,
  users,
  topics,
  routing,
  subtopics,
  getUrl,
  getPublicUrl,
  days,
  quotes,
  quoteImages,
  listens,
  listenHistory,
  complete,
  categories,
  subcategories,

  currentUserId,
  fullListenInfo,
  fullDayInfo,
  fullSubtopicInfo,
  dayInfo,
  subtopicInfo,
  randomQuote,
  randomQuoteImage,
  routeForObject,
  getPlaylist,

  PermissionDenied,
}
