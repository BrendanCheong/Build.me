import { useState, useContext } from "react";
import axiosInstance from "../AxiosInstance";
import { useHistory, Link } from "react-router-dom";
import AuthContextData from "../components/Context/AuthContext";
import Poster from "../images/CartoonPCparts.jpg";
import Logo from "../images/robot.svg";
import LoginInput from "../components/MaterialUI/LoginInput";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Message, setMessage] = useState("");
  const [ErrorState, setErrorState] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false)

  const { getLoggedIn } = useContext(AuthContextData);
  const history = useHistory();

  const Login = async (event) => {
    event.preventDefault(); // prevents the default loading when sending query strings

    try {
      const LoginData = {
        username,
        email,
        password,
      };
      setLoadingLogin(true)
      const response = await axiosInstance.post("/users/login", LoginData);
      console.log(response.data);

      await getLoggedIn();

      setMessage("");
      setErrorState(false);
      localStorage.setItem("username", username)
      setLoadingLogin(false)
      history.push("/");

      return response.data;
    } catch (err) {
      const response = err.response.data.Error;
      console.log(err.response.data)
      setMessage(response);
      setLoadingLogin(false)
      setErrorState(true);
    }
  };

  return (
    <div className="h-screen bg-gray-100 font-poppins">
      <div className="flex flex-wrap w-full">
        {/** Login Section */}
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
            <img
              className="w-14 h-14 lg:hidden xl:hidden md:hidden"
              alt="Logo"
              src={Logo}
            />
          </div>
          <div className="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p className="text-3xl text-center">Welcome to Build.me!</p>
            <form
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={Login}
              noValidate
              autoComplete="off"
            >
              <div className="flex flex-col pt-4">
                <LoginInput
                  label={"Username"}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  setEmail={setEmail}
                  ErrorState={ErrorState}
                  width={true}
                />
              </div>
              <div className="flex flex-col pt-4">
                <LoginInput
                  label={"Email"}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  setEmail={setEmail}
                  ErrorState={ErrorState}
                  width={true}
                />
              </div>
              <div className="flex flex-col pt-4">
                <LoginInput
                  label={"Password"}
                  setUsername={setUsername}
                  setPassword={setPassword}
                  setEmail={setEmail}
                  ErrorState={ErrorState}
                  width={true}
                />
              </div>
              {
                loadingLogin ?
                  <button
                    className="flex flex-col items-center justify-center p-2 mt-8 text-lg font-bold text-white duration-200 bg-gray-700 rounded-lg shadow-md"
                    type="submit"
                    title= "Log In"
                  >
                    <svg className="transition duration-300 delay-200 w-7 h-7 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    {/* Login */}
                  </button>
                  :
                  <button
                    className="flex flex-col items-center justify-center p-2 mt-8 text-lg font-bold text-white duration-200 bg-black rounded-lg shadow-md hover:bg-gray-700"
                    type="submit"
                    title= "Log In"
                  >
                    Login
                  </button>
              }
            </form>
            <div className="pt-5 text-center text-red-500">
              <p
              title="error_message"
              className="Error">
              {Message}
              </p>
            </div>
            <div className="pt-2 text-center">
              <p>
                {"Don't have an account? "}
                <Link
                  className="font-semibold underline duration-200 hover:text-indigo-500"
                  to="/Register"
                >
                  Register here.
                </Link>
              </p>
            </div>
            <div className="pt-5 pb-12 text-center">
              <p>
                {"Forgot Password? "}
                <Link
                  className="font-semibold underline duration-200 hover:text-indigo-500"
                  to="/ForgotPassword"
                >
                  Reset Password here
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/** Image Section */}
        <div className="w-1/2 shadow-2xl">
          <img
            className="hidden object-cover object-center w-full h-screen md:block"
            src={Poster}
            alt="Poster"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
