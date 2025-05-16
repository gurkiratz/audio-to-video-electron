const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Args for openFile: { title: 'Select Audio File', filters: [{ name: 'Audio', extensions: ['mp3', 'wav', 'aac', 'ogg'] }] }
    // Args for openImage: { title: 'Select Image File', filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg', 'bmp'] }] }
    // Args for openDirectory: { title: 'Select Output Directory', properties: ['openDirectory'] }
    selectFile: (dialogOptions) => ipcRenderer.invoke('dialog:openFile', dialogOptions),
    selectDirectory: (dialogOptions) => ipcRenderer.invoke('dialog:openDirectory', dialogOptions),
    runFFmpeg: (ffmpegCommandOptions) => ipcRenderer.invoke('ffmpeg:run', ffmpegCommandOptions)
});