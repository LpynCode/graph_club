import React from 'react';
import AuthLayout from "../modules/auth/components/AuthLayout/AuthLayout";
import RegisterForm from "../modules/auth/components/AuthForms/RegisterForm";

const LoginPage = () => {
    return (
        <AuthLayout>
            <RegisterForm/>
        </AuthLayout>
    );
};


export default LoginPage;