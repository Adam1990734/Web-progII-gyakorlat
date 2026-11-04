const searcher = document.getElementById("searcher");
const suggestions = document.getElementById("suggestions");

let timeout;

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

            console.log(suggestions);

            suggestions.innerHTML = "";

            inventions.forEach((invention) => {
                const button = document.createElement("button");
                button.type = "button";
                button.textContent = invention.name;

                button.addEventListener("click", () => {
                    console.log("Selected:", invention);
                });

                suggestions.appendChild(button);
            });
        } catch (error) {
            console.error(error);
        }
    }, 400);
});