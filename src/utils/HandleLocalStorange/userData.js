

export function loggedinUser(username){
    // const existingData = JSON.parse(localStorage.getItem('loggedinUser')) || undefined;
    localStorage.setItem('loggedinUser', JSON.stringify(username));
}

export function getLoggedinUser(){
    const users = JSON.parse(localStorage.getItem('loggedinUser')) || undefined;
    return users
}

export function deleteLoggedinUser(){
 localStorage.removeItem("loggedinUser")
}