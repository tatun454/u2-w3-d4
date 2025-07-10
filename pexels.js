const API_KEY = "DLTEMSIK9CqL00od1BIR66YIgL0VsZDSL2qrKHGhH7xcYnEhXfuj6LlQ";
const imageGalleryRow = document.getElementById("imageGalleryRow");
const loadImagesBtn = document.getElementById("loadImagesBtn");
const loadSecondaryImagesBtn = document.getElementById(
  "loadSecondaryImagesBtn"
);
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

async function fetchImages(query) {
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayImages(data.photos);
  } catch (error) {
    console.error("Error fetching images:", error);
    alert("Failed to load images. Please check your network and API key.");
  }
}

function displayImages(photos) {
  imageGalleryRow.innerHTML = "";

  if (photos.length === 0) {
    imageGalleryRow.innerHTML =
      '<p class="text-center w-100">No images found for this query.</p>';
    return;
  }

  photos.forEach((photo) => {
    const col = document.createElement("div");
    col.className = "col-md-4";
    col.innerHTML = `
            <div class="card mb-4 shadow-sm">
                <img src="${
                  photo.src.medium
                }" class="bd-placeholder-img card-img-top clickable" width="100%" height="225" alt="${
      photo.alt || "Pexels Image"
    }" data-img-id="${photo.id}">
                <div class="card-body">
                    <h5 class="card-title clickable" data-img-id="${
                      photo.id
                    }">${photo.photographer}</h5>
                    <p class="card-text">
                        This is a wider card with supporting text below as a natural
                        lead-in to additional content.
                    </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary view-btn" data-img-url="${
                              photo.src.large
                            }">View</button>
                            <button type="button" class="btn btn-sm btn-outline-secondary hide-btn">Hide</button>
                        </div>
                        <small class="text-muted image-id">${photo.id}</small>
                    </div>
                </div>
            </div>
        `;
    imageGalleryRow.appendChild(col);
  });
  addCardEventListeners();
}

function addCardEventListeners() {
  document.querySelectorAll(".hide-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const cardCol = event.target.closest(".col-md-4");
      if (cardCol) {
        cardCol.remove();
      }
    });
  });

  document.querySelectorAll(".view-btn").forEach((button) => {
    button.addEventListener("click", (event) => {
      const imageUrl = event.target.dataset.imgUrl;
      const modalImage = document.getElementById("modalImage");
      modalImage.src = imageUrl;
      const imageModal = new bootstrap.Modal(
        document.getElementById("imageModal")
      );
      imageModal.show();
    });
  });

  document
    .querySelectorAll(".card-img-top.clickable, .card-title.clickable")
    .forEach((element) => {
      element.addEventListener("click", (event) => {
        const imageId = event.target.dataset.imgId;
        if (imageId) {
          window.location.href = `image.html?id=${imageId}`;
        }
      });
    });
}

loadImagesBtn.addEventListener("click", () => fetchImages("hamsters"));
loadSecondaryImagesBtn.addEventListener("click", () => fetchImages("tigers"));

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchImages(query);
  } else {
    alert("Please enter a search query!");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  fetchImages("nature");
});
