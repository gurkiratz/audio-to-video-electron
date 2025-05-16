# Audio to Video Converter

A powerful cross-platform desktop application that converts audio files to video files. Built with Electron and FFmpeg, it offers a simple way to create videos from audio files with either a black background or a custom image.

![App Screenshot](docs/screenshots/app-main.png) *(Screenshot placeholder)*

## Features

### Input Support
- **Multiple Audio Formats**
  - MP3 (.mp3)
  - WAV (.wav)
  - AAC (.aac)
  - OGG (.ogg)
  - M4A (.m4a)
  - FLAC (.flac)

### Background Options
- **Black Screen**
  - Clean, distraction-free background
  - Perfect for audio-focused content
- **Custom Image**
  - Support for JPG, PNG, and BMP images
  - Aspect ratio preservation option
  - Automatic padding for different resolutions

### Output Options
- **Multiple Resolutions**
  - QVGA (320x240)
  - VGA (640x480)
  - 480p (854x480)
  - 720p HD (1280x720)
  - 1080p Full HD (1920x1080)
  - 1440p QHD (2560x1440)
  - 4K UHD (3840x2160)
- **Output Format**
  - MP4 with H.264 video codec
  - Original audio quality preservation

### Cross-Platform Support
- Windows
- macOS
- Linux

## Installation

### Prerequisites

#### FFmpeg Installation

FFmpeg must be installed on your system. Here's how to install it on different platforms:

##### Windows
1. Download FFmpeg from [FFmpeg Official Website](https://ffmpeg.org/download.html)
2. Extract the downloaded archive
3. Add FFmpeg to your system PATH:
   - Right-click on 'This PC' or 'My Computer'
   - Click 'Properties'
   - Click 'Advanced system settings'
   - Click 'Environment Variables'
   - Under 'System Variables', find and select 'Path'
   - Click 'Edit'
   - Click 'New'
   - Add the path to FFmpeg's bin folder
   - Click 'OK' on all windows

##### macOS
Using Homebrew:
```bash
brew install ffmpeg
```

##### Linux (Ubuntu/Debian)
```bash
sudo apt update && sudo apt install ffmpeg
```

### Application Installation

#### Method 1: Download Pre-built Binaries
1. Go to the [Releases](https://github.com/gurkiratz/audio-to-video-electron/releases) page
2. Download the appropriate version for your platform:
   - Windows: `.exe` installer
   - macOS: `.dmg` file
   - Linux: `.AppImage` or `.deb` package
3. Install the application:
   - Windows: Run the installer
   - macOS: Mount the DMG and drag to Applications
   - Linux: 
     - AppImage: Make executable and run
     - DEB: `sudo dpkg -i package.deb`

#### Method 2: Build from Source

1. Clone the repository
```bash
git clone https://github.com/gurkiratz/audio-to-video-electron.git
cd audio-to-video-electron
```

2. Install dependencies
```bash
npm install
```

3. Run in development mode
```bash
npm run dev
```

4. Build for your platform
```bash
# All platforms
npm run dist

# Windows only
npm run dist:win

# macOS only
npm run dist:mac

# Linux only
npm run dist:linux
```

## Usage Guide

### Basic Usage

1. **Launch the Application**
   - Open "Audio to Video Converter"
   - You'll see the main interface with all conversion options

2. **Select Input Audio**
   - Click "Browse" next to "Input Audio File"
   - Select your audio file (MP3, WAV, AAC, etc.)

3. **Choose Background Type**
   - Select "Black Screen" for a simple black background
   - Or select "Image" to use a custom background image

4. **Image Background Settings** (if using image)
   - Click "Browse Image" to select your background image
   - Check "Preserve Aspect Ratio" if you want to maintain image proportions
   - The image will be scaled to match the selected output resolution

5. **Set Output Options**
   - Choose output resolution from the dropdown
   - Enter output filename (e.g., "my_video.mp4")
   - Select output directory using "Browse Directory"

6. **Convert**
   - Click "Convert" to start the process
   - Progress will be shown in the status area
   - Wait for completion message

### Advanced Tips

1. **Resolution Selection**
   - Choose based on your needs:
     - Lower resolutions (320x240, 640x480) for small file sizes
     - Higher resolutions (1080p, 4K) for quality
   - Consider your image background resolution if using one

2. **Image Background Tips**
   - Use high-quality images that match your target resolution
   - Enable "Preserve Aspect Ratio" to prevent stretching
   - Black padding will be added automatically if needed

3. **File Management**
   - Organize output files in dedicated folders
   - Use descriptive filenames
   - Original audio files remain unchanged

## Troubleshooting

### Common Issues and Solutions

1. **FFmpeg Not Found**
   - Ensure FFmpeg is installed
   - Verify FFmpeg is in system PATH
   - Try running `ffmpeg -version` in terminal/command prompt

2. **File Permission Errors**
   - Ensure you have write permissions in output directory
   - Run as administrator if needed
   - Check disk space

3. **Conversion Fails**
   - Verify input file is not corrupted
   - Check available disk space
   - Ensure input file format is supported

4. **Image Background Issues**
   - Verify image format (JPG, PNG, BMP)
   - Check image file is not corrupted
   - Try a different image

### Error Messages

| Error | Solution |
|-------|----------|
| "FFmpeg not found" | Install FFmpeg or add to PATH |
| "Invalid input file" | Check audio file format and corruption |
| "Access denied" | Check file/folder permissions |
| "Not enough disk space" | Free up disk space |

## Development

### Project Structure
```
audio-to-video-electron/
├── main.js           # Main electron process
├── preload.js        # Preload script for security
├── renderer.js       # Renderer process logic
├── index.html        # Main application window
├── style.css         # Application styling
└── build/           # Build resources
    └── icons        # Application icons
```

### Building and Testing

1. **Development Mode**
```bash
npm run dev
```
- Auto-reloads on file changes
- Developer tools enabled
- Console logging active

2. **Testing Builds**
```bash
npm run pack
```
- Creates unpacked build
- Useful for testing before distribution

3. **Production Builds**
```bash
npm run dist
```
- Creates installable packages
- Optimized for distribution

## Contributing

1. Fork the repository
2. Create your feature branch
```bash
git checkout -b feature/amazing-feature
```
3. Commit your changes
```bash
git commit -m 'Add some amazing feature'
```
4. Push to the branch
```bash
git push origin feature/amazing-feature
```
5. Open a Pull Request

### Coding Standards
- Use consistent indentation (2 spaces)
- Follow JavaScript Standard Style
- Comment complex logic
- Update documentation for new features

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Electron](https://www.electronjs.org/) - Desktop application framework
- [FFmpeg](https://ffmpeg.org/) - Multimedia framework
- All contributors and users of this application

## Support

For support, please:
1. Check the troubleshooting guide above
2. Search existing [issues](https://github.com/gurkiratz/audio-to-video-electron/issues)
3. Create a new issue if needed

---

*Note: Replace `gurkiratz` with your actual GitHub username in all URLs.* 