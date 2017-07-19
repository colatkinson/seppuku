import * as seedrandom from 'seedrandom';

// function printBoard(board: number[]) {
//     for (var i = 0; i < 81; ++i) {
//         if (board[i] !== 0) {
//             process.stdout.write(board[i].toString() + ' ');
//         } else {
//             process.stdout.write('_ ');
//         }
//
//         if ((i + 1) % 3 === 0) {
//             process.stdout.write('  ');
//         }
//         if ((i + 1) % 9 === 0) {
//             process.stdout.write('\n');
//         }
//         if ((i + 1) % 27 === 0) {
//             process.stdout.write('\n');
//         }
//     }
// }

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
    if (!isBoardValid(board)) {
        return [];
    }

    var unassigned = -1;

    for (var i = 0; i < 81; ++i) {
        if (board[i] === 0) {
            unassigned = i;
        }
    }

    if (unassigned === -1) {
        return board;
    }

    for (var j = 1; j <= 9; ++j) {
        var newBoard = board.slice();
        newBoard[unassigned] = j;

        if (!isBoardValid(newBoard)) {
            continue;
        }

        var soln = solve(newBoard);
        if (soln.length !== 0) {
            return soln;
        }
    }

    return [];
}

function canBeDug(board: number[], x: number, y: number) {
    for (var i = 1; i <= 9; ++i) {
        if (i === board[y * 9 + x]) {
            continue;
        }

        var newBoard = board.slice();

        newBoard[y * 9 + x] = i;

        // printBoard(newBoard);
        // console.log('----');

        if (solve(newBoard).length !== 0) {
            return false;
        }
    }

    return true;
}

function genFromSolved(board: number[]) {
    var newBoard = board.slice();
    for (var y = 0; y < 9; ++y) {
        for (var x = 0; x < 9; ++x) {
            if (canBeDug(newBoard, x, y)) {
                newBoard[y * 9 + x] = 0;
            }
        }
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

// function main() {
//     const soln = genSolnFromSeed('hello.world.jaypeg');
//
//     const puzzle = genFromSolved(soln);
//
//     printBoard(soln);
//     printBoard(puzzle);
// }

// main();
export default {
    genSolnFromSeed: genSolnFromSeed,
    genFromSolved: genFromSolved,
    getSquare: getSquare,
    isComplete: isComplete
};
