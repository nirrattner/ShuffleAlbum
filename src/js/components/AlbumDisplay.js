import React from 'react';
import { Col, Row } from 'react-bootstrap';

import '../../css/album-display.css';

const AlbumDisplay = ({album}) => {
  if (!album) {
    return null;
  }

  const { images: [ , image ], name: albumName, artists: [{ name: artistName }]} = album;

  return (
    <Row>
      <Col className="album-image" xs={6} mdOffset={2} md={4}>
        <img src={image.url} />
      </Col>
      <Col className="album-label" xs={6} md={4}>
        <h3>{artistName}</h3>
        <h3>{albumName}</h3>
      </Col>
    </Row>
  );
};

export default AlbumDisplay;
