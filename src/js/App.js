import React, { Component } from 'react';

import AuthorizeButton from './components/AuthorizeButton';
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

const App = () => {
  const [album, setAlbum] = React.useState(null);
  const [albumTotal, setAlbumTotal] = React.useState(0);
  const [albumIndexes, setAlbumIndexes] = React.useState([]);
  const [authorizationUrl, setAuthorizationUrl] = React.useState('');
  const [devices, setDevices] = React.useState([]);
  const [deviceId, setDeviceId] = React.useState('');
  const [isDevicesLoading, setDevicesLoading] = React.useState(true);
  const [token, setToken] = React.useState(TokenStorage.getToken());

  const onError = (error) => {
    AuthorizationUrlGenerator.generate()
      .then((authorizationUrl) => {
        setAuthorizationUrl(authorizationUrl);
      });

    if (error.message === 'AUTHENTICATION_ERROR') {
      TokenStorage.removeToken();
      setToken('');
    }
  }

  const onToken = (token) => {
    onDeviceFetch();
    new SpotifyPlayer(token, onDeviceFetch);
    AlbumApi.get(token)
      .then(response => response.json())
      .then(({ total: albumTotal }) => {
        setAlbumTotal(albumTotal);
        setAlbumIndexes([...Array(albumTotal).keys()]);
      })
      .catch(onError);
  }

  const onDeviceChange = ({target: { value: deviceId }}) => {
    setDeviceId(deviceId);
    PlayApi.transfer(token, deviceId)
      .catch(onError);
  }

  const onDeviceFetch = () => {
    setDevices([]);
    setDeviceId('');
    setDevicesLoading(true);
    DeviceApi.get(token)
      .then(response => response.json())
      .then(({ devices }) => {
        const deviceId = devices.filter(device => device.is_active).map(device => device.id)[0]
          || devices[0].id;
        setDevices(devices);
        setDeviceId(deviceId);
        setDevicesLoading(false);
      })
      .catch(onError);
  }

  const onShuffle = () => {
    const index = albumIndexes.splice(Math.floor(Math.random() * albumIndexes.length), 1)[0];
    setAlbumIndexes(albumIndexes.length === 0
        ? [...Array(albumTotal).keys()]
        : albumIndexes);
    AlbumApi.get(token, index)
      .then(response => response.json())
      .then(({ items, total: albumTotal }) => {
        const album = items[0].album;
        PlayApi.play(token, album.uri, deviceId);
        setAlbum(album);
        setAlbumTotal(albumTotal);
      })
      .catch(onError);
  }

  React.useEffect(() => {
    const code = CodeExtractor.extract();
    if (code) {
      TokenApi.get(code)
        .then(response => response.json())
        .then(({ access_token: token }) => {
          setToken(token);
          TokenStorage.setToken(token);
          window.location.search = '';
          onToken(token);
        })
        .catch(onError);
      return;
    }

    if (token) {
      onToken(token);
      return;
    }

    AuthorizationUrlGenerator.generate()
      .then((authorizationUrl) => {
        setAuthorizationUrl(authorizationUrl);
      });
  }, []);

  return (
    <div className="app">
      <h1>Shuffle Spotify Albums</h1>
      <AuthorizeButton
        authorizationUrl={authorizationUrl}
        token={token}
      />
      <AuthorizedComponents
        album={album}
        albumTotal={albumTotal}
        deviceId={deviceId}
        devices={devices}
        isDevicesLoading={isDevicesLoading}
        token={token}
        onDeviceChange={onDeviceChange}
        onDeviceFetch={onDeviceFetch}
        onShuffle={onShuffle}
      />
    </div>
  )
};

export default App;
