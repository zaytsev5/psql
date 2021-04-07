type Player = 'X' | 'O'
type Cell = Player | undefined;
type Row = [Cell, Cell, Cell];
type Pos = number;
type Board = [Row, Row, Row]

interface State{
  turn: number;
  board: Board
}
  


const initState = (): State =>
  ({ turn: 0, board: [[undefined,undefined,undefined],[undefined,undefined,undefined],[undefined,undefined,undefined]] });


console.log(initState().board[0]);
