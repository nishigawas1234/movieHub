

export function loggedinUser(username){
    sessionStorage.setItem('loggedinUser', JSON.stringify(username));
}

export function getLoggedinUser(){
    const users = JSON.parse(sessionStorage.getItem('loggedinUser')) || undefined;
    return users
}

export function deleteLoggedinUser(){
    sessionStorage.removeItem("loggedinUser")
}