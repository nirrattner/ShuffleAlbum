import React from 'react';
import { Button } from 'react-bootstrap';

import * as AuthorizationUrlGenerator from  '../library/AuthorizationUrlGenerator';

const AuthorizeButton = ({token}) => {
  if (token) {
    return null;
  }
  return (
    <Button
      bsSize="large"
      bsStyle="primary"
      href={AuthorizationUrlGenerator.generate()}
    >
      Authorize
    </Button>
  );
}

export default AuthorizeButton;
