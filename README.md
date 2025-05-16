# Audio to Video Converter

A cross-platform desktop application that converts audio files to video files with either a black background or a custom image. Built with Electron and FFmpeg.

## Features

- Convert audio files to video (MP4)
- Support for multiple audio formats (MP3, WAV, AAC, OGG, M4A, FLAC)
- Choose between black background or custom image
- Customizable output resolution
- Preserve aspect ratio option for image backgrounds
- Cross-platform support (Windows, macOS, Linux)

## Prerequisites

- FFmpeg must be installed on your system

### Installing FFmpeg

#### Windows
1. Download FFmpeg from [FFmpeg Official Website](https://ffmpeg.org/download.html)
2. Add FFmpeg to your system PATH

#### macOS
```bash
brew install ffmpeg
```

#### Linux (Ubuntu/Debian)
```bash
sudo apt update && sudo apt install ffmpeg
```

## Installation

### Download Pre-built Binaries
Download the latest release for your platform from the [Releases](https://github.com/yourusername/electron-ffmpeg-app/releases) page.

### Build from Source

1. Clone the repository
```bash
git clone https://github.com/yourusername/electron-ffmpeg-app.git
cd electron-ffmpeg-app
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

## Usage

1. Launch the application
2. Select your input audio file
3. Choose background type (Black Screen or Image)
4. If using an image background:
   - Select your image file
   - Choose whether to preserve aspect ratio
5. Select output resolution
6. Enter output filename
7. Choose output directory
8. Click "Convert" to start the process

## Development

```bash
# Run in development mode with auto-reload
npm run dev

# Package the app
npm run pack

# Build distributables
npm run dist
```

## License

ISC

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request 