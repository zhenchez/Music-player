import { songs } from "./data/songs.js";

let soundMap = {};
let matchingSong;
let currentSongId = null;
let currentVolume;
let timeInterval;

function generatePlaylistSongs() {
  const playlistDOM = document.querySelector(".playlist-songs-container");
  let playlistHTML = "";
  songs.forEach(song => {
    let bodyHTML = "";
    bodyHTML = `
    <div class="playlist-song">
              <div class="playlist-img-container">
                <img
                  class="playlist-thumbnail"
                  src=${song.img}
                />
              </div>

              <div class="playlist-song-details">
                <p class="playlist-song-title">${song.title}</p>
                <p class="playlist-song-artist">${song.artist}</p>
              </div>
              <div class="playlist-play-btt-container">
                <button class="playlist-play-btt play-btt">
                  <img class="playlist-play-icon" src="./icons/play_arrow.svg" data-song-id="${song.id}"/>
                </button>
              </div>
            </div>
    `;
    playlistHTML += bodyHTML;
    playlistDOM.innerHTML = playlistHTML;
  });
}
function generateMainSongs() {
  const songsDOM = document.querySelector(".main-songs-grid");
  let mainSongsHTML = "";
  songs.forEach(song => {
    let bodyHTML = "";
    bodyHTML = `
    <div class="main-songs-song">
                <div class="main-thumbnail-container">
                  <img
                    class="main-thumbnail-img"
                    src=${song.img}
                  />
                  <button class="main-song-play-btt play-btt main-play-btt-${song.id}" data-song-id="${song.id}">
                    <img class="main-song-play-icon main-play-icon-${song.id}" src="./icons/play_arrow.svg" />
                  </button>
                </div>
  
                <div class="main-song-details">
                  <p class="main-song-title">${song.title}</p>
                  <p class="main-song-artist">${song.artist}</p>
                </div>
              </div>
    `;
    mainSongsHTML += bodyHTML;
    songsDOM.innerHTML = mainSongsHTML;
  });
}
function generatePlayer(song) {
  const playerRightDOM = document.querySelector(".player-left-section");
  const playerMiddleDOM = document.querySelector(".player-middle-section");
  let bodyHTML = `
    <div class="player-song-thumbnail">
      <img class="player-song-img" src=${song.img} />
    </div>
    <div class="player-song-details">
      <p class="player-song-title">${song.title}</p>
      <p class="player-song-artist">${song.artist}</p>
    </div>
  `;
  playerRightDOM.innerHTML = bodyHTML;

  bodyHTML = `
    <div class="player-btts">
      <button class="player-btt back-btt">
        <img src="./icons/back.svg" class="back-icon player-icon" />
      </button>
      <button class="player-btt pause-btt">
        <img src="./icons/pause.svg" class="pause-icon player-icon" />
      </button>
      <button class="player-btt next-btt">
        <img src="./icons/next.svg" class="next-icon player-icon" />
      </button>
    </div>
    <div class="song-duration">
      <input class="song-duration-range" type="range" value="0" step="0.01"/>
    </div>
  `;
  playerMiddleDOM.innerHTML = bodyHTML;
}

generateMainSongs();
/* generatePlaylistSongs(); */

document.querySelectorAll(".play-btt").forEach(button => {
  button.addEventListener("click", () => {
    const { songId } = button.dataset;
    const volumeDOM = document.querySelector(".volume-range");
    let volume = parseFloat(volumeDOM.value);
    currentVolume = volume;

    songs.forEach(song => {
      if (song.id === songId) {
        matchingSong = song;
      }
    });

    if (timeInterval) {
      clearInterval(timeInterval);
    }

    generatePlayer(matchingSong);

    document.querySelector(".pause-btt").addEventListener("click", () => {
      const pauseDOM = document.querySelector(".pause-icon");
      if (soundMap[songId].playing()) {
        soundMap[songId].pause();
        pauseDOM.src = "../icons/play_arrow.svg";
      } else {
        soundMap[songId].play();
        pauseDOM.src = "../icons/pause.svg";
      }
    });

    document.querySelector(".volume-range").addEventListener("input", () => {
      volume = parseFloat(volumeDOM.value);
      soundMap[currentSongId].volume(volume);
      currentVolume = volume;
      for (const songId in soundMap) {
        soundMap[songId].volume(currentVolume);
      }
    });

    if (currentSongId && currentSongId !== songId) {
      if (soundMap[currentSongId].playing()) {
        soundMap[currentSongId].pause();
      }
    }

    if (soundMap[songId]) {
      if (soundMap[songId].playing()) {
        soundMap[songId].pause();
      } else {
        soundMap[songId].play();
      }
    } else {
      songs.forEach(song => {
        if (song.id === songId) {
          soundMap[songId] = new Howl({
            src: song.src,
            volume: currentVolume,
          });
        }
      });

      if (soundMap[songId]) {
        soundMap[songId].play();
      }
    }
    const duration = document.querySelector(".song-duration-range");

    duration.addEventListener("input", () => {
      soundMap[songId].seek(duration.value);
    });

    timeInterval = setInterval(() => {
      duration.value = String(soundMap[songId].seek());
      duration.setAttribute("max", `${String(soundMap[songId].duration())}`);
    }, 300);
    currentSongId = songId;
  });
});
