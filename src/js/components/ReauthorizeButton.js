import React from 'react';
import { Button } from 'react-bootstrap';

import * as AuthorizationUrlGenerator from  '../library/AuthorizationUrlGenerator';

const ReauthorizeButton = ({reauthorize}) => {
  if (!reauthorize) {
    return null;
  }
  return (
    <div>
      <div>Authorization failure detected</div>
      <Button
        bsSize="large"
        bsStyle="primary"
        href={AuthorizationUrlGenerator.generate()}
      >
        Attempt to reauthorize
      </Button>
    </div>
  );
}

export default ReauthorizeButton;
