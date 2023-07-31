import client from './client';

const request = async (method, url, data) => {
    const response = await client.request({
        method,
        url,
        data,
    });
    return response.data;
};
export const getAllPersons = async (limit, offset) => {
    const response = await client.get(`/persons?limit=${limit}&offset=${offset}`);
    return response.data;
};
export const getPersonById = (id) => request('GET', `/persons/${id}`);
export const createPerson = (personData) => request('POST', '/persons', personData);
export const updatePerson = (id, personData) => request('PUT', `/persons/${id}`, personData);
export const deletePerson = (id) => request('DELETE', `/persons/${id}`);