import React from 'react';

const Loading = ({loading}) => {
  if (!loading) {
    return null;
  }
  return <div>Loading...</div>;
};

export default Loading;
