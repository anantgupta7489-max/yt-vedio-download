const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

function pasteLink() {
    navigator.clipboard.readText().then(text => {
        document.getElementById('videoUrl').value = text;
    });
}

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    // Extract ID from URL
    const videoId = videoUrl.split('v=')[1]?.split('&')[0] || videoUrl.split('/').pop();
    
    if (!videoId) return alert("Please enter a valid link");

    mainBtn.innerText = "Processing...";
    resultArea.innerHTML = "";

    const url = `https://${API_HOST}/dl?id=${videoId}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data.status === 'OK') {
            resultArea.innerHTML = `
                <div class="download-card">
                    <img src="${data.thumbnail[0].url}" style="width:100%; border-radius:10px; margin-bottom:10px;">
                    <h4>${data.title}</h4>
                    <p style="font-size:0.8rem; color:#888;">Format: MP4 (Video)</p>
                    <a href="${data.link}" target="_blank" class="dl-btn">Download Now</a>
                </div>
            `;
        } else {
            alert("API Error: " + (data.msg || "Could not fetch video"));
        }
    } catch (error) {
        console.error(error);
        alert("Failed to connect to API");
    } finally {
        mainBtn.innerText = "Get Download Links →";
    }
}
