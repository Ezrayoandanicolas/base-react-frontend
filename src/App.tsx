import { Routes, Route } from 'react-router-dom';
import { HelmetProvider  } from 'react-helmet-async';
import './App.css'
import MasterHomePage from './pages/homepage/MasterHomePage';
import NavigationDefault from './pages/layouts/NavigationDefault';

function App() {
  return (
    <>
      <HelmetProvider>
        <NavigationDefault />
        <Routes>
          <Route path="/" index element={<MasterHomePage/>}></Route>
        </Routes>
      </HelmetProvider>
    </>
  )
}

export default App
