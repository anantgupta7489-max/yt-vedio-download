const API_KEY = 'YOUR_RAPIDAPI_KEY_HERE';
const API_HOST = 'youtube-dlp-api.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    mainBtn.innerHTML = "EXTRACTING VIA YT-DLP...";
    resultArea.innerHTML = "";

    try {
        // Calling the yt-dlp info endpoint
        const response = await fetch(`https://${API_HOST}/info?url=${encodeURIComponent(videoUrl)}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();
        console.log("yt-dlp Data:", data);

        // yt-dlp returns the best quality link in the 'url' or 'formats' field
        const finalLink = data.url || (data.formats && data.formats.pop().url);

        if (finalLink) {
            resultArea.innerHTML = `
                <div class="dl-container">
                    <div class="dl-card">
                        <p>STABLE LINK EXTRACTED</p>
                        <a href="${finalLink}" target="_blank" class="download-btn">DOWNLOAD NOW</a>
                    </div>
                </div>`;
        } else {
            alert("yt-dlp could not find a stream for this URL.");
        }
    } catch (error) {
        alert("API Connection Error. Verify subscription on RapidAPI.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
