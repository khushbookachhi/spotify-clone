// initialized variables
let songIndex=0;
let masterPlay=document.getElementById('masterPlay');
let audioElement= new Audio('./songs/1.mp3');
let myprogressBar=document.getElementById('myprogressBar');
let gif=document.getElementById('gif');
let changeSongName=document.querySelectorAll('.changeSongName');
let songsContainer=Array.from(document.getElementsByClassName('songs'));
let backward=document.getElementById('backward');
let forward=document.getElementById('forward');
let allPlay=Array.from(document.getElementsByClassName('allPlay'));

//array of songname, songs and cover
let songs=[
    {songname:"you are one",filepath:"./songs/1.mp3", cover:"./covers/1.jpg"},
    {songname:"you are two",filepath:"./songs/2.mp3", cover:"./covers/2.jpg"},
    {songname:"you are three",filepath:"./songs/3.mp3", cover:"./covers/3.jpg"},
    {songname:"you are four",filepath:"./songs/4.mp3", cover:"./covers/4.jpg"},
    {songname:"you are five",filepath:"./songs/5.mp3", cover:"./covers/5.jpg"},
    {songname:"you are six",filepath:"./songs/6.mp3", cover:"./covers/6.jpg"},
    {songname:"you are seven",filepath:"./songs/7.mp3", cover:"./covers/7.jpg"},
    {songname:"you are eight",filepath:"./songs/8.mp3", cover:"./covers/8.jpg"},
    {songname:"you are nine",filepath:"./songs/9.mp3", cover:"./covers/9.jpg"},
    {songname:"you are ten",filepath:"./songs/10.mp3", cover:"./covers/10.jpg"}
]

songsContainer.forEach((element,i)=>{
element.getElementsByTagName('img')[0].src=songs[i].cover;
element.getElementsByClassName('changeSongName')[0].innerHTML=songs[i].songname;
});

//handled play and pause audio and button
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        allPlay[songIndex-1].classList.remove('fa-circle-play');
        allPlay[songIndex-1].classList.add('fa-circle-pause');
        
        gif.style.opacity='1';
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        makeAllPlays();
        gif.style.opacity='0';
    }
});
// seekbar updation/handling
audioElement.addEventListener('timeupdate',()=>{
let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
myprogressBar.value=progress;
});
//after changing range audio time change
myprogressBar.addEventListener('change',()=>{
    audioElement.currentTime=myprogressBar.value*audioElement.duration/100;   
})

// handling all songs play and pause button 
const makeAllPlays=()=>{
    allPlay.forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        gif.style.opacity='0';
    })
}
allPlay.forEach((element,i)=>{
    let playing=true;
    element.addEventListener('click',(e)=>{
       
     makeAllPlays();
     songIndex=parseInt(e.target.id);
     if(playing){
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
         audioElement.src=`./songs/${songIndex}.mp3`;
        //  audioElement.currentTime=0;
         audioElement.play();
         document.getElementById('playSong').innerHTML=songs[songIndex-1].songname;
         masterPlay.classList.remove('fa-circle-play');
         masterPlay.classList.add('fa-circle-pause');
         gif.style.opacity='1';
         playing=false;
     }else{
        e.target.classList.remove('fa-circle-pause');
        e.target.classList.add('fa-circle-play');
        //  audioElement.src=`./songs/${songIndex}.mp3`;
        //  audioElement.currentTime=0;
         audioElement.pause();
        //  
         masterPlay.classList.remove('fa-circle-pause');
         masterPlay.classList.add('fa-circle-play');
         gif.style.opacity='0';
         playing=true;
     }
     
    });
});

//forward button
forward.addEventListener('click', ()=>{
    makeAllPlays();
if(songIndex>=10){
    songIndex=1; 
}else{
    songIndex+=1;
}
audioElement.src=`./songs/${songIndex}.mp3`;
audioElement.currentTime=0;
audioElement.play();
//   e.target.id.classList.remove('fa-circle-play');
//   e.target.id.classList.add('fa-circle-pause');
masterPlay.classList.remove('fa-circle-play');
masterPlay.classList.add('fa-circle-pause');
allPlay[songIndex-1].classList.remove('fa-circle-play');
 allPlay[songIndex-1].classList.add('fa-circle-pause');
 document.getElementById('playSong').innerHTML=songs[songIndex-1].songname;
gif.style.opacity='1';

});

//backward button
backward.addEventListener('click', ()=>{
    makeAllPlays();
if(songIndex<=1){
    songIndex=1; 
}else{
    songIndex-=1;
}
audioElement.src=`./songs/${songIndex}.mp3`;
// audioElement.currentTime=0;
audioElement.play();
//   e.target.id.classList.remove('fa-circle-play');
//   e.target.id.classList.add('fa-circle-pause');
masterPlay.classList.remove('fa-circle-play');
masterPlay.classList.add('fa-circle-pause');
allPlay[songIndex-1].classList.remove('fa-circle-play');
 allPlay[songIndex-1].classList.add('fa-circle-pause');
 document.getElementById('playSong').innerHTML=songs[songIndex-1].songname;
gif.style.opacity='1';

});
