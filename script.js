const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    let videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    // Critical: Strip tracking code like ?si= that triggers YouTube's high security
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

    mainBtn.innerHTML = "PATCHING SECURITY...";
    resultArea.innerHTML = "";

    try {
        // Using the specialized /dl endpoint for high-security bypass
        const response = await fetch(`https://${API_HOST}/dl?id=${videoId}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();
        
        // Success check for the Poix API response format
        if (data.status === 'OK' && data.link) {
            // Pick the best available stream (720p priority)
            const downloadUrl = data.link["22"] || data.link["18"] || Object.values(data.link)[0][0];

            resultArea.innerHTML = `
                <div class="dl-card" style="margin-top:20px; text-align:center;">
                    <div style="background:#0a0a0a; padding:30px; border:2px solid #222; border-radius:20px;">
                        <p style="color:#0f0; margin-bottom:15px; font-weight:bold;">PATCH BYPASSED</p>
                        <a href="${downloadUrl}" target="_blank" class="download-btn" 
                           style="background:#fff; color:#000; padding:15px 45px; border-radius:100px; text-decoration:none; font-weight:900; display:inline-block;">
                           DOWNLOAD VIDEO
                        </a>
                    </div>
                </div>`;
        } else {
            //
            alert("This specific video is locked. Try a shorter link or a different video.");
        }
    } catch (error) {
        alert("API Limit Reached or Network Error. Check RapidAPI Dashboard.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
