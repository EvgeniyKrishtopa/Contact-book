'use client';

import React from 'react';
import { Provider } from 'react-redux';
import store from 'store/state';
import CurrentUserProvider from 'currentUserProvider';
import TopBar from 'components/Topbar';
import Footer from 'components/Footer';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Provider store={store}>
    <CurrentUserProvider>
      <TopBar />
      {children}
      <Footer />
    </CurrentUserProvider>
  </Provider>
);

export default Providers;
