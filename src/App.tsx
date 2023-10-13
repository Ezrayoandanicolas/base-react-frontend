import { useEffect, useState } from 'react';
import AxiosConfig from './AxiosConfig';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider  } from 'react-helmet-async';
import Cookies from 'universal-cookie'
import './App.css'
import 'devextreme/dist/css/dx.light.css';


import MasterHomePage from './pages/homepage/MasterHomePage';
import Login from './pages/auth/Login';
import NavigationDefault from './pages/layouts/NavigationDefault';
import ReadArticle from './pages/post/ReadArticle';
import Dashboard from './pages/cms/Dashboard';
import Posts from './pages/cms/Posts';
import CreateArticle from './pages/cms/CreateArticle';
import ArticleUpdate from './pages/cms/updateArticle';
import Users from './pages/cms/Users';
import Logout from './pages/auth/Logout';

function App() {
  const cookies = new  Cookies()
  const [tokenValid, setValidationToken] = useState(true)
  const { axios, setAuthToken } = AxiosConfig

  useEffect(() => {
    async function isTokenValid() {
      setAuthToken(cookies.get('Authorization'));
    
      try {
        await axios.get('v1/auth/checkUser').then(() => {
          setValidationToken(true)
        }).catch(() => {
          cookies.remove('Authorization');
          setValidationToken(false);
        });
      } catch (error) {
        cookies.remove('Authorization');
        setValidationToken(false);
      }
    } 
    
    isTokenValid();
  }, []);

  return (
    <>
      <HelmetProvider>
        <NavigationDefault />
        <Routes>
          <Route path="/" index element={<MasterHomePage/>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/post/read/:slug" element={<ReadArticle/>} />
          
          <Route path="/cms/dashboard" element={tokenValid ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/cms/posts" element={tokenValid ? <Posts /> : <Navigate to="/login" />} />
          <Route path="/cms/posts/update/:slug" element={tokenValid ? <ArticleUpdate /> : <Navigate to="/login" />} />
          <Route path="/cms/posts/create" element={tokenValid ? <CreateArticle /> : <Navigate to="/login" />} />
          <Route path="/cms/users" element={tokenValid ? <Users /> : <Navigate to="/login" />} />
          <Route path="/cms/logout" element={tokenValid ? <Logout /> : <Navigate to="/login" />} />
        </Routes>
      </HelmetProvider>
    </>
  )
}

export default App

