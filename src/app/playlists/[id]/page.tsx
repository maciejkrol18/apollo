"use client";

import { useParams } from 'next/navigation';

const PlaylistPage: React.FC = () => {

    const {id} = useParams()

    return (
        <div>
            <h1>Playlist page</h1>
            <p>ID: {id}</p>
        </div>
    )
}

export default PlaylistPage