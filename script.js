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

    mainBtn.innerHTML = "Working...";
    resultArea.innerHTML = "";

    try {
        //
        const response = await fetch(`https://${API_HOST}/dl?id=${videoId}&cgeo=US`, {
            method: 'GET',
            headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST }
        });

        const data = await response.json();

        if (data.status === 'OK' && data.link) {
            resultArea.innerHTML = `
                <div class="download-grid">
                    <div class="dl-card">
                        <h2>Video</h2>
                        <p>MP4 Ultra HD</p>
                        <a href="${data.link}" target="_blank" style="background:#fff; color:#000; padding:10px 25px; border-radius:50px; text-decoration:none; font-weight:bold;">DOWNLOAD</a>
                    </div>
                    <div class="dl-card">
                        <h2>Audio</h2>
                        <p>MP3 High Quality</p>
                        <a href="${data.link}" target="_blank" style="background:#fff; color:#000; padding:10px 25px; border-radius:50px; text-decoration:none; font-weight:bold;">DOWNLOAD</a>
                    </div>
                </div>`;
        } else {
            alert(data.msg || "API Error: Check Dashboard.");
        }
    } catch (error) {
        alert("Connection failed.");
    } finally {
        mainBtn.innerHTML = 'Generate Link <span class="arrow">→</span>';
    }
}
