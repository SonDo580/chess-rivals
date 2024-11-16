export enum ClientEventName {
  CONNECTION = "connection",
  DISCONNECT = "disconnect",

  CREATE_ROOM = "createRoom",
  JOIN_ROOM = "joinRoom",
  LEAVE_ROOM = "leaveRoom",

  SELECT_SQUARE = "selectSquare",
  PROMOTE = "promote",

  RESET_REQUEST = "resetRequest",
  ACCEPT_RESET = "acceptReset",
  REJECT_RESET = "rejectReset",
}

export enum ServerEventName {
  INIT_ROOM = "initRoom",
  ROOM_UPDATED = "roomUpdated",

  RESET_REQUEST = "resetRequest",
  RESET_REJECTED = "resetRejected",

  ROOM_LEAVED = "roomLeaved",
  OPPONENT_JOINED = "opponentJoined",
  OPPONENT_LEAVED = "opponentLeaved",

  // for validation when joining
  NAME_ERROR = "nameError",
  ROOM_ID_EMPTY = "roomIdEmpty",
  ROOM_NOT_EXISTS = "roomNotExists",
  ROOM_FULL = "roomFull",
}
