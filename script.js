'use strict'

const searchInput = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");
const containerUrl = document.querySelector('.container_url');


const apiKey = '3e00adc055mshedff2f9b7f82175p1e6212jsn745997b83f5a';
let urlCheck = '';

const init = () => {
  const modalUrl = document.querySelector('.modal_url');
  modalUrl.remove();
};


// Search button
searchButton.addEventListener("click", function() {
const query = searchInput.value;
if (query === '') { 
  containerUrl.style.opacity = 0;
  return;
} else {
 let lowerCase = query.toLowerCase();
 urlCheck = lowerCase;
 fetchData() 
  } 
});

  // Search Enter button
  const keyFunc = () => {
    document.addEventListener("keydown", function (e) {
      if (e.key === '') {
        e.preventDefault();
      }
      if (e.key === "Enter") {
        searchButton.click();
    }
  })
}
keyFunc();

const options = {
	method: 'GET',
	headers: { 
		'X-RapidAPI-Key': `${apiKey}`,
		'X-RapidAPI-Host': 'exerra-phishing-check.p.rapidapi.com'
	}
};

// fetch data
async function fetchData() {
  try {
    const res = await fetch(`https://exerra-phishing-check.p.rapidapi.com/?url=${urlCheck}`, options);
    if(!res.ok) {
      throw new Error('🚨 Please write a full link (start with http:// or https://)');
    }
    const data = await res.json();
    init();
    document.querySelector('.error').textContent = '';
     // render elements 
     renderCountry(data);
  } catch (error) {
    console.error('Error fetching data:',error);
    document.querySelector('.error').textContent = `${error}`;
  }
}


// Render elements
  const renderCountry = function(data) {
    let icon = '';
   const html = `
      <article class="card modal_url">
      <div class="card-body shadow py-5 px-5">
      <h4 class="card-title">Site: ${urlCheck.replace("tt", "xx")}</h4>
      <div class="flex-container d-flex flex-row  gap-3 align-items-center py-3">
      <p class="card-title fs-1 fw-bold">${data.data.isScam === false ? `<ion-icon color="warning" name="shield-checkmark"></ion-icon>` : `<ion-icon color="danger" name="warning"></ion-icon>`}</p>
      <h2 class="result__url card-title fs-1 fw-bold">${data.data.isScam === false ? `It's Safe` : `It's a Phishing Scam!`}</h2>
      </div>      
      </div>
      </div>
    </article>`;
    containerUrl.insertAdjacentHTML('beforeend', html);
    containerUrl.style.opacity = 1;
    const Alerttext = document.querySelector('.result__url');
    data.data.isScam === false ? Alerttext.style.color = '#198754' : Alerttext.style.color = '#dc3545';
    data.data.isScam === false ? divNoscam() : divWarning();
  }
   // NOT a Phishing
    function divNoscam()  {
      const htmlAttention = `
      <div class="div_attention">
      <h4 class="lh-lg">Please follow next steps:</h4>
      <ul class="attention-ul fs-5 text-dark lh-lg">
       <li>Our information may not always be accurate.</li>
       <li>Make sure the website starts with "https://" instead of "http://"</li>
       <li>Search for the website on Google instead of clicking on links in unfamiliar emails or messages. </li>
       <li>Don't provide personal or sensitive information on websites you're unsure about.</li>
       <li>Easily double-check website using <a class="report" href="https://www.virustotal.com/gui/home/url" target="_blank">Virus Total</a>(Google).</li>
       <li>Keep your software up-to-date.</li>
       </ul>
      </div>`;
      const modalFlex = document.querySelector('.flex-container');
      modalFlex.insertAdjacentHTML("afterend", htmlAttention);
    }


    // It's a phishing
    function divWarning()  {
      const htmlAttention = `
      <div class="div_attention">
      <h4 class="lh-lg">Please follow next steps:</h4>
      <ul class="attention-ul fs-5 text-dark lh-lg">
       <li>Don't provide any personal information.</li>
       <li>Report the site to the authorities, such as your bank, about the website.</li>
       <li>Close the site immediately.</li>
       <li>Scan your device for potential threats.</li>
       <li>Regularly monitor your accounts for unauthorized activity and report any suspicious activity.</li>
       <li>Helps people protect themselves against phishing & easily <a class="report" href="https://safebrowsing.google.com/safebrowsing/report_phish/" target="_blank">report the site to Google</a></li>
       </ul>
      </div>`;
      const modalFlex = document.querySelector('.flex-container');
      modalFlex.insertAdjacentHTML("afterend", htmlAttention);
    }


