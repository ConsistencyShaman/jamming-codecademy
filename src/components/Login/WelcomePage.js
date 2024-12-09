import React, { useEffect } from 'react';
import { spotifyAuthCodeFlow } from '../../auth/script';

export function Welcome() {

    const handleLogin = () => {
        window.Location.href = spotifyAuthCodeFlow();
    }

    return (
        <div>
            <h1>Music Everywhere!</h1>
            <button onClick={handleLogin}>Login with Spotify</button>
        </div>
    )
}