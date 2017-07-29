import * as seedrandom from 'seedrandom';

function printBoard(board: number[]) {
    for (var i = 0; i < 81; ++i) {
        if (board[i] !== 0) {
            process.stdout.write(board[i].toString() + ' ');
        } else {
            process.stdout.write('_ ');
        }

        if ((i + 1) % 3 === 0) {
            process.stdout.write('  ');
        }
        if ((i + 1) % 9 === 0) {
            process.stdout.write('\n');
        }
        if ((i + 1) % 27 === 0) {
            process.stdout.write('\n');
        }
    }
}

function getRow(board: number[], ind: number) {
    return board.slice(ind * 9, (ind + 1) * 9);
}

function getCol(board: number[], ind: number) {
    var ret = [];
    for (var i = ind; i < 81; i += 9) {
        ret.push(board[i]);
    }

    return ret;
}

// TODO: Make more efficient
function getSquare(board: number[], x: number, y: number) {
    var ret: number[] = [];
    for (var i = y * 3; i < (y + 1) * 3; ++i) {
        var row = getRow(board, i);
        var sec = row.slice(x * 3, (x + 1) * 3);
        Array.prototype.push.apply(ret, sec);
    }

    return ret;
}

function isSubsetValid(row: number[]) {
    const sorted = row.sort();
    for (var i = 0; i < sorted.length - 1; ++i) {
        if (sorted[i] !== 0 && sorted[i] === sorted[i + 1]) {
            return false;
        }
    }

    return true;
}

function isBoardValid(board: number[]) {
    for (var i = 0; i < 9; ++i) {
        if (!isSubsetValid(getRow(board, i)) ||
            !isSubsetValid(getCol(board, i))) {
            return false;
        }
    }

    for (var x = 0; x < 3; ++x) {
        for (var y = 0; y < 3; ++y) {
            if (!isSubsetValid(getSquare(board, x, y))) {
                return false;
            }
        }
    }

    return true;
}

function solve(board: number[]): number[] {
    // If the board is invalid, there can be no solution
    if (!isBoardValid(board)) {
        return [];
    }

    // Emulate a set
    let visited = {};

    // Keep the states in a stack
    let stack: number[][] = [];
    stack.push(board);

    do {
        let curBoard = stack.pop();
        if (typeof curBoard === 'undefined') {
            throw Error('Something went wrong reading from the stack');
        }

        // Mark this state as visited
        visited[curBoard.join('')] = true;

        // Find the last unassigned cell
        let unassigned = -1;

        for (var i = 0; i < 81; ++i) {
            if (curBoard[i] === 0) {
                unassigned = i;
            }
        }

        // If the board is complete and valid, return it
        if (unassigned === -1) {
            return curBoard;
        }

        // Test every possible value of the state
        for (var j = 1; j <= 9; ++j) {
            var newBoard = curBoard.slice();
            newBoard[unassigned] = j;

            if (Object.prototype.hasOwnProperty.call(visited, newBoard.join('')) ||
                !isBoardValid(newBoard)) {
                continue;
            }

            stack.push(newBoard);
        }
    } while (stack.length > 0);

    return [];
}

function canBeDug(board: number[], x: number, y: number) {
    // Iterate over all possible values
    for (var i = 1; i <= 9; ++i) {
        // Ignore the current value, we know it works
        if (i === board[y * 9 + x]) {
            continue;
        }

        var newBoard = board.slice();

        newBoard[y * 9 + x] = i;

        // If the board can be solved with this different value, it follows
        // that removing this cell would result in a nondeterministic board
        if (solve(newBoard).length !== 0) {
            return false;
        }
    }

    return true;
}

// Implement the LtRTtB algorithm for digging
function genFromSolvedEvil(board: number[]) {
    const newBoard = board.slice();
    for (let y = 0; y < 9; ++y) {
        for (let x = 0; x < 9; ++x) {
            if (canBeDug(newBoard, x, y)) {
                newBoard[y * 9 + x] = 0;
            }
        }
    }

    return newBoard;
}

// Implementation of S algorithm
function genFromSolvedHard(board: number[]) {
    const newBoard = board.slice();

    // Every other row, switch direction
    let rtl = false;

    for (let y = 0; y < 9; ++y) {
        if (!rtl) {
            for (let x = 0; x < 9; ++x) {
                if (canBeDug(newBoard, x, y)) {
                    newBoard[y * 9 + x] = 0;
                }
            }
        } else {
            for (let x = 8; x >= 0; --x) {
                if (canBeDug(newBoard, x, y)) {
                    newBoard[y * 9 + x] = 0;
                }
            }
        }

        rtl = !rtl;
    }

    return newBoard;
}

function genSolnFromSeed(seed: string) {
    const rng = seedrandom(seed);

    var board = [];
    for (var i = 0; i < 81; ++i) {
        board.push(0);
    }

    for (var num = 1; num <= 9; ++num) {
        const pos = Math.floor(rng() * 81);
        board[pos] = num;
    }

    return solve(board);
}

function isComplete(board: number[]) {
    return (isBoardValid(board) && board.indexOf(0) === -1);
}

export default {
    genSolnFromSeed,
    genFromSolvedHard,
    genFromSolvedEvil,
    getSquare,
    isComplete,
    printBoard
};
