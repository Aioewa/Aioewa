export async function onTab({ addon }) {
    addon.tab.listenForElements("video", async (videoElement) => {
        function downloadVideoAsMP4(videoElement) {
            // Check if the video element is valid
            if (!(videoElement instanceof HTMLVideoElement)) {
                console.error("Invalid video element provided.");
                return;
            }

            // Get the video source URL (this assumes the video is already loaded)
            const videoURL = videoElement.src;

            // Fetch the video as a Blob
            fetch(videoURL)
                .then(response => response.blob())
                .then(blob => {
                    // Create a URL for the blob
                    const url = URL.createObjectURL(blob);

                    // Create a download link
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'video.mp4';

                    // Append the link to the body
                    document.body.appendChild(a);

                    // Trigger the download
                    a.click();

                    // Clean up
                    setTimeout(() => {
                        document.body.removeChild(a);
                        URL.revokeObjectURL(url);
                    }, 0);
                })
                .catch(error => {
                    console.error('Error downloading video:', error);
                });
        }

        // Usage:
        // Pass the video element to the function
        // const videoElement = document.querySelector('video');
        console.log(videoElement.currentSrc)
        if (videoElement.currentSrc != "") {
            console.log(await fetch(videoElement.currentSrc))
        }
        // downloadVideoAsMP4(videoElement);   
    })

}