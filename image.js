const API_KEY = "DLTEMSIK9CqL00od1BIR66YIgL0VsZDSL2qrKHGhH7xcYnEhXfuj6LlQ";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const imageId = urlParams.get("id");
  const imageDetailContent = document.getElementById("imageDetailContent");

  if (imageId) {
    fetchImageDetails(imageId);
  } else {
    imageDetailContent.innerHTML =
      '<p class="alert alert-danger">Image ID not found in URL.</p>';
  }
});

async function fetchImageDetails(id) {
  const imageDetailContent = document.getElementById("imageDetailContent");
  try {
    const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: API_KEY,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const photo = await response.json();
    displayImageDetails(photo);

    if (photo.avg_color) {
      document.body.style.backgroundColor = photo.avg_color;
    }
  } catch (error) {
    console.error("Error fetching image details:", error);
    imageDetailContent.innerHTML =
      '<p class="alert alert-danger">Error loading image details. Please try again.</p>';
  }
}

function displayImageDetails(photo) {
  const detailContent = document.getElementById("imageDetailContent");
  detailContent.innerHTML = `
                <h2>${photo.alt || "Pexels Image"}</h2>
                <img src="${photo.src.large}" class="detail-image" alt="${
    photo.alt || "Pexels Image"
  }">
                <p><strong>Photographer:</strong> <a href="${
                  photo.photographer_url
                }" target="_blank" rel="noopener noreferrer">${
    photo.photographer
  }</a></p>
                <p><small>Image ID: ${photo.id}</small></p>
            `;
}
