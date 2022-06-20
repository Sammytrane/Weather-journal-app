
//================Global Variables==================
const appUrl='https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='&appid=0919ca9df9959fb8b6e819825ed8c791'; 
//create a new date Dynamically 
let currentDate=new Date();
let month=currentDate.getMonth()+1;
let newDate=currentDate.getDate()+'/'+month+'/'+currentDate.getFullYear();

//handle click on button 
document.addEventListener('click',performAction);


function performAction(){
    //local var :value of input and text area added by user
    const ZipCode=document.getElementById('zip').value;
    const Feelings=document.getElementById('feelings').value;

    //check if user didn't put any data in input or text area
    const p=document.getElementById("error");
    if (Feelings.length === 0 || ZipCode.length === 0 ) {
        p.style.display="block";
        return
    }
    else{
        p.style.display="none";
    }
    
    console.log(appUrl+ZipCode+apiKey +'&units=metric');
    //make a chain of promises
    Weather(appUrl,ZipCode,apiKey)
    .then((data)=>{
        console.log(data);
        //send data to server=>Add data to Post Request
        postData('/addData',{date:newDate,temp:data.main.temp,feel:Feelings})
    }).then(()=>{
         //get data from server and apdate user interface
        updateUI();
        
    })
}

//==============To Get Api Data==================
//make async function with 3 param:zip code , url , key
const Weather=async(Url, Zip,Key)=>{
    let fullLink=Url+Zip+Key+'&units=metric';
    const res= await fetch(fullLink);
    //return data into json formater 
    try{
        let data =await res.json();
        return data;
    }
    //handle error
    catch(error){
        console.log("error",error);
    }
}


//==================post data to server=================
const postData=async(url='',data={})=>{
    console.log(data);
    const response=await fetch(url,{
        method: 'POST', 
        credentials: 'same-origin', 
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    //return data into json  formate 
    try{
        const newData =await response.json();
        console.log(newData);
        return newData;
    }
    //handle error
    catch(error){
        console.log("error",error);
    }
}


//===========to get data from server and Apdate User interface============
const updateUI=async (url='')=>{
    const req= await fetch('/allData');
    //return data into json formate 
    try{
        const DataRequested =await req.json();
        console.log(DataRequested);
        //but data comes from server in ui 
        document.getElementById('date').innerHTML=`<b>Date :</b>${DataRequested['date']}`;
        document.getElementById('temp').innerHTML=`<b>Temperature :</b>${DataRequested['temp']}`;
        document.getElementById('content').innerHTML=`<b>Feel :</b>${DataRequested['feel']}`;
    }
    //handle error
    catch(error){
        console.log("error",error);
    }
}