# Apollo

Apollo is a desktop app for listening to locally downloaded music created using NextJS 13, Typescript, Tailwind and Tauri.

# Available features
- **Playlists**
  - Creation and deletion
  - Modifying the title and cover image
  - Adding and removing songs
- **Audio playback**
  - Pause/resume
  - Previous/next
  - Seek bar
  - Volume bar

# Installing
Releases will be added in the future once i'm satisfied with the app state and the majority of planned features are added. For now you have to build from source

# Getting started

The code for the frontend is located in the "src" folder, and the code for the backend is in the "src-tauri" folder.

To launch a development version of the app run
```
npm run tauri dev
```
Building a release version
```
npm run tauri build
```
