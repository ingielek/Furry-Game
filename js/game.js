var Furry = require('./furry.js');
var Coin = require('./coin.js');


var self;


var Game = function () {

    self = this;

    this.board = document.querySelectorAll("#board div");

    this.furry = new Furry();

    this.coin = new Coin();

    this.score = 0;

    this.index = function(x,y) {
        return x + (y * 10);
    };

    this.showFurry = function () {

        this.hideVisibleFurry();

        this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');

    };

    this.showCoin = function () {
        this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');

    };



    self.moveFurry = function() {
                 if(self.furry.direction === "right") {
                         self.furry.x = self.furry.x + 1;
                     } else if ( self.furry.direction === 'left') {
                         self.furry.x = self.furry.x - 1;
                     } else if ( this.furry.direction === 'up') {
                         self.furry.y = self.furry.y + 1;
                     } else if ( self.furry.direction === 'down') {
                         self.furry.y = self.furry.y - 1;
                     }

                        this.gameOver();
                        self.showFurry();
                        this.checkCoinCollision();

 };

    this.hideVisibleFurry = function () {
        var findFurry =  document.querySelector('.furry');
        if(findFurry){
            findFurry.classList.remove('furry');
        }

    };

    this.turnFurry = function(event) {
                 switch (event.which) {
                     case 37:

                     this.furry.direction = 'left';
                     break;

                     case 38 :
                     this.furry.direction = 'down';
                     break;

                     case 39:
                     this.furry.direction = 'right';
                     break;

                     case 40:
                     this.furry.direction = 'up';
                     break;
                 }
     };

    this.checkCoinCollision = function() {

        if (this.coin.x === this.furry.x && this.coin.y === this.furry.y) {

             var removeCoin = document.querySelector('.coin');
             removeCoin.classList.remove('coin');

             this.score++;

             var result = document.querySelector('#score strong');

                     result.innerText = this.score;

                     this.coin = new Coin();

                     this.showCoin();
               }
};
    this.gameOver = function() {
                 if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9) {
                     clearInterval(this.move);
                     self.hideVisibleFurry();

                    document.querySelector('#board').classList.add('invisible');
                    document.querySelector('#over').classList.remove('invisible')
            }
};

    this.startGame = function(){
                    this.idSetInterval = setInterval(function() {
                    self.moveFurry()
                    },250);
}

};
module.exports = Game;

