# Chess Rivals

Compete in a chess game and hone your strategic thinking.

![Local Image](/chess-battle.png)

## Table of Contents

- [Play](#play)
- [Technologies](#technologies)
- [Features](#features)
- [Development](#development)

## Play

https://sondm-chess.netlify.app

## Technologies

- ReactJS
- TypeScript
- NodeJS
- Socket.io

## Features

1. **Implemented**

- Board visualization, move highlighting
- Basic moves for each piece
- Special moves: en passant, castling, promotion
- Check detection
- Endgame detection: checkmate, stalemate, 50-move
- Realtime multi-player functionality

2. **Not implemented**

- 3-fold repetition rule
- Explicit handling of insufficient material and deadlock position (In these cases, the draw result will be realized through 50-move rule)

## Development

1. Clone the repository

   ```bash
   git clone https://github.com/SonDo580/chess-rivals.git
   ```

2. Install server dependencies and run server

   ```bash
   cd server
   yarn
   yarn dev
   ```

3. Install client dependencies and run client

   ```bash
   cd client
   yarn
   yarn dev
   ```

4. Access the game in your web browser at `http://localhost:5173` by default
