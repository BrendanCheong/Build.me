import React, {useState, useEffect} from "react";
import Navbar from "./components/Navbar";
import Home from "./pages";
import {Switch, Route} from "react-router-dom";
import User from "./pages/User";
import Builds from "./pages/Builds";
import Compare_Builds from "./pages/Compare_Builds";
import Dropdown from "./components/Dropdown";

/** 

TODO:
do 70% of the Milestone 1 submission (EASY)

TODO:
Create the rest of the tables for GPU,MOTHERBOARD etc (EASY)

TODO:
Create a REST API using AXIOS and Express + Node (HARD)

TODO:
Create a POPUP Component that Shows Data based on what was clicked in the Table (HARD)

TODO:
Create a Puppeteer.js API to Amazon and Shopee based on a Query (HARD)

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
      </Switch>
    </>
  );
}

export default App;
