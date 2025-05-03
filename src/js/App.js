import React, { Component } from 'react';

import AuthorizeButton from './components/AuthorizeButton';
import ReauthorizeButton from './components/ReauthorizeButton';
import AuthorizedComponents from './components/AuthorizedComponents';

import * as AlbumApi from './api/AlbumApi';
import * as CodeExtractor from './library/CodeExtractor';
import * as DeviceApi from './api/DeviceApi';
import * as PlayApi from './api/PlayApi';
import * as TokenApi from './api/TokenApi';

import * as AuthorizationUrlGenerator from  './library/AuthorizationUrlGenerator';
import * as TokenStorage from './library/TokenStorage';
import SpotifyPlayer from './library/SpotifyPlayer';

import '../css/app.css';

class App extends Component {
   constructor(props) {
    super(props);
    this.state = {
      albumTotal: null,
      albumUri: null,
      albums: [],
      authorizationUrl: null,
      devices: [],
      deviceId: null,
      devicesLoading: true,
      error: null,
      reauthorize: false,
      token: TokenStorage.getToken(),
    };
  }

  componentDidMount() {
    const { token } = this.state;
    const code = CodeExtractor.extract();

    if (code) {
      TokenApi.get(code)
        .then(response => response.json())
        .then(({ access_token: token }) => {
          this.setState({ token });
          TokenStorage.setToken(token);
          window.location.search = '';
          this.onToken(token);
        })
        .catch(this.onError.bind(this));
      return;
    }

    if (token) {
      this.onToken(token);
      return;
    }

    AuthorizationUrlGenerator.generate()
      .then((authorizationUrl) => {
        this.setState({ authorizationUrl });
      });
  }

  onError(error) {
    AuthorizationUrlGenerator.generate()
      .then((authorizationUrl) => {
        this.setState({ authorizationUrl });
      });

    if (error.message === 'AUTHENTICATION_ERROR') {
      this.setState({ reauthorize: true });
    }
  }

  onToken(token) {
    this.onDeviceFetch();
    new SpotifyPlayer(token, this.onDeviceFetch.bind(this));
    AlbumApi.get(token)
      .then(response => response.json())
      .then(({ total: albumTotal }) => {
        this.setState({
          albums: [...Array(albumTotal).keys()],
          albumTotal,
        });
      })
      .catch(this.onError.bind(this));
  }

  onDeviceChange({target: { value: deviceId }}) {
    const { token } = this.state;
    this.setState({ deviceId });
    PlayApi.transfer(token, deviceId)
      .catch(this.onError.bind(this));
  }

  onDeviceFetch() {
    const { token } = this.state;
    this.setState({
      devices: [],
      deviceId: null,
      devicesLoading: true,
    });
    DeviceApi.get(token)
      .then(response => response.json())
      .then(({ devices }) => {
        const deviceId = devices.filter(device => device.is_active).map(device => device.id)[0]
          || devices[0].id;
        this.setState({
          deviceId,
          devices,
          devicesLoading: false,
        });
      })
      .catch(this.onError.bind(this));
  }

  onShuffle() {
    const { albums, albumTotal, deviceId, token } = this.state;
    const offset = albums.splice(Math.floor(Math.random() * albums.length), 1);
    this.setState({
      albums: albums.length !== 0
        ? albums
        : [...Array(albumTotal).keys()],
    });
    AlbumApi.get(token, offset)
      .then(response => response.json())
      .then(({ items, total }) => {
        const album = items[0].album;
        PlayApi.play(token, album.uri, deviceId);
        this.setState({
          album,
          albumTotal: total
        });
      })
      .catch(this.onError.bind(this));
  }

  render() {
    const { album, albumTotal, authorizationUrl, deviceId, devices, devicesLoading, reauthorize, token } = this.state;
    return (
      <div className="app">
        <h1>Shuffle Spotify Albums</h1>
        <AuthorizeButton
          authorizationUrl={authorizationUrl}
          token={token}
        />
        <ReauthorizeButton
          authorizationUrl={authorizationUrl}
          reauthorize={reauthorize}
        />
        <AuthorizedComponents
          album={album}
          albumTotal={albumTotal}
          deviceId={deviceId}
          devices={devices}
          devicesLoading={devicesLoading}
          reauthorize={reauthorize}
          token={token}
          onDeviceChange={this.onDeviceChange.bind(this)}
          onDeviceFetch={this.onDeviceFetch.bind(this)}
          onShuffle={this.onShuffle.bind(this)}
        />
      </div>
    );
  }
}

export default App;
