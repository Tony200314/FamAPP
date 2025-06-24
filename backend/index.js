const APIController = (function() {
    const clientId = ''; // Dein Spotify Client ID
    const clientSecret = ''; // Dein Spotify Client Secret

    // Token holen
    const _getToken = async function() {
        const result = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            body: 'grant_type=client_credentials'
        });
        const data = await result.json();
        return data.access_token;
    };

    // Beispiel: Playlist holen
    const _getPlaylistByGenre = async (token, genreId) => {
        const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=1`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        return data.playlists.items[0]; // Nur die erste Playlist
    };

    // Tracks aus einer Playlist holen
    const _getTracksFromPlaylist = async (token, playlistId) => {
        const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=1`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token }
        });
        const data = await result.json();
        return data.items[0].track; // Nur der erste Track
    };

    return {
        getToken() {
            return _getToken();
        },
        getPlaylistByGenre(token, genreId) {
            return _getPlaylistByGenre(token, genreId);
        },
        getTrackFromPlaylist(token, playlistId) {
            return _getTracksFromPlaylist(token, playlistId);
        }
    }
})();



//UI module  
const UIController = (function() {
    // Selektoren für DOM-Elemente
    const DOMElements = {
        spotifyBar: '.spotify-bar',
        // weitere Selektoren nach Bedarf
    };

    return {
        // Methode, um einen Track im UI anzuzeigen
        displayTrack(track) {
            const bar = document.querySelector(DOMElements.spotifyBar);
            if (track && bar) {
                bar.innerText = `🎧 Hört gerade: ${track.name} – ${track.artists.map(a => a.name).join(', ')}`;
            } else if (bar) {
                bar.innerText = "🎧 Kein Track gefunden";
            }
        }
    };
})();