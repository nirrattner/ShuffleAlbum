let promiseResolve;
let promiseReject;

window.spotifyReady = new Promise((resolve, reject) => {
  promiseResolve = resolve;
  promiseReject = reject;
})

window.onSpotifyWebPlaybackSDKReady = () => {
  promiseResolve();
};
