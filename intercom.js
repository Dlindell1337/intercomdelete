import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();


const url = "https://api.intercom.io/contacts"
const token = process.env.token


/* Curl Request to get contact list:
curl https://api.intercom.io/contacts \
-H 'Authorization:Bearer <Your access token>' \
-H 'Accept:application/json'
*/

const options = {
  
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`
    
  },
  
};

//First reque
async function deleteContacts () {
  
 const userArray = [];
 const listEmail = [];
 let querystring = '';

 const firstRequest = await fetch(url + '?per_page=5', options)
  .then(res => res.json() )
  .then(data => {
    
    for (let i = 0; data.data.length > i; i++ ){
      if (!data.data[i].email.toLowerCase().includes("upsales")){
         if(data.data[i].last_contacted_at === null){
      userArray.push(data.data[i].id);
      listEmail.push(data.data[i].email);

         };
       };
    };
    querystring += data.pages.next.starting_after;
    
    
  });

  const paginationrequest  = await fetch(url + '?' + querystring, options)
  .then(res => res.json() )
  .then(data => {
    
    for (let i = 0; data.data.length > i; i++ ){
      if (!data.data[i].email.toLowerCase().includes("upsales")){
         if(data.data[i].last_contacted_at === null){
      userArray.push(data.data[i].id);
      listEmail.push(data.data[i].email);
         };
      };
    };
    
  });

//lista userID och dess mail i två separata variabler, använder userArray i deleterequest nedan

 console.log(userArray);
 console.log(listEmail);


  for (let i = 0; userArray.length > i; i++){

  await fetch(url + '/' + userArray[i], {
    method: "DELETE",
    headers: {
         Accept: 'application/json',
         Authorization: `Bearer ${token}`, 
    }   
    }).
    then(res => res.json()).then(data => console.log(data)).catch(error => {
      
      console.log(userArray[i])
      console.log(error)})
  }
  
}

setInterval(() => deleteContacts(), 8000)








