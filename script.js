const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    const videoId = videoUrl.includes('youtu.be/') ? 
                    videoUrl.split('youtu.be/')[1].split('?')[0] : 
                    videoUrl.split('v=')[1]?.split('&')[0];
    
    if (!videoId) return alert("Please enter a valid YouTube link!");

    mainBtn.innerText = "Generating...";
    resultArea.innerHTML = "";

    try {
        // Calling the specific Download endpoint with mandatory geo parameter
        const response = await fetch(`https://${API_HOST}/dl?id=${videoId}&cgeo=US`, {
            method: 'GET',
            headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST }
        });

        const data = await response.json();

        if (data.status === 'OK' && data.link) {
            resultArea.innerHTML = `
                <div class="download-result">
                    <h3 style="margin-bottom:15px; color:#fff;">${data.title}</h3>
                    <a href="${data.link}" target="_blank" 
                       style="display:inline-block; background:#fff; color:#000; padding:12px 30px; text-decoration:none; border-radius:50px; font-weight:900; font-size:14px;">
                       DOWNLOAD 4K MP4 / MP3
                    </a>
                </div>`;
        } else {
            // Captures "Manual Test" or "Subscription" errors
            alert(data.msg || "API Error: Please verify dashboard activation.");
        }
    } catch (error) {
        alert("Check your connection.");
    } finally {
        mainBtn.innerText = "Generate Link →";
    }
}
