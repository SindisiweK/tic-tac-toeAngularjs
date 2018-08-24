'use strict';

describe('GameController', function () {
    beforeEach(module('gameApp'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('$scope.Play', function () {
        var $scope, controller;

        beforeEach(function () {
            $scope = {};
            controller = $controller('GameController', { $scope: $scope });
        });

        it('displays the grid of 3 rows and columns', function () {
            $scope.Play();
            expect($scope.grid.length).toEqual(3);
        });

        it('Check for current player ', function () {
            $scope.move(1);
            expect($scope.currentPlayer).toBe('X');
        });

        it('Check if the grid is full', function () {
            $scope.grid = [
                [{ value: 'X' }, { value: 'O' }, { value: 'X' }],
                [{ value: 'O' }, { value: 'X' }, { value: 'O' }],
                [{ value: 'X' }, { value: 'O' }, { value: 'X' }]
            ]
            expect($scope.isGridFull()).toBe(true);
        });

        it('Should check for winner rows', function () {
            $scope.grid = [
                [{ value: 'X' }, { value: 'X' }, { value: 'X' }],
                [{ value: '' }, { value: '' }, { value: '' }],
                [{ value: '' }, { value: '' }, { value: '' }]
            ]
            expect($scope.checkForEndOfGame()).toBe(true);
            expect($scope.winner).toBe(true);
        });

        it('Should check for winner in columns', function () {
            $scope.grid = [
                [{ value: 'O' }, { value: '' }, { value: 'X' }],
                [{ value: 'O' }, { value: 'X' }, { value: '' }],
                [{ value: 'O' }, { value: '' }, { value: 'X' }]
            ]
            expect($scope.checkForEndOfGame()).toBe(true);
            expect($scope.winner).toBe(true);
        });

        it('Should check for winner diagonally', function () {
            $scope.grid = [
                [{ value: 'X' }, { value: 'X' }, { value: 'O' }],
                [{ value: 'X' }, { value: 'O' }, { value: 'X' }],
                [{ value: 'O' }, { value: '' }, { value: 'O' }]
            ]
            expect($scope.checkForEndOfGame()).toBe(true);
            expect($scope.winner).toBe(true);
        });

        it('Should check for draw', function () {
            $scope.grid = [
                [{ value: 'X' }, { value: 'O' }, { value: 'X' }],
                [{ value: 'X' }, { value: 'X' }, { value: 'O' }],
                [{ value: 'O' }, { value: 'X' }, { value: 'O' }]
            ]
            expect($scope.isGridFull()).toBe(true);
            expect($scope.winner).toBe(false);
        });

        it('Should notify if the space is taken', function(){
            $scope.move($scope.grid[1][1]);
            $scope.move($scope.grid[1][1]);
            expect($scope.spaceTaken).toBe(true);
        });
    });
});