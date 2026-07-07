import React from 'react'
import Routes from './Pages/Routes'
import "../node_modules/bootstrap/dist/js/bootstrap.bundle"
import './App.scss';  
import { useAuth } from './Context/Auth';
import ScreenLoader from './Components/Misc/ScreenLoader';
const App = () => {
  const { isAppLoading } = useAuth();

  return (
    <>
      {isAppLoading ? (
        <ScreenLoader />
      ) : (
        <Routes />
      )}
    </>
  )
}

export default App