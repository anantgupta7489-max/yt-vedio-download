async function getInfo() {
    const urlInput = document.getElementById('videoUrl').value.trim();
    const resultArea = document.getElementById('result-area');

    // 1. Basic validation
    if (!urlInput) {
        alert("Please paste a YouTube link first!");
        return;
    }

    // 2. Perfect Video ID Extraction
    // Works for: youtube.com/watch?v=..., youtu.be/..., and youtube.com/shorts/...
    let videoId = "";
    try {
        const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
        const match = urlInput.match(regex);
        videoId = match ? match[1] : null;
        
        if (!videoId) {
            resultArea.innerHTML = "<p style='color:red;'>Invalid YouTube link. Please check and try again.</p>";
            return;
        }
    } catch (e) {
        resultArea.innerHTML = "<p style='color:red;'>Error reading link.</p>";
        return;
    }

    resultArea.innerHTML = "<p style='color:#7c7cff;'>🔄 Fetching high-quality download links...</p>";

    // 3. API Configuration
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93',
            'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
    };

    try {
        // Using the /dl endpoint for actual files
        const response = await fetch(`https://yt-api.p.rapidapi.com/dl?id=${videoId}`, options);
        const data = await response.json();

        if (data.status === "OK") {
            // 4. Create a professional UI for the results
            let html = `
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-top: 20px;">
                    <h3 style="color:white; margin-bottom:10px;">${data.title}</h3>
                    <p style="color:#aaa; margin-bottom:15px;">Select format to download:</p>
            `;

            // Loop through available download formats
            data.link.forEach(item => {
                const quality = item[1]; // e.g., 720p
                const type = item[2] || "Video"; // e.g., mp4
                const downloadUrl = item[0];

                html += `
                    <a href="${downloadUrl}" target="_blank" class="download-btn" 
                       style="display:block; background:#6366f1; color:white; padding:12px; margin:8px 0; text-decoration:none; border-radius:8px; font-weight:bold; text-align:center; transition: 0.3s;">
                        Download ${quality} (${type})
                    </a>`;
            });

            html += `</div>`;
            resultArea.innerHTML = html;
        } else {
            resultArea.innerHTML = `<p style='color:red;'>API Error: ${data.msg || "Video not found."}</p>`;
        }
    } catch (error) {
        resultArea.innerHTML = "<p style='color:red;'>Connection Failed. Check your internet or API subscription.</p>";
    }
}

