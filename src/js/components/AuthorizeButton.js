import React from 'react';
import Button from 'react-bootstrap/Button';

import '../../css/authorize-button.css';

const AuthorizeButton = ({authorizationUrl, token}) => {
  if (!authorizationUrl || token) {
    return null;
  }
  return (
    <Button
      className="authorize-button btn-primary btn-lg"
      href={authorizationUrl}
    >
      Authorize
    </Button>
  );
}

export default AuthorizeButton;
