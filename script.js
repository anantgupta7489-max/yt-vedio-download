async function getInfo() {
    const urlInput = document.getElementById('videoUrl').value.trim();
    const messageArea = document.getElementById('message');

    if (!urlInput) {
        messageArea.innerHTML = "Please paste a video URL first!";
        return;
    }

    // Extract Video ID
    let videoId = "";
    if (urlInput.includes("v=")) {
        videoId = urlInput.split('v=')[1]?.split('&')[0];
    } else {
        videoId = urlInput.split('/').pop();
    }

    messageArea.innerHTML = "Processing... please wait.";
    messageArea.style.color = "#e5e7eb"; // Change color back to normal from red

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
            // Create the UI for download links
            let html = `<div style="margin-top:20px; text-align:left;">
                <h3 style="color:#7c7cff">${data.title}</h3>
                <p>Select Quality:</p>`;
            
            data.link.forEach(item => {
                html += `<a href="${item[0]}" target="_blank" style="display:block; background:#6366f1; color:white; padding:10px; margin:5px 0; text-decoration:none; border-radius:8px; text-align:center;">
                    Download ${item[1]} (${item[2]})
                </a>`;
            });

            html += `</div>`;
            messageArea.innerHTML = html;
        } else {
            messageArea.innerHTML = "Error: Video not found. Check the link.";
            messageArea.style.color = "#fca5a5";
        }
    } catch (error) {
        messageArea.innerHTML = "Connection error. Please try again.";
        messageArea.style.color = "#fca5a5";
    }
}