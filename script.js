const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    const videoId = videoUrl.includes('youtu.be/') ? 
                    videoUrl.split('youtu.be/')[1].split('?')[0] : 
                    videoUrl.split('v=')[1]?.split('&')[0];
    
    if (!videoId) return alert("Please enter a valid link!");

    mainBtn.innerText = "Processing...";
    resultArea.innerHTML = "";

    try {
        // Correct endpoint /dl with mandatory cgeo=US
        const response = await fetch(`https://${API_HOST}/dl?id=${videoId}&cgeo=US`, {
            method: 'GET',
            headers: { 'x-rapidapi-key': API_KEY, 'x-rapidapi-host': API_HOST }
        });

        const data = await response.json();

        if (data.status === 'OK' && data.link) {
            resultArea.innerHTML = `
                <div class="download-result">
                    <p style="margin-bottom:10px;">Ready: ${data.title}</p>
                    <a href="${data.link}" target="_blank" 
                       style="display:inline-block; background:#fff; color:#000; padding:10px 20px; text-decoration:none; border-radius:50px; font-weight:bold;">
                       CLICK TO DOWNLOAD
                    </a>
                </div>`;
        } else {
            // Displays specific error if manual activation is still needed
            alert(data.msg || "Check API Subscription");
        }
    } catch (error) {
        alert("Connection Error");
    } finally {
        mainBtn.innerText = "Generate Link →";
    }
}
