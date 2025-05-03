import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import '../../css/album-display.css';

const AlbumDisplay = ({album}) => {
  if (!album) {
    return null;
  }

  const { images: [ , image ], name: albumName, artists: [{ name: artistName }]} = album;

  return (
    <Row className="justify-content-md-center">
      <Col className="album-image-wrapper" xs={6} mdOffset={2} md={4}>
        <img className="album-image" src={image.url} />
      </Col>
      <Col className="album-label" xs={6} md={4}>
        <h3>{artistName}</h3>
        <h3>{albumName}</h3>
      </Col>
    </Row>
  );
};

export default AlbumDisplay;
