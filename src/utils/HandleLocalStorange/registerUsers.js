

export function registerUser(username){
    const existingData = JSON.parse(localStorage.getItem('registerUsers')) || [];
    existingData.push(username);
    localStorage.setItem('registerUsers', JSON.stringify(existingData));
}

export function getResigerUsers(){
    const users = JSON.parse(localStorage.getItem('registerUsers')) || [];
    return users
}