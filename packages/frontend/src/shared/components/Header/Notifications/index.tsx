import React, { useState } from 'react';
import { FiBell } from 'react-icons/fi';

import NotificationsList from './NotificationsList';

import {
  Container,
  NotificationsBox,
  BellButton,
  NotificationsDropDown,
} from './styles';

const Notifications: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [hasNotification, setHasNotification] = useState(0);

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
          <NotificationsList onHasNotification={setHasNotification} />
        </NotificationsDropDown>
      </NotificationsBox>
    </Container>
  );
};

export default Notifications;
