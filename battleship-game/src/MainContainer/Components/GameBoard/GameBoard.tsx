import React, { useEffect, useState } from 'react'
import BoardCell from '../../../model/BoardCell'
import { Ship } from '../../../model/Ship'
import ShipCell from '../../../model/ShipCell'
import ShipBox from '../shared/ShipBox'
import Toast from '../shared/Toast'

const BOARD_SIZE = 10
const colLetters: string[] = 'abcdefghij'.split('');
const rowNumbers: number[] = Array.from(Array(10).keys())

const shipList: Ship[] = [
    { name: 'Battleship', lenght: 5, placed: false },
    { name: 'Destroyer', lenght: 4, placed: false },
    { name: 'Destroyer', lenght: 4, placed: false }
]

function GameBoard() {
    const [board, setBoard] = useState<BoardCell[][]>([])
    const [startGame, setStartGame] = useState<boolean>(false)
    const [shipPlacement, setShipPlacement] = useState<ShipCell[][]>([])
    const [message, setMessage] = useState<string>('');
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [shipPlaced, setShipPlaced] = useState<boolean>(false)

    const playAgain = () => {
        setStartGame(false)
        setBoard([]);
        setShipPlacement([]);
        setMessage('')
        setGameOver(false)
        setShipPlaced(false)
        initBoard()
    }

    const initBoard = () => {
        let newBoard: BoardCell[][] = Array.from({ length: BOARD_SIZE }, () =>
            Array.from({ length: BOARD_SIZE }, () => ({ row: 0, col: 0, status: 'empty' })))
        setBoard(newBoard);
    }

    const placeShip = () => {
        setStartGame(true)
        const newShipPlacement: ShipCell[][] = []
        shipList.forEach(ship => {
            let placed = false
            while (!placed) {
                const orientation = Math.random() < 0.5 ? "horizontal" : "vertical";
                const row = Math.floor(Math.random() * BOARD_SIZE);
                const col = Math.floor(Math.random() * BOARD_SIZE);
                if (canPlaceShip(row, col, ship.lenght, orientation)) {
                    const newShip: ShipCell[] = []
                    for (let i = 0; i < ship.lenght; i++) {
                        if (orientation === 'horizontal') {
                            board[row][col + i].status = 'ship';
                            newShip.push({ row, col: col + i });
                        } else {
                            board[row + i][col].status = 'ship';
                            newShip.push({ row: row + i, col });
                        }
                    }
                    newShipPlacement.push(newShip)
                    placed = true;
                    ship.placed = true;
                }
            }
        });
        setShipPlaced(shipList.every(s => s.placed))
        setShipPlacement(newShipPlacement);
    }

    const canPlaceShip = (startRow: number, startCol: number, size: number, orientation: 'horizontal' | 'vertical'): boolean => {
        if (orientation === "horizontal" && startCol + size > BOARD_SIZE) {
            return false
        }
        if (orientation === "vertical" && startRow + size > BOARD_SIZE) {
            return false
        }
        for (let i = 0; i < size; i++) {
            if (orientation === 'horizontal' && board[startRow][startCol + i].status !== 'empty') {
                return false;
            }
            if (orientation === 'vertical' && board[startRow + i][startCol].status !== 'empty') {
                return false;
            }
        }
        return true
    }

    const handleShot = (row: number, col: number): void => {
        if (board[row][col].status === 'hit') {
            return;
        }
        const newBoard: BoardCell[][] = [...board];
        const hitShip = shipPlacement.find(ship => ship.some(s => s.row === row && s.col === col));
        if (hitShip) {
            hitShip.forEach(s => {
                if (s.row === row && s.col === col) {
                    newBoard[s.row][s.col].status = 'hit';
                }
            });
            setMessage('Hit!');
        } else {
            newBoard[row][col].status = 'miss';
            setMessage('Miss!');
        }
        setBoard(newBoard);
        checkGameOver();
    };

    const checkGameOver = (): void => {
        const allShipsSunk = shipPlacement.every(ship => ship.every(s => board[s.row][s.col].status === 'hit'));
        if (allShipsSunk) {
            setGameOver(true);
            setMessage('Congratulations! You sunk all the ships!');
        }
    };

    useEffect(() => {
        initBoard()
    }, [])



    return (
        <>
            <h1 className='font-semibold'>Battleship</h1>
            <div className="grid grid-cols-subgrid gap-4 col-span-3">
                {startGame && <div className='col-start-2 w-[540px] h-[540px]'>
                <Toast message={message} />
                {message === 'Congratulations! You sunk all the ships!' && <button onClick={playAgain} className=" w-[240px] text-white rounded-md bg-green-600 ">
                    Play Again!
                </button>}
                    <div className=" w-[460px] pl-5 h-[30px] flex">
                        {
                            colLetters.map((letter: string) => {
                                return <p className='capitalize font-semibold w-[44px] text-center'>{letter}</p>
                            })
                        }
                    </div>
                    <div className='w-[540px] h-[540px] flex '>
                        <div className="w-[20px] pt-2 h-[440px] ">
                            {
                                rowNumbers.map((number: number) => {
                                    return <p className='font-semibold h-[48px]'>{number}</p>
                                })
                            }
                        </div>
                        <div className=" w-[440px] h-[475px] flex-wrap m-0 p-0 bg-slate-300">
                            {
                                board.map((x: BoardCell[], i: number) => {
                                    return x.map((value: BoardCell, j: number) => {
                                        return <ShipBox handleShot={handleShot} row={i} col={j} status={value.status} />
                                    })
                                })
                            }
                        </div>
                    </div>
                  
                </div>
                
                }
                 {!shipPlaced && <button disabled={shipPlaced} onClick={placeShip} className=" text-white rounded-md bg-green-600 w-1/2 m-auto">
                    Start Game!
                </button>}
            </div>
        </>
    )
}

export default GameBoard