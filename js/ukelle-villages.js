
// ukelle-villages.js

(function () {
  const style = document.createElement('style');
  style.textContent = `
    /* Tailwind-like styles scoped to ukelle- prefix */
    .ukelle-container {
      background: linear-gradient(to bottom right, #f3f4f6, #e5e7eb);
      color: #1f2937;
      font-family: sans-serif;
      padding: 2rem;
      border-radius: 1rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      margin-bottom: 2rem;
    }
    .ukelle-title {
      text-align: center;
      font-size: 4rem;
      color: #4f46e5;
      font-weight: bold;
      margin-bottom: 2rem;
    }
    .ukelle-clan {
      background: white;
      border: 1px solid #c7d2fe;
      border-radius: 1rem;
      box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
      margin-bottom: 1.5rem;
    }
    .ukelle-btn {
      text-transform: uppercase;
      display: block;
      width: 100%;
      text-align: left;
      padding: 1rem 1.5rem;
      background-color: #4f46e5;
      color: white;
      font-size: 2.5rem;
      font-weight: 600;
      border-radius: 1rem 1rem 0 0;
      cursor: pointer;
      border: none;
    }
    .ukelle-btn:hover {
      background-color: #4338ca;
    }
    .ukelle-villages {
      overflow: hidden;
      max-height: 0;
      padding: 0 1.5rem;
      transition: max-height 0.5s ease, opacity 0.5s ease, transform 0.5s ease;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 1rem;
      opacity: 0;
      transform: scale(0.97);
    }
    .ukelle-villages.show {
      padding-bottom: 1.5rem;
      padding-top: 1rem;
      max-height: 1000rem;
      opacity: 1;
      transform: scale(1);
    }
    .ukelle-village {
      background: #ffffff;
      padding: 1rem;
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      transition: all 0.3s ease;
    }
    .ukelle-village h4 {
      font-size: 3rem;
      font-weight: 600;
      color: #4338ca;
      margin-bottom: 0.25rem;
    }
    .ukelle-village p {
      font-size: 2.5rem;
      color: #4b5563;
      text-align: justify;
      padding: 1rem;
    }
  `;
  document.head.appendChild(style);

  // ukelleData injected from separate file, ensure it's loaded before calling renderUkelleVillages

  function createVillageItems(villages) {
    return villages.map(village => `
      <div class="ukelle-village">
        <h4>${village}</h4>
        <p>A peaceful and culturally significant village known for strong traditions and local unity.</p>
      </div>
    `).join('');
  }

  window.renderUkelleVillages = function (containerId) {
    if (typeof ukelleData !== 'object') {
      console.error("ukelleData is not available.");
      return;
    }

    const clanNames = Object.keys(ukelleData);
    const container = document.getElementById(containerId);
    if (!container) return;

    const wrapper = document.createElement('div');
    wrapper.className = 'ukelle-container';

    const title = document.createElement('h2');
    title.className = 'ukelle-title';
    title.textContent = 'In the heart of Ukelle, villages bloom with memory and clans breathe tradition';
    wrapper.appendChild(title);

    clanNames.forEach((clan, index) => {
      const villages = ukelleData[clan]; // now an array of { name, message }
      const clanDiv = document.createElement('div');
      const uniqueId = `ukelle-villages-${index}`;

      clanDiv.className = 'ukelle-clan';
      clanDiv.innerHTML = `
        <button class="ukelle-btn" data-target="${uniqueId}">${clan}</button>
        <div id="${uniqueId}" class="ukelle-villages">
          ${villages.map(village => `
            <div class="ukelle-village">
              <h4>${village.name}</h4>
              <p>${village.message}</p>
            </div>
          `).join('')}
        </div>
      `;

      wrapper.appendChild(clanDiv);
    });


    container.appendChild(wrapper);

    // Add toggle listeners
    container.querySelectorAll('.ukelle-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-target');
        const content = document.getElementById(id);
        content.classList.toggle('show');
      });
    });
  };
})();
