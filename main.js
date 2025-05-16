const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { exec } = require('child_process'); // For running FFmpeg

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 750, // Increased height for more fields
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        }
    });

    mainWindow.loadFile('index.html');
    // mainWindow.webContents.openDevTools(); // Uncomment to open DevTools for debugging
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// --- IPC Handlers for Dialogs and FFmpeg ---

ipcMain.handle('dialog:openFile', async (event, dialogOptions) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(dialogOptions);
    if (canceled || filePaths.length === 0) {
        return null;
    }
    return filePaths[0];
});

ipcMain.handle('dialog:openDirectory', async (event, dialogOptions) => {
    const { canceled, filePaths } = await dialog.showOpenDialog(dialogOptions);
    if (canceled || filePaths.length === 0) {
        return null;
    }
    return filePaths[0];
});

function buildFFmpegCommand(options) {
    const { audioPath, backgroundType, imagePath, resolution, outputDir, outputName, preserveAspectRatio } = options;
    let commandParts = ['ffmpeg']; // Start with the ffmpeg executable command

    // Video Input (black screen or image)
    if (backgroundType === 'black') {
        commandParts.push('-f', 'lavfi', '-i', `color=c=black:s=${resolution}:r=1`);
    } else if (backgroundType === 'image' && imagePath) {
        commandParts.push('-loop', '1', '-r', '1', '-i', `"${imagePath}"`);
    } else {
        console.error("Invalid video input options for FFmpeg command.");
        throw new Error("Invalid video input options. If image is selected, a path is required.");
    }

    // Audio Input
    if (!audioPath) {
        console.error("Audio path is missing for FFmpeg command.");
        throw new Error("Audio input file is required.");
    }
    commandParts.push('-i', `"${audioPath}"`);

    // Video Filters (only if image background for scaling and format)
    if (backgroundType === 'image') {
        const vfParts = [];
        if (preserveAspectRatio) {
            vfParts.push(`scale=${resolution.split('x')[0]}:${resolution.split('x')[1]}:force_original_aspect_ratio=decrease`);
            vfParts.push(`pad=${resolution.split('x')[0]}:${resolution.split('x')[1]}:(ow-iw)/2:(oh-ih)/2:color=black`);
        } else {
            vfParts.push(`scale=${resolution}`);
        }
        vfParts.push('format=yuv420p');
        commandParts.push('-vf', `${vfParts.join(',')}`); // Removed unnecessary quotes around vfParts
    } else {
        // For black screen, ensure pixel format for output
        commandParts.push('-pix_fmt', 'yuv420p');
    }

    // Output settings
    commandParts.push('-c:v', 'libx264', '-tune', 'stillimage', '-preset', 'ultrafast');
    commandParts.push('-c:a', 'copy'); // Copy audio stream
    commandParts.push('-shortest'); // Finish encoding when the shortest stream ends

    if (!outputDir || !outputName) {
        console.error("Output directory or name is missing for FFmpeg command.");
        throw new Error("Output directory and name are required.");
    }
    // Ensure outputName ends with .mp4 or a suitable extension
    const finalOutputName = outputName.endsWith('.mp4') ? outputName : `${outputName}.mp4`;
    commandParts.push(`"${path.join(outputDir, finalOutputName)}"`);

    return commandParts.join(' ');
}


ipcMain.handle('ffmpeg:run', async (event, commandOptions) => {
    return new Promise((resolve, reject) => {
        try {
            const command = buildFFmpegCommand(commandOptions);
            if (!command) {
                reject(new Error("Failed to build FFmpeg command."));
                return;
            }
            console.log('Executing FFmpeg command:', command);

            exec(command, (error, stdout, stderr) => {
                if (error) {
                    console.error(`FFmpeg exec error: ${error}`);
                    console.error(`FFmpeg stderr: ${stderr}`);
                    reject(new Error(`FFmpeg error: ${stderr || error.message}`));
                    return;
                }
                console.log(`FFmpeg stdout: ${stdout}`);
                if (stderr) { // FFmpeg often outputs info to stderr on success
                    console.warn(`FFmpeg stderr (possibly info): ${stderr}`);
                }
                resolve(`Video conversion successful! Output: ${path.join(commandOptions.outputDir, commandOptions.outputName.endsWith('.mp4') ? commandOptions.outputName : `${commandOptions.outputName}.mp4` )}`);
            });
        } catch (buildError) {
            console.error(`Error building FFmpeg command: ${buildError}`);
            reject(new Error(`Error setting up FFmpeg command: ${buildError.message}`));
        }
    });
});