import React from 'react';

const Option: React.FC<{ email: string }> = ({ email }) => {
  return <option value={email}>{email}</option>;
};

export default Option;
