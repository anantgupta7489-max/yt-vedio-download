const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    // Extracting ID from your YouTube link
    const videoId = videoUrl.includes('youtu.be/') ? 
                    videoUrl.split('youtu.be/')[1].split('?')[0] : 
                    videoUrl.split('v=')[1]?.split('&')[0];
    
    if (!videoId) return alert("Please paste a valid YouTube link.");

    mainBtn.innerText = "Connecting...";
    resultArea.innerHTML = "Working...";

    try {
        // We must use 'dl' and include 'cgeo' to get the download link
        const response = await fetch(`https://${API_HOST}/dl?id=${videoId}&cgeo=US`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();

        if (data.status === 'OK' && data.link) {
            resultArea.innerHTML = `
                <div style="background:#161625; padding:20px; border-radius:15px; border:2px solid #6366f1; margin-top:20px;">
                    <h4 style="color:white;">${data.title}</h4>
                    <a href="${data.link}" target="_blank" style="display:block; text-align:center; background:#6366f1; color:white; padding:12px; text-decoration:none; border-radius:10px; font-weight:bold; margin-top:10px;">
                        Download Now
                    </a>
                </div>`;
        } else {
            // This message tells you exactly what to do next
            alert("API Note: " + (data.msg || "The API key needs a manual test on the dashboard to activate."));
        }
    } catch (error) {
        alert("Check your internet connection.");
    } finally {
        mainBtn.innerText = "Get Download Links →";
    }
}

