/**
 * Created by Robin on 2/27/2016.
 */

var ScoreBoard = function() {
    this.totalScore = 0;
    this.items = [];
};

ScoreBoard.prototype.addItem = function(item) {
    this.items.push(item);
    this.totalScore += item.getCalories();
};

ScoreBoard.prototype.removeItem = function(item) {
    this.totalScore -= item.getCalories();
    var itemToRemove = this.items.indexOf(item);
    this.items.splice(itemToRemove, 1);
};

ScoreBoard.prototype.getTotalScore = function() {
    return this.totalScore;
};
