import { DataManager } from "./dataManager.js";
import { podcasts, genres, seasons } from "./initialData.js";

export const PodcastRenderer = {
  render: (podcasts, container) => {
    container.innerHTML = "";

    podcasts.forEach((podcast) => {
      const card = PodcastRenderer.createCard(podcast);
      container.appendChild(card);
    });
  },
  createCard: (podcast) => {
    const genreNames = DataManager.getGenreIds(podcast.genres, genres).join(
      ","
    );
    const UpdateTimeAgo = DataManager.timeAgo(podcast.updated);
    const div = document.createElement("div");
    div.className =
      "w-[95vw] rounded-lg h-[80vw] border-dark-grey border-2 bg-white mx-auto p-2";
    div.innerHTML = `
    <div class="w-[95%] h-[70%] bg-light-grey mx-auto rounded-lg mb-2"> <picture><img class="w-full h-full object-cover" src="${podcast.image}" ></picture> </div>
    <div class="p-2">
      <h2 class="text-lg font-bold">${podcast.title}</h2>
      <p class="text-sm text-gray-700">Season: ${podcast.seasons}</p>
      <div class="text-sm text-white bg-light-grey">Genre: ${genreNames}</div>
      <p class="text-xs text-gray-500">Updated: ${UpdateTimeAgo}</p>
    </div>
  `;
    return div;
  },
};
