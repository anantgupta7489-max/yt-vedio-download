const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    // Extract the Video ID correctly from the URL
    const videoId = videoUrl.includes('youtu.be/') ? 
                    videoUrl.split('youtu.be/')[1].split('?')[0] : 
                    videoUrl.split('v=')[1]?.split('&')[0];
    
    if (!videoId) return alert("Please paste a valid YouTube link.");

    mainBtn.innerText = "Generating Link...";
    resultArea.innerHTML = "Working...";

    try {
        // We use the '/dl' endpoint with the 'cgeo' parameter you tested
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
                <div class="download-card" style="background:#161625; padding:20px; border-radius:15px; border:2px solid #6366f1; margin-top:20px; text-align:left;">
                    <h4 style="color:white; margin-bottom:10px;">${data.title}</h4>
                    <a href="${data.link}" target="_blank" class="dl-btn" style="display:block; text-align:center; background:#6366f1; color:white; padding:12px; text-decoration:none; border-radius:10px; font-weight:bold;">
                        Download MP4 Now
                    </a>
                </div>`;
        } else {
            // This captures the exact message if the manual test isn't done yet
            alert("API Note: " + (data.msg || "Please perform the manual test on the RapidAPI dashboard."));
        }
    } catch (error) {
        alert("Connection Error. Please ensure your API key is active.");
    } finally {
        mainBtn.innerText = "Get Download Links →";
    }
}
