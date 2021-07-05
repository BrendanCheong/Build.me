import { render, fireEvent, cleanup } from '@testing-library/react';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { AuthContextFunc } from '../components/Context/AuthContext';
import {BrowserRouter} from "react-router-dom";

describe('Authentication Pages functionality',() => {
    
    afterEach(cleanup);

    test("Login Page Functionality", async () => {

        const { getByLabelText} = render (
            <AuthContextFunc>
                <BrowserRouter basename='/'>
                    <LoginPage/>
                </BrowserRouter>
            </AuthContextFunc>
        )

        const EmailInput = getByLabelText('Email');
        const UsernameInput = getByLabelText('Username');
        const PasswordInput = getByLabelText('Password');
        fireEvent.change(EmailInput, {target: { value: "Test"}});
        fireEvent.change(UsernameInput, {target: { value: "Test"}});
        fireEvent.change(PasswordInput, {target: { value: "Test"}});

        expect(getByLabelText("Email")).toHaveValue("Test");
        expect(getByLabelText("Username")).toHaveValue("Test");
        expect(getByLabelText("Password")).toHaveValue("Test");

    })

    test("Register Page functionality", () => {

        const { getByLabelText } = render (
            <AuthContextFunc>
                <BrowserRouter basename='/'>
                        <RegisterPage/>
                </BrowserRouter>
            </AuthContextFunc>
        )

        const EmailInput = getByLabelText('Email');
        const UsernameInput = getByLabelText('Username');
        const PasswordInput = getByLabelText('Password');
        const ConfirmPassword = getByLabelText('Confirm Password');
        fireEvent.change(EmailInput, {target: { value: "Test"}});
        fireEvent.change(UsernameInput, {target: { value: "Test"}});
        fireEvent.change(PasswordInput, {target: { value: "Test"}});
        fireEvent.change(ConfirmPassword, {target: { value: "Test"}});

        expect(EmailInput).toHaveValue('Test');
        expect(UsernameInput).toHaveValue('Test');
        expect(PasswordInput).toHaveValue('Test');
        expect(ConfirmPassword).toHaveValue('Test');

    })

})