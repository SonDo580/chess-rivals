# Chess Rivals

Compete in a chess game and hone your strategic thinking.

> [!NOTE]
> The game was developed without any chess libraries.  
> In a real chess engine, a special data structure called "FEN string" is typically used to represent the board state.  
> In my implementation, I used a 2-dimensional array.

![Chess-Rivals](https://github.com/SonDo580/chess-rivals/blob/main/client/public/chess-battle.png)

## Play

https://sondm-chess.netlify.app

> [!NOTE]
> The server may take up to 1 minute to process the first request (It spins down after 15 minutes of no incoming traffic, and will need some time to spin back up)

## Technologies

- ReactJS
- NodeJS
- TypeScript
- Socket.io

## Features

1. **Implemented**

- Board visualization, square highlighting
- Normal moves
- Special moves: en passant, castling, promotion
- Check detection
- Endgame detection: checkmate, stalemate, 50-move rule
- Realtime multi-player functionality

2. **Not implemented**

- Threefold repetition rule
- Explicit handling of insufficient material and deadlock position (In these cases, the draw result will be realized through 50-move rule)

## Development

1. Clone the repository

   ```bash
   git clone https://github.com/SonDo580/chess-rivals.git
   ```

2. Define environment variables in `.env` for client and server
   (see `.env.example`)

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

5. Access the game in your web browser at `http://localhost:5173` by default
