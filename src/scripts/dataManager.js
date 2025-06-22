import { genres, seasons, podcasts } from "./initialData.js";

export const DataManager = {
  getGenreIds(ids, allGenres) {
    return ids.map((id) => {
      const genre = allGenres.find((g) => g.id === id);
      return genre ? genre.title : "unknown";
    });
  },

  timeAgo(dateString) {
    const now = new Date();
    const updated = new Date(dateString);
    const secondsAgo = Math.floor((now - updated) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "week", seconds: 604800 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(secondsAgo / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  },

  renderSeasons: (podcast, container) => {
    const seasonData = seasons.find((s) => s.id === podcast.id);
    const seasonsContainer = container.querySelector("#seasons-container");

    seasonsContainer.innerHTML = "";

    seasonData.seasonDetails.forEach((season) => {
      const seasonCard = document.createElement("div");
      seasonCard.className = "bg-gray-100 p-4 rounded-lg shadow-sm mb-2";

      seasonCard.innerHTML = `
        <h4 class="font-semibold text-lg">${season.title}</h4>
        <p class="text-sm text-gray-600">Episodes: ${season.episodes}</p>
      `;

      seasonsContainer.appendChild(seasonCard);
    });
  },

  renderGenres: (genreString, container) => {
    const genresList = genreString.split(" / ");
    container.innerHTML = "";

    genresList.forEach((genre) => {
      const genreTag = document.createElement("span");
      genreTag.className =
        "bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium m-1";
      genreTag.textContent = genre;
      container.appendChild(genreTag);
    });
  },
};
