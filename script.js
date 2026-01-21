async function getInfo() {
    const urlInput = document.getElementById('videoUrl');
    let resultArea = document.getElementById('result-area');
    const videoUrl = urlInput.value.trim();

    if (!videoUrl) {
        alert("Please paste a YouTube link!");
        return;
    }

    // 1. Better UI Feedback
    resultArea.innerHTML = `
        <div style="text-align:center;">
            <p style="color:#7c7cff;">🚀 Bypassing YouTube restrictions...</p>
            <div class="loader"></div> 
        </div>`;

    try {
        // 2. Using the Cobalt API (No API Key needed for basic use!)
        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Cache-Control': 'no-cache',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: videoUrl,
                videoQuality: '720', // Options: 360, 720, 1080, max
                filenameStyle: 'pretty'
            })
        });

        const data = await response.json();

        // 3. Handling Cobalt's Response Format
        if (data.status === 'stream' || data.status === 'redirect') {
            resultArea.innerHTML = `
                <div style="background:#1e1e2f; padding:20px; border-radius:12px; text-align:center; border: 1px solid #6366f1;">
                    <h3 style="color:white; margin-bottom:15px;">✅ Video Ready!</h3>
                    <a href="${data.url}" target="_blank" download
                       style="display:inline-block; background:linear-gradient(90deg, #6366f1, #a855f7); color:white; padding:15px 30px; text-decoration:none; border-radius:30px; font-weight:bold; box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);">
                       ⬇️ DOWNLOAD NOW
                    </a>
                    <p style="color:#aaa; font-size:12px; margin-top:10px;">Link generated via Cobalt Infrastructure</p>
                </div>`;
        } else if (data.status === 'picker') {
            // If video has multiple formats/pickers
            let html = `<h3 style="color:white;">Select Quality:</h3>`;
            data.picker.forEach(item => {
                html += `<a href="${item.url}" style="display:block; background:#333; color:white; padding:10px; margin:5px; border-radius:5px;">Download ${item.type}</a>`;
            });
            resultArea.innerHTML = html;
        } else {
            resultArea.innerHTML = `<p style="color:red;">❌ Error: ${data.text || "Could not process video"}</p>`;
        }

    } catch (error) {
        console.error(error);
        resultArea.innerHTML = `
            <div style="color:#ff4d4d; background:rgba(255, 77, 77, 0.1); padding:15px; border-radius:8px;">
                <strong>Connection Error</strong><br>
                The downloader service is temporarily busy. Try again in 10 seconds.
            </div>`;
    }
}


