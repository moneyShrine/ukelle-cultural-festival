function renderUkelleClans(containerId) {
    const container = document.getElementById(containerId);
    if (!container || typeof ukelleData !== 'object') {
        console.error('Invalid container ID or ukelleData not found');
        return;
    }

    container.style.display = "flex";
    container.style.flexWrap = "wrap";
    container.style.gap = "1rem";

    for (const [clan, villages] of Object.entries(ukelleData)) {
        const card = document.createElement("div");
        card.style.width = "320px";
        card.style.border = "1px solid #ccc";
        card.style.borderRadius = "10px";
        card.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
        card.style.padding = "1rem";
        card.style.transition = "transform 0.4s ease, opacity 0.4s ease";
        card.style.background = "#fff";
        card.style.fontFamily = "Segoe UI, sans-serif";

        const header = document.createElement("div");
        header.innerText = clan;
        header.style.fontWeight = "bold";
        header.style.fontSize = "1.1rem";
        header.style.cursor = "pointer";
        header.style.marginBottom = "0.5rem";

        const list = document.createElement("ul");
        list.style.display = "none";
        list.style.paddingLeft = "1rem";
        list.style.transition = "max-height 0.5s ease";
        list.style.maxHeight = "0";
        list.style.overflow = "hidden";
        list.style.marginTop = "0.5rem";

        villages.forEach(village => {
        const item = document.createElement("li");
        item.innerText = village;
        item.style.padding = "0.2rem 0";
        item.style.fontSize = "0.95rem";
        list.appendChild(item);
        });

        header.addEventListener("click", () => {
        if (list.style.display === "none") {
            list.style.display = "block";
            setTimeout(() => list.style.maxHeight = "1000px", 10);
        } else {
            list.style.maxHeight = "0";
            setTimeout(() => list.style.display = "none", 500);
        }
        });

        card.appendChild(header);
        card.appendChild(list);
        container.appendChild(card);
    }
}
