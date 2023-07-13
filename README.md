# Apollo

Apollo is a desktop app for listening to locally downloaded music created using NextJS 13, Typescript, Tailwind and Tauri.

## Available features

- Playlist CRUD operations
  - Creating and deleting playlists
  - Changing playlist's cover image and title
  - Adding and removing songs to/from the playlist
- Basic audio playback (pause/resume, next/previous, seek bar, volume control)

## Planned features

- Audio visualizer
- Loading last played song on app launch (been tricky to implement so far)
- Displaying recently played playlists on the homepage
- Performance optimizations (currently in react context hell)

## Getting started

The code for the frontend is located in the "src" folder, and the code for the backend is in the "src-tauri" folder.

```
npm install
```

```
npm run tauri dev
```
