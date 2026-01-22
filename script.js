const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'social-download-all-in-one.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    mainBtn.innerHTML = "Working...";
    resultArea.innerHTML = "";

    try {
        // Updated to the base URL shown in your successful '200 OK' test
        const response = await fetch(`https://${API_HOST}/`, {
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
        console.log("Response Data:", data);

        // Accessing 'url' directly as seen in your JSON test results
        if (data.url) {
            resultArea.innerHTML = `
                <div class="download-grid" style="margin-top: 20px;">
                    <div class="dl-card" style="background: #111; padding: 20px; border-radius: 15px; border: 1px solid #333;">
                        <h2 style="font-size: 1.5rem; margin-bottom: 15px;">Media Found</h2>
                        <a href="${data.url}" target="_blank" class="download-btn" style="background: #fff; color: #000; padding: 10px 25px; border-radius: 50px; text-decoration: none; font-weight: bold;">DOWNLOAD NOW</a>
                    </div>
                </div>`;
        } else {
            alert("API Note: " + (data.message || "Link not found. Please check your RapidAPI dashboard limits."));
        }
    } catch (error) {
        alert("Connection Error. Make sure you are subscribed to this API on RapidAPI.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
