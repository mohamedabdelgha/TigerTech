// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore,collection,updateDoc, onSnapshot,doc,getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
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
const docref4 = collection(db,'blogs');
const date = new Date();
// Get the components of the date
const year = date.getFullYear();
const month = date.getMonth() + 1; // Month is zero-based, so we add 1
const day = date.getDate();
// Format the date as a string
const formattedDate = `${day}/${month}/${year}`;
//up btn function ----------------------------------------------------------------------------------------------------------------
const upbtn=document.getElementById("upbtn");
const header=document.querySelector("header");
upbtn.onclick=()=>{
    scroll(0,0)
}
window.onscroll=function(){
    if(scrollY>400){
        upbtn.style.display="flex";
        header.classList.add("fixed")
    }else{
        upbtn.style.display="none";
        header.classList.remove("fixed")
    }
}
const cursor = document.querySelectorAll( "#cursor" );
const theme_toggle = document.querySelectorAll( "#theme-toggle" );
const bgcolor = document.querySelectorAll( ".bgcolor" );
const txtcolor = document.querySelectorAll( ".txtcolor" );
const sec_text = document.querySelector( ".sec-text" );
cursor.forEach((item)=>{
    item.onclick=()=>{
        // theme_toggle.classList.toggle('selected')
        theme_toggle.forEach((i)=> { i.classList.toggle('selected'); }) 
        bgcolor.forEach((i)=> { i.classList.toggle('dark'); }) 
        txtcolor.forEach((i)=> { i.classList.toggle('dark'); }) 
        sec_text.classList.toggle('dark');
        rocket.style.display = rocket.style.display === 'none' ? 'block':'none';
    }
})
//get Blogs function ----------------------------------------------------------------------------------------------------------
function getBlogs (){
    onSnapshot(docref4,(snapshot)=>{
        let Blogs=[]
        let prodiv=''
        snapshot.docs.forEach(doc=>{
            Blogs.push({id:doc.id,...doc.data()})
            prodiv+=`
            <div class="blog txtcolor">
            <div class="bloghead">
                <img src="img/santalogo.png" alt="image">
                <div>
                    <h1>title : ${doc.data().blogtitle}</h1>
                    <h4>${doc.data().blogdate}</h4>
                </div>
                <h3>published by : ${doc.data().blogpublisher} </h3>
            </div>
            <div class="blogcontent">
                <p>${doc.data().blogcontent}</p>
            </div>
            <div class="bordercon">
                <div class="blogsources">
                    <h3>resources : </h3>
                    <p>${doc.data().blogsource}</p>
                </div>
                <div class="blogreact">
                    <div>
                    <i class="fa-solid fa-thumbs-up" id="like" data_id = "${doc.id}"></i>
                    <span id="likes_tot">${doc.data().likes}</span>
                    </div>
                    <div>
                        <i class="fa-solid fa-thumbs-down" id="dislike" data_id = "${doc.id}"></i>
                        <span id="dislikes_tot">${doc.data().dislikes}</span>
                    </div>
                </div>
            </div>
        </div>
            `;
        })
        document.getElementById('home').innerHTML=prodiv;
        bloglikes(db);
        blogdislikes(db);
    })
}
getBlogs();
function bloglikes(){
    let likesum=0;
    let likebtns = document.querySelectorAll("#like")
    if(!likebtns || !likebtns.length) return;
    likebtns.forEach(btnpro =>{
        btnpro.addEventListener("click", async(e)=>{
            const id=e.target.getAttribute('data_id');
            const docref = doc(db , 'blogs', id)
            const prosnap = await getDoc(docref)
            const like_num = prosnap.data().likes;
            console.log(like_num);
            const like_press = 1;
            likesum = parseInt(like_num + like_press)
                try{
                    await updateDoc(docref,{
                        likes:likesum,
                    })
                }catch (error){
                    console.log(error);
                }
            })
        })
}
function blogdislikes(){
    let dislikesum=0;
    let dislikebtns = document.querySelectorAll("#dislike")
    if(!dislikebtns || !dislikebtns.length) return;
    dislikebtns.forEach(btnpro =>{
        btnpro.addEventListener("click", async(e)=>{
            const id=e.target.getAttribute('data_id');
            const docref = doc(db , 'blogs', id)
            const prosnap = await getDoc(docref)
            const dislike_num = prosnap.data().dislikes;
            console.log(dislike_num);
            const dislike_press = 1;
            dislikesum = parseInt(dislike_num + dislike_press)
                try{
                    await updateDoc(docref,{
                        dislikes:dislikesum,
                    })
                }catch (error){
                    console.log(error);
                }
            })
        })
}