import { Request } from 'express';

export default function singleUserEmitEvent<T>(
  event: string,
  toUserId: string,
  request: Request,
  payload: T,
): T | undefined {
  if (request.connectedUsers[toUserId]) {
    request.io.to(request.connectedUsers[toUserId]).emit(event, payload);

    console.log(
      `emitted for ${toUserId} with socketId ${request.connectedUsers[toUserId]}`,
    );
    console.log(`debug: >> `, payload);
    console.log(`Event: ${event}`);

    return payload;
  }
  return undefined;
}
