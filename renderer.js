document.addEventListener('DOMContentLoaded', () => {
    const browseAudioBtn = document.getElementById('browseAudio');
    const audioFilePathInput = document.getElementById('audioFilePath');
    const bgBlackRadio = document.getElementById('bgBlack');
    const bgImageRadio = document.getElementById('bgImage');
    const imageOptionsDiv = document.getElementById('imageOptions');
    const browseImageBtn = document.getElementById('browseImage');
    const imageFilePathInput = document.getElementById('imageFilePath');
    const preserveAspectRatioCheckbox = document.getElementById('preserveAspectRatio');
    const resolutionInput = document.getElementById('resolution');
    const outputNameInput = document.getElementById('outputName');
    const browseOutputDirBtn = document.getElementById('browseOutputDir');
    const outputDirPathInput = document.getElementById('outputDirPath');
    const convertBtn = document.getElementById('convertBtn');
    const statusMessageDiv = document.getElementById('statusMessage');

    // --- Event Listeners for UI Elements ---

    browseAudioBtn.addEventListener('click', async () => {
        const filePath = await window.electronAPI.selectFile({
            title: 'Select Audio File',
            filters: [{ name: 'Audio', extensions: ['mp3', 'wav', 'aac', 'ogg', 'm4a', 'flac'] }]
        });
        if (filePath) {
            audioFilePathInput.value = filePath;
        }
    });

    bgBlackRadio.addEventListener('change', () => {
        if (bgBlackRadio.checked) {
            imageOptionsDiv.style.display = 'none';
        }
    });

    bgImageRadio.addEventListener('change', () => {
        if (bgImageRadio.checked) {
            imageOptionsDiv.style.display = 'block';
        }
    });

    browseImageBtn.addEventListener('click', async () => {
        const filePath = await window.electronAPI.selectFile({
            title: 'Select Image File',
            filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'bmp'] }]
        });
        if (filePath) {
            imageFilePathInput.value = filePath;
        }
    });

    browseOutputDirBtn.addEventListener('click', async () => {
        const dirPath = await window.electronAPI.selectDirectory({
            title: 'Select Output Directory',
            properties: ['openDirectory']
        });
        if (dirPath) {
            outputDirPathInput.value = dirPath;
        }
    });

    convertBtn.addEventListener('click', async () => {
        statusMessageDiv.textContent = 'Processing... please wait.';
        statusMessageDiv.className = 'status info';
        convertBtn.disabled = true;

        const options = {
            audioPath: audioFilePathInput.value,
            backgroundType: bgImageRadio.checked ? 'image' : 'black',
            imagePath: imageFilePathInput.value,
            preserveAspectRatio: preserveAspectRatioCheckbox.checked,
            resolution: resolutionInput.value || '320x240',
            outputName: outputNameInput.value || 'output_video.mp4',
            outputDir: outputDirPathInput.value
        };

        // Basic Validation
        if (!options.audioPath) {
            statusMessageDiv.textContent = 'Error: Input audio file is required.';
            statusMessageDiv.className = 'status error';
            convertBtn.disabled = false;
            return;
        }
        if (options.backgroundType === 'image' && !options.imagePath) {
            statusMessageDiv.textContent = 'Error: Image file is required when background type is "Image".';
            statusMessageDiv.className = 'status error';
            convertBtn.disabled = false;
            return;
        }
        if (!options.outputDir) {
            statusMessageDiv.textContent = 'Error: Output directory is required.';
            statusMessageDiv.className = 'status error';
            convertBtn.disabled = false;
            return;
        }
        if (!options.outputName.match(/^[\w .-]+\.mp4$/i) && !options.outputName.match(/^[\w .-]+\w$/i) ) {
             // Allow extensionless or .mp4. FFmpeg command adds .mp4 if missing.
            // This is a very basic check, you might want a more robust one.
            if(!options.outputName.endsWith('.mp4')) {
                 console.warn("Output name does not end with .mp4, will be added.");
            }
        }
        
        try {
            const resultMessage = await window.electronAPI.runFFmpeg(options);
            statusMessageDiv.textContent = resultMessage;
            statusMessageDiv.className = 'status success';
        } catch (error) {
            statusMessageDiv.textContent = `Error: ${error.message}`;
            statusMessageDiv.className = 'status error';
        } finally {
            convertBtn.disabled = false;
        }
    });
});