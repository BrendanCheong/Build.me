import React, {useState, useEffect} from "react";
import Navbar from "./components/Navbar";
import Home from "./pages";
import {Switch, Route} from "react-router-dom";
import User from "./pages/User";
import Builds from "./pages/Builds";
import Compare_Builds from "./pages/Compare_Builds";
import Dropdown from "./components/Dropdown";
import CPU_Table from './components/Tables/CPU_Table';
/** 

TODO:
Create the rest of the tables for GPU,MOTHERBOARD etc (EASY)

*/


function App() {
  // React Functions go here
  const [isOpen, setIsOpen] = useState(false) // to check if Dropdown is Open or not
  const toggle = () => { // link is Open to a toggle
    setIsOpen(!isOpen)
  }
  useEffect(() => {
  const hideMenu = () => { //activate hideMenu effect, which listens using eventlistener
      if (window.innerwidth > 768 && isOpen) {
        setIsOpen(false)
        console.log("resize successful")
      }
    }
    window.addEventListener('resize',hideMenu)
    return () => {
      window.removeEventListener('resize', hideMenu)
    }
  });

  // start of the styling of App.js
  return (
    <>
      <Navbar toggle={toggle}/>
      <Dropdown isOpen={isOpen} toggle={toggle}/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/User" exact component={User}/>
        <Route path="/Builds" exact component={Builds}/>
        <Route path="/Compare_Builds" exact component={Compare_Builds}/>
        <Route path="/CPU_Table" exact component={CPU_Table}/>
      </Switch>
    </>
  );
}

export default App;
