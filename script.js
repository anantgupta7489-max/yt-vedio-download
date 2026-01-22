const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    const videoId = videoUrl.includes('youtu.be/') ? 
                    videoUrl.split('youtu.be/')[1].split('?')[0] : 
                    videoUrl.split('v=')[1]?.split('&')[0];
    
    if (!videoId) return alert("Please paste a valid YouTube link.");

    // Animation: Change button state
    mainBtn.innerText = "🚀 Generating Link...";
    mainBtn.style.transform = "scale(0.95)";
    resultArea.innerHTML = "";

    try {
        // Calling the correct Download endpoint verified in your screenshot
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
                <div class="download-card">
                    <h4>${data.title}</h4>
                    <p>Format: MP4 (High Quality)</p>
                    <a href="${data.link}" target="_blank" class="glow-button">
                        DOWNLOAD NOW
                    </a>
                </div>`;
        } else {
            // Displays specific error messages from the API
            alert("API Note: " + (data.msg || "Check your RapidAPI subscription."));
        }
    } catch (error) {
        alert("Connection Error. Please check your internet.");
    } finally {
        mainBtn.innerText = "Get Download Links →";
        mainBtn.style.transform = "scale(1)";
    }
}
