export default interface BoardCell {
    row: number;
    col: number;
    status: 'empty' | 'ship' | 'hit' | 'miss';
  }
  
