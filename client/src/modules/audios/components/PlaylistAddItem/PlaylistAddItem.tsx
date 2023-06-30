import React, {useState} from 'react';
import styles from "./PlaylistAddItem.module.css"
import Card from "../../../../UI/Card/Card";
import {Dialog} from "@headlessui/react";
import Input from "../../../../UI/Input/Input";
import {Button} from "../../../../UI/Button/Button";
import {useForm} from "react-hook-form";
import {CreatePlaylist} from "../../models/CreatePlaylist";
import {useAppDispatch} from "../../../../hooks/redux";
import {createPlaylist} from "../../audiosSlice";

const PlaylistAddItem = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const {register, handleSubmit, formState: { errors }} = useForm<CreatePlaylist>();
    const dispatch = useAppDispatch();

    const onSubmit = (data: CreatePlaylist) => {
        dispatch(createPlaylist(data));
    }

    return (
        <div>
            <Card className={styles.card} appearance={'ghost'} onClick={() => setIsOpen(true)}>
                +
            </Card>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <div className={styles.popup_bg}>
                    <Dialog.Panel className={styles.popup}>
                        <Dialog.Title>Добавить плейлист</Dialog.Title>
                        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                            <div className={styles.inputs}>
                                <Input
                                    {...register('name', {
                                        required: {value: true, message: 'Поле обязательно для заполнения'},
                                    })}
                                    placeholder='Введите имя'
                                    error={errors.name}
                                    aria-invalid={!!errors.name}
                                />
                                <Input type={'text'} placeholder={'Введите описание'} {...register('description')}/>
                            </div>
                            <Button appearance={'primary'}>Добавить</Button>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default PlaylistAddItem;