'use client'

import ReactPlayer from "react-player";
import {useRef} from "react";

interface MediaPlayerProps {
    url: string;
}

const MediaPlayer = (props: MediaPlayerProps) => {
    const { url } = props;
    const playerRef = useRef<ReactPlayer>(null);

    return ReactPlayer.canPlay(url) ? (
        <div>
            <ReactPlayer ref={playerRef} url={url}/>
        </div>) : (<div>Can&apos;t play. Invalid Link.</div>);
}

export default MediaPlayer;