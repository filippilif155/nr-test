import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {useState} from "react";

const InsertForm = ({ isUpdate, defaultValues, frontendValidation, isEditableInitial, createOrUpdatePerson,
                        removePerson }) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues,
    });
    const [isEditable, setIsEditable] = useState(isEditableInitial);

    const onSubmit = async (data) => {
        if (!isEditable && isUpdate) {
            await removePerson(data._id);
        } else {
            await createOrUpdatePerson(data);
            if (isUpdate) {
                setIsEditable(false);
            } else {
                reset();
            }
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
                <div className="form-column">
                    {isEditable ?
                        <>
                            <label htmlFor="name">Name</label>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue={defaultValues?.name || ''}
                                rules={{
                                    required: frontendValidation ? 'This field is required.' : false,
                                    minLength: frontendValidation ? { value: 2, message: 'Minimum length is 2 characters.' } : false,
                                    maxLength: frontendValidation ? { value: 100, message: 'Maximum length is 100 characters.' } : false,
                                }}
                                render={({ field }) => <InputText
                                    placeholder="Marko" {...field} className={errors.name && 'p-invalid'} />}
                            />
                            {errors.name && <small className="p-error">{errors.name.message}</small>}
                        </> :
                        <div
                            className='clickable-false-input'
                            onClick={() => setIsEditable(true)}
                        >
                            {defaultValues?.name}
                        </div>
                    }
                </div>
                <div className="form-column">
                    {isEditable ?
                        <>
                            <label htmlFor="surname">Surname</label>
                            <Controller
                                name="surname"
                                control={control}
                                defaultValue={defaultValues?.surname || ''}
                                rules={{
                                    required: frontendValidation ? 'This field is required.' : false,
                                    minLength: frontendValidation ? { value: 2, message: 'Minimum length is 2 characters.' } : false,
                                    maxLength: frontendValidation ? { value: 100, message: 'Maximum length is 100 characters.' } : false,
                                }}
                                render={({ field }) => <InputText {...field}
                                                                  placeholder="Markovic" className={errors.surname && 'p-invalid'} />}
                            />
                            {errors.surname && <small className="p-error">{errors.surname.message}</small>}
                        </> :
                        <div
                            className='clickable-false-input'
                            onClick={() => setIsEditable(true)}
                        >
                            {defaultValues?.surname}
                        </div>
                    }
                </div>
                <div className="form-column">
                    {isEditable ?
                        <>
                            <label htmlFor="address">Address</label>
                            <Controller
                                name="address"
                                control={control}
                                defaultValue={defaultValues?.address || ''}
                                rules={{
                                    required: frontendValidation ? 'This field is required.' : false,
                                }}
                                render={({field}) => <InputText {...field}
                                                                placeholder="Marka Markovica 12"
                                                                className={errors.address && 'p-invalid'}/>}
                            />
                            {errors.address && <small className="p-error">{errors.address.message}</small>}
                        </> :
                        <div
                            className='clickable-false-input'
                            onClick={() => setIsEditable(true)}
                        >
                            {defaultValues?.address}
                        </div>
                    }
                </div>
                <div className="form-column">
                    {isEditable ?
                        <>
                            <label htmlFor="city">City</label>
                            <Controller
                                name="city"
                                control={control}
                                defaultValue={defaultValues?.city || ''}
                                rules={{
                                    required: frontendValidation ? 'This field is required.' : false,
                                }}
                                render={({field}) => <InputText {...field}
                                                                placeholder="Podgorica"
                                                                className={errors.city && 'p-invalid'}/>}
                            />
                            {errors.city && <small className="p-error">{errors.city.message}</small>}
                        </> :
                        <div
                            className='clickable-false-input'
                            onClick={() => setIsEditable(true)}
                        >
                            {defaultValues?.city}
                        </div>
                    }
                </div>
                <div className="form-column">
                    {isEditable ?
                        <>
                            <label htmlFor="phone">Phone Number</label>
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue={defaultValues?.phone || ''}
                                rules={{
                                    required: frontendValidation ? 'This field is required.' : false,
                                    pattern: frontendValidation ? { value: /^\+382\d{6,9}$/, message: 'Invalid phone number.' } : false,
                                }}
                                render={({ field }) => <InputText {...field} placeholder="+38212345678" className={errors.phone && 'p-invalid'} />}
                            />
                            {errors.phone && <small className="p-error">{errors.phone.message}</small>}
                        </> :
                        <div
                            className='clickable-false-input'
                            onClick={() => setIsEditable(true)}
                        >
                            {defaultValues?.phone}
                        </div>
                    }
                </div>
                <Button label={isEditable ? (isUpdate ? 'Update' : 'Insert') : 'Remove'} className="insert-button" />
            </div>
        </form>
    );
};

export default InsertForm;