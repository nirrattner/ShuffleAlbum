import React from 'react';

import AlbumDisplayPanel from './AlbumDisplayPanel';
import DeviceChooser from './DeviceChooser';
import ShuffleButton from './ShuffleButton';

const AuthorizedComponents = ({
  album, 
  albumTotal, 
  deviceId,
  devices,
  isDevicesLoading,
  token,
  onDeviceChange,
  onDeviceFetch,
  onShuffle,
}) => {
  if (!token) {
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
        isDevicesLoading={isDevicesLoading}
        token={token}
        onDeviceChange={onDeviceChange}
        onDeviceFetch={onDeviceFetch}
      />
    </div>
  );
};

export default AuthorizedComponents;
