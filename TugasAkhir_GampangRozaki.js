// api
const apiKey = 'f659088195a94d78271ae97365439598';

// fungsi
function checkInput() {
    const query = $('#query').val().trim();
    if (query === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Masukkan judul film terlebih dahulu!',
        });
        return false;
    }
    return true;
}

$('#btnCari').click(function() {
    if (!checkInput()) return;
    fetchData();
});

// AJAX
async function fetchData() {
    const query = $('#query').val();
    const url = `https://api.themoviedb.org/3/search/movie`;
    const params = {
        query: query,
        include_adult: false,
        language: 'en-US',
        page: 1,
        api_key: apiKey
    };

    try {
        if (!checkInput()) return;

        Swal.fire({
            title: "",
            text: "Mencari data",
            imageUrl: "https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif",
            imageWidth: 100,
            imageHeight: 100,
            showConfirmButton: false,
            allowOutsideClick: false
        });

        const response = await $.ajax({
            url: url,
            method: 'GET',
            data: params
        });
        displayData(response.results);
    } catch (error) {
        console.error(error);
    } finally {
        Swal.close();
    }
}


// DOM
function displayData(results) {
    const hasilCari = document.getElementById('hasilCari');
    hasilCari.innerHTML = '';

    if (results && results.length > 0) {
        results.forEach(movie => {
            const card = document.createElement('div');
            card.classList.add('movie-card');

            if (movie.poster_path) {
                const img = document.createElement('img');
                img.src = `https://image.tmdb.org/t/p/w400${movie.poster_path}`;
                img.alt = movie.title;
                card.appendChild(img);
            }

            const movieInfo = document.createElement('div');
            movieInfo.classList.add('movie-info');

            const title = document.createElement('h3');
            title.textContent = movie.title;
            movieInfo.appendChild(title);

            const releaseDate = document.createElement('p');
            releaseDate.textContent = `Release Date: ${movie.release_date}`;
            movieInfo.appendChild(releaseDate);

            const overview = document.createElement('p');
            overview.textContent = movie.overview;
            movieInfo.appendChild(overview);

            card.appendChild(movieInfo);

            hasilCari.appendChild(card);
        });
    } else {
        const message = document.createElement('p');
        message.textContent = 'Tidak ada hasil ditemukan.';
        hasilCari.appendChild(message);
    }
}