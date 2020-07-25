import React from 'react';

import AppProvider from '@hooks/index';

import Routes from '@shared/routes';

import GlobalStyles from './shared/styles/GlobalStyles';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes />
      <GlobalStyles />
    </AppProvider>
  );
};

export default App;
