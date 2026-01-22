const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    let videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    // FIX: This removes the ?si= part that causes the "YouTube Blocked" error
    if (videoUrl.includes('?')) {
        videoUrl = videoUrl.split('?')[0];
    }

    mainBtn.innerHTML = "DECRYPTING...";
    resultArea.innerHTML = "";

    try {
        // Using the most up-to-date API from your list
        const response = await fetch(`https://${API_HOST}/dl?id=${encodeURIComponent(videoUrl)}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();
        
        // Target the link object provided by this specific API
        if (data.status === 'OK' && data.link) {
            const downloadUrl = Object.values(data.link)[0][0]; 
            
            resultArea.innerHTML = `
                <div class="dl-card" style="margin-top:20px; background:#111; padding:30px; border:1px solid #333; border-radius:20px; text-align:center;">
                    <h3 style="color:#fff; margin-bottom:15px;">Video Ready</h3>
                    <a href="${downloadUrl}" target="_blank" class="download-btn" 
                       style="background:#fff; color:#000; padding:12px 35px; border-radius:50px; text-decoration:none; font-weight:bold; display:inline-block;">
                       DOWNLOAD NOW
                    </a>
                </div>`;
        } else {
            alert("Bypass Failed: " + (data.msg || "YouTube security is high for this video. Try another link."));
        }
    } catch (error) {
        alert("API Error: Check your 'YT-API' subscription.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
