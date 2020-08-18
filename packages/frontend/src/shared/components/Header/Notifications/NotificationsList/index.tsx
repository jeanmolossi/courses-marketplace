import React, {
  useEffect,
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import {
  FiCheckCircle,
  FiCircle,
  FiHelpCircle,
  FiVideo,
  FiAlertCircle,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { formatDistance, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import api from '@shared/services/api';
import { useAuth } from '@shared/hooks/Auth';

import { useSocket } from '@shared/hooks/Socket';
import {
  Container,
  SingleNotification,
  LeftSide,
  IconBox,
  MarkasRead,
  NotificationDetails,
} from './styles';

interface NotificationProps {
  id: string;
  type: 'forum' | 'lesson';
  userId: string;
  text: string;
  read: boolean;
  created_at: string;
  formattedDate: string;
}

interface NotificationListProps {
  onHasNotification: Dispatch<SetStateAction<number>>;
}

const icons = {
  alert: <FiAlertCircle />,
  forum: <FiHelpCircle />,
  lesson: <FiVideo />,
};

const NotificationsList: React.FC<NotificationListProps> = ({
  onHasNotification,
}) => {
  const { user } = useAuth();
  const { socket } = useSocket();

  const [notifications, setNotifications] = useState([] as NotificationProps[]);

  const handleMarkAsRead = useCallback(
    ({ id, read }) => {
      api
        .put<NotificationProps[]>(`notifications/update`, { id, read })
        .then(_ => {
          const notificationsReloaded = notifications.map(n => {
            if (n.id === id) {
              return {
                ...n,
                read: !read,
              };
            }
            return n;
          });
          setNotifications(notificationsReloaded);

          const hasNotificationsUnread = notificationsReloaded.find(
            n => n.read !== true,
          );

          if (hasNotificationsUnread) onHasNotification(1);
          else onHasNotification(0);
        });
    },
    [notifications, onHasNotification],
  );

  useEffect(() => {
    api.get<NotificationProps[]>(`notifications/me`).then(response => {
      const notificationFormatted = response.data.map(n => {
        const parsedDate = parseISO(n.created_at);
        return {
          ...n,
          formattedDate: formatDistance(parsedDate, new Date(), {
            addSuffix: true,
            locale: ptBR,
          }),
        };
      });
      setNotifications(notificationFormatted);

      const hasNotificationsUnread = notificationFormatted.find(
        n => n.read !== true,
      );

      if (hasNotificationsUnread) onHasNotification(1);
      else onHasNotification(0);
    });
  }, [user.id, onHasNotification]);

  useEffect(() => {
    socket.on('@notification:create', (payload: NotificationProps) => {
      const parsedDate = parseISO(payload.created_at);
      const parsedNotification: NotificationProps = {
        ...payload,
        formattedDate: formatDistance(parsedDate, new Date(), {
          addSuffix: true,
          locale: ptBR,
        }),
      };

      setNotifications([parsedNotification, ...notifications]);
    });
  }, [socket, notifications]);

  return (
    <Container>
      {notifications.map(notification => (
        <SingleNotification
          read={Number(notification.read)}
          key={notification.id}
        >
          <LeftSide>
            <IconBox>{icons[notification.type || 'alert']}</IconBox>
            <MarkasRead
              type="button"
              onClick={() => {
                handleMarkAsRead({
                  id: notification.id,
                  read: notification.read,
                });
              }}
              title="Marcar como lida"
            >
              {notification.read ? <FiCheckCircle /> : <FiCircle />}
            </MarkasRead>
          </LeftSide>
          <NotificationDetails>
            <Link to={`/forum/topico/${notification.id}`}>
              <p>{notification.text}</p>
            </Link>
            <small>{notification.formattedDate}</small>
          </NotificationDetails>
        </SingleNotification>
      ))}
    </Container>
  );
};

export default NotificationsList;
