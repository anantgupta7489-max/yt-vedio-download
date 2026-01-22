const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'youtube-dlp-api.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    mainBtn.innerHTML = "YT-DLP SEARCHING...";
    resultArea.innerHTML = "";

    try {
        //
        const response = await fetch(`https://${API_HOST}/info?url=${encodeURIComponent(videoUrl)}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();
        console.log("yt-dlp Debug:", data);

        // yt-dlp often hides the best link in the 'formats' array
        const downloadLink = data.url || (data.formats && data.formats.find(f => f.ext === 'mp4' && f.url)?.url);

        if (downloadLink) {
            resultArea.innerHTML = `
                <div class="dl-container" style="margin-top: 25px; text-align: center;">
                    <div style="background: #111; padding: 30px; border: 1px solid #333; border-radius: 20px;">
                        <h3 style="color: #fff; margin-bottom: 15px;">Video Link Extracted</h3>
                        <a href="${downloadLink}" target="_blank" class="download-btn" 
                           style="background: #fff; color: #000; padding: 15px 40px; border-radius: 100px; text-decoration: none; font-weight: 900;">
                           DOWNLOAD NOW
                        </a>
                    </div>
                </div>`;
        } else {
            //
            alert("yt-dlp Note: This specific video has a restricted stream. Try a different video link.");
        }
    } catch (error) {
        alert("API Error: Check your RapidAPI subscription for yt-dlp.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
