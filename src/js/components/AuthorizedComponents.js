import React from 'react';

import AlbumDisplayPanel from './AlbumDisplayPanel';
import DeviceChooser from './DeviceChooser';
import ShuffleButton from './ShuffleButton';

const AuthorizedComponents = ({
  album, 
  albumTotal, 
  deviceId,
  devices,
  devicesLoading,
  token,
  reauthorize,
  onDeviceChange,
  onDeviceFetch,
  onShuffle,
}) => {
  if (reauthorize || !token) {
    return null;
  }

  return (
    <div>
      <AlbumDisplayPanel album={album} />
      <ShuffleButton 
        albumTotal={albumTotal}
        deviceId={deviceId}
        onShuffle={onShuffle} 
      />
      <DeviceChooser
        deviceId={deviceId}
        devices={devices}
        devicesLoading={devicesLoading}
        token={token}
        onDeviceChange={onDeviceChange}
        onDeviceFetch={onDeviceFetch}
      />
    </div>
  );
};

export default AuthorizedComponents;
