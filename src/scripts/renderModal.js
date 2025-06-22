import { DataManager } from "./dataManager.js";
import { genres, seasons } from "./initialData.js";

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

    const ModalContainer = document.createElement("div");

    ModalContainer.className =
      "max-w-[full] h-auto w-auto border-1 border-[#9CA3AF] rounded-lg bg-white p-4 font-serif";
    ModalContainer.innerHTML = `<div class="text-right">
  <div class="flex w-full mb-5">
    <h2 class="text-2xl font-bold mb-2">${podcast.title}</h2>
    <button id="close-btn" class="text-red-500 text-3xl ml-auto font-bold">&times;</button>
  </div>
</div>

<div class="flex flex-col md:flex-row gap-6">
  <!-- Image Section -->
  <div class="md:w-1/2">
    <div class="w-full h-auto bg-light-grey rounded-lg mb-2">
      <img
        class="w-full h-full object-cover rounded-2xl"
        src="${podcast.image}"
        alt="${podcast.title} cover"
      />
    </div>
  </div>

  <!-- Textual Content Section -->
  <div class="md:w-1/2">
    <!-- Description -->
    <h3 class="text-xl font-bold mt-2 mb-5">Description</h3>
    <p class="text-secondary-font-color">${podcast.description}</p>

    <!-- Genres -->
    <h3 class="text-xl font-bold mt-10 mb-5">Genres:</h3>
    <div id="genre-container" class="flex flex-wrap gap-2"></div>

    <!-- Last Updated -->
    <div class="flex items-center mt-6">
      <img
        class="w-5 h-5 mr-2"
        src="/assets/gray-calendar-25911.svg"
        alt="calendar icon"
      />
      <p class="text-md text-gray-500">Last updated: ${formattedDate}</p>
    </div>
  </div>
</div>

<!-- Seasons Section -->
<h3 class="text-xl font-bold mt-10 mb-5">Seasons</h3>
<div id="seasons-container" class="mt-6"></div>`;
    DataManager.renderSeasons(podcast, ModalContainer);

    const genresContainer = ModalContainer.querySelector("#genre-container");
    DataManager.renderGenres(genreNames, genresContainer);

    return ModalContainer;
  },
};
