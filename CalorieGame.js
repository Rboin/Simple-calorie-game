/**
 * Created by Robin on 2/27/2016.
 */

(function CalorieGame() {

    // Get needed elements from DOM
    var gameArea = document.getElementById("calorie-game");
    var dropArea = document.getElementById("calorie-calculator");
    var scoreLabel = document.getElementById("total-score");
    var draggableItems = gameArea.getElementsByTagName("img");

    // Initialize the ScoreBoard object
    var scoreBoard = new ScoreBoard();
    var items = [];

    /**
     * This function will run automatically when the enclosing function runs.
     *
     * The init function initializes all the elements needed by the calorie game
     * Which means that it will set the draggable attributes for images,
     * add the dragstart event listener and it will also set the ondrop and ondragover
     * attributes for the calorie-calculator div.
     *
     */
    (function init() {
        dropArea.ondrop = function(ev) { drop(ev); };
        dropArea.ondragover = function(ev) { allowDrop(ev); };

        // Give all images in this area the draggable attribute and an event listener function
        for(var i=0; i < draggableItems.length; i++) {
            // Check if the image has a calories attribute
            if(!draggableItems[i].hasAttribute("calories"))
                console.error("This item has no 'calories' attribute: " + draggableItems[i].alt);

            draggableItems[i].setAttribute("draggable", true);
            draggableItems[i].addEventListener("dragstart", function(ev) { drag(ev); })
        }

    })();


    // Event Handlers
    function allowDrop(event) {
        event.preventDefault();
    }

    function drag(event) {
        event.dataTransfer.setData("text", event.target.id);
    }

    function drop(event) {
        event.preventDefault();
        var dropData = event.dataTransfer.getData("text"),
            item = document.getElementById(dropData),
            clone = item.cloneNode(true);
        dropArea.appendChild(clone);
        // Add removal function to the added element
        clone.oncontextmenu = function(ev) { mouseDown(ev); };
        var newFoodItem = new FoodItem(clone.alt, clone.getAttribute("calories"), clone);
        items.push(newFoodItem);
        scoreBoard.addItem(newFoodItem);
        updateTotalScore();
    }

    function mouseDown(event) {
        // Prevent context menu from popping up
        event.preventDefault();
        for(var i = 0; i < items.length; i++) {
            if(event.target == items[i].getElement()) {
                removeItem(i);
            }
        }
    }

    function updateTotalScore() {
        var text = scoreLabel.innerHTML.split(":");
        scoreLabel.innerHTML = text[0] + ": " + scoreBoard.getTotalScore();
    }

    function removeItem(index) {
        dropArea.removeChild(items[index].getElement());
        scoreBoard.removeItem(items[index]);
        items.splice(index, 1);
        updateTotalScore();
    }

})();