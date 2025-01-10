const audioPlayer = document.getElementById("audio-player");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.querySelector(".progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const songTitle = document.getElementById("song-title");
const artistName = document.getElementById("artist-name");
const backgroundContainer = document.getElementById("background-container");
const playPauseIcon = playPauseBtn.querySelector("i");
const searchBar = document.getElementById("search-bar");

// Song List
const songs = [
  {
    title: "Hum Nahi Sudhrenge",
    artist: "Armaan Malik / Amaal Malik",
    src: "songs/hum nahi sudhrenge.mp3",
    image: "pics/pic1.jpg",
  },
  {
    title: "Heeriye",
    artist: "Arijit Singh",
    src: "songs/heeriye.mp3",
    image: "pics/heeriye.jpg",
  },
  {
    title: "Yaadon ki Almaari",
    artist: "Palomi",
    src: "songs/yaadon ki almaari.mp3",
    image: "pics/pic3.jpg",
  },
];

let currentSongIndex = 0;

// Load song
function loadSong(song) {
  songTitle.textContent = song.title;
  artistName.textContent = song.artist;
  audioPlayer.src = song.src;
  backgroundContainer.style.backgroundImage = `url(${song.image})`;
  document.getElementById("song-image").src = song.image; // Update song image

  // Check if the audio is loaded properly
  audioPlayer.load();
}

// Play song
function playSong() {
  if (audioPlayer.src !== "") {
    audioPlayer.play();
    playPauseIcon.classList.remove("fa-play");
    playPauseIcon.classList.add("fa-pause");
  }
}

// Pause song
function pauseSong() {
  audioPlayer.pause();
  playPauseIcon.classList.remove("fa-pause");
  playPauseIcon.classList.add("fa-play");
}

// Play or Pause
playPauseBtn.addEventListener("click", () => {
  if (audioPlayer.paused) {
    playSong();
  } else {
    pauseSong();
  }
});

// Previous song
prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

// Next song
nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(songs[currentSongIndex]);
  playSong();
});

// Update progress
audioPlayer.addEventListener("timeupdate", () => {
  const progressPercent =
    (audioPlayer.currentTime / audioPlayer.duration) * 100;
  progressBar.style.width = `${progressPercent}%`;
  rd;

  // Update time
  const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
  const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
  currentTimeEl.textContent = `${currentMinutes}:${
    currentSeconds < 10 ? "0" + currentSeconds : currentSeconds
  }`;

  if (audioPlayer.duration) {
    const durationMinutes = Math.floor(audioPlayer.duration / 60);
    const durationSeconds = Math.floor(audioPlayer.duration % 60);
    durationEl.textContent = `${durationMinutes}:${
      durationSeconds < 10 ? "0" + durationSeconds : durationSeconds
    }`;
  }
});

// Seek song
progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const duration = audioPlayer.duration;

  audioPlayer.currentTime = (clickX / width) * duration;
});

// Automatically play next song
audioPlayer.addEventListener("ended", () => {
  nextBtn.click();
});

// Load the first song initially
loadSong(songs[currentSongIndex]);

searchBar.addEventListener("input", (e) => {
  const query = e.target.value.toLowerCase();

  // Find the first matching song
  const matchedSong = songs.find((song) =>
    song.title.toLowerCase().includes(query)
  );

  if (matchedSong) {
    currentSongIndex = songs.indexOf(matchedSong);
    loadSong(matchedSong);
    playSong();
  } else {
    pauseSong();
  }
});
