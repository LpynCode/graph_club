import Input from "../../../../UI/Input/Input";
import {Button} from "../../../../UI/Button/Button";
import styles from './AuthForms.module.css';
import {FC, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {IRegisterUser} from "../../models/RegisterUser.interface";
import {useAppDispatch, useAppSelector} from "../../../../hooks/redux";

import {register, reset} from "../../authSlice";


const RegisterForm: FC = () => {
    const { register: registerinput, handleSubmit, formState: { errors }, reset: clearForm } = useForm<IRegisterUser>();
    const { isLoading, errorMessage, isSuccess, isAuthenticated, isError } = useAppSelector(
        (state) => state.auth
    );
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
            clearForm();
            navigate('/login')
        }
    }, [isSuccess, dispatch]);

    useEffect(() => {
        if (!isAuthenticated) return;
        navigate('/');
    }, [isAuthenticated]);

    useEffect(() => {
        dispatch(reset())
    }, [navigate])
    
    const onSubmit = async (formData: IRegisterUser) => {
        dispatch(register(formData));
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {isError && <span role="alert" className={styles.errorMessage}>{errorMessage}</span>}
            <Input
                {...registerinput('displayName', { required: { value: true, message: 'Поле обязательно для заполнения' } })}
                placeholder='Имя'
                error = {errors.displayName}
                aria-invalid={!!errors.displayName}
            />
            <Input
                {...registerinput('email', {
                    required: { value: true, message: 'Поле обязательно для заполнения' },
                    pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Неверный формат email"
                    }
                })}
                placeholder='Email'
                error = {errors.email}
                aria-invalid={!!errors.email}
            />
            <Input
                {...registerinput('password', {
                    required: { value: true, message: 'Поле обязательно для заполнения' },
                    maxLength: {value: 30, message: 'Пароль должень быть меньше 30 символов'},
                    minLength: {value: 6, message: 'Пароль должень быть больше 6 символов'}
                })}
                placeholder='Пароль'
                error = {errors.password}
                aria-invalid={!!errors.password}
                type={'password'}
            />
            <Button appearance={'primary'}>Зарегистрироваться</Button>
            <span>Уже зарегистрированны? <Link to={'/login'} >Войдите!</Link></span>
        </form>
    );
};

export default RegisterForm;