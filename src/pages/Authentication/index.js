import React from 'react';
import styles from './styles.module.scss';

const Authentication = () => {
  return (
    <div className="page-center">
      <div className="container">
        <h2 className="center">Log In / Sign up</h2>
        <form className={styles.authForm}>
          <div className="input-holder">
            <label className="form-label">
              Your Login
              <input type="text" className="form-control" placeholder="Login" />
            </label>
          </div>
          <div className="input-holder">
            <label className="form-label">
              Your Email
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
              />
            </label>
          </div>
          <div className="input-holder">
            <label className="form-label">
              Your Password
              <input type="password" className="form-control" id="password" />
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            Log In / Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
