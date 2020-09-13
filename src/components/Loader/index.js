import React from 'react';
import styles from './styles.module.scss';
import MaterialIcon from 'material-icons-react';

const preloader = (
  <div className={styles.ldsRipple}>
    <div></div>
    <div></div>
  </div>
);

const Loader = () => {
  return <MaterialIcon icon="dashboard" preloader={preloader} />;
}

export default Loader;
