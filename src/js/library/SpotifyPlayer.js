class SpotifyPlayer {
  constructor(
    token,
    onDeviceFetch) {
    this.token = token;
    this.playerPromise = window.spotifyReady
      .then(() => {
        const player = new window.Spotify.Player({
          name: 'Shuffle Albums (This tab)',
          getOAuthToken: callback => { callback(token); }
        });

        player.addListener('ready', ({ device_id }) => { 
          onDeviceFetch();
          console.log('Ready with Device ID', device_id); 
        });
        
        player.addListener('initialization_error', ({ message }) => { console.error(message); });
        player.addListener('authentication_error', ({ message }) => { console.error(message); });
        player.addListener('account_error', ({ message }) => { console.error(message); });
        player.addListener('playback_error', ({ message }) => { console.error(message); });
        player.addListener('player_state_changed', state => { console.log(state); });
        player.addListener('not_ready', ({ device_id }) => { console.log('Device ID has gone offline', device_id); });

        player.connect();
        return player;
      });
  }
};

export default SpotifyPlayer;
