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
      max-height: 100rem;
      opacity: 1;
      transform: scale(1);
    }
    .ukelle-village {
      background: #ffffff
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

  const ukelleData = {
    "WANIBOLOR CLAN": [
      "Uzegbe, Wanibolor", "Umunoha", "Oyelekpe", "Onitsha", "Idum Wanibolor",
      "Ekpok", "Opianka", "Lemodah", "Ogborja Wanibolor", "Ehuku",
      "Adum Wanibolor", "Onyogbe Wanibolor", "Igbeji Wanibolor", "Enugu Wanibolor", "Alomolor",
      "Ehik", "Ejegbudu", "Igelle-Igbo", "Okakala Igbo", "Igbo main village",
      "Ibila Igbo", "Omumuyi/Bakassy"
    ],
    "EZEKWE CLAN": [
      "UCHU", "USALUMA", "UZELEMA", "OTAM", "WAREM", "IKE", "UZUZOM", "UZULOKWONG", "UGALE", "UKWEKWE",
      "OBERRE", "ODOH", "UWERO", "ENYADROGOR", "IBAKPA", "AKATAKA", "UJISHEM", "BEFOM", "ELU YEH ODOM", 
      "ABUJA", "ELU YEH OSHIBE", "OGARIGBEDE"
    ],
    "IWANGO CLAN": [
      "Ezokobe", "Ladi", "Ugwaba", "Ilegohi", "Oyeije", "Okom", "Emene", "Alubuya", "Etok Alihin", "Lebat Okom",
      "Okakala Iwango", "Ahakabene", "Oleleng", "Mission", "Obat Iwango", "Ugwaba Obat", "Lebat Ube", "Lio Ochim",
      "Touk", "Ikpopo", "Obat Ebi", "Alulegabu", "Okolibiaogohok", "Enugu obat", "Okuku Obat Ebi", "Makilipi Okakala",
      "Lema ukelle", "Ikbapa", "Onyebe", "GRA", "Ukbepe 1", "Ubepe 2", "Ndeyuma", "Abangwa", "Adum Iwango", 
      "Ebi Iwango", "Idah", "Ukpohi"
    ],
    "Ujokom Clan": [
      "Elu-Ujokom", "Otomachala", "Ngolome", "Ujagatogolo", "Ukunde", "Elu Ugbala", "Ojakobuok", "kilu-dujuom",
      "Kilu-kasege", "Keta-oke", "Dekot-Ijo", "Kilu-doyongho", "Kilu-otitial", "Ogobi", "Ndeme", "Ufakilu",
      "Kilu-keror", "Kilu-butuon", "Kilu-dorcha bisuku", "Olom-bokaat"
    ],
    "WANEKPE/ICHAJIL CLAN": [
      "Olekpe", "Ebibi", "Ndehiuma", "Abakpa", "Ndebo", "Ehugbo Yalebang", "Ehugbo Yutiti", "Inehi", "Ijachil Ubet",
      "Ngaleke Ichajil", "Asaba Ichajil", "Ichajilalekot", "Asibutu", "Kiluaveng", "Tokolo-Asala", "Izegeh", 
      "Ahakabeneh Ichajil"
    ],
    "EZOKOBE CLAN": [
      "Wanubu-Atokoloasala", "Wanubu-Kiluaveng", "Ugaga", "Imote", "Imada", "Ahakabene", "Wanabiham-Atokolasala",
      "Wanabiham Akuma", "Kilu-Ugbala", "Idum", "Wanogana", "Ekooko", "Ippe", "Abalike-Wanokom", "Ngidi-Ezokobe",
      "Ikweleck Ezo", "Ikweleck Ohakala", "Ngidi-Wakaheke", "Obataluwee", "Okoolor", "Ikemoha", "Utele", "Kukupato",
      "Agbokizi", "Utikili", "Okpaka", "Ekpokpotal", "Okpaka Wakaheke", "Ulum", "Ogbala", "Odagbudu", "Oleleng", 
      "Ngbo", "Okpakala", "Uhakilu", "Adom-Uhakilu", "Imajene", "Asaba", "Owawelu-Utikili"
    ],
    "ADUM CLAN": [
      "Obengha", "Idoma", "Ihu", "Obatiku", "Wakaheke", "Idah", "Panya", "Ngidi-Adum", "Bitutum", "Ngaleke", 
      "Amakibet", "Ekom", "Wanekpong- atokolosalah", "Ndogodo", "Wanekpong-acalabar", "Ukpohi", "Ogbodu", 
      "Wanadan-kiluaveng", "Abaka", "Azenne", "Wanadan-atokolasalah", "Wanozor", "Igbegi", "Ukolobia", 
      "Ocisama", "Bansara"
    ]
  };


  function createVillageItems(villages) {
    return villages.map(village => `
      <div class="ukelle-village">
        <h4>${village}</h4>
        <p>A peaceful and culturally significant village known for strong traditions and local unity.</p>
      </div>
    `).join('');
  }


  window.renderUkelleVillages = function (containerId) {
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
      const villages = ukelleData[clan];
      const clanDiv = document.createElement('div');
      const uniqueId = `ukelle-villages-${index}`;

      clanDiv.className = 'ukelle-clan';
      clanDiv.innerHTML = `
        <button class="ukelle-btn" data-target="${uniqueId}">${clan}</button>
        <div id="${uniqueId}" class="ukelle-villages">
          ${createVillageItems(villages)}
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
