import React from 'react';
import { Button } from 'react-bootstrap';

import * as AuthorizationUrlGenerator from  '../library/AuthorizationUrlGenerator';

import '../../css/authorize-button.css';

const AuthorizeButton = ({token}) => {
  if (token) {
    return null;
  }
  return (
    <Button
      bsSize="large"
      bsStyle="primary"
      className="authorize-button"
      href={AuthorizationUrlGenerator.generate()}
    >
      Authorize
    </Button>
  );
}

export default AuthorizeButton;
