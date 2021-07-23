import {useState, useEffect, useContext} from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginNavbar from './components/Authentication/LoginNavbar';
import LoginDropDown from './components/Authentication/LoginDropDown';
import Reset from './components/ForgotPassword/Reset';
import Compare_Builds from "./pages/Compare_Builds";
import Dropdown from "./components/Dropdown";
import CPU_Table from './components/Tables/CPU_Table';
import GPU_Table from './components/Tables/GPU_Table';
import RAM_Table from './components/Tables/RAM_Table';
import Mobo_Table from './components/Tables/Mobo_Table';
import PSU_Table from './components/Tables/PSU_Table';
import Storage_Table from './components/Tables/Storage_Table';
import Confirmation from './components/Authentication/Confirmation';
import AuthContextData from './components/Context/AuthContext';
import css from "./components/BuildPageComp/css";
import Home from "./pages";
import User from "./pages/User";
import Builds from "./pages/Builds";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPassword from './pages/ForgotPassword';
import Public_Builds from './pages/Public_Builds';
import Public_CPU from "./components/Public Builds/Tables/Public_CPU";
import Public_Motherboard from "./components/Public Builds/Tables/Public_Motherboard";
import Public_GPU from "./components/Public Builds/Tables/Public_GPU";
import Public_PSU from "./components/Public Builds/Tables/Public_PSU";
import Public_Memory from "./components/Public Builds/Tables/Public_Memory";
import Public_Storage from "./components/Public Builds/Tables/Public_Storage";


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
    <div className="w-screen h-screen scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 scrollbar-thumb-rounded scrollbar-track-rounded hover:scrollbar-thumb-gray-500">
  {loggedIn.status === undefined && (<>
      <style>{css}</style>
      <div className="peeek-loading">
          <ul>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
          </ul>
      </div>
  </>)}
  {loggedIn.status === false && (
    <>
      <LoginNavbar toggle={toggle}/>
      <LoginDropDown isOpen={isOpen} toggle={toggle}/>
    </>
  )}
  {loggedIn.status === true && (
    <>
      <Navbar toggle={toggle}/>
      <Dropdown isOpen={isOpen} toggle={toggle}/>
    </>
  )}
    <Switch>
      {loggedIn.status === false && (
        <>
          
          <Route path="/Login" exact component={LoginPage}/>
          <Route path="/Register" exact component={RegisterPage}/>
          <Route path="/Public_Builds" exact component={Public_Builds}/>
          <Route path="/Public_Builds/CPU" exact component={Public_CPU}/>
          <Route path="/Public_Builds/GPU" exact component={Public_GPU}/>
          <Route path="/Public_Builds/Motherboard" exact component={Public_Motherboard}/>
          <Route path="/Public_Builds/Memory" exact component={Public_Memory}/>
          <Route path="/Public_Builds/Storage" exact component={Public_Storage}/>
          <Route path="/Public_Builds/PSU" exact component={Public_PSU}/>
          <Route path="/confirm/:token" exact component={Confirmation}/>
          <Route path="/ForgotPassword" exact component={ForgotPassword}/>
          <Route path="/reset/:token" exact component={Reset}/>
          <Route exact path="/" render={() => <Redirect to="/Login"/>}/>
        </>
      )}
      {loggedIn.status === true && (
        <>
          
          <Route path="/User" exact component={User}/>
          <Route path="/Builds" exact component={Builds}/>
          <Route path="/Compare_Builds" exact component={Compare_Builds}/>
          <Route path="/CPU_Table" exact component={CPU_Table}/>
          <Route path="/GPU_Table" exact component={GPU_Table}/>
          <Route path="/Memory_Table" exact component={RAM_Table}/>
          <Route path="/Motherboard_Table" exact component={Mobo_Table}/>
          <Route path="/PSU_Table" exact component={PSU_Table}/>
          <Route path="/Storage_Table" exact component={Storage_Table}/>
          <Route path='/' exact component={Home}/>
          <Route path="/confirm/:token" render={() => <Redirect to="/"/>}/>
          <Route path="/Login" render={() => <Redirect to="/"/>}/>
          <Route path="/Register" render={() => <Redirect to="/"/>}/>
          <Route path="/Public_Builds" render={() => <Redirect to="/"/>}/>
        </>
      )}
    </Switch>
  </div>
  );
}

export default App;


