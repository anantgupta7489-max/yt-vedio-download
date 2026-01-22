// Replace with your Apify API Token from console.apify.com
const API_TOKEN = 'YOUR_APIFY_TOKEN';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    mainBtn.innerHTML = "SOLVING SECURITY...";
    resultArea.innerHTML = "";

    try {
        //
        const response = await fetch(`https://api.apify.com/v2/acts/streamers~youtube-downloader/run-sync-get-dataset-items?token=${API_TOKEN}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "downloadMode": "video",
                "youtubeUrl": videoUrl
            })
        });

        const data = await response.json();
        console.log("Apify Result:", data);

        // Apify returns an array of found formats
        if (data && data[0] && data[0].url) {
            const downloadUrl = data[0].url;

            resultArea.innerHTML = `
                <div class="dl-card" style="margin-top:20px; text-align:center; border: 2px solid #333; padding: 25px; border-radius: 15px;">
                    <p style="color:#00ff00; font-weight:bold; margin-bottom:15px;">BYPASS SUCCESSFUL</p>
                    <a href="${downloadUrl}" target="_blank" class="download-btn" 
                       style="background:#fff; color:#000; padding:15px 40px; border-radius:50px; text-decoration:none; font-weight:bold; display:inline-block;">
                       DOWNLOAD NOW
                    </a>
                </div>`;
        } else {
            alert("The security layer is still blocking this video. Try a different format or resolution.");
        }
    } catch (error) {
        alert("API Connection Failed. Ensure your Apify Token is active.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
