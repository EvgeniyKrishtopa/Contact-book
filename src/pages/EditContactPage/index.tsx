import React from 'react';
import ContactForm from '../../components/ContactForm';
import styles from './styles.module.scss';

const EditContactPage: React.FC = () => {
  return (
    <div className={`${styles.editContactPage} page-center`}>
      <div className="container">
        <h3 className="center">Edit Contact</h3>
        <ContactForm />
      </div>
    </div>
  );
};

export default EditContactPage;
