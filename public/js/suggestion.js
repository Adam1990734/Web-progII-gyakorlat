/**
 * @type {HTMLSelectElement}
 */
const suggester = document.getElementById("suggesnter");

/**
 * @type {HTMLInputElement}
 */
const searcher = document.getElementById("searcher");

/**
 * 
 * @param {{ id: string, name: string }} suggestion
 * @returns {string}
 */
function suggestionToHtml(suggestion) {
    const html = `
    <div class="suggestion"
         data-id="${suggestion.id}"
         data-name="${suggestion.name}">
        Budapest
    </div>`;
    return html;
}

function loadIntoSuggester(suggestions) {
    suggester.innerHTML = "";
    suggestions.forEach(s => {
        const html = suggestionToHtml(s);
        suggester.innerHTML += html;
    });
}

if (searcher && suggester) {
    searcher.addEventListener("change", async (e) => {
        if(searcher.value.length % 5 != 0)
            return;
        /**
         * @type {{ id: string, name: string }[]}
         */
        const suggestions = await fetch(`/inventions?suggest=${searcher.value}`);
        if(suggestions.length == 0)
            return;
        loadIntoSuggester(suggestions);
    });
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("suggestion")) {

            const id = e.target.dataset.id;
            const name = e.target.dataset.name;

            //itt kell majd beírni az input-ba
        }
    });
}