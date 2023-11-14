export function generateArtistsHTML(items) {
  const artistsDOM = document.querySelector(".main-artists-grid");
  artistsDOM.innerHTML = "";
  if (items.length > 0) {
    let mainArtistsHTML = "";
    items.forEach(item => {
      let bodyHTML = "";
      bodyHTML = `
      <div class="main-songs-song">
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
