import { ObjectID } from 'typeorm';

export default interface ToggleNotificationRequestDTO {
  id: ObjectID;
  currentStatus: boolean;
}
