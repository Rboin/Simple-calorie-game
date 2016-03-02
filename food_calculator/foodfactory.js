/**
 * Created by Robin on 2/28/2016.
 */

var FoodFactory = {};

FoodFactory.createItem = function (name, id, draggable, src, alttext, stats) {
    var element = this.createElement(id, draggable, alttext, src, stats);
    return new FoodItem(name, stats, element);
};

FoodFactory.createElement = function (id, draggable, alt, src, stats) {
    var element = document.createElement("img");
    element.id = id;
    element.draggable = draggable;
    element.alt = alt;
    element.src = src;
    element.setAttribute("calories", stats.calories);
    element.setAttribute("fat", stats.fat);
    element.setAttribute("eggwhite", stats.eggwhite);
    element.setAttribute("carbonhydrates", stats.carbonhydrates);
    element.setAttribute("fibers", stats.fibers);
    element.setAttribute("salt", stats.salt);
    return element;
};