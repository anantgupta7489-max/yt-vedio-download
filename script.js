const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

function pasteLink() {
    navigator.clipboard.readText().then(text => document.getElementById('videoUrl').value = text);
}

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    // Extracting ID correctly from the link in your screenshot
    const videoId = videoUrl.includes('youtu.be/') ? videoUrl.split('/').pop().split('?')[0] : videoUrl.split('v=')[1]?.split('&')[0];
    
    if (!videoId) return alert("Invalid YouTube link!");

    mainBtn.innerText = "Searching...";

    try {
        const response = await fetch(`https://${API_HOST}/dl?id=${videoId}`, {
            method: 'GET',
            headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST }
        });
        const data = await response.json();

        if (data.status === 'OK') {
            resultArea.innerHTML = `
                <div class="download-card">
                    <img src="${data.thumbnail[0].url}" style="width:100%; border-radius:10px; margin-bottom:10px;">
                    <h4>${data.title}</h4>
                    <a href="${data.link}" target="_blank" class="dl-btn">Download MP4</a>
                </div>`;
        } else {
            alert("Error: " + data.msg);
        }
    } catch (e) {
        alert("Make sure you are subscribed to the /dl endpoint in RapidAPI!");
    } finally {
        mainBtn.innerText = "Get Video Info →";
    }
}
