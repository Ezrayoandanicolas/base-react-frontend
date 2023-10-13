import { useEffect } from 'react';
import AxiosConfig from '../../AxiosConfig';
import Cookies from 'universal-cookie';

const { axios, setAuthToken } = AxiosConfig;

const Logout = () => {
  useEffect(() => {
    const cookies = new Cookies()
    setAuthToken(cookies.get('Authorization'));

    axios.post('v1/auth/logout')
      .then(() => {
        // Handle successful logout, e.g., remove user data and token from local storage
        cookies.remove('Authorization')
        window.location.href = '/login';
        // Redirect the user to the login page or another appropriate page
        // You can use a library like react-router-dom for navigation
      })
      .catch((error) => {
        // Handle any errors that occur during the logout process
        console.error('Logout error:', error);
      });
  })

  return (
    <>
        <div>Logout</div>
    </>
  );
};

export default Logout;
