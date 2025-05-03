import React from 'react';
import Button from 'react-bootstrap/Button';

import '../../css/shuffle-button.css';

const ShuffleButton = ({albumTotal, deviceId, onShuffle}) => {
  return (
    <Button
      className="shuffle-button btn-primary btn-lg"
      onClick={onShuffle}
      disabled={!albumTotal || !deviceId}
    >
      Next album
    </Button>
  );
};

export default ShuffleButton;
