const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    const videoId = videoUrl.includes('youtu.be/') ? 
                    videoUrl.split('youtu.be/')[1].split('?')[0] : 
                    videoUrl.split('v=')[1]?.split('&')[0];
    
    if (!videoId) return alert("Please enter a valid link.");

    mainBtn.innerText = "PREPARING...";
    resultArea.innerHTML = "";

    try {
        // Requesting download links via the verified endpoint
        const response = await fetch(`https://${API_HOST}/dl?id=${videoId}&cgeo=US`, {
            method: 'GET',
            headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST }
        });

        const data = await response.json();

        if (data.status === 'OK' && data.link) {
            resultArea.innerHTML = `
                <div class="dl-grid">
                    <div class="dl-card">
                        <h2>4K MP4</h2>
                        <p>High Resolution Video</p>
                        <a href="${data.link}" target="_blank" class="dl-btn" style="color:black; background:white; padding:12px 25px; border-radius:50px; font-weight:900; text-decoration:none;">GET VIDEO</a>
                    </div>
                    <div class="dl-card">
                        <h2>HQ MP3</h2>
                        <p>Crystal Clear Audio</p>
                        <a href="${data.link}" target="_blank" class="dl-btn" style="color:black; background:white; padding:12px 25px; border-radius:50px; font-weight:900; text-decoration:none;">GET AUDIO</a>
                    </div>
                </div>`;
        } else {
            // Error handling for subscription or activation notes
            alert(data.msg || "API initialization required on dashboard.");
        }
    } catch (error) {
        alert("Connection lost. Please try again.");
    } finally {
        mainBtn.innerText = "Generate Link →";
    }
}
