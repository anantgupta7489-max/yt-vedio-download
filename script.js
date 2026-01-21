async function getInfo() {
    const urlInput = document.getElementById('videoUrl');
    const resultArea = document.getElementById('result-area');
    const btn = document.getElementById('downloadBtn');
    
    const url = urlInput.value.trim();

    if (!url) {
        alert("Please paste a URL first!");
        return;
    }

    // Disable button while loading
    btn.disabled = true;
    btn.innerText = "Processing...";
    resultArea.innerHTML = "<p style='color: #94a3b8;'>Connecting to Cobalt Engine...</p>";

    try {
        const response = await fetch('https://api.cobalt.tools/api/json', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                url: url,
                videoQuality: '720'
            })
        });

        const data = await response.json();

        if (data.status === 'stream' || data.status === 'redirect') {
            resultArea.innerHTML = `
                <div class="download-card">
                    <h3 style="margin-bottom:10px;">Video Found!</h3>
                    <p style="font-size: 0.9rem; color: #94a3b8;">Click below to save to your device.</p>
                    <a href="${data.url}" class="dl-link" target="_blank">⬇️ DOWNLOAD MP4</a>
                </div>`;
        } else {
            resultArea.innerHTML = `<p style="color: #ef4444;">❌ Error: ${data.text || "Service Busy. Try again."}</p>`;
        }
    } catch (error) {
        resultArea.innerHTML = `<p style="color: #ef4444;">❌ Server Error. Please try a different link.</p>`;
    } finally {
        btn.disabled = false;
        btn.innerText = "Fetch Video";
    }
}
