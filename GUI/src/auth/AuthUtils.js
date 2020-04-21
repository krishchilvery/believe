import { useEffect } from 'react'
import config from '../assets/ApiConfig'
import axios from 'axios'
import cookies from 'react-cookies'
import { useDispatch } from 'react-redux'
import { setIsLoggedIn } from './authSlice'

// LOGIN SECTION

export const getAccessToken = async (email, password) => {
  const url = config.url.API_URL + '/auth/jwt/create/'
  const data = {
    'email': email,
    'password': password
  }
  return await axios.post(url, data)
}

export const saveAccessToken = (access, refresh) => {
  cookies.save('access_token', access, {maxAge: config.url.ACCESS_TOKEN_AGE})
  cookies.save('refresh_token', refresh, {maxAge: config.url.REFRESH_TOKEN_AGE})
}

// REGISTER SECTION

export const createUserAccount = async (email, password, re_password) => {
  const url = config.url.API_URL + '/auth/users/'
  const data = {
    'email':email,
    'password': password,
    're_password': re_password
  }
  return await axios.post(url, data)
}

// TOKEN SECTION

export const getAccessTokenFromCookie = () => {
  let access_token = cookies.load("access_token")
  return access_token;
}

//TODO Implement Silent refresh

// export const silentCheckLoggedIn = () => {
//   if(!checkAccessToken()){
//     if(checkRefreshToken()){
//       refreshTokenService().then((response) => {
//         cookies.save("access_token", response.data.access, {path: '/', maxAge:config.url.ACCESS_TOKEN_AGE});
//         return true;
//       }).catch((error) => {
//         return false;
//       })
//     }else{
//       return false;
//     }
//   }else{
//     return true;
//   }
// }

// USER PROFILE SECTION

export const getUserProfile = async () => {
  const url = config.url.API_URL + '/users/me'
  const accessToken = getAccessTokenFromCookie()
  const headers = {Authorization: "Bearer "+accessToken}
  return await axios.get(url,{headers: headers})
}

export const changeUserProfile = async (data) => {
  const url = config.url.API_URL + '/users/me'
  const accessToken = getAccessTokenFromCookie()
  const headers = {Authorization: "Bearer "+accessToken}
  return await axios.patch(url, data, {headers: headers})
}

export const changeEmail = async (email, password) => {
  const url = config.url.API_URL + '/users/set_email/'
  const data = {
    'new_email': email,
    'current_password': password
  }
  const accessToken = getAccessTokenFromCookie()
  const headers = {Authorization: "Bearer "+accessToken}
  return await axios.post(url,data,{headers: headers})
}

// LOGOUT SECTION

export const logoutService = () => {
  cookies.remove('access_token')
  cookies.remove('refresh_token')
}

// SECURITY SECTION

export const refreshTokenService = async()=>{
  const refresh_token = cookies.load("refresh_token");    
  return await axios.post(
      config.url.API_URL+"/auth/jwt/refresh/",
      {"refresh":refresh_token})

}

const checkAccessToken = ()=>{
  if(cookies.load("access_token")){
      return true;
  }else{
      return false;
  }
}

const checkRefreshToken = ()=>{
  if(cookies.load("refresh_token")){
      return true;
  }else{
      return false;
  }
}

export default function CheckIsLoggedIn(props){

  const dispatch = useDispatch()

  const checkIsLoggedIn = ()=>{
    if(checkAccessToken()){
      dispatch(setIsLoggedIn(true))
    }else if(checkRefreshToken()){
      refreshTokenService().then((response) => {
        cookies.save("access_token", response.data.access, {path: '/', maxAge:3600});
        dispatch(setIsLoggedIn(true));
      }).catch((error)=>{
        dispatch(setIsLoggedIn(false))
      });
    }else{
      dispatch(setIsLoggedIn(false))
    }
  }

  useEffect(() => {
    checkIsLoggedIn();
  })
  
  return null;
}