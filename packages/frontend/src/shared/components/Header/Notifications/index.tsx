import React, { useState, useEffect } from 'react';
import { FiBell, FiX } from 'react-icons/fi';

import { useSocket } from '@shared/hooks/Socket';
import NotificationsList from './NotificationsList';

import {
  Container,
  NotificationsBox,
  BellButton,
  NotificationsDropDown,
  CloseButton,
} from './styles';

const Notifications: React.FC = () => {
  const { socket } = useSocket();

  const [isOpened, setIsOpened] = useState(false);
  const [hasNotification, setHasNotification] = useState(0);

  useEffect(() => {
    socket.on('@notification:create', () => setHasNotification(1));
  }, [socket]);

  return (
    <Container>
      <NotificationsBox>
        <BellButton
          hasNotification={hasNotification}
          onClick={() => setIsOpened(!isOpened)}
        >
          <FiBell />
        </BellButton>

        <NotificationsDropDown isOpened={Number(isOpened)}>
          <CloseButton onClick={() => setIsOpened(false)}>
            <FiX />
          </CloseButton>
          <NotificationsList onHasNotification={setHasNotification} />
        </NotificationsDropDown>
      </NotificationsBox>
    </Container>
  );
};

export default Notifications;
