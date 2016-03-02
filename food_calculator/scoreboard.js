/**
 * Created by Robin on 2/27/2016.
 */

var ScoreBoard = function (json) {
    this.items = [];
    this.totalScore = {
        calories: 0,
        fat: 0,
        eggwhite: 0,
        carbonhydrates: 0,
        fibers: 0,
        salt: 0
    };
    this.gender = "";
    if (json) {
        for (var i in json.items) {
            var item = JSON.parse(json.items[i]);
            if (item.type == "FoodItem") {
                var newItem = FoodFactory.createItem(item.name, item.element.id, item.element.draggable,
                    item.element.src, item.element.alt, item.stats);
                this.items.push(newItem);

                // Update scores
                this.updateScore(newItem.getStats(), true);
            }
        }
        this.gender = json.gender;
    }
};

ScoreBoard.prototype.addItem = function (item) {
    this.items.push(item);
    this.updateScore(item.getStats(), true);
};

ScoreBoard.prototype.removeItem = function (item) {
    this.updateScore(item.getStats(), false);
    var itemToRemove = this.items.indexOf(item);
    this.items.splice(itemToRemove, 1);
};

ScoreBoard.prototype.getTotalScore = function () {
    return this.totalScore;
};

ScoreBoard.prototype.toJSON = function () {
    var jsonItems = [];
    for (var key in this.items) {
        jsonItems.push(this.items[key].toJSON());
    }

    return JSON.stringify({
        type: "ScoreBoard",
        gender: this.gender,
        items: jsonItems
    });
};

ScoreBoard.prototype.updateScore = function(stats, add) {
    if(add) {
        this.totalScore.calories += parseInt(stats.calories);
        this.totalScore.fat += parseFloat(stats.fat);
        this.totalScore.eggwhite += parseFloat(stats.eggwhite);
        this.totalScore.carbonhydrates += parseFloat(stats.carbonhydrates);
        this.totalScore.fibers += parseFloat(stats.fibers);
        this.totalScore.salt += parseFloat(stats.salt);
    } else {
        this.totalScore.calories -= parseInt(stats.calories);
        this.totalScore.fat -= parseFloat(stats.fat);
        this.totalScore.eggwhite -= parseFloat(stats.eggwhite);
        this.totalScore.carbonhydrates -= parseFloat(stats.carbonhydrates);
        this.totalScore.fibers -= parseFloat(stats.fibers);
        this.totalScore.salt -= parseFloat(stats.salt);
    }
};

