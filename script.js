const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'social-download-all-in-one.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    mainBtn.innerHTML = "FETCHING...";
    resultArea.innerHTML = "";

    try {
        // The specific endpoint path from your dashboard test
        const response = await fetch(`https://${API_HOST}/api-endpoint/social-download-all-in-one`, {
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
        
        // This targets the 'url' property found in your '200 OK' JSON
        if (data.url) {
            resultArea.innerHTML = `
                <div class="download-grid">
                    <div class="dl-card" style="background: #111; padding: 30px; border: 1px solid #333; border-radius: 20px; text-align: center;">
                        <h2 style="margin-bottom: 20px;">Media Link Generated</h2>
                        <a href="${data.url}" target="_blank" class="download-btn" style="background: #fff; color: #000; padding: 15px 40px; border-radius: 100px; text-decoration: none; font-weight: 900;">DOWNLOAD NOW</a>
                    </div>
                </div>`;
        } else {
            alert("API Note: " + (data.message || "Endpoint reached, but no link was returned. Check your API subscription."));
        }
    } catch (error) {
        alert("Connection Error. Please verify your API key is active.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
