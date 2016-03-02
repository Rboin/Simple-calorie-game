/**
 * Created by Robin on 2/27/2016.
 */

var FoodItem = function(name, stats, element) {

    // Private variables
    var name = name,
        stats = stats,
        element = element;


    this.returnName = function() {
        return name;
    };

    this.returnStats = function() {
        return stats;
    };

    this.returnElement = function() {
        return element;
    };

};

FoodItem.prototype.getName = function() {
    return this.returnName();
};

FoodItem.prototype.getStats = function() {
    return this.returnStats();
};

FoodItem.prototype.getElement = function() {
    return this.returnElement();
};

FoodItem.prototype.toJSON = function() {
    return JSON.stringify({
        type: "FoodItem",
        name: this.getName(),
        stats: this.getStats(),
        element: {
            id: this.getElement().id,
            draggable: this.getElement().draggable,
            alt: this.getElement().alt,
            src: this.getElement().src
        }
    });
};
