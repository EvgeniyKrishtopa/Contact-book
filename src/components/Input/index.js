import React from 'react';
import { formControl } from './styles.module.scss';

const Input = () => {
  return (
    <div className="container">
      <p>hello</p>
      <input type="text" placeholder="name" className={formControl} />
    </div>
  );
};

export default Input;
