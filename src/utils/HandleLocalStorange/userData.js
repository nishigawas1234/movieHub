

export function loggedinUser(username){
    // const existingData = JSON.parse(localStorage.getItem('loggedinUser')) || undefined;
    sessionStorage.setItem('loggedinUser', JSON.stringify(username));
}

export function getLoggedinUser(){
    const users = JSON.parse(sessionStorage.getItem('loggedinUser')) || undefined;
    return users
}

export function deleteLoggedinUser(){
    sessionStorage.removeItem("loggedinUser")
}