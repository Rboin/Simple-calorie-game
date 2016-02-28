/**
 * Created by Robin on 2/27/2016.
 */

var FoodItem = function(name, calories, element) {

    // Private variables
    var name = name,
        calories = calories,
        element = element;

    this.returnName = function() {
        return name;
    };

    this.returnCalories = function() {
        return calories;
    };

    this.returnElement = function() {
        return element;
    };

};

FoodItem.prototype.getName = function() {
    return this.returnName();
};

FoodItem.prototype.getCalories = function() {
    return parseInt(this.returnCalories());
};

FoodItem.prototype.getElement = function() {
    return this.returnElement();
};