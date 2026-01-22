// Configuration from your successful test
const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_URL = 'https://social-download-all-in-one.p.rapidapi.com/v1/social/autodownload';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    mainBtn.innerHTML = "Working...";
    resultArea.innerHTML = "";

    try {
        // This MUST be a POST request to match your '200 OK' dashboard test
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'social-download-all-in-one.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url: videoUrl })
        });

        const data = await response.json();
        
        // This targets the 'url' property exactly as shown in your test results
        if (data.url) {
            resultArea.innerHTML = `
                <div class="dl-container" style="margin-top: 25px; text-align: center;">
                    <a href="${data.url}" target="_blank" class="download-btn" 
                       style="background: #fff; color: #000; padding: 15px 40px; border-radius: 50px; text-decoration: none; font-weight: 900;">
                       DOWNLOAD NOW
                    </a>
                </div>`;
        } else {
            alert("API Note: " + (data.message || "Link not found. Ensure the video is public."));
        }
    } catch (error) {
        alert("Connection Error. Check your RapidAPI subscription.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
