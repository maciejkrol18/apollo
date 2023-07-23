import { PlaylistObject } from "@/ts/interfaces";
import PlaylistEntry from "@/components/atoms/PlaylistEntry";

interface PlaylistSongsProps {
  targetPlaylist: PlaylistObject | undefined;
}

const PlaylistSongs: React.FC<PlaylistSongsProps> = ({ targetPlaylist }) => {
  return (
    <div className="flex flex-col mt-10 pt-2 border-t-[#67646420] border-t-2">
      <div className="grid grid-cols-table-row mb-2">
        <div className="px-2 font-semibold">#</div>
        <div className="px-2 font-semibold">Title</div>
        <div className="px-2 font-semibold">Date added</div>
        <div className="px-2 font-semibold">Length</div>
      </div>
      {targetPlaylist?.songs.map((song, idx) => (
        <PlaylistEntry key={idx} song={song} playlist={targetPlaylist} idx={idx} />
      ))}
    </div>
  );
};

export default PlaylistSongs;
