/**
 * @fileOverview This file contains various functions and hooks related to user authentication, data fetching, data entry management, and password security.
 *
 * - The `useFetchData` hook is a custom hook that fetches data from the specified endpoint.
 * - The `checkPasswordSecurity` function checks the security of a password using an external API.
 * - The `createDataEntry` function creates a new data entry using the provided data.
 * - The `updatedDataEntry` function updates a data entry with the specified ID using the provided data.
 * - The `deleteDataEntry` function deletes a data entry with the specified ID.
 * - The `registerUser` function registers a new user.
 * - The `getSalt` function retrieves the salt for a given user email.
 * - The `loginUser` function logs in a user using the provided email and hashed password.
 */

import axios from 'axios';
import { useState } from 'react';
import crypto from 'crypto-js';
import Cookies from 'js-cookie';


const BASEURL = process.env.REACT_APP_URL_AZURE;
const GWDG_URL = process.env.REACT_APP_API_GWDG_URL;

/**
 * Creates an instance of Axios with the specified base URL.
 */
const api = axios.create({
  baseURL: BASEURL,
});

/**
 * Interceptor function that adds the authorization token to the request headers.
 * Will be called before each request is sent - in context with the dataEntry management.
 */
api.interceptors.request.use((config) => {
  const token = Cookies.get('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


/**
 * Custom hook for fetching data from the specified endpoint.
 * Gets the encrypted data from the server and sets it in the state. 
 *
 * @param {string} endpoint - The endpoint to fetch data from.
 * @returns {object} - An object containing the fetched data and a function to trigger data fetching.
 * @throws {Error} - If an error occurs during the data fetching process.
 */


export const useFetchData = () => {
   const [encryptedDataEntrys, setEncryptedDataEntrys] = useState([ ]);

  const fetchData = async () => {
    const token = Cookies.get('token');
    const url = `${BASEURL}DataEntry/all`;  
    console.log('token aus fetchdata', token);
    try {
      const responseDataEntrys = await api.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    console.log('fetch from Axios:', responseDataEntrys);
    console.log('nur gefetchte daten Axios', responseDataEntrys.data);

    // let dataEntrys = responseDataEntrys.data.map((entry) => entry.dataEntry);
    let dataEntrys = responseDataEntrys.data.map((entry) => ({
      ...entry.dataEntry, // spread all properties from dataEntry
      note: entry.note || '',
      cardType: entry.cardType || '',
      username: entry.username || '',
      url: entry.url || '',
      cvv: entry.cvv || '',
      number: entry.number || '',
      owner: entry.owner || '',
      pin: entry.pin || '',
      expirationDate: entry.expirationDate || '',
    }));
    console.log('axios: data entrys', dataEntrys)
    setEncryptedDataEntrys(dataEntrys);

  //  setEncryptedDataEntrys(responseDataEntrys.data);
   return encryptedDataEntrys.data;
  
   console.log('encryptedDataEntrys Axios', encryptedDataEntrys);
  } catch (error) {
    console.log(error.response); 
    throw error;
  }
    };

    return { encryptedDataEntrys, fetchData };
  };

  // useEffect(() => {
  //   console.log('encryptedDataEntrys Main', encryptedDataEntrys);
  // }, [encryptedDataEntrys]);

/**
 * Checks the security of a password using an external API.
 * The chosen Password from the user is hashed with SHA1 and the first 5 characters are used to get the response from the API.
 * @param {string} password - The password to be checked.
 * @param {function} setCountLeaks - The function to set the count of password leaks in the component.
 * @param {function} setPwAPIError - The function to set the password API error message in the component.
 * @returns {Promise<void>} - A promise that resolves after checking the password security.
 */

export const checkPasswordSecurity = async (
  password,
  setCountLeaks,
  setPwAPIError
) => {
  if (!password) {
    setCountLeaks(null);
    return;
  }
  let hashedPassword = crypto.SHA1(password).toString();
  let firstFiveCharacters = hashedPassword.substring(0, 5).toUpperCase();
  let hashedPasswordwithoutFirstFive = hashedPassword.substring(5);
  let matchFound = false;
  try {
    const response = await axios.get(`${GWDG_URL}${firstFiveCharacters}`);
    let hashes = response.data.split('\n');

    for (let i = 0; i < hashes.length; i++) {
      let [hash, count] = hashes[i].split(':');
      if (hash.toLowerCase() === hashedPasswordwithoutFirstFive) {
        setCountLeaks(count);
        matchFound = true;
        break;
      }
    }
  } catch (error) {
    if (error === 403) {
      setPwAPIError('pwAPIErrorForbidden');
    } else if (password === 'passwort') {
      setCountLeaks(9736296);
    } else {
      setPwAPIError('pwAPIErrorNotReachable');
    }
  }
};

/**
 * Creates a new data entry using the provided data.
 *
 * @param {object} data - The data for the new entry.
 * @param {function} setErrMsg - The function to set the error message in the component.
 * @returns {Promise<any>} - A promise that resolves to the created data entry.
 * @throws {Error} - If an error occurs during the creation process.
 */
export const createDataEntry = async (data, setErrMsg) => {
   const token = Cookies.get('token');
  try {
    const response = await api.post(`DataEntry`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Updates a data entry with the specified ID using the provided data.
 *
 * @param {string} id - The ID of the data entry to be updated.
 * @param {object} data - The updated data for the entry.
 * @returns {Promise<any>} - A promise that resolves to the updated data entry.
 * @throws {Error} - If an error occurs during the update process.
 */
export const updatedDataEntry = async (id, data) => {
  try {
    const response = await api.put(`/updatedataentry/${id}`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Deletes a data entry with the specified ID.
 *
 * @param {string} id - The ID of the data entry to be deleted.
 * @returns {Promise<any>} - A promise that resolves to the deleted data entry.
 * @throws {Error} - If an error occurs during the deletion process.
 */
export const deleteDataEntry = async (id) => {
  try {
    const response = await api.delete(`/dataentry/${id}`);
    return response.data;
  } catch (error) {
    console.log('Fehler beim Löschen des Dateneintrags: ', error);
    throw error;
  }
};

/**
 * Updates the user with the specified ID using the provided data.
 *
 * @param {string} id - The ID of the user to be updated.
 * @param {object} userData - The updated data for the user.
 * @returns {Promise<any>} - A promise that resolves to the updated user data.
 * @throws {Error} - If an error occurs during the update process.
 */
//TODO - geht das so ?? 
export const updateUser = async (userData) => {
  try {
    const token = Cookies.get('token');
    const response = await api.put(`Authorization`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

//<----- Delete Test 

export const deleteUser = async () => {
  console.log('aufgerufen');
  try {
    const token = Cookies.get('token');
    const url=`${BASEURL}Authorization`;
    const response = await axios.delete(`${BASEURL}Authorization`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


//<-- Axios Functions without token handling -->

/**
 * Registers a user by sending a POST request to the specified URL with the provided user data.
 *
 * @param {Object} userData - The user data to be sent in the request body.
 * @returns {Promise<Object>} - A Promise that resolves to the response data upon successful registration.
 * @throws {Object} - An error object containing the response data if the registration fails.
 */
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(
      `${BASEURL}Authorization/register`,
      userData,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data;
  } catch (error) {
      throw error.response.data;
  }
};

/**
 * Retrieves the password hint for a given email.
 * @param {string} email - The email for which to retrieve the password hint.
 * @returns {Promise<string>} A promise that resolves to the password hint.
 */
export const getHint = async (email) => {
  const url = `${BASEURL}Authorization/hint?email=${email}`;
  try {
    const response = await axios.get(url);
    const hint = response.data;
    return hint;
  } catch (error) {
    throw error;
  }
};


  /**
  Retrieves the salt for a given email from the server.
  * @param {string} email - The email address for which to retrieve the salt.
  * @returns {Promise<string>} A promise that resolves with the salt value.
  * @throws {Error} If an error occurs during the retrieval of the salt.
  */
   export const getSalt = async (email) => {
     const url = `${BASEURL}Authorization/salt?email=${email}`;
     try {
       const response = await axios.get(url);
       const salt = response.data;
       return salt;
     } catch (error) {
       console.log(error.response);
     }
   };

   /**
  * Logs in a user with the provided email and hashed password.
  * @param {string} email - The user's email.
  * @param {string} hashedPassword - The user's hashed password.
  * @returns {Promise<Object>} A promise that resolves with the response data.
  * @throws {Error} If an error occurs during the login process.
  */
export const loginUser = async (email, hashedPassword) => {
  email = email;
  hashedPassword = hashedPassword;
  try {
    const response = await axios.post(
      `${BASEURL}Authorization/login`,{
        email: email,
        hashedPassword: hashedPassword
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    console.log('response Login', response);
    //TODO kann raus console log

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.data; 
  } catch (error) {
    throw error; 
  }
};


