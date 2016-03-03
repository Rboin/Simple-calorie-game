/**
 * Created by Robin on 2/27/2016.
 */

(function CalorieGame() {

    // Get needed elements from DOM
    var gameArea = document.getElementById("calorie-game");
    var dropArea = document.getElementById("calorie-calculator");
    // Score labels
    var calorieLabel = document.getElementById("total-calories");
    var fatLabel = document.getElementById("total-fat");
    var eggwhiteLabel = document.getElementById("total-eggwhite");
    var carbonLabel = document.getElementById("total-carbonhydrates");
    var fibersLabel = document.getElementById("total-fibers");
    var saltLabel = document.getElementById("total-salt");
    // Male and female checkboxes
    var maleCheckbox = document.getElementById("checkMale");
    var femaleCheckbox = document.getElementById("checkFemale");

    // Draggable images
    var draggableItems = gameArea.getElementsByTagName("img");

    var lsItem = localStorage.getItem("calorie-game");

    var scoreBoard;
    var items;

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
        // Check if the game has been played before by checking the local storage
        // if so, get those elements
        if (lsItem) {
            scoreBoard = new ScoreBoard(JSON.parse(lsItem));
            items = scoreBoard.items.slice(0);
            for (var i in items) {
                dropArea.appendChild(items[i].getElement());
                items[i].getElement().onclick = function (ev) {
                    mouseDown(ev);
                };
            }
            if (scoreBoard.gender == "male") {
                maleCheckbox.checked = true;
            } else if (scoreBoard.gender == "female") {
                femaleCheckbox.checked = true;
            }
            updateTotalScores();
        } else {
            scoreBoard = new ScoreBoard();
            items = [];
        }

        $(dropArea).droppable({
            drop: drop
        });

        dropArea.ondragover = function (ev) {
            allowDrop(ev);
        };

        // Give all images in this area the draggable attribute and an event listener function
        for (var i = 0; i < draggableItems.length; i++) {
            // Check if the image has a calories attribute
            if (!draggableItems[i].hasAttribute("calories"))
                console.error("This item has no 'calories' attribute: " + draggableItems[i].alt);

            draggableItems[i].setAttribute("draggable", true);

            $(draggableItems[i]).draggable({
                helper: "clone"
            }, drag);
        }



        //Checkbox events
        maleCheckbox.onchange = function () {
            if (maleCheckbox.checked) {
                scoreBoard.gender = "male"
            }
            updateTotalScores();
        };
        femaleCheckbox.onchange = function () {
            if (femaleCheckbox.checked) {
                scoreBoard.gender = "female"
            }
            updateTotalScores();
        };

    })();


    // Event Handlers

    window.onbeforeunload = function () {
        localStorage.setItem("calorie-game", scoreBoard.toJSON());
    };

    function allowDrop(event) {
        event.preventDefault();
    }

    function drag(event) {
        console.log(event);
        event.dataTransfer.setData("text", event.target.id);
    }

    function drop(event, ui) {
        event.preventDefault();
        //console.log(ui.draggable[0].id);
        //console.log(event);
        var dropData = document.getElementById(ui.draggable[0].id),
            clone = dropData.cloneNode(true);
        dropArea.appendChild(clone);

        clone.style.position = "relative";
        clone.style.top = "auto";
        clone.style.left = "auto";
        // Add removal function to the added element
        clone.onclick = function (ev) {
            mouseDown(ev);
        };
        var stats = {
            calories: clone.getAttribute("calories"),
            fat: clone.getAttribute("fat"),
            eggwhite: clone.getAttribute("eggwhite"),
            carbonhydrates: clone.getAttribute("carbonhydrates"),
            fibers: clone.getAttribute("fibers"),
            salt: clone.getAttribute("salt")
        };
        var newFoodItem = new FoodItem(clone.alt, stats, clone);
        items.push(newFoodItem);
        scoreBoard.addItem(newFoodItem);
        updateTotalScores();
    }

    function mouseDown(event) {
        //console.log(event);
        event.preventDefault();
        for (var i = 0; i < items.length; i++) {
            if (event.target == items[i].getElement()) {
                removeItem(i);
            }
        }
    }

    function updateTotalScores() {
        var calText = calorieLabel.innerHTML.split(":"),
            fatText = fatLabel.innerHTML.split(":"),
            eggText = eggwhiteLabel.innerHTML.split(":"),
            carbonText = carbonLabel.innerHTML.split(":"),
            fibersText = fibersLabel.innerHTML.split(":"),
            saltText = saltLabel.innerHTML.split(":");

        // Update the labels
        var max = (scoreBoard.gender == "male") ? 2500 : 2000;
        var percentCal = parseFloat(Math.round(((scoreBoard.getTotalScore().calories / max) * 100) * 100) / 100).toFixed(2);
        calorieLabel.innerHTML = calText[0] + ": " + scoreBoard.getTotalScore().calories + "/" + max + " (" + percentCal + "%)";
        fatLabel.innerHTML = fatText[0] + ": " + parseFloat(Math.round(scoreBoard.getTotalScore().fat * 100) / 100).toFixed(2);
        eggwhiteLabel.innerHTML = eggText[0] + ": " + parseFloat(Math.round(scoreBoard.getTotalScore().eggwhite * 100) / 100).toFixed(2);
        carbonLabel.innerHTML = carbonText[0] + ": " + parseFloat(Math.round(scoreBoard.getTotalScore().carbonhydrates * 100) / 100).toFixed(2);
        fibersLabel.innerHTML = fibersText[0] + ": " + parseFloat(Math.round(scoreBoard.getTotalScore().fibers * 100) / 100).toFixed(2);
        saltLabel.innerHTML = saltText[0] + ": " + parseFloat(Math.round(scoreBoard.getTotalScore().salt * 100) / 100).toFixed(2);
    }

    function removeItem(index) {
        dropArea.removeChild(items[index].getElement());
        scoreBoard.removeItem(items[index]);
        items.splice(index, 1);
        updateTotalScores();
    }

})();
