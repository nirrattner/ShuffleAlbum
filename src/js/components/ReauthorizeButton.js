import React from 'react';
import { Button } from 'react-bootstrap';

const ReauthorizeButton = ({authorizationUrl, reauthorize}) => {
  if (!authorizationUrl || !reauthorize) {
    return null;
  }
  return (
    <div>
      <h3>Authorization failure detected -- one hour token most likely expired</h3>
      <Button
        bsSize="large"
        bsStyle="primary"
        href={authorizationUrl}
      >
        Attempt to reauthorize
      </Button>
    </div>
  );
}

export default ReauthorizeButton;
