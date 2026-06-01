const movies = [
  {
    id: 1,
    title: "Dune: Part Two",
    description: "The next chapter of Paul Atreides’ fight for Arrakis, with epic scale and breathtaking visuals.",
    genre: "Sci-Fi",
    rating: "8.3",
    category: "sci-fi",
    image: "https://upload.wikimedia.org/wikipedia/en/5/52/Dune_Part_Two_poster.jpeg"
  },
  {
    id: 2,
    title: "Oppenheimer",
    description: "Christopher Nolan’s historical drama exploring the life and legacy of J. Robert Oppenheimer.",
    genre: "Drama",
    rating: "8.5",
    category: "drama",
    image: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg"
  },
  {
    id: 3,
    title: "Mission: Impossible – Dead Reckoning Part One",
    description: "Ethan Hunt races against time in a globe-trotting action thriller filled with impossible stunts.",
    genre: "Action",
    rating: "7.8",
    category: "action",
    image: "https://upload.wikimedia.org/wikipedia/en/e/ed/Mission-_Impossible_%E2%80%93_Dead_Reckoning_Part_One_poster.jpg"
  },
  {
    id: 4,
    title: "Spider-Man: Across the Spider-Verse",
    description: "Miles Morales returns in a groundbreaking animated adventure across the multiverse.",
    genre: "Action",
    rating: "8.4",
    category: "action",
    image: "https://upload.wikimedia.org/wikipedia/en/b/b4/Spider-Man-_Across_the_Spider-Verse_poster.jpg"
  },
  {
    id: 5,
    title: "Barbie",
    description: "A vibrant comedy-fantasy that explores identity, empowerment, and life beyond the Dreamhouse.",
    genre: "Comedy",
    rating: "7.3",
    category: "comedy",
    image: "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg"
  },
  {
    id: 6,
    title: "Killers of the Flower Moon",
    description: "A crime drama based on true events in 1920s Oklahoma, directed by Martin Scorsese.",
    genre: "Drama",
    rating: "8.0",
    category: "drama",
    image: "https://upload.wikimedia.org/wikipedia/en/8/88/Killers_of_the_Flower_Moon_film_poster.jpg"
  }
  },
  {
    id: 7,
    title: "The Backrooms",
    description: "A chilling horror thriller about getting trapped in an endless, eerie maze of yellow rooms and flickering fluorescent lights.",
    genre: "Horror",
    rating: "6.2",
    category: "horror",
    image: "https://upload.wikimedia.org/wikipedia/en/3/33/The_Backrooms_%28film%29_poster.jpg"
  }
];

const moviesGrid = document.getElementById('moviesGrid');
const categoryButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const viewCatalogBtn = document.getElementById('viewCatalogBtn');
const detailModal = document.getElementById('detailModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalGenre = document.getElementById('modalGenre');
const modalRating = document.getElementById('modalRating');
const modalDownloadLink = document.getElementById('modalDownloadLink');
const modalWatchBtn = document.getElementById('modalWatchBtn');
const downloadFile = 'blah.exe';

function renderMovies(list) {
  moviesGrid.innerHTML = list.map(movie => `
    <article class="movie-card">
      <img src="${movie.image}" alt="${movie.title}" />
      <div class="movie-info">
        <h3>${movie.title}</h3>
        <p>${movie.description}</p>
        <div class="movie-meta">
          <span>${movie.genre}</span>
          <span>${movie.rating}</span>
        </div>
        <div class="movie-actions">
          <button class="btn btn-secondary" data-id="${movie.id}">View Details</button>
          <a class="btn btn-primary" href="${downloadFile}" download>Download</a>
        </div>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('[data-id]').forEach(button => {
    button.addEventListener('click', () => {
      const movie = movies.find(item => item.id === Number(button.dataset.id));
      openModal(movie);
    });
  });
}

function openModal(movie) {
  if (!movie) return;
  modalTitle.textContent = movie.title;
  modalDescription.textContent = movie.description;
  modalGenre.textContent = movie.genre;
  modalRating.textContent = movie.rating;
  modalDownloadLink.href = downloadFile;
  detailModal.classList.remove('hidden');
}

function closeModal() {
  detailModal.classList.add('hidden');
}

function applyFilter(category) {
  categoryButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.category === category));
  const searchTerm = searchInput.value.trim().toLowerCase();
  let filtered = movies;
  if (category !== 'all') {
    filtered = filtered.filter(movie => movie.category === category);
  }
  if (searchTerm) {
    filtered = filtered.filter(movie => movie.title.toLowerCase().includes(searchTerm) || movie.description.toLowerCase().includes(searchTerm));
  }
  renderMovies(filtered);
}

categoryButtons.forEach(button => {
  button.addEventListener('click', () => applyFilter(button.dataset.category));
});

searchInput.addEventListener('input', () => applyFilter(document.querySelector('.filter-btn.active').dataset.category));
viewCatalogBtn.addEventListener('click', () => {
  document.getElementById('browse').scrollIntoView({ behavior: 'smooth' });
});
modalCloseBtn.addEventListener('click', closeModal);
detailModal.addEventListener('click', event => {
  if (event.target === detailModal) closeModal();
});
modalWatchBtn.addEventListener('click', () => alert('This is a demo site. Download and playback are not available in the prototype.'));

renderMovies(movies);
