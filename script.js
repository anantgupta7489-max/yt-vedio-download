const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    if (!videoUrl) return alert("Please paste a link first.");

    mainBtn.innerHTML = "BYPASSING RESTRICTIONS...";
    resultArea.innerHTML = "";

    try {
        // This API provides both data and stream
        const response = await fetch(`https://${API_HOST}/dl?id=${encodeURIComponent(videoUrl)}`, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': API_HOST
            }
        });

        const data = await response.json();
        console.log("yt-api Debug:", data);

        // This API returns an 'link' object with different qualities
        if (data.status === 'OK' && data.link) {
            // Picking the first available high-quality link
            const firstLink = Object.values(data.link)[0][0]; 
            
            resultArea.innerHTML = `
                <div class="dl-container" style="margin-top: 25px; text-align: center; animation: fadeIn 0.5s ease;">
                    <div style="background: #111; padding: 35px; border: 1px solid #333; border-radius: 20px;">
                        <h3 style="color: #fff; margin-bottom: 20px; font-family: sans-serif;">Video Stream Decrypted</h3>
                        <a href="${firstLink}" target="_blank" class="download-btn" 
                           style="background: #fff; color: #000; padding: 15px 45px; border-radius: 100px; text-decoration: none; font-weight: 900; display: inline-block;">
                           DOWNLOAD NOW
                        </a>
                    </div>
                </div>`;
        } else {
            alert("Error: " + (data.msg || "YouTube blocked this specific stream request. Try a shorter link (without the ?si= part)."));
        }
    } catch (error) {
        alert("Connection Lost: Ensure you are subscribed to 'YT-API' on RapidAPI.");
    } finally {
        mainBtn.innerHTML = "Generate Link →";
    }
}
