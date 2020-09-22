import React from 'react';
import styles from '../styles.module.scss';

const StatusToggler = () => {
  return (
    <ul className={styles.contactsToggler}>
      <li>
        <a href="/">Active</a>
      </li>
      &nbsp;|&nbsp;
      <li>
        <a href="/">Inactive</a>
      </li>
      &nbsp;|&nbsp;
      <li>
        <a href="/">ALL</a>
      </li>
    </ul>
  );
};

export default StatusToggler;
