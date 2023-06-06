// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use lofty::{AudioFile, Probe};

#[tauri::command]
fn get_audio_file_duration(filepath: String) -> String {
  let tagged_file = Probe::open(filepath)
    .expect("ERROR: Bad path provided")
    .read()
    .expect("ERROR: Failed to read file");
  let properties = &tagged_file.properties();
  let duration = properties.duration().as_secs() as u16;
  let duration_as_string = duration.to_string();
  duration_as_string.into()
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![get_audio_file_duration])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
