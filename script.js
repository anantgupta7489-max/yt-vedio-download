const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    // Extracting the ID from your specific link: https://youtu.be/tKLcFy1HDUA
    const videoId = videoUrl.includes('youtu.be/') ? 
                    videoUrl.split('youtu.be/')[1].split('?')[0] : 
                    videoUrl.split('v=')[1]?.split('&')[0];
    
    if (!videoId) return alert("Please paste a valid YouTube link.");

    mainBtn.innerText = "Searching...";
    resultArea.innerHTML = "";

    try {
        // We MUST use the /dl endpoint for downloading
        const response = await fetch(`https://${API_HOST}/dl?id=${videoId}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();

        // Check if the API sent back a valid download link
        if (data.status === 'OK' && data.link) {
            resultArea.innerHTML = `
                <div class="download-card" style="background:#161625; padding:20px; border-radius:12px; border:2px solid #6366f1; margin-top:20px; text-align:left;">
                    <img src="${data.thumbnail[0].url}" style="width:100%; border-radius:8px; margin-bottom:10px;">
                    <h4 style="color:white;">${data.title}</h4>
                    <a href="${data.link}" target="_blank" class="dl-btn" style="display:block; text-align:center; background:#6366f1; color:white; padding:12px; text-decoration:none; border-radius:8px; margin-top:15px; font-weight:bold;">
                        Download MP4
                    </a>
                </div>
            `;
        } else {
            // This message will show if you haven't activated the /dl endpoint on RapidAPI
            alert("API Error: " + (data.msg || "Please activate 'Download/Streaming Info' on your RapidAPI dashboard."));
        }
    } catch (error) {
        alert("Connection Error. Please check your API key.");
    } finally {
        mainBtn.innerText = "Get Video Info →";
    }
}

function pasteLink() {
    navigator.clipboard.readText().then(text => document.getElementById('videoUrl').value = text);
}
