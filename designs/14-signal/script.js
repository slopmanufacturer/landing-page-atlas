const stations = [
  { freq: 88.4, name: "Coastline Radio", genre: "Ambient / Coastal", track: "The Long Way Home", artist: "Mara Ellison" },
  { freq: 91.2, name: "Harbour Light", genre: "Soul / Dub", track: "Low Tide", artist: "The Wet Socks" },
  { freq: 94.6, name: "North Sea FM", genre: "Folk / Field recordings", track: "A Borrowed Coat", artist: "June Park" },
  { freq: 98.1, name: "The Current", genre: "Talk / Weather", track: "Shipping Forecast", artist: "Ivo Marchand" },
  { freq: 102.7, name: "Static Club", genre: "Post-punk / Electronic", track: "Night Bus", artist: "Civic TV" },
  { freq: 106.3, name: "Signal Late", genre: "Slowcore / Ambient", track: "The Last Guest", artist: "Pale Horse" },
];

const tuner = document.querySelector("#tuner");
const freqEl = document.querySelector("#freq");
const stationEl = document.querySelector("#station");
const genreEl = document.querySelector("#genre");
const needle = document.querySelector("#needle");
const trackTitle = document.querySelector("#track-title");
const trackArtist = document.querySelector("#track-artist");
const playToggle = document.querySelector("#play-toggle");
const playLabel = document.querySelector("#play-label");

let currentStation = stations[0];

function nearestStation(freq) {
  return stations.reduce((best, station) =>
    Math.abs(station.freq - freq) < Math.abs(best.freq - freq) ? station : best
  );
}

function setStation(station, freq) {
  currentStation = station;
  freqEl.textContent = freq.toFixed(1);
  stationEl.textContent = station.name;
  genreEl.textContent = station.genre;
  trackTitle.textContent = station.track;
  trackArtist.textContent = station.artist;

  const min = Number(tuner.min);
  const max = Number(tuner.max);
  const percent = ((freq - min) / (max - min)) * 100;
  needle.style.setProperty("--needle", `${percent}%`);
}

tuner?.addEventListener("input", () => {
  const freq = Number(tuner.value);
  const station = nearestStation(freq);
  setStation(station, freq);
});

document.querySelector("#scan")?.addEventListener("click", () => {
  let freq = Number(tuner.value);
  const target = stations[Math.floor(Math.random() * stations.length)];
  const step = () => {
    freq += 0.4;
    if (freq >= 108) freq = 87.5;
    tuner.value = String(freq);
    setStation(nearestStation(freq), freq);
    if (Math.abs(freq - target.freq) > 0.5) {
      requestAnimationFrame(step);
    } else {
      tuner.value = String(target.freq);
      setStation(target, target.freq);
    }
  };
  step();
});

playToggle?.addEventListener("click", () => {
  const playing = document.body.classList.toggle("is-playing");
  playToggle.setAttribute("aria-pressed", String(playing));
  playLabel.textContent = playing ? "Pause" : "Listen live";
});

setStation(currentStation, currentStation.freq);
