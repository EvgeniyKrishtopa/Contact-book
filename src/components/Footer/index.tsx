import React from 'react';
import styles from './styles.module.scss';

const Footer:React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="projectInfo">
          Designed and built with all the love in the world by the{' '}
          <a href="https://www.linkedin.com/in/evgeniy-krishtopa/">
            Evgeniy Krishtopa
          </a>
          &nbsp;&copy;2020
        </div>
      </div>
    </footer>
  );
};

export default Footer;
