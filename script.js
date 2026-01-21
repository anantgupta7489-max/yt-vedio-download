const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    // Extracting ID 'tKLcFy1HDUA' from your link: https://youtu.be/tKLcFy1HDUA
    const videoId = videoUrl.includes('youtu.be/') ? 
                    videoUrl.split('youtu.be/')[1].split('?')[0] : 
                    videoUrl.split('v=')[1]?.split('&')[0];
    
    if (!videoId) return alert("Please paste a valid YouTube URL first.");

    mainBtn.innerText = "Processing...";
    resultArea.innerHTML = "";

    // The endpoint you just selected: /dl?id=VIDEO_ID
    const url = `https://${API_HOST}/dl?id=${videoId}`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        // We convert to JSON to read the download link property
        const data = await response.json();

        if (data.status === 'OK' && data.link) {
            resultArea.innerHTML = `
                <div class="download-card" style="background:#161625; padding:20px; border-radius:15px; border:1px solid #6366f1; margin-top:20px; text-align:left;">
                    <img src="${data.thumbnail[0].url}" style="width:100%; border-radius:10px; margin-bottom:15px;">
                    <h4 style="color:white; margin-bottom:10px;">${data.title}</h4>
                    
                    <a href="${data.link}" target="_blank" class="dl-btn" style="display:block; text-align:center; background:#6366f1; color:white; padding:12px; text-decoration:none; border-radius:10px; font-weight:bold;">
                        Download MP4 (Video)
                    </a>
                </div>
            `;
        } else {
            // Catches cases where the API is not yet active or blocked
            alert("API Error: " + (data.msg || "Check your RapidAPI subscription for 'Download' endpoint."));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Connection failed. Please check your internet.");
    } finally {
        mainBtn.innerText = "Get Video Info →";
    }
}

function pasteLink() {
    navigator.clipboard.readText().then(text => {
        document.getElementById('videoUrl').value = text;
    });
}
