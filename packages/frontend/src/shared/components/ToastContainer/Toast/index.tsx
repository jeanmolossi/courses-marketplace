import React, { useEffect } from 'react';
import { ToastMessage, useToast } from '@hooks/Toasts';
import { FiInfo, FiAlertCircle, FiCheckCircle, FiX } from 'react-icons/fi';

import { Container } from './styles';

interface ToastProps {
  message: ToastMessage;
  style: any;
}

const icons = {
  info: <FiInfo size={24} />,
  error: <FiAlertCircle size={24} />,
  success: <FiCheckCircle size={24} />,
};

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeToast(message.id);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeToast, message.id]);

  return (
    <Container
      type={message.type}
      hasdescription={Number(!!message.description)}
      style={style}
    >
      {icons[message.type || 'info']}

      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
      </div>

      <button type="button" onClick={() => removeToast(message.id)}>
        <FiX size={18} />
      </button>
    </Container>
  );
};

export default Toast;
