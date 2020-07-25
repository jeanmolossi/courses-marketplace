import React from 'react';

import DefaultLayout from '@globalComponents/_Layout/Default';

import { Container } from './styles';

const Dashboard: React.FC = () => {
  return (
    <DefaultLayout>
      <Container>
        <h1>Dashboard</h1>
      </Container>
    </DefaultLayout>
  );
};

export default Dashboard;
