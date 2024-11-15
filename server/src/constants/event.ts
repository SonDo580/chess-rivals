export enum ClientEventName {
  Connection = "connection",
  Disconnect = "disconnect",

  CreateRoom = "createRoom",
  JoinRoom = "joinRoom",
  LeaveRoom = "leaveRoom",

  SelectSquare = "selectSquare",
  Promote = "promote",

  ResetRequest = "resetRequest",
  AcceptReset = "acceptReset",
  RejectReset = "rejectReset",
}

export enum ServerEventName {
  InitRoom = "initRoom",
  RoomUpdated = "roomUpdated",

  ResetRequest = "resetRequest",
  ResetRejected = "resetRejected",

  RoomLeaved = 'roomLeaved',
  OpponentJoined = 'opponentJoined',
  OpponentLeaved = 'opponentLeaved',

  // for validation when joining 
  NameError = "nameError",
  RoomIdEmpty = "roomIdEmpty",
  RoomNotExists = "roomNotExists",
  RoomFull = "roomFull",
}
