import { songs } from "./data/songs.js";

let soundMap = {};

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
                  <button class="main-song-play-btt play-btt" data-song-id="${song.id}">
                    <img class="main-song-play-icon" src="./icons/play_arrow.svg" />
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
  const playerDOM = document.querySelector(".player-container");
  let bodyHTML = `
    <div class="player-left-section">
      <div class="player-song-thumbnail">
        <img class="player-song-img" src=${song.img} />
      </div>
      <div class="player-song-details">
        <p class="player-song-title">${song.title}</p>
        <p class="player-song-artist">${song.artist}</p>
      </div>
    </div>

    <div class="player-middle-section">
      <div class="player-btts">
        <button class="player-btt back-btt">
          <img src="./icons/back.svg" class="player-icon" />
        </button>
        <button class="player-btt pause-btt">
          <img src="./icons/play_arrow.svg" class="player-icon" />
        </button>
        <button class="player-btt next-btt">
          <img src="./icons/next.svg" class="player-icon" />
        </button>
      </div>
      <div class="song-duration">
        <input class="song-duration-range" type="range" />
      </div>
    </div>

    <div class="player-right-section">
      <img src="./icons/volume.svg" />
      <div class="volume">
        <input class="volume-range" type="range" />
      </div>
    </div>
  `;
  playerDOM.innerHTML = bodyHTML;
}

generateMainSongs();
generatePlaylistSongs();

let matchingSong;
document.querySelectorAll(".play-btt").forEach(button => {
  button.addEventListener("click", () => {
    const { songId } = button.dataset;

    songs.forEach(song => {
      if (song.id === songId) {
        matchingSong = song;
      }
    });

    if (soundMap[songId]) {
      // If the sound for this song already exists, check if it's playing
      if (soundMap[songId].playing()) {
        console.log("pause");
        soundMap[songId].pause();
      } else {
        console.log("resume");
        soundMap[songId].play();
      }
    } else {
      // If the sound for this song doesn't exist, create it and play it
      songs.forEach(song => {
        if (song.id === songId) {
          soundMap[songId] = new Howl({
            src: song.src,
            volume: 0.5,
          });
        }
      });

      if (soundMap[songId]) {
        console.log("play");
        soundMap[songId].play();
      }
    }
    generatePlayer(matchingSong);
    console.log(soundMap);
  });
});
