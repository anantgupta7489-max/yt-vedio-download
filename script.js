async function getInfo() {
    const urlInput = document.getElementById('videoUrl').value.trim();
    const resultArea = document.getElementById('message'); // Matches your message ID

    if (!urlInput) {
        resultArea.innerHTML = "Please paste a link first!";
        return;
    }

    // This section fixes the "Invalid Link" error by finding the Video ID correctly
    let videoId = "";
    try {
        if (urlInput.includes("youtu.be/")) {
            videoId = urlInput.split("youtu.be/")[1].split(/[?#]/)[0];
        } else if (urlInput.includes("youtube.com/shorts/")) {
            videoId = urlInput.split("shorts/")[1].split(/[?#]/)[0];
        } else if (urlInput.includes("v=")) {
            videoId = urlInput.split("v=")[1].split("&")[0];
        } else {
            videoId = urlInput.split("/").pop().split(/[?#]/)[0];
        }
    } catch (e) {
        resultArea.innerHTML = "Could not read this link format.";
        return;
    }

    resultArea.innerHTML = "Searching for video details...";

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93', // Your Key
            'x-rapidapi-host': 'ytstream-download-youtube-videos.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(`https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${videoId}`, options);
        const data = await response.json();

        if (data.status === "OK") {
            // Success: Create download buttons
            let html = `<div style="margin-top:20px; background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px;">
                <h3 style="color:#7c7cff;">${data.title}</h3>
                <p>Click a button to download:</p>`;
            
            data.link.forEach(item => {
                html += `<a href="${item[0]}" target="_blank" style="display:block; background:#6366f1; color:white; padding:10px; margin:8px 0; text-decoration:none; border-radius:8px; font-weight:bold;">
                    Download ${item[1]} (${item[2]})
                </a>`;
            });

            html += `</div>`;
            resultArea.innerHTML = html;
        } else {
            // This happens if the API doesn't find the video
            resultArea.innerHTML = "API Error: Video not found or unavailable.";
        }
    } catch (error) {
        resultArea.innerHTML = "Connection Error. Check your internet.";
    }
}
