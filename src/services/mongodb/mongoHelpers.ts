import { connections, ConnectionStates } from 'mongoose';

export const checkMongoConnected = (): boolean => {
  console.log("count connections to DB",connections.length, connections[0].readyState);
  if (connections[0].readyState !== ConnectionStates.connected) {
    return false;
  }
  return true;
};
