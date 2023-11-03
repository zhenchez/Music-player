import { songs } from "./data/songs.js";

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
                <button class="playlist-play-btt">
                  <img class="playlist-play-icon" src="./icons/play.svg" />
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
                  <button class="main-song-play-btt">
                    <img class="main-song-play-icon" src="./icons/play.svg" />
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

generateMainSongs();
generatePlaylistSongs();
