/* eslint-disable no-case-declarations */
/**
 * ACTION TYPES
 */
const GOT_USER_OPTIONS = 'GOT_USER_OPTIONS'
const GOT_UPLOADED_FILE = 'GOT_UPLOADED_FILE'

/**
 * INITIAL STATE
 */
const defaultState = {
  file: null,
  userOptions: ''
}

/**
 * ACTION CREATORS
 */
export const gotUserOptions = userOptions => ({
  type: GOT_USER_OPTIONS,
  userOptions
})

export const gotUploadedFile = file => ({
  type: GOT_UPLOADED_FILE,
  file
})

/**
 * REDUCER
 */
const fileUploadReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GOT_USER_OPTIONS:
      const userOptions = action.userOptions
      return {...state, userOptions}
    case GOT_UPLOADED_FILE:
      const file = action.file
      return {...state, file}
    default:
      return state
  }
}

export default fileUploadReducer
