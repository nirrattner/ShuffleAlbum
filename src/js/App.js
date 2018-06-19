import React, { Component } from 'react';

import AuthorizeButton from './components/AuthorizeButton';
import ReauthorizeButton from './components/ReauthorizeButton';
import AuthorizedComponents from './components/AuthorizedComponents';

import * as AlbumApi from './api/AlbumApi';
import * as DeviceApi from './api/DeviceApi';
import * as PlayApi from './api/PlayApi';
import * as TokenExtractor from './library/TokenExtractor';
import SpotifyPlayer from './library/SpotifyPlayer';

import '../css/app.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albumTotal: null,
      albumUri: null,
      devices: [],
      deviceId: null,
      devicesLoading: true,
      error: null,
      reauthorize: false,
      token: TokenExtractor.extract(),
    };
  }

  componentDidMount() {
    const { token } = this.state;
    if (token) {
      this.onDeviceFetch();
      new SpotifyPlayer(token, this.onDeviceFetch.bind(this));
      AlbumApi.get(token)
        .then(response => response.json())
        .then(({ total: albumTotal }) => {
          this.setState({ albumTotal });
        })
        .catch(this.onError.bind(this));
    }
  }

  onError(error) {
    if (error.message === 'AUTHENTICATION_ERROR') {
      this.setState({ reauthorize: true });
    }
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
    const { albumTotal, deviceId, token } = this.state;
    const offset = Math.floor(Math.random() * albumTotal);
    AlbumApi.get(token, offset)
      .then(response => response.json())
      .then(({ items, total }) => {
        const album = items[0].album; 
        PlayApi.play(token, album.uri, deviceId);
        this.setState({ 
          album: album,
          albumTotal: total,
        });
      })
      .catch(this.onError.bind(this));
  }

  render() {
    const { album, albumTotal, deviceId, devices, devicesLoading, reauthorize, token } = this.state;
    return (
      <div className="app">
        <h1>Shuffle Spotify Albums</h1>
        <AuthorizeButton token={token} />
        <ReauthorizeButton reauthorize={reauthorize} />
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
