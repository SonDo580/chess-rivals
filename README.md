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
- Get valid moves for selected piece
- Special moves: en passant, castling, promotion
- Check detection

2. **Todo**

- End of the game: checkmate, resigning, draw (stalemate, insufficient material, dead position)
- Highlight all attacks when checkmate is detected
- Backend integration and multi-player functionality

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
