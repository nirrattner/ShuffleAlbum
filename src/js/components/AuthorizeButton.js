import React from 'react';
import { Button } from 'react-bootstrap';

import '../../css/authorize-button.css';

const AuthorizeButton = ({authorizationUrl, token}) => {
  if (!authorizationUrl || token) {
    return null;
  }
  return (
    <Button
      bsSize="large"
      bsStyle="primary"
      className="authorize-button"
      href={authorizationUrl}
    >
      Authorize
    </Button>
  );
}

export default AuthorizeButton;
