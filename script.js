const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    let videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    // Step 1: Force clean the ID to remove any 'patch' triggers
    let videoId = "";
    try {
        if (videoUrl.includes('youtu.be/')) {
            videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
        } else {
            videoId = videoUrl.split('v=')[1].split('&')[0];
        }
    } catch(e) {
        return alert("Please use a standard YouTube link.");
    }

    mainBtn.innerHTML = "PATCHING SIGNATURE...";
    resultArea.innerHTML = "";

    try {
        // Step 2: Request from the specialized download endpoint
        const response = await fetch(`https://${API_HOST}/dl?id=${videoId}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();
        
        // Step 3: Check for the success status returned by Poix's API
        if (data.status === 'OK' && data.link) {
            // Find the 720p (22) or 360p (18) direct streams
            const downloadUrl = data.link["22"] || data.link["18"] || Object.values(data.link)[0][0];

            resultArea.innerHTML = `
                <div class="dl-card" style="margin-top:20px; text-align:center;">
                    <div style="background:#050505; padding:25px; border-radius:15px; border:2px solid #333;">
                        <p style="color:#fff; margin-bottom:15px; font-weight:bold;">BYPASS SUCCESSFUL</p>
                        <a href="${downloadUrl}" target="_blank" class="download-btn" 
                           style="background:#fff; color:#000; padding:15px 40px; border-radius:100px; text-decoration:none; font-weight:900; display:inline-block;">
                           DOWNLOAD VIDEO
                        </a>
                    </div>
                </div>`;
        } else {
            //
            alert("This video is locked by YouTube's high security. Try another video link.");
        }
    } catch (error) {
        alert("API Limit Reached or Network Error.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
