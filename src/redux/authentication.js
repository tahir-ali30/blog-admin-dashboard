// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

// ** UseJWT import to get config
// import useJwt from '@src/auth/jwt/useJwt'

// const config = useJwt.jwtConfig

const initialUser = () => {
  const userData = window.localStorage.getItem('userData')
  const accessToken = window.localStorage.getItem('accessToken')
  // axios.defaults.headers.common['Authorization'] =  `Bearer ${JSON.parse(accessToken)}`
  //** Parse stored json or if none return initialValue
  return userData && accessToken ? {
    userData: JSON.parse(userData),
    accessToken: JSON.parse(accessToken),
  } : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: initialUser(),
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload.user
      // state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      state.accessToken = action.payload.token
      // state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
      localStorage.setItem('userData', JSON.stringify(action.payload.user))
      // localStorage.setItem(config.storageTokenKeyName, JSON.stringify(action.payload.accessToken))
      localStorage.setItem('accessToken', JSON.stringify(action.payload.token))
      // localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(action.payload.refreshToken))
      // axios.defaults.headers.common['Authorization'] =  `Bearer ${action.payload.token}`
    },
    handleLogout: state => {
      state.userData = {}
      state.accessToken = null
      // state[config.storageRefreshTokenKeyName] = null
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData')
      localStorage.removeItem('accessToken')
      // localStorage.removeItem(config.storageRefreshTokenKeyName)
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
