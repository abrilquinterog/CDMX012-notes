//import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom'
import {Paths} from './components/noautenticate/Paths'
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [isAutenticate, setAutenticate]=useState(null)
  const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    setAutenticate(user)
  } else {
    setAutenticate(null)
  }
});
  return (
    <BrowserRouter><Paths isAutenticate={isAutenticate}/></BrowserRouter>
  );
}

export default App;
