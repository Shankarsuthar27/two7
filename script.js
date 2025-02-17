console.log("lets")
let currentSong = new Audio();
function secondsToMinutesSeconds(seconds) {
    // Ensure the input is a number and handle invalid input
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }
    
    // Calculate minutes and remaining seconds
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    // Format minutes and seconds with leading zeros
    const formattedMinutes = String(minutes).padStart(2,'0');
    const formattedSeconds = String(remainingSeconds).padStart(2,'0');

    return `${formattedMinutes}:${formattedSeconds}`;
}
async function getSongs() {

    let a = await fetch("http://127.0.0.1:5500/songs/")
    let response = await a.text();
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response;
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

const playMusic = (track)=>{
    let audio = new Audio("/songs/"+track)
    currentSong.src = "/songs/"+ track
    currentSong.play()
    play.src= "pause.svg"
    document.querySelector(".songinfo").innerHTML= track
    document.querySelector(".songtime").innerHTML="00:00 / 00:00"
    
}

async function main() {

 
    //get list of all songs
    let songs = await getSongs()
   

    //show all the song

    let songUL = document.querySelector(".songList").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songUL.innerHTML= songUL.innerHTML + `<li>
         
                <img class="invert" src="music.svg" alt="">
                <div class="info">
                    <div> ${song.replaceAll("%20", " ")}</div>
                    <div>Shankar</div>
                </div>
                <div class="playnow">
                   <span>Play Now</span> 
                <img class="invert" src="play.svg" alt="">
                </div></li>`;
        
    }
Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", element=>{
        console.log(e.querySelector(".info").firstElementChild.innerHTML)
        playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())

    })
    
})
//attach a eventlistener
play.addEventListener("click", ()=>{
    if(currentSong.paused) {
        currentSong.play()
        play.src= "pause.svg"
    }
    else{
        currentSong.pause()
        play.src = "play.svg"
    }
})
//listen for timeudate event
currentSong.addEventListener("timeupdate", ()=>{
    console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML= `${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
})
}

main() 