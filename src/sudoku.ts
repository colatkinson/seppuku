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

// function solve(board: number[], visited: Object) {
//     console.log(visited);
//     // printBoard(board);
//
//     if (visited.hasOwnProperty(board.join(''))) {
//         return [];
//     }
//
//     visited[board.join('')] = true;
//     console.log("--------");
//     if (!isBoardValid(board)) {
//         return [];
//     }
//
//     if (board.indexOf(0) === -1) {
//         return board;
//     }
//
//     for (var i = 0; i < 81; ++i) {
//         if (board[i] !== 0) {
//             continue;
//         }
//
//         for (var num = 1; num <= 9; ++num) {
//             var newBoard = board.slice();
//             newBoard[i] = num;
//
//             if (visited.hasOwnProperty(newBoard.join(''))) {
//                 continue;
//             }
//
//             const val: number[] = solve(newBoard, visited);
//             if (val.length > 0) {
//                 return val;
//             }
//         }
//     }
//
//     return [];
// }

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

function main() {
    // var board = [];
    // for (var i = 0; i < 81; ++i) {
    //     // board.push(Math.floor(Math.random() * 10));
    //     board.push(0);
    // }
    // var board = [4, 0, 0, 1, 0, 6, 0, 5, 0,
    //              6, 0, 0, 0, 0, 3, 9, 1, 2,
    //              0, 9, 0, 7, 0, 2, 0, 8, 0,
    //              5, 0, 0, 0, 1, 0, 0, 9, 0,
    //              0, 0, 0, 2, 8, 7, 0, 0, 0,
    //              0, 2, 0, 0, 3, 0, 0, 0, 1,
    //              0, 1, 0, 9, 0, 8, 0, 4, 0,
    //              3, 7, 9, 4, 0, 0, 0, 0, 8,
    //              0, 4, 0, 3, 0, 5, 0, 0, 9];
    var board = [
        6, 0, 0, 0, 1, 7, 5, 2, 0,
        1, 5, 7, 2, 6, 4, 0, 9, 8,
        0, 4, 8, 0, 3, 0, 7, 0, 6,
        8, 3, 2, 0, 5, 6, 9, 0, 1,
        0, 7, 9, 1, 8, 3, 6, 4, 0,
        0, 0, 6, 0, 9, 0, 8, 0, 5,
        0, 8, 4, 3, 0, 5, 0, 0, 9,
        0, 6, 0, 9, 4, 0, 2, 8, 7,
        9, 2, 1, 6, 7, 0, 0, 5, 3
    ];
    printBoard(board);

    printBoard(solve(board));
    // console.log(getSquare(board, 2, 2));

    // console.log(isBoardValid(board));

    // var solved = solve(board);
    // printBoard(solved);

    var blank = [];
    for (var i = 0; i < 81; ++i) {
        blank.push(0);
    }
    // blank[0] = 9;

    var badBoard = [
        3, 0, 0, 0, 1, 7, 5, 2, 0,
        1, 5, 7, 2, 6, 4, 0, 9, 8,
        0, 4, 8, 0, 3, 0, 7, 0, 6,
        8, 3, 2, 0, 5, 6, 9, 0, 1,
        0, 7, 9, 1, 8, 3, 6, 4, 0,
        0, 0, 6, 0, 9, 0, 8, 0, 5,
        0, 8, 4, 3, 0, 5, 0, 0, 9,
        0, 6, 0, 9, 4, 0, 2, 8, 7,
        9, 2, 1, 6, 7, 0, 0, 5, 3
    ];

    var solved = solve(board);

    console.log(canBeDug(solved, 0, 0));

    console.log('-----');

    // console.log(canBeDug(blank, 0, 0));
    printBoard(genFromSolved(solved));

    // printBoard(solve(blank));
    //
    // var visited = {};
    //
    // console.log(solve(board, visited));

    // console.log(visited);

    // console.log(canBeDug(board, 0, 0));
}

main();
