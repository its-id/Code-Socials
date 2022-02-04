import { API_URLS, LOCALSTORAGE_TOKEN_KEY} from '../utils';

const customFetch = async (url, { body, ...customConfig}) => { 

    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);//once, the user logs in, we will get a token from the api.

    //we will be sending JSON and receiving JSON
    const headers = {
        'content-type': 'application/json',
        Accept: 'application/json'
    };

    //for the protected APIs
    if(token){
        headers.Authorization = `Bearer ${token}`;
    }

    const config = {
        ...customConfig,
        headers: {
            ...headers, //simply pasting the above headers
            ...customConfig.headers, //if there are some extra headers inside the customConfig, we spread it as well
        },
    }

    //if body exists in the second arg in top
    if(body){
        config.body = JSON.stringify(body); //convert to json string and pass it to our config which is going in the fetch call below.
    }

    try{
        const response = await fetch(url, config);
        const data = await response.json();

        //for all api calls, this is common
        if(data.success){
            return {
                data: data.data,
                success: true
            }
        }

        throw new Error(data.message);
    }catch(err){
        console.log('error');
        return {
            data: err.message,
            success: false
        }
    }

};

export const getPosts = (page = 1, limit = 5) => {
    return customFetch(API_URLS.posts(page, limit), {
        method: 'GET'
    });
}

const createPosts = () => {
    return customFetch();
}