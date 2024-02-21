// cookie.js

import UniversalCookie from 'universal-cookie';

const cookies = new UniversalCookie();

export const setTokenCookie = (token:string) => {
  cookies.set('token', token, { path: '/' });
};
export const setRefreshTokenCookie = (token:string) => {
  cookies.set('refreshToken', token, { path: '/' });
}
export const getRefreshTokenCookie = () => {
  return cookies.get('refreshToken');
}
export const setUserCookie=(user:any)=>{
  cookies.set('user', user, { path: '/' });
}
export const getUserCookie = () => {
  return cookies.get('user');
};
export const removeUserCookie = () => {
  return cookies.remove('user', { path: '/' });
}
export const getTokenCookie = () => {
  return cookies.get('token');
};

export const removeTokenCookie = () => {
  cookies.remove('token', { path: '/' });
};