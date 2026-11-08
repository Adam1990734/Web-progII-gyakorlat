const searcher = document.getElementById("searcher");
const suggestions = document.getElementById("suggestions");
const selectedContainer = document.getElementById("selected-inventions");

let timeout;

if(selectedInventions && selectedInventions.length !== 0)
    renderSelected()

searcher.addEventListener("input", (e) => {
    const query = e.target.value;

    clearTimeout(timeout);

    if (query.trim().length < 2) {
        suggestions.innerHTML = "";
        return;
    }

    timeout = setTimeout(async () => {
        try {
            const response = await fetch(
                `/crud/inventions/suggest?name=${encodeURIComponent(query)}`
            );

            const inventions = await response.json();

            suggestions.innerHTML = "";

            inventions.forEach((invention) => {
                const button = document.createElement("button");

                button.type = "button";
                button.textContent = invention.name;

                button.addEventListener("click", () => {
                    addInvention(invention);
                });

                suggestions.appendChild(button);
            });
        } catch (error) {
            console.error(error);
        }
    }, 400);
});

function addInvention(invention) {
    const exists = selectedInventions.some(
        i => i.id === invention.id
    );

    if (exists)
        return;

    selectedInventions.push(invention);

    searcher.value = "";
    suggestions.innerHTML = "";

    renderSelected();
}

function removeInvention(id) {
    selectedInventions = selectedInventions.filter(
        invention => invention.id !== id
    );
    renderSelected();
}

function renderSelected() {
    selectedContainer.innerHTML = "";

    selectedInventions.forEach((invention) => {
        const wrapper = document.createElement("div");

        const name = document.createElement("span");
        name.textContent = invention.name;

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.textContent = "X";

        removeButton.addEventListener("click", () => {
            removeInvention(invention.id);
        });
        
        const hiddenInput = document.createElement("input");
        hiddenInput.type = "hidden";
        hiddenInput.name = "inventions[]";
        hiddenInput.value = invention.id;

        wrapper.appendChild(name);
        wrapper.appendChild(removeButton);
        wrapper.appendChild(hiddenInput);

        selectedContainer.appendChild(wrapper);
    });
}