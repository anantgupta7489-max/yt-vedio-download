const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    let videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    // Step 1: Extract only the ID to avoid tracking parameters that trigger security
    let videoId = "";
    if (videoUrl.includes('youtu.be/')) {
        videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
    } else if (videoUrl.includes('v=')) {
        videoId = videoUrl.split('v=')[1].split('&')[0];
    } else {
        videoId = videoUrl.split('/').pop().split('?')[0];
    }

    mainBtn.innerHTML = "UNLOCKING STREAM...";
    resultArea.innerHTML = "";

    try {
        // Step 2: Use the /dl endpoint which is designed for high-security bypass
        const response = await fetch(`https://${API_HOST}/dl?id=${videoId}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();
        
        // Step 3: Parse the format-specific links
        if (data.status === 'OK' && data.link) {
            // Priority: 720p (22), then 360p (18), then any available
            const finalDownloadLink = data.link["22"] || data.link["18"] || Object.values(data.link)[0][0];

            resultArea.innerHTML = `
                <div class="dl-container" style="margin-top:20px; text-align:center;">
                    <div style="background:#000; padding:25px; border:1px solid #333; border-radius:15px;">
                        <p style="color:#0f0; margin-bottom:15px; font-weight:bold;">SECURITY BYPASSED</p>
                        <a href="${finalDownloadLink}" target="_blank" class="download-btn" 
                           style="background:#fff; color:#000; padding:12px 35px; border-radius:50px; text-decoration:none; font-weight:900; display:inline-block;">
                           DOWNLOAD NOW
                        </a>
                    </div>
                </div>`;
        } else {
            alert("Bypass Error: " + (data.msg || "YouTube's latest security patch is blocking this video."));
        }
    } catch (error) {
        alert("Connection Error: Please check your internet or API subscription.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
