export * from './constants';

export const setItemInLocalStorage = (key, value) => {
    if(!key || !value){
        return console.error('Can not store in LS');
    }

    const valueToStore = typeof value !== "string" ? JSON.stringify(value): value;

    localStorage.setItem(key, valueToStore);
}

export const gettItemFromLocalStorage = (key) => {
    if(!key){
        return console.error('Can not get the value from LS');
    }

    return localStorage.getItem(key);   
}

export const removeItemLocalStorage = (key) => {
    if(!key){
        return console.error('Can not remove from LS');
    }

    localStorage.removeItem(key);
}

// {username: 'aakash', password: '123123}
export const getFormBody = (params) => {

    let formBody = [];

    for(let property in params){
        let encodedKey = encodeURIComponent(property); // 'user name' => 'user%20name'
        let encodedValue = encodeURIComponent(params[property]); //aakash 123 => aakash%202013

        formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&'); //username=akash&password=123213
}