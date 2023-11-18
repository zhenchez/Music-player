export function generateArtistsHTML(items) {
  const artistsDOM = document.querySelector(".main-artists-grid");
  artistsDOM.innerHTML = "";
  if (items.length > 0) {
    let mainArtistsHTML = "";
    items.forEach(item => {
      let bodyHTML = "";
      bodyHTML = `
      <div class="main-songs-song main-artists" data-main-artist-id="${item.id}">
        <div class="main-artist-thumbnail-container">
          <img
            class="main-artist-thumbnail-img"
            src=${item.img}
          />
        </div>
  
        <div class="main-artist-details">
          <p class="main-song-title">${item.name}</p>
          <p class="main-song-artist">${item.genre}</p>
        </div>
      </div>
      `;
      mainArtistsHTML += bodyHTML;
      artistsDOM.innerHTML = mainArtistsHTML;
    });
  }
}

function generateArtistPageHTML(matchingArtist, songs) {
  const main = document.querySelector(".main");
  const filteredSong = songs.filter(song =>
    song.artist
      .toLocaleLowerCase()
      .includes(matchingArtist.name.toLocaleLowerCase())
  );
  let mainSongsHTML = "";
  let bodyHTML = "";
  bodyHTML = `
      <div class="artist-page-main">
        <div class="artist-page-img-container">
          <img class="artist-page-big-img" src="${matchingArtist.bigImg}" />
          <img
            class="artist-page-img"
            src=${matchingArtist.img}
          />
          <div class="artist-page-header">
            <h1>${matchingArtist.name}</h1>
          </div>
        </div>
      </div>
      <div class="artist-page-featured-songs">
        <h1>Featured Artist Songs</h1>
      </div>
      <div class="artist-songs main-songs-grid main-artist-page-grid">
      </div>
      `;

  main.innerHTML = bodyHTML;

  const artistSongs = document.querySelector(".artist-songs");
  filteredSong.forEach(item => {
    let songsHTML = "";
    songsHTML = `
    <div class="main-songs-song">
      <div class="main-thumbnail-container">
        <img
          class="main-thumbnail-img"
          src=${item.img}
        />
        <button class="main-song-play-btt play-btt main-play-btt-${item.id}" data-song-id="${item.id}">
          <img class="main-song-play-icon main-play-icon-${item.id}" src="./icons/play_arrow.svg" />
        </button>
      </div>

      <div class="main-song-details">
        <p class="main-song-title" title="${item.title}">${item.title}</p>
        <p class="main-song-artist" title="${item.artist}">${item.artist}</p>
      </div>
    </div>
    `;
    mainSongsHTML += songsHTML;
    artistSongs.innerHTML = mainSongsHTML;
  });
}

export function addEventListenerArtists(artists, songs) {
  document.querySelectorAll(".main-artists").forEach(artist => {
    artist.addEventListener("click", () => {
      const { mainArtistId } = artist.dataset;
      let matchingArtist;
      artists.forEach(item => {
        if (item.id === mainArtistId) {
          matchingArtist = item;
        }
      });
      generateArtistPageHTML(matchingArtist, songs);
    });
  });
}
