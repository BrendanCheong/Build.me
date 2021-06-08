import {useState, useEffect, useContext} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginNavbar from './components/Authentication/LoginNavbar';
import LoginDropDown from './components/Authentication/LoginDropDown';
import Compare_Builds from "./pages/Compare_Builds";
import Dropdown from "./components/Dropdown";
import CPU_Table from './components/Tables/CPU_Table';
import AuthContextData from './components/Context/AuthContext';
import Home from "./pages";
import User from "./pages/User";
import Builds from "./pages/Builds";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Public_Builds from './pages/Public_Builds';
/** 

TODO:
Create the rest of the tables for GPU,MOTHERBOARD etc (EASY)

*/


function App() {
  // React Functions go here
  const [isOpen, setIsOpen] = useState(false) // to check if Dropdown is Open or not
  const { loggedIn } = useContext(AuthContextData);
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
      {
        loggedIn.status === true ?
        [
          <Navbar toggle={toggle} key={1}/>,
          <Dropdown isOpen={isOpen} toggle={toggle} key={2}/>
        ]
        :
        [
          <LoginNavbar toggle={toggle} key={3}/>,
          <LoginDropDown isOpen={isOpen} toggle={toggle} key={4}/>
        ]
      }
      <Switch>
        <Route path="/User" exact component={User}/>
        <Route path="/Builds" exact component={Builds}/>
        <Route path="/Compare_Builds" exact component={Compare_Builds}/>
        <Route path="/CPU_Table" exact component={CPU_Table}/>
        <Route path='/' exact component={Home}/>
        <Route path="/Login" exact component={LoginPage}/>
        <Route path="/Register" exact component={RegisterPage}/>
        <Route path="/Public_Builds" exact component={Public_Builds}/>
        <Route exact path="/" render={() => (
          loggedIn.status === true ? (
            <Redirect to="/"/>
          ) : (
            <Redirect to="/Login"/>
          )

        )}/> {/** exact path? */}
      </Switch>
    </>
  );
}

export default App;
