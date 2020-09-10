import React from 'react';
import 'normalize.css';
import './styles/common.scss';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import TopBar from './components/Topbar';
import Footer from './components/Footer';

const App = () => (
  <>
    <Router>
      <TopBar />
      <Routes />
    </Router>
    <Footer />
  </>
);

export default App;
