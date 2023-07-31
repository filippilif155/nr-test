import {useState, useRef, useEffect} from 'react';
import { Toast } from 'primereact/toast';

import InsertForm from '../components/InsertForm';
import SwitchButton from '../components/SwitchButton';
import Pagination from '../components/Pagination';

import {getAllPersons, createPerson, updatePerson, deletePerson} from '../api/persons';

const Person = () => {
    const [frontendValidation, setFrontendValidation] = useState(true);
    const [persons, setPersons] = useState([]);
    const [offset, setOffset] = useState(0);
    const [totalPersons, setTotalPersons] = useState(0);
    const limit = 5;

    const toastRef = useRef(null);
    const fetchPersons = async (deletedPersons=0) => {
        try {
            if (offset !== 0 && offset >= (totalPersons - deletedPersons)) {
                setOffset(totalPersons - limit);
            }
            const data = await getAllPersons(limit, offset);
            setPersons(data.persons);
            setOffset(data.offset)
            setTotalPersons(data.totalCount)
        } catch (error) {
            toastRef.current.show({ severity: 'error', summary: error.message, detail: 'Something went wrong.' });
        }
    }

    const createOrUpdatePerson = async (data) => {
        try {
            if (data._id) {
                await updatePerson(data._id, data);
                toastRef.current.show({ severity: 'success', summary: 'Person updated.',
                    detail: 'Operation completed successfully.' });
            } else {
                await createPerson(data);
                toastRef.current.show({ severity: 'success', summary: 'Person created.',
                    detail: 'Operation completed successfully.' });
            }
            fetchPersons();
        } catch (error) {
            if (error.response?.data?.message) {
                error.message = error.response.data.message;
            }
            toastRef.current.show({ severity: 'error', summary: error.message, detail: 'Something went wrong.' });
        }
    }

    const removePerson = async (id) => {
        try {
            await deletePerson(id);
            toastRef.current.show({ severity: 'success', summary: 'Person deleted.',
                detail: 'Operation completed successfully.' });
            fetchPersons(1);
        } catch (error) {
            if (error.response?.data?.message) {
                error.message = error.response.data.message;
            }
            toastRef.current.show({ severity: 'error', summary: error.message, detail: 'Something went wrong.' });
        }
    }

    const handlePaginationChange = (newOffset) => {
        setOffset(newOffset);
    };

    useEffect(() => {
        fetchPersons();
    }, [offset]);

    return (
        <div className="person-container">
            <SwitchButton checked={frontendValidation} onChange={() => setFrontendValidation((prevState) => !prevState)} />
            <div className="insert-form-container">
                <InsertForm
                    isUpdate={false}
                    frontendValidation={frontendValidation}
                    isEditableInitial={true}
                    createOrUpdatePerson={createOrUpdatePerson}
                />
            </div>
            <div className="insert-form-container">
                {persons?.length && persons.map((person) => (
                    <InsertForm
                        key={person._id}
                        isUpdate={true}
                        defaultValues={person}
                        frontendValidation={frontendValidation}
                        isEditableInitial={false}
                        createOrUpdatePerson={createOrUpdatePerson}
                        removePerson={removePerson}
                    />
                ))
                }
            </div>
            <Pagination
                offset={offset}
                limit={limit}
                totalCount={totalPersons}
                onChange={handlePaginationChange}
            />
            <Toast ref={toastRef} />
        </div>
    );
};

export default Person;