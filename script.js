const API_KEY = 'YOUR_ACTUAL_RAPIDAPI_KEY_HERE';
const API_HOST = 'social-download-all-in-one.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    mainBtn.innerHTML = "WORKING...";
    resultArea.innerHTML = "";

    try {
        // Using the Social Download All In One endpoint
        const response = await fetch(`https://${API_HOST}/v1/social/autodownload?url=${encodeURIComponent(videoUrl)}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();
        console.log("API Debug:", data);

        // Smart Link Finder: Checks all possible data paths
        const finalLink = data.url || (data.medias && data.medias[0].url);

        if (finalLink) {
            resultArea.innerHTML = `
                <div class="download-grid">
                    <div class="dl-card">
                        <p>High Quality Ready</p>
                        <a href="${finalLink}" target="_blank" class="download-btn">DOWNLOAD NOW</a>
                    </div>
                </div>`;
        } else {
            // Displays specific error from API if it fails
            alert("API Note: " + (data.message || "Link could not be generated. Please check your RapidAPI dashboard."));
        }
    } catch (error) {
        alert("Connection failed. Check your API key or internet.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
