/**
 * @type {HTMLSelectElement}
 */
const suggester = document.getElementById("suggester");

/**
 * @type {HTMLInputElement}
 */
const searcher = document.getElementById("searcher");

/**
 * @type {HTMLDivElement}
 */
const selected = document.getElementById("selected");

/**
 * 
 * @param {{ id: string, name: string }} suggestion
 * @returns {string}
 */
function suggestionToHtml(suggestion) {
    const html = `
    <option class="suggestion" value="${suggestion._id}">
        ${suggestion._name}
    </option>
    `;
    return html;
}

function addToSelected(option) {
    const tag = document.createElement("div");

    const text = document.createElement("span");
    text.textContent = option.text;

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.textContent = "x";

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.name = "inventions";
    hiddenInput.value = option.value;

    removeBtn.addEventListener("click", () => {
        suggester.appendChild(option);
        tag.remove();
    });

    tag.append(text, removeBtn, hiddenInput);
    selected.appendChild(tag);
}

function loadIntoSuggester(suggestions) {
    suggester.innerHTML = "";
    suggestions.forEach(s => {
        const html = suggestionToHtml(s);
        suggester.innerHTML += html;
    });
}

if (searcher && suggester && selected) {
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
    suggester.addEventListener("change", (e) => {
        const option = e.target.options[e.target.selectedIndex];
        addToSelected(option);
        option.remove();
    });
}