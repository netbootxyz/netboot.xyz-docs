document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movie-list').querySelector('ul');
    const movieDetailsSection = document.getElementById('movie-details');
    const detailsContent = document.getElementById('details-content');
    const closeDetailsButton = document.getElementById('close-details');

    // Placeholder movie data
    const movies = [
        {
            id: 1,
            title: 'Inception',
            director: 'Christopher Nolan',
            year: 2010,
            description: 'A thief who steals information by entering people\'s dreams gets a chance to have his criminal history erased as payment for a task considered to be impossible: "inception", the implantation of another person\'s idea into a target\'s subconscious.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
        },
        {
            id: 2,
            title: 'The Shawshank Redemption',
            director: 'Frank Darabont',
            year: 1994,
            description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            poster: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg'
        },
        {
            id: 3,
            title: 'The Dark Knight',
            director: 'Christopher Nolan',
            year: 2008,
            description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
            poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg'
        }
    ];

    // Populate movie list
    movies.forEach(movie => {
        const listItem = document.createElement('li');
        listItem.textContent = movie.title;
        listItem.dataset.movieId = movie.id;
        movieList.appendChild(listItem);

        // Add click event listener to each movie item
        listItem.addEventListener('click', () => {
            displayMovieDetails(movie.id);
        });
    });

    // Function to display movie details
    function displayMovieDetails(movieId) {
        const movie = movies.find(m => m.id === parseInt(movieId));
        if (movie) {
            detailsContent.innerHTML = `
                <h3>${movie.title} (${movie.year})</h3>
                <p><strong>Director:</strong> ${movie.director}</p>
                <p>${movie.description}</p>
                <img src="${movie.poster}" alt="${movie.title} Poster" style="max-width:200px; height:auto;">
            `;
            movieDetailsSection.style.display = 'block';
        }
    }

    // Event listener for the close button
    closeDetailsButton.addEventListener('click', () => {
        movieDetailsSection.style.display = 'none';
    });
});
