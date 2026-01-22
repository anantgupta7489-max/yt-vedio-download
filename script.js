const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    let videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    // Critical: Removing the ?si= part which triggers signature security
    let videoId = videoUrl.split('v=')[1] || videoUrl.split('/').pop().split('?')[0];

    mainBtn.innerHTML = "SOLVING SIGNATURE...";
    resultArea.innerHTML = "";

    try {
        // Using the /dl endpoint from the most recently updated API
        const response = await fetch(`https://${API_HOST}/dl?id=${videoId}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();
        console.log("Bypass Attempt:", data);

        // This API returns a 'link' object with quality keys
        if (data.status === 'OK' && data.link) {
            const finalLink = data.link["22"] || data.link["18"] || Object.values(data.link)[0][0];
            
            resultArea.innerHTML = `
                <div class="dl-card" style="margin-top:20px; text-align:center;">
                    <div style="background:#111; padding:25px; border-radius:15px; border:1px solid #00ff00;">
                        <p style="color:#00ff00; margin-bottom:10px;">SIGNATURE SOLVED</p>
                        <a href="${finalLink}" target="_blank" class="download-btn" 
                           style="background:#fff; color:#000; padding:12px 35px; border-radius:50px; text-decoration:none; font-weight:bold; display:inline-block;">
                           DOWNLOAD MP4
                        </a>
                    </div>
                </div>`;
        } else {
            alert("Bypass Error: YouTube's latest patch is blocking this API. Try another video or check your API limit.");
        }
    } catch (error) {
        alert("Server connection failed. Refresh the page.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
