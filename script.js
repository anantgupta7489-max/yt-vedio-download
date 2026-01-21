async function getInfo() {
    // 1. Find the input and the place to show results
    const urlInput = document.getElementById('videoUrl');
    let resultArea = document.getElementById('result-area');

    // 2. FORCE FIX: If result-area is missing in HTML, create it now
    if (!resultArea) {
        resultArea = document.createElement('div');
        resultArea.id = 'result-area';
        resultArea.style.marginTop = "20px";
        urlInput.parentElement.appendChild(resultArea);
    }

    const videoUrl = urlInput.value.trim();
    if (!videoUrl) {
        alert("Please paste a YouTube link!");
        return;
    }

    resultArea.innerHTML = "<p style='color:#7c7cff;'>🔄 Fetching download links...</p>";

    // 3. Perfect ID Extraction
    let videoId = "";
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/|youtube\.com\/shorts\/)([^"&?\/\s]{11})/;
    const match = videoUrl.match(regex);
    videoId = match ? match[1] : null;

    if (!videoId) {
        resultArea.innerHTML = "<p style='color:red;'>Invalid Link. Paste a full YouTube URL.</p>";
        return;
    }

    // 4. API Request using your newest Host
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93',
            'x-rapidapi-host': 'yt-api.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(`https://yt-api.p.rapidapi.com/dl?id=${videoId}`, options);
        const data = await response.json();

        if (data.status === "OK") {
            let html = `<h3 style="color:white; margin-bottom:10px;">${data.title}</h3>`;
            
            // Loop through the links and create buttons
            data.link.forEach(item => {
                html += `<a href="${item[0]}" target="_blank" 
                        style="display:block; background:#6366f1; color:white; padding:12px; margin:8px 0; text-decoration:none; border-radius:8px; font-weight:bold; text-align:center;">
                        Download ${item[1]} (${item[2]})
                    </a>`;
            });
            resultArea.innerHTML = html;
        } else {
            resultArea.innerHTML = `<p style='color:red;'>API Error: ${data.msg || "Video not found"}</p>`;
        }
    } catch (error) {
        resultArea.innerHTML = "<p style='color:red;'>Connection Error. Check your internet.</p>";
    }
}

