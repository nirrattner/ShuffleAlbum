import React from 'react';
import { Button } from 'react-bootstrap';

import '../../css/shuffle-button.css';

const ShuffleButton = ({albumTotal, deviceId, onShuffle}) => {
  return (
    <Button
      bsSize="large"
      bsStyle="primary"
      className="shuffle-button"
      onClick={onShuffle}
      disabled={albumTotal && !deviceId}
    >
      Next album
    </Button>
  );
};

export default ShuffleButton;
