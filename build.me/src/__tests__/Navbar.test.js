import LoginNavbar from '../components/Authentication/LoginNavbar';
import Navbar from '../components/Navbar';
import { AuthContextFunc } from '../components/Context/AuthContext';
import {BrowserRouter} from "react-router-dom";
import { render, fireEvent, cleanup } from '@testing-library/react';

describe('Navbar functionality for authenticated and unauthenicated users', () => {

    afterEach(cleanup)

    test('Login Navbar functionality', () => {

        const { getByTitle } = render(
            <AuthContextFunc>
                <BrowserRouter base="/">
                    <LoginNavbar/>
                </BrowserRouter>
            </AuthContextFunc>
            
        )
        const Login = getByTitle('Login')
        const Register = getByTitle('Register')
        const Builds = getByTitle('Builds')
        fireEvent.click(Login);
        fireEvent.click(Register);
        fireEvent.click(Builds);
    })
    
    test('Navbar authenticated functionality', () => {
        const { getByTitle } = render(
            <AuthContextFunc>
                <BrowserRouter base="/">
                    <Navbar/>
                </BrowserRouter>
            </AuthContextFunc>
        )
        const Home = getByTitle('Home');
        const Builds = getByTitle('Builds');
        const CompareBuilds = getByTitle('Compare Builds');
        const User = getByTitle('User');

        fireEvent.click(Home);
        fireEvent.click(Builds);
        fireEvent.click(CompareBuilds);
        fireEvent.click(User);
    })
})