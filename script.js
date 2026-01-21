const API_KEY = 'd4239af42fmsha37d88047ee5b96p12d11cjsnb347fa450a93';
const API_HOST = 'yt-api.p.rapidapi.com';

function pasteLink() {
    navigator.clipboard.readText().then(text => {
        document.getElementById('videoUrl').value = text;
    });
}

// Function to extract Video ID from various YouTube link formats
function getYouTubeID(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

async function fetchDownload() {
    const videoUrl = document.getElementById('videoUrl').value;
    const resultArea = document.getElementById('resultArea');
    const mainBtn = document.getElementById('mainBtn');

    const videoId = getYouTubeID(videoUrl);
    
    if (!videoId) {
        alert("Please enter a valid YouTube link");
        return;
    }

    mainBtn.innerText = "Searching...";
    resultArea.innerHTML = '<p style="margin-top:20px;">Fetching video data...</p>';

    // The endpoint is /dl?id=VIDEO_ID
    const url = `https://${API_HOST}/dl?id=${videoId}`;
    
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error('API Response Error');
        }

        const data = await response.json();

        // Check if data returned successfully
        if (data.status === 'OK') {
            resultArea.innerHTML = `
                <div class="download-card">
                    <img src="${data.thumbnail[0].url}" style="width:100%; border-radius:10px; margin-bottom:10px;">
                    <h4 style="margin-bottom:10px;">${data.title}</h4>
                    <p style="font-size:0.8rem; color:#888; margin-bottom:15px;">Video Length: ${data.lengthSeconds}s</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <a href="${data.link}" target="_blank" class="dl-btn" style="background: #4ade80; color: black;">Download MP4 (Video)</a>
                        <p style="font-size: 0.7rem; color: #555;">Note: Click 'Download' then select 'Save As' if it starts playing.</p>
                    </div>
                </div>
            `;
        } else {
            resultArea.innerHTML = `<p style="color:red; margin-top:20px;">Error: ${data.msg || "Video not found"}</p>`;
        }
    } catch (error) {
        console.error(error);
        resultArea.innerHTML = `<p style="color:red; margin-top:20px;">API Error: Make sure your API key is active and supports the /dl endpoint.</p>`;
    } finally {
        mainBtn.innerText = "Get Download Links →";
    }
}

