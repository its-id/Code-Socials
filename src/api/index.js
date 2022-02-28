import { API_URLS, getFormBody, LOCALSTORAGE_TOKEN_KEY} from '../utils';

const customFetch = async (url, { body, ...customConfig}) => { 

    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);//once, the user logs in, we will get a token from the api.

    //we will be sending JSON and receiving JSON
    const headers = {
        'content-type': 'application/x-www-form-urlencoded',
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
        config.body = getFormBody(body);
        // config.body = JSON.stringify(body); //convert to json string and pass it to our config which is going in the fetch call below.
    }

    try{
        const response = await fetch(url, config);
        const data = await response.json();

        // console.log("data inside API: ", data);
        //for all api calls, this is common
        if(data.success){
            return {
                data: data.data,
                success: true
            }
        }

        throw new Error(data.message);
    }catch(err){
        // console.log('error: ', err);
        // console.log('Error Message: ', err.message)
        return {
            message: err.message,
            success: false
        }
    }

};

export const getPosts = (page = 1, limit = 5) => {
    return customFetch(API_URLS.posts(page, limit), {
        method: 'GET'
    });
}

export const login = (email, password) => {
    return customFetch(API_URLS.login(), {
        method: 'POST',
        body: {email, password}
    });
}

export const register = async (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { name, email, password, confirm_password: confirmPassword },
  });
};

export const editProfile = async (userId, name, password, confirmPassword) => {
    return customFetch(API_URLS.editUser(), {
        method: 'POST',
        body: {id: userId, name, password, confirm_password: confirmPassword}
    });
}


export const fetchUserProfile = (userId) => {
    return customFetch(API_URLS.userInfo(userId), {
        method: 'GET',
    });
}

export const fetchUserFriends = () => {
    return customFetch(API_URLS.friends(), {
        method: 'GET',
    });
}

export const addFriend = (userId) => {
    return customFetch(API_URLS.createFriendship(userId), {
        method: 'POST',
    });
}

export const removeFriendship = (userId) => {
    return customFetch(API_URLS.removeFriend(userId), {
        method: 'POST',
    });
}

export const addPost = (content) => {
    return customFetch(API_URLS.createPost(), {
        method: 'POST',
        body: {
            content, //passing content as the key
        }
    });
}

export const addComment = async (content, postId) => {
    return customFetch(API_URLS.comment(), {
        method: 'POST',
        body: {
            post_id: postId,
            content, //passing content as the key
        }
    });
}