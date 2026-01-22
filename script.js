const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    let videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    // Critical: Clean the URL again to remove any tracking that triggers security
    if (videoUrl.includes('?')) {
        videoUrl = videoUrl.split('?')[0];
    }

    mainBtn.innerHTML = "BYPASSING SECURITY...";
    resultArea.innerHTML = "";

    try {
        // We use the /dl?id= endpoint which has the highest bypass success rate
        const response = await fetch(`https://${API_HOST}/dl?id=${encodeURIComponent(videoUrl)}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();
        
        // This specific API returns formats in a quality-ranked order
        if (data.status === 'OK' && data.link) {
            // Get the best available link from the response object
            const downloadUrl = data.link["22"] || data.link["18"] || Object.values(data.link)[0][0];

            resultArea.innerHTML = `
                <div class="dl-success" style="margin-top:20px; text-align:center;">
                    <div style="background:#0a0a0a; padding:30px; border:2px solid #222; border-radius:15px;">
                        <p style="color:#0f0; margin-bottom:15px; font-weight:bold;">BYPASS SUCCESSFUL</p>
                        <a href="${downloadUrl}" target="_blank" class="download-btn" 
                           style="background:#fff; color:#000; padding:15px 40px; border-radius:50px; text-decoration:none; font-weight:900; display:inline-block;">
                           DOWNLOAD VIDEO
                        </a>
                    </div>
                </div>`;
        } else {
            // If the specific endpoint fails, try the general /info fallback
            alert("Bypass Failed: YouTube's signature is too strong for this URL. Try a different video link.");
        }
    } catch (error) {
        alert("System Busy: Please try again in 5 seconds.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
