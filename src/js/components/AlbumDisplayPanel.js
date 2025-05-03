import React from 'react';
import Container from 'react-bootstrap/Container';

import AlbumDisplay from './AlbumDisplay';

import '../../css/album-display-panel.css';

const AlbumDisplayPanel = ({album}) => {
  return (
    <Container className="album-display-panel">
      <AlbumDisplay album={album} />
    </Container>
  );
};

export default AlbumDisplayPanel;
