import Input from "../../../../UI/Input/Input";
import {Button} from "../../../../UI/Button/Button";
import styles from './AuthForms.module.css';
import {FC, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {IRegisterForm, IRegisterSentResponse} from "./RegisterForm.interface";
import axios from "axios";

const RegisterForm: FC = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<IRegisterForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const navigate = useNavigate();
    
    const onSubmit = async (formData: IRegisterForm) => {
        try{
            const {data} = await axios.post<IRegisterSentResponse>('http://localhost:8080/auth/register', formData);
            console.log(data);
            if (data.email) {
                setError('');
                setIsSuccess(true);
                navigate('/login');
                reset();
            } else {
                setError('Что-то пошло не так');
            }
        } catch(e) {
            if(axios.isAxiosError(e) && e?.response?.data.message) {
                setError(e?.response?.data.message);
            } else {
                setError('Что-то пошло не так');
            }
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {error && <span role="alert" className={styles.errorMessage}>{error}</span>}
            <Input
                {...register('displayName', { required: { value: true, message: 'Поле обязательно для заполнения' } })}
                placeholder='Имя'
                error = {errors.displayName}
                aria-invalid={!!errors.displayName}
            />
            <Input
                {...register('email', {
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
                {...register('password', {
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