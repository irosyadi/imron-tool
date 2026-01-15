document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const resultsDiv = document.getElementById('results');

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });

    async function performSearch() {
        const searchTerm = searchInput.value.trim();
        if (!searchTerm) {
            resultsDiv.innerHTML = '<p class="error-message">Please enter a word or idiom to search.</p>';
            return;
        }

        resultsDiv.innerHTML = '<p>Searching...</p>';

        try {
            const firstLetter = searchTerm.charAt(0).toUpperCase();
            const encodedSearchTerm = encodeURIComponent(searchTerm);
            const url = `https://cdn.jsdelivr.net/gh/Naandalist/kbbi-harvester-cdn@main/word-details/${firstLetter}/${encodedSearchTerm}.json`;

            const response = await fetch(url);
            if (!response.ok) {
                if (response.status === 404) {
                    resultsDiv.innerHTML = `<p class="error-message">"${searchTerm}" not found in the dictionary.</p>`;
                } else {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return;
            }

            const data = await response.json();
            displayResults(data);

        } catch (error) {
            console.error('Fetch error:', error);
            resultsDiv.innerHTML = `<p class="error-message">An error occurred while fetching data: ${error.message}</p>`;
        }
    }

    function displayResults(data) {
        resultsDiv.innerHTML = ''; // Clear previous results

        if (!data || !data.entries || data.entries.length === 0) {
            resultsDiv.innerHTML = '<p class="error-message">No entries found for this word.</p>';
            return;
        }

        data.entries.forEach(entry => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('word-entry');

            const wordName = document.createElement('h2');
            wordName.textContent = entry.nama || data.word; // Use 'nama' if available, otherwise 'word'
            entryDiv.appendChild(wordName);

            if (entry.makna && entry.makna.length > 0) {
                entry.makna.forEach(makna => {
                    const meaningDiv = document.createElement('div');
                    meaningDiv.classList.add('meaning');

                    let definitionText = '';
                    if (makna.kelasKata && makna.kelasKata.length > 0) {
                        definitionText += makna.kelasKata.map(kls => `<span class="class-kata">${kls.nama}</span>`).join(', ') + ' ';
                    }
                    definitionText += makna.definisi;

                    const definitionPara = document.createElement('p');
                    definitionPara.innerHTML = definitionText;
                    meaningDiv.appendChild(definitionPara);

                    if (makna.contoh && makna.contoh.length > 0) {
                        makna.contoh.forEach(contoh => {
                            const examplePara = document.createElement('p');
                            examplePara.classList.add('example');
                            examplePara.textContent = `Contoh: ${contoh.teks}`;
                            meaningDiv.appendChild(examplePara);
                        });
                    }
                    entryDiv.appendChild(meaningDiv);
                });
            } else {
                const noMeaning = document.createElement('p');
                noMeaning.textContent = 'No meaning available.';
                entryDiv.appendChild(noMeaning);
            }
            resultsDiv.appendChild(entryDiv);
        });
    }
});
