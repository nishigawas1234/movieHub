

export function addUpdateWatchListData(email, numbers) {
  const existingData = JSON.parse(localStorage.getItem('watchlistData')) || {};
  existingData[email] = numbers;
  localStorage.setItem('watchlistData', JSON.stringify(existingData));
}


export function getWatchListData(){
 const data = JSON.parse(localStorage.getItem("watchlistData")) || [];
  return data
}

export function deleteWatchListData(email) {
  const existingData = JSON.parse(localStorage.getItem('watchlistData')) || {};
  delete existingData[email];
  localStorage.setItem('data', JSON.stringify(existingData));
}
