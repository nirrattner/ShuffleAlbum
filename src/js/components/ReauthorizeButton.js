import React from 'react';
import Button from 'react-bootstrap/Button';

const ReauthorizeButton = ({authorizationUrl, reauthorize}) => {
  if (!authorizationUrl || !reauthorize) {
    return null;
  }
  return (
    <div>
      <h4>Authorization failure detected -- one hour token most likely expired</h4>
      <Button
        className="btn-primary btn-lg"
        href={authorizationUrl}
      >
        Attempt to reauthorize
      </Button>
    </div>
  );
}

export default ReauthorizeButton;
