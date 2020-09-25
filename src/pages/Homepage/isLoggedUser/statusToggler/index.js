import React from 'react';
import styles from '../styles.module.scss';

const StatusToggler = () => {
  return (
    <div className={styles.contactStatusFilter}>
      <h3 className="center">Filter contacts by status:</h3>
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
    </div>
  );
};

export default StatusToggler;
