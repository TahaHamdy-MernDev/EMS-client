import Cookies from 'js-cookie';

export const setAccessToken = (accessToken: string) => {
  Cookies.set('accessToken', accessToken); 
  // Cookies.set('accessToken', accessToken, {expires: 1/96 }); // 15 minutes
};

export const getAccessToken = () => {
  return Cookies.get('accessToken');
};

export const removeAccessToken = () => {
  Cookies.remove('accessToken');
};
