angular.module('gameApp', [])
    .controller('GameController', function ($scope) {

        var emptyCell = '?';
        var player1 = 'X';
        var player2 = 'O';
        $scope.grid = [
            [{ value: emptyCell }, { value: emptyCell }, { value: emptyCell }],
            [{ value: emptyCell }, { value: emptyCell }, { value: emptyCell }],
            [{ value: emptyCell }, { value: emptyCell }, { value: emptyCell }]
        ];

        $scope.Play = function () {
            $scope.grid.forEach(function (row) {
                row.forEach(function (cell) {
                    cell.value = emptyCell;
                });
            });
            $scope.currentPlayer = player1;
            $scope.winner = false;
            $scope.draw = false;
            $scope.spaceTaken = false;
        };
        $scope.Play();

        $scope.isTaken = function (cell) {
            return cell.value !== emptyCell;
        };

        var checkForMatch = function (cell1, cell2, cell3) {
            return cell1.value === cell2.value &&
                cell1.value === cell3.value &&
                cell1.value !== emptyCell;
        };

        $scope.isGridFull = function () {
            for (var row = 0; row <= 2; row++) {
                for (var col = 0; col <= 2; col++) {
                    if ($scope.grid[row][col].value === emptyCell) {
                        return false;
                    }
                }
            }
            return true;
        }

        $scope.checkForEndOfGame = function () {
            var rowMatch = checkForMatch($scope.grid[0][0], $scope.grid[0][1], $scope.grid[0][2]) ||
                checkForMatch($scope.grid[1][0], $scope.grid[1][1], $scope.grid[1][2]) ||
                    checkForMatch($scope.grid[2][0], $scope.grid[2][1], $scope.grid[2][2]);

            var columnMatch = checkForMatch($scope.grid[0][0], $scope.grid[1][0], $scope.grid[2][0]) ||
                checkForMatch($scope.grid[0][1], $scope.grid[1][1], $scope.grid[2][1]) ||
                    checkForMatch($scope.grid[0][2], $scope.grid[1][2], $scope.grid[2][2]);

            var diagonalMatch = checkForMatch($scope.grid[0][0], $scope.grid[1][1], $scope.grid[2][2]) ||
                checkForMatch($scope.grid[0][2], $scope.grid[1][1], $scope.grid[2][0]);
                
            $scope.winner = rowMatch || columnMatch || diagonalMatch;
            $scope.draw = $scope.winner === false && $scope.isGridFull();

            return $scope.winner || $scope.draw;
        };

        var changePlayer = function () {
            $scope.currentPlayer = ($scope.currentPlayer === player1)
                ? player2
                : player1;
        }

        $scope.move = function (cell) { 
            if($scope.isTaken(cell) == true){
                $scope.spaceTaken = true;
                return $scope.currentPlayer;
            }
            cell.value = $scope.currentPlayer;
            if ($scope.checkForEndOfGame() === false) {
                changePlayer();
            }
        };
    });

   