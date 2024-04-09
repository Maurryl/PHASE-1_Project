// // script.js
// fetch('/db.json/images')
//   .then(response => response.json())
//   .then(data => {
//     // Do something with the fetched images data
//     console.log(data);
//   })
//   .catch(error => {
//     console.error('Error fetching images:', error);
//   });

// let imagesData = []; // Store all images data

//     document.getElementById('upload').addEventListener('change', function(event) {
//       const files = event.target.files;
//       const gallery = document.getElementById('gallery');

//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         const reader = new FileReader();

//         reader.onload = function() {
//           const img = document.createElement('img');
//           img.src = reader.result;
//           img.className = 'gallery-image'; // Add a class to the image

//           const imageData = {
//             url: reader.result,
//             tags: [], // Add tags here if needed
//             title: file.name // Use file name as default title
//           };

//           imagesData.push(imageData); // Store image data

//           gallery.appendChild(img);
//         }

//         reader.readAsDataURL(file);
//       }
//     });

//     document.getElementById('fullscreen-btn').addEventListener('click', function() {
//       const gallery = document.getElementById('gallery');
//       if (!document.fullscreenElement) {
//         gallery.requestFullscreen();
//       } else {
//         document.exitFullscreen();
//       }
//     });

//     let slideshowInterval;
//     let currentSlideIndex = 0;
//     const images = document.querySelectorAll('#gallery img');

//     function startSlideshow() {
//       slideshowInterval = setInterval(() => {
//         showSlide();
//       }, 2000);
//     }

//     function showSlide() {
//       images.forEach((image, index) => {
//         if (index === currentSlideIndex) {
//           image.style.display = 'block';
//         } else {
//           image.style.display = 'none';
//         }
//       });

//       currentSlideIndex = (currentSlideIndex + 1) % images.length;
//     }

//     document.getElementById('slideshow-btn').addEventListener('click', function() {
//       if (slideshowInterval) {
//         clearInterval(slideshowInterval);
//         slideshowInterval = null;
//         this.textContent = 'Start Slideshow';
//       } else {
//         startSlideshow();
//         this.textContent = 'Stop Slideshow';
//       }
//     });

//     document.getElementById('save-order-btn').addEventListener('click', function() {
//       const gallery = document.getElementById('gallery');
//       const sortedImages = Array.from(gallery.children).map(child => child.src);
//       console.log(sortedImages);
//       // Here you can send sortedImages to the server to save the order
//     });

//     document.getElementById('search-btn').addEventListener('click', function() {
//       const searchTags = document.getElementById('search-tags').value.toLowerCase();
//       const searchTitle = document.getElementById('search-title').value.toLowerCase();

//       const filteredImages = imagesData.filter(image => {
//         // Check if any tag includes the search term
//         const tagsMatch = image.tags.some(tag => tag.toLowerCase().includes(searchTags));
//         // Check if the title includes the search term
//         const titleMatch = image.title.toLowerCase().includes(searchTitle);

//         return tagsMatch || titleMatch;
//       });

//       // Hide all images
//       images.forEach(image => {
//         image.style.display = 'none';
//       });

//       // Show only filtered images
//       filteredImages.forEach(image => {
//         const img = document.querySelector(`img[src='${image.url}']`);
//         if (img) {
//           img.style.display = 'block';
//         }
//       });
//     });

//     document.getElementById('reset-btn').addEventListener('click', function() {
//       // Reset search fields
//       document.getElementById('search-tags').value = '';
//       document.getElementById('search-title').value = '';

//       // Show all images
//       images.forEach(image => {
//         image.style.display = 'block';
//       });
//     });
  let imagesData = []; // Store all images data

// Fetch images from the backend when the page loads
window.addEventListener('load', fetchImages);

function fetchImages() {
  fetch('/api/images')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch images');
      }
      return response.json();
    })
    .then(data => {
      // Once images are fetched successfully, store them and render them in the gallery
      imagesData = data;
      renderGallery(imagesData);
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
}

document.getElementById('upload').addEventListener('change', function(event) {
  const files = event.target.files;
  const gallery = document.getElementById('gallery');

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function() {
      const img = document.createElement('img');
      img.src = reader.result;
      img.className = 'gallery-image'; // Add a class to the image

      const imageData = {
        url: reader.result,
        tags: [], // Add tags here if needed
        title: file.name // Use file name as default title
      };

      imagesData.push(imageData); // Store image data

      gallery.appendChild(img);
    };

    reader.readAsDataURL(file);
  }
});

document.getElementById('fullscreen-btn').addEventListener('click', function() {
  const gallery = document.getElementById('gallery');
  if (!document.fullscreenElement) {
    gallery.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

let slideshowInterval;
let currentSlideIndex = 0;
const images = document.querySelectorAll('#gallery img');

function startSlideshow() {
  slideshowInterval = setInterval(() => {
    showSlide();
  }, 2000);
}

function showSlide() {
  images.forEach((image, index) => {
    if (index === currentSlideIndex) {
      image.style.display = 'block';
    } else {
      image.style.display = 'none';
    }
  });

  currentSlideIndex = (currentSlideIndex + 1) % images.length;
}

document.getElementById('slideshow-btn').addEventListener('click', function() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
    this.textContent = 'Start Slideshow';
  } else {
    startSlideshow();
    this.textContent = 'Stop Slideshow';
  }
});

document.getElementById('save-order-btn').addEventListener('click', function() {
  const gallery = document.getElementById('gallery');
  const sortedImages = Array.from(gallery.children).map(child => child.src);
  console.log(sortedImages);
  // Here you can send sortedImages to the server to save the order
});

document.getElementById('search-btn').addEventListener('click', function() {
  const searchTags = document.getElementById('search-tags').value.toLowerCase();
  const searchTitle = document.getElementById('search-title').value.toLowerCase();

  const filteredImages = imagesData.filter(image => {
    // Check if any tag includes the search term
    const tagsMatch = image.tags.some(tag => tag.toLowerCase().includes(searchTags));
    // Check if the title includes the search term
    const titleMatch = image.title.toLowerCase().includes(searchTitle);

    return tagsMatch || titleMatch;
  });

  // Hide all images
  images.forEach(image => {
    image.style.display = 'none';
  });

  // Show only filtered images
  filteredImages.forEach(image => {
    const img = document.querySelector(`img[src='${image.url}']`);
    if (img) {
      img.style.display = 'block';
    }
  });
});

document.getElementById('reset-btn').addEventListener('click', function() {
  // Reset search fields
  document.getElementById('search-tags').value = '';
  document.getElementById('search-title').value = '';

  // Show all images
  images.forEach(image => {
    image.style.display = 'block';
  });
});

function renderGallery(images) {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = ''; // Clear existing images
  images.forEach(image => {
    const img = document.createElement('img');
    img.src = image.url;
    img.className = 'gallery-image'; // Add a class to the image
    gallery.appendChild(img);
  });
}