const initState = {
  history: [
    {
      squares: Array(20)
        .fill(null)
        .map(() => Array(20).fill(null)),
      coordinate: null
    }
  ],
  step: 0,
  isWin: false,
  winCells: null,
  isX: true,
  socket: null,
  room: '',
  pairStatus: 'WAITING',
  isYourTurn: false
};

export default initState;
