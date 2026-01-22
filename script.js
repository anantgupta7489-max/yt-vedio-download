// New API Configuration
const API_KEY = 'YOUR_RAPIDAPI_KEY_HERE';
const API_HOST = 'download-all-in-one1.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    mainBtn.innerHTML = "FETCHING...";
    resultArea.innerHTML = "";

    try {
        const response = await fetch(`https://${API_HOST}/api/allinone`, {
            method: 'POST',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: videoUrl
            })
        });

        const data = await response.json();
        console.log("New API Data:", data);

        // This API returns a 'video' field directly
        if (data.status && data.video) {
            resultArea.innerHTML = `
                <div class="download-result" style="margin-top:20px; text-align:center;">
                    <div style="background:#111; padding:20px; border-radius:15px; border:1px solid #333;">
                        <h3 style="color:#fff; margin-bottom:15px;">Video Found!</h3>
                        <a href="${data.video}" target="_blank" class="download-btn" 
                           style="background:#fff; color:#000; padding:12px 30px; border-radius:50px; text-decoration:none; font-weight:bold; display:inline-block;">
                           DOWNLOAD MP4
                        </a>
                    </div>
                </div>`;
        } else {
            alert("Error: " + (data.message || "Could not retrieve video."));
        }
    } catch (error) {
        alert("Connection failed. Please ensure you are subscribed to 'Download All In One!' on RapidAPI.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
