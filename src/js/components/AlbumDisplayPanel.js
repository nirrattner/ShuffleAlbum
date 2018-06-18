import React from 'react';
import { Grid } from 'react-bootstrap';

import AlbumDisplay from './AlbumDisplay';

import '../../css/album-display-panel.css';

const AlbumDisplayPanel = ({album}) => {
  return (
    <Grid className="album-display-panel">
      <AlbumDisplay album={album} />
    </Grid>
  );
};

export default AlbumDisplayPanel;
