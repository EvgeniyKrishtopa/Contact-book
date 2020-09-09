import React from 'react';
import 'normalize.css';
import './styles/common.scss';
import TopBar from './components/Topbar';
import Homepage from './pages/Homepage';

const App = () => (
  <>
    <TopBar />
    <Homepage />
  </>
);

export default App;
