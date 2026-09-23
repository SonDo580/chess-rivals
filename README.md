# Chess Rivals

Compete in a chess game and hone your strategic thinking.

![Chess-Rivals](https://github.com/SonDo580/chess-rivals/blob/main/client/public/chess-battle.png)

## Play

- Website: https://sondm-chess.netlify.app
- Go to the website, create a room, copy the room ID and send it to your friend so he/she can join.

## Technologies

- Frontend: `ReactJS` + `TS`
- Backend: `NodeJS` + `TS`
- Networking: `Socket.io`

## Features

1. **Implemented**

- Board visualization, square highlighting.
- Normal moves.
- Special moves: en passant, castling, promotion.
- Check detection.
- Endgame detection: checkmate, stalemate, 50-move rule.
- Realtime multi-player functionality.

2. **Not implemented**

- Threefold repetition rule.
- Explicit handling of insufficient material and deadlock positions _(In these cases, the draw result will be realized through 50-move rule)_.

## Implementation notes

- I use 2D array to represent board state. A real chess engine typically uses `FEN string`.

## Development

1. Clone the repository

```bash
git clone https://github.com/SonDo580/chess-rivals.git
```

2. Define environment variables in `.env` for client and server _(see `.env.example`)_

3. Install server dependencies and run server

```bash
cd server
yarn
yarn dev
```

4. Install client dependencies and run client

```bash
cd client
yarn
yarn dev
```

5. Access the game in your web browser at `http://localhost:5173`
