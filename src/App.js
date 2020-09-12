import React from 'react';
import 'normalize.css';
import './styles/common.scss';
import Routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { CurrentUserProvider } from './hocs/currentUserProvider';
import TopBar from './components/Topbar';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store/state';

const App = () => (
  <Provider store={store}>
    <CurrentUserProvider>
      <Router>
        <TopBar />
        <Routes />
      </Router>
      <Footer />
    </CurrentUserProvider>
  </Provider>
);

export default App;
