import React, { Fragment } from 'react';
import './App.css';

import ContactBook from './containers/contacts/book';
import Title from './components/title/title';

const App = () => (
  <Fragment>
    <Title title="Contact Book"/>
    <ContactBook />
  </Fragment>
)

export default App;