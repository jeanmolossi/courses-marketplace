import React from 'react';
import { useTransition } from 'react-spring';

import { ToastMessage } from '@hooks/Toasts';
import Toast from './Toast';

import { Container } from './styles';

interface ToastContainer {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastContainer> = ({ messages }) => {
  const toastTransitions = useTransition(messages, message => message.id, {
    from: { right: '-120%' },
    enter: { right: '0%' },
    leave: { right: '-120%' },
  });

  return (
    <Container>
      {toastTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  );
};

export default ToastContainer;
