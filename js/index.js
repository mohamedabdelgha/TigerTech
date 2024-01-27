// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore,collection,addDoc, onSnapshot,doc,getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3EACkyKNbRBuXxAjj1mypX9ejOCMU_I8",
    authDomain: "pyramid-website.firebaseapp.com",
    projectId: "pyramid-website",
    storageBucket: "pyramid-website.appspot.com",
    messagingSenderId: "666454103950",
    appId: "1:666454103950:web:b8c65fda68f449bd8ef6df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const docref1 = collection(db,'comments');
const docref2 = collection(db,'contacts');
const docref3 = collection(db,'projects');
const date = new Date();
// Get the components of the date
const year = date.getFullYear();
const month = date.getMonth() + 1; // Month is zero-based, so we add 1
const day = date.getDate();
// Format the date as a string
const formattedDate = `${day}/${month}/${year}`;
// messages functions ------------------------------
function confirming(textcontent){
    let warnning = document.createElement('div');
    warnning.style.cssText=`
    display: flex;
    position:fixed;
    top:30%;
    left:10%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 80%;
    height:200px;
    padding: 20px;
    color: #fff;
    font-size:10px;
    font-family: 'Cairo', sans-serif;
    background: linear-gradient(#8530d1,#a669db);
    border-radius: 10px;
    z-index:1001;
    transition:0.5s ease-in-out;
    `;
    let warntxt = document.createElement('h1')
    warntxt.innerText=textcontent;
    warnning.appendChild(warntxt);
    document.body.append(warnning);
    setTimeout(function() {
        warnning.style.opacity = '0';
        setTimeout(function() {
        warnning.style.display = 'none';
        }, 500);
    }, 2000);
}
//coments functions --------------------------------
let comname = document.getElementById('comname')
let comtext = document.getElementById('comtext')
let addcom = document.getElementById('addcom')
function addComment(){
    if(comname.value==''|| comtext.value==''){
        return alert("please enter your name and comment")
    }else{
    try {
        addDoc(docref1,{
            name:comname.value,
            comment:comtext.value,
            date:formattedDate,
        })
        comname.value='';
        comtext.value='';
        confirming('thanks for leaving a feedback');
    } catch (error) {
        console.log(error)
    }}
}
addcom.onclick=()=>{
    addComment();
}
function getcomment(){
    onSnapshot(docref1,(snapshot)=>{
        let comments=[]
        let comdiv=''
        snapshot.docs.forEach(doc=>{
            comments.push({id:doc.id,...doc.data()})
            comdiv+=`
            <div class="comcard">
                <i class="fa-regular fa-circle-user"></i>
                <div class="subcomcard">
                    <p>${doc.data().comment}</p>
                    <div>
                    <h3>${doc.data().name}</h3>
                    <p>${doc.data().date}</p>
                    </div>
                </div>
            </div>  
            `;
        })
        document.getElementById('con6').innerHTML=comdiv;
    })
}
getcomment();
// contacts functions ------------------------------
let clientname = document.getElementById('clientname')
let clientmail = document.getElementById('clientmail')
let clientphone = document.getElementById('clientphone')
let clientmass = document.getElementById('clientmass')
let sendmass = document.getElementById('sendmass')
function sendmessage(){
    if(clientmail.value==''|| clientphone.value==''|| clientmass.value==''|| clientname.value==''){
        return alert("please enter your data")
    }else{
    try {
        addDoc(docref2,{
            name:clientname.value,
            phone:clientphone.value,
            email:clientmail.value,
            message:clientmass.value,
            date:formattedDate,
        })
        clientname.value='';
        clientphone.value='';
        clientmail.value='';
        clientmass.value='';
        confirming('thanks for dealing with us ,we will reach you soon.');
    } catch (error) {
        console.log(error)
    }}
};
sendmass.onclick=()=>{
    sendmessage();
}
function getProjects (){
    onSnapshot(docref3,(snapshot)=>{
        let projects=[]
        let prodiv=''
        snapshot.docs.forEach(doc=>{
            projects.push({id:doc.id,...doc.data()})
            console.log(doc.id)
            prodiv+=`
            <div class="card" id="projectcon">
            <img data_id="${doc.id}" src="${doc.data().imagelink}" alt="${doc.data().mainimg}" id="projectimg">
            </div>
            `;
        })
        document.getElementById('prodcon').innerHTML=prodiv;
        getdetails(db);
    })
}
getProjects();
// prtofolio functions --------------------------------
function getdetails(){  
    let getbtns = document.querySelectorAll("#projectimg")
    console.log(getbtns)
    if(!getbtns || !getbtns.length) return;
    getbtns.forEach(getbtn =>{
        getbtn.addEventListener("click", async(e)=>{
            const id = e.target.getAttribute('data_id')
            console.log(id)
            const proref = doc(db,'projects',id)
            const prosnap = await getDoc(proref)
            let procarddetails = document.getElementById('procarddetails')
            procarddetails.style.opacity='1';
            procarddetails.style.display='flex';
            let prodetailsdiv='';
            prodetailsdiv+=`
            <div class="details">
                <h2 class="title"><span>project name : </span>${prosnap.data().proname}</h2>
                <h6 class="title"><span>date : </span>${prosnap.data().prodate}</h6>
                <p class="title"><span>discreption : </span>${prosnap.data().prodisc}</p>
                <a href="">see githup repo</a>
            </div>
            <iframe class="provideo"  title="this video will be avilable soon" src="${prosnap.data().prolink}" frameborder="0" allowfullscreen></iframe>
            `;
            document.getElementById('detailscard').innerHTML=prodetailsdiv;
        })
    })
}
let closecon = document.getElementById('closecon')
closecon.onclick=()=>{
    procarddetails.style.display='none';
}