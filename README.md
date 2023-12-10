# Chess Rivals

Compete in a chess game and hone your strategic thinking.

## Note

The game is still under development. So both players must play on the same browser window, and refresh the page for a rematch. More features will be added soon.

## Table of Contents

- [Demo](#demo)
- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)

## Demo

Check out the beta version: [Chess Rivals Beta](https://sondm-chess.netlify.app)

## Technologies

- ReactJS
- TypeScript
- NodeJS (to be added)
- Socket.io (to be added)

## Features

1. **Implemented**

- Board visualization, move highlighting
- Basic moves for each piece
- Special moves: en passant, castling, promotion
- Check detection
- Endgame detection: checkmate, stalemate, 50-move

2. **Todo**

- Backend integration and multi-player functionality

3. **Not implemented**

- 3-fold repetition rule
- Explicit handling of insufficient material and deadlock position (In these cases, the draw result will be realized through 50-move rule).

## Installation

1. Clone the repository

   ```bash
   git clone https://github.com/SonDo580/tic-tac-toe.git
   ```

2. Install client dependencies

   ```bash
   cd client
   yarn
   ```

## Usage

1. Start the client in development mode

   ```bash
   cd client
   yarn dev
   ```

2. Access the game in your web browser at `http://localhost:5173` by default
