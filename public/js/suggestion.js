/**
 * @type {HTMLSelectElement}
 */
const suggester = document.getElementById("suggester");

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
    <option value="${suggestion._id}">
        ${suggestion._name}
    </option>
    `;
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
    searcher.addEventListener("input", async (e) => {
        if(searcher.value.length % 5 != 0)
            return;
        /**
         * @type {{ _id: string, _name: string }[]}
         */
        const suggestions = await fetch(`/inventions/suggest?q=${searcher.value}`).then(r => r.json());
        console.log(suggestions);
        if(suggestions.length == 0)
            return;
        loadIntoSuggester(suggestions);
    });
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("suggestion")) {

            const id = e.target.dataset.id;
            const name = e.target.dataset.name;

            console.log(`Kivalasztva: ${name}`);
        }
    });
}