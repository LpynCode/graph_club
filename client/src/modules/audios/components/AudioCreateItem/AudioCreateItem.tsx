import React, {DetailedHTMLProps, HTMLAttributes, useState} from 'react';
import styles from './AudioCreateItem.module.css'
import {Button} from "../../../../UI/Button/Button";
import {Dialog} from "@headlessui/react";
import {useForm} from "react-hook-form";
import Input from "../../../../UI/Input/Input";
import {CreateAudioForm} from "../../models/CreateAudioForm.interface";
import {useAppDispatch} from "../../../../hooks/redux";
import {createAudio} from "../../audiosSlice";

const AudioCreateItem = ({...props}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {register, formState: {errors}, handleSubmit} = useForm<CreateAudioForm>();
    const dispatch = useAppDispatch();


    const onSubmit = (data: CreateAudioForm) => {
        const file = data.audio[0];
        dispatch(createAudio({...data, audio: file}));
    }

    return (
        <>
            <Button appearance={'ghost'} onClick={() => setIsOpen(true)} {...props}>Загрузить аудиозапись</Button>
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <div className={styles.popup_bg}>
                    <Dialog.Panel className={styles.popup}>
                        <Dialog.Title>Загрузить аудиозапись</Dialog.Title>

                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                            <div className={styles.inputs}>
                                <Input type={'text'} placeholder={'Введите имя'} aria-invalid={!!errors.name} error={errors.name}
                                    {...register('name', {required: {value: 'true', message: 'Поле обязательно для заполнения'}})
                                }/>
                                <Input onChange={() => {alert('hello')}} type={'file'} accept={'audio/*'} placeholder={'Выберите файл'} aria-invalid={!!errors.audio} error={errors.audio}
                                    {...register('audio', {required: {value: 'true', message: 'Поле обязательно для заполнения'}})
                                }/>
                            </div>
                            <Button appearance={'primary'}>Добавить</Button>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    );
};

export default AudioCreateItem;