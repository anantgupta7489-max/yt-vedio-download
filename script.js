// Your New API Configuration
const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'social-download-all-in-one.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    // Visual feedback
    mainBtn.innerHTML = "Processing...";
    resultArea.innerHTML = "";

    try {
        // This API requires a POST request as shown in your dashboard
        const response = await fetch(`https://${API_HOST}/v1/social/autodownload`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            },
            body: JSON.stringify({
                url: videoUrl
            })
        });

        const data = await response.json();
        console.log("API Response:", data);

        // Accessing the link from the "url" key seen in your test
        if (data.url) {
            resultArea.innerHTML = `
                <div class="download-grid">
                    <div class="dl-card">
                        <p>High Quality Link Found</p>
                        <a href="${data.url}" target="_blank" class="download-btn">DOWNLOAD NOW</a>
                    </div>
                </div>`;
        } else {
            // Error handling to prevent the generic "Check Dashboard" popup
            alert("API Error: " + (data.message || "Link not found. Ensure the video is public."));
        }
    } catch (error) {
        console.error(error);
        alert("Connection failed. Check your API subscription.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
