import axios from 'axios';
import { useState } from 'react';

const BASEURL = process.env.REACT_APP_URL_AZURE;

export const useFetchData = (endpoint) => {
   const [encryptedDataEntrys, setEncryptedDataEntrys] = useState([
     {
       id: 1,
       category: 'safenote',
       favourite: 'U2FsdGVkX18JeVi+/9NItFcbaE1s7VfCvF8AavldEpQ=',
       subject: 'U2FsdGVkX1/J8fhuDyrXdgeEM5EddFV3QWhIxcNvHIA=',
       username: null,
       password: null,
       url: null,
       comment: 'U2FsdGVkX1+pqjIDQTe9CqplgzTKRWb5jiZskXEo7yQ=',
       note: 'U2FsdGVkX18QeD4v+wKcpez15qu5PGPYAuHxHPj4CDY=',
       pin: null,
       cardnumber: null,
       expirationdate: null,
       owner: null,
       cvv: null,
       cardtype: null,
       customTopics:
         'U2FsdGVkX1+gvvSOvPf0OyxqGJzBovTwKJOaSvtoeUlru3etwsqJqwfuXwEd2jzFqTo2cHr7k+ocffu3pwGK9Aegfyuowh1BZCJCthBBsHE=',
     },
     {
       id: 2,
       category: 'login',
       favourite: 'U2FsdGVkX1+v/80qP63ofHNcmwQRBCjUlrNZGU4KeXg=',
       subject: 'U2FsdGVkX18xPwWQ8gcBVTfrNIqew3gleL6mXZ6j/vU=',
       username: 'U2FsdGVkX19EbnKkx7F5aJiIlekDH7/t9A/0jq17bWo=',
       password: 'U2FsdGVkX1+A3Mrvj2bgvmQlCfJUP+cu/KxJP5bjbQo=',
       url: 'U2FsdGVkX19Kfr0Y/GI+/K4bfFkIXKEEUCUkv2aWDyhcFjYRa0fOT7cnKz7xjda4',
       comment: 'U2FsdGVkX1/OrSBJwcG8LJnyln1SbIZQ3kAABeF9EC4=',
       note: 'U2FsdGVkX18akreAJnn3WmwIbB81SB6Ls4dcg7KB5Tw=',
       pin: null,
       cardnumber: null,
       expirationdate: null,
       owner: null,
       cvv: null,
       cardtype: null,
       customTopics: 'U2FsdGVkX1+qCSFziUGkSTDcN41CrVr9t+z1N+jAhT8=',
     },
     {
       id: 3,
       category: 'paymentcard',
       favourite: 'U2FsdGVkX1+glZg4fz2VKnw+gUUfmwHx4QmMZrhNx/0=',
       subject: 'U2FsdGVkX19lkWEQPOTicff+h8cdct+xuuTvnEYjVys=',
       username: null,
       password: null,
       url: null,
       comment:
         'U2FsdGVkX19OWmc6i+PQhVBRJOyop1kOwL44cUNfdOKlx8x+sMOtjh4jIX95OjlF',
       note: null,
       pin: 'U2FsdGVkX1/qoJ4GyHzwD68P2zYjJ2L52SfNd1LoS3c=',
       cardnumber: 'U2FsdGVkX19N4uTYyioYuopqms8KZD005bjCWIaAQ7s=',
       expirationdate: 'U2FsdGVkX1+EUA7JOM/g81GRMFBCWWHOTg06V0nqPco=',
       owner: 'U2FsdGVkX1/tWOoXzKHqjpMIgRucyblMlRape8taIrI=',
       cvv: 'U2FsdGVkX19pNrirpKFkshYKlIgXRM04BJG2LBLJ9p0=',
       cardtype: 'U2FsdGVkX18U2YhSCSjj9HhueNW2ctCAOF4R9Em3sgY=',
       customTopics:
         'U2FsdGVkX1+R6iSZISqSX7nT8ejhBAvkAl5n/CT7Rx5IPSrhuh327gGazUUIaG5/jAXExjn7M3tC7GeJBssem3BQ54vqgpo8QIxGLscz3DkFd/W1GhZvCybn0R6KVsdf',
     },
   ]);

  const fetchData = async () => {
    const url = `${BASEURL}/${endpoint}`;

    try {
      const responseDataEntrys = await axios.get(url);
      console.log('fetch from main side:', responseDataEntrys);
      console.log('nur gefetchte daten', responseDataEntrys.data);
    //   setEncryptedDataEntrys(responseDataEntrys.data);
    } catch (error) {
      console.log(error.response);
      throw error;
    }
  };
  
  return { encryptedDataEntrys, fetchData, };
};

  export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${BASEURL}/login`, {
        email: email,
        password: password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  };
