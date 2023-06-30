import {FC, useEffect, useState} from 'react';
import Input from "../../../../UI/Input/Input";
import {Button} from "../../../../UI/Button/Button";
import styles from './AuthForms.module.css';
import {Link, useNavigate} from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import {ILoginUser} from "../../models/LoginUser.interface";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";
import {login, reset} from "../../authSlice";

const LoginForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, reset: clearForm } = useForm<ILoginUser>();

    const dispatch = useAppDispatch();

    const { errorMessage, isSuccess, isAuthenticated, isError } = useAppSelector(
        (state) => state.auth
    );

    const navigate = useNavigate();
    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            clearForm();
        }
    }, [isSuccess, dispatch]);

    useEffect(() => {
        dispatch(reset())
    }, [navigate])

    useEffect(() => {
        if (!isAuthenticated) return;
        navigate('/');
    }, [isAuthenticated, navigate]);
    
    const onSubmit = async (formData: ILoginUser) => {
        dispatch(login(formData));
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {isError && <span role="alert" className={styles.errorMessage}>{errorMessage}</span>}
            <Input
                {...register('email', {
                    required: {value: true, message: 'Поле обязательно для заполнения'},
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Неверный формат email"
                    }
                })}
                placeholder='Email'
                error={errors.email}
                aria-invalid={!!errors.email}
            />
            <Input
                {...register('password', {
                    required: {value: true, message: 'Поле обязательно для заполнения'},
                })}
                placeholder='Пароль'
                error={errors.password}
                aria-invalid={!!errors.password}
                type={'password'}
            />
            <Button appearance={'primary'}>Войти</Button>
            <span>Еще нет аккаунта? <Link to={'/register'}>Зарегистрируйтесь!</Link></span>
        </form>

    );
};

export default LoginForm;