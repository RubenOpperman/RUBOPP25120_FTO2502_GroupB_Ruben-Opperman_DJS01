import { DataManager } from "./dataManager.js";
import { podcasts, genres, seasons } from "./initialData.js";

export const Modal = {
  openModal: (container, podcast) => {
    container.addEventListener("click", function () {
      const modal = document.getElementById("podcast-modal");
      modal.innerHTML = "";
      const content = ModalRenderer.createModalCard(podcast);
      modal.appendChild(content);
      modal.showModal();
      const closeBtn = document.getElementById("close-btn");
      Modal.closeModal(closeBtn);
    });
  },

  closeModal: (closeBtn) => {
    closeBtn.addEventListener("click", function () {
      document.getElementById("podcast-modal").close();
    });
  },
};

export const ModalRenderer = {
  render: (podcast, container) => {
    container.innerHTML = "";

    const card = ModalRenderer.createModalCard(podcast);
    container.appendChild(card);
  },

  createModalCard: (podcast) => {
    const genreNames = DataManager.getGenreIds(podcast.genres, genres).join(
      " / "
    );

    const UpdateDate = new Date(podcast.updated);
    const formattedDate = UpdateDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const div = document.createElement("div");

    div.className =
      "max-w-[full] h-auto w-auto border-1 border-[#9CA3AF] rounded-lg bg-white p-4 font-serif";
    div.innerHTML = `
 <div class="text-right">
  <div class="flex w-full mb-5">
    <h2 class="text-2xl font-bold mb-2">${podcast.title}</h2>
    <button id="close-btn" class="text-red-500 text-3xl ml-auto font-bold">&times;</button>
  </div>
</div>

<div class="flex flex-col md:flex-row gap-6">
  <!-- Image -->
  <div class="md:w-1/2">
    <div class="w-full h-auto bg-light-grey rounded-lg mb-2">
      <img class="w-full h-full object-cover rounded-2xl" src="${podcast.image}" />
    </div>
  </div>




  <!-- Textual Content -->
  <div class="md:w-1/2">
    <h3 class="text-xl font-bold mt-2 mb-5">Description</h3>
    <p>${podcast.description}</p>

    <h3  class="text-xl font-bold mt-10  mb-5">Genres:</h3>
    <div id="genre-container"> </div>
 

    <p class="text-md text-gray-500 mt-5 mb-5">Last updated: ${formattedDate}</p>

   
  </div>
</div>




<!-- Seasons Section -->
 <h3 class="text-xl font-bold mt-10 mb-5">Seasons</h3>
<div id="seasons-container" class="mt-6"></div>
      
  
 
`;

    ``;

    const seasonData = seasons.find((s) => s.id === podcast.id);

    const seasonsContainer = div.querySelector("#seasons-container");

    seasonData.seasonDetails.forEach((season) => {
      const seasonCard = document.createElement("div");
      seasonCard.className = "bg-gray-100 p-4 rounded-lg shadow-sm mb-2";

      seasonCard.innerHTML = `
      <h4 class="font-semibold text-lg">${season.title}</h4>
      <p class="text-sm text-gray-600">Episodes: ${season.episodes}</p>
    `;

      seasonsContainer.appendChild(seasonCard);
    });

    const genresList = genreNames.split(" / ");

    const genresContainer = div.querySelector("#genre-container");

    genresList.forEach((genre) => {
      const genresCard = document.createElement("span");

      genresCard.className =
        "bg-gray-200 text-gray-800 px-3 py-1 rounded-full text-sm font-medium m-1";
      genresCard.textContent = genre;

      genresContainer.appendChild(genresCard);
    });

    return div;
  },
};
