const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    // Extract ID from the link you tested: tKLcFy1HDUA
    const videoId = videoUrl.includes('youtu.be/') ? 
                    videoUrl.split('youtu.be/')[1].split('?')[0] : 
                    videoUrl.split('v=')[1]?.split('&')[0];
    
    if (!videoId) return alert("Please paste a valid YouTube link.");

    mainBtn.innerText = "Connecting...";
    resultArea.innerHTML = '<p style="margin-top:20px;">Fetching high-quality links...</p>';

    try {
        // We call the download endpoint which you just verified
        const response = await fetch(`https://${API_HOST}/dl?id=${videoId}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();

        if (data.status === 'OK' && data.link) {
            // Building the result card based on your 'Preview' design
            resultArea.innerHTML = `
                <div class="download-card" style="background:#161625; padding:25px; border-radius:20px; border:2px solid #6366f1; margin-top:30px; text-align:left;">
                    <img src="${data.thumbnail[0].url}" style="width:100%; border-radius:12px; margin-bottom:15px;">
                    <h3 style="color:white; margin-bottom:5px;">${data.title}</h3>
                    <p style="color:#888; font-size:0.85rem; margin-bottom:20px;">Status: Ready for Download</p>
                    
                    <div style="display:grid; gap:10px;">
                        <a href="${data.link}" target="_blank" class="dl-btn" style="background:#6366f1; color:white; padding:15px; text-decoration:none; border-radius:12px; text-align:center; font-weight:bold; font-size:1.1rem;">
                            Download MP4 (Video)
                        </a>
                    </div>
                </div>
            `;
        } else {
            // Handles the 'undefined' error by showing the actual API message
            alert("API Note: " + (data.msg || "Ensure you have clicked 'Subscribe' on the Pricing tab for the free plan."));
        }
    } catch (error) {
        alert("Connection failed. Check your RapidAPI subscription.");
    } finally {
        mainBtn.innerText = "Get Video Info →";
    }
}

function pasteLink() {
    navigator.clipboard.readText().then(text => document.getElementById('videoUrl').value = text);
}
