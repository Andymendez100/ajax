// Creating default animals to show on page load
var animals = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish", "bird", "ferret", "turtle", "sugar glider", "chinchilla",
    "hedgehog", "hermit crab", "gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", "salamander", "frog"]

//function re-renders the html to display the right content
function displayAnimalPictures() {

    var animal = $(this).attr("data-title")
    var queryurl = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=PGW1rqdDDHEHBrXcBhwAuPg7Nnivp0UZ&limit=10&"

    console.log(queryurl);
    

    //creating an ajax call for the specific animal being clicked 
    $.ajax({
        url: queryurl,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        //empty all pictures
        $(".pictures").empty()

        for (var i = 0; i < response.data.length; i++) {

            // creating a div to hold the pictures
            var animalDiv = $("<div class='pictures'>");

            //Storing the rating data
            var rating = response.data[i].rating;


            //creating element to have rating displayed
            var pRating = $("<p>").text("Rating: " + rating);

            animalDiv.append(pRating);
            // retrieving url for gif
            var gifURL = response.data[i].images.fixed_height.url;

            //retrieving the url for the image
            var imageURL = response.data[i].images.fixed_height_still.url;

            //making sure everything works
            console.log(gifURL);
            

            //creating element to hold the image
            // var image = $("<img>").attr("src", imageURL);
            var image = $("<img>");
            image.attr("src", imageURL);

            image.attr("data-alt", gifURL);
            var gif = $("<img>").attr("src", gifURL);
            image.attr("data-start", imageURL);

            animalDiv.append(image);

            $("#animal").prepend(animalDiv)

            console.log(image);
            

        }
        //function to make pictures into a gif when clicked on
        $("img").mousedown(function () {
            console.log("working");

            var newUrl = $(this).attr("data-start")

            if ($(this).attr("src") === $(this).attr("data-alt")) {
                $(this).attr('src', newUrl)
            }
            else{
                $(this).attr("src", $(this).attr("data-alt"));
            }

        })




    });
}

// function for displaying buttons

function renderButtons() {

    //Clear animals before adding more so we don't have repeating buttons
    $("#animalButtons").empty();

    //for loop
    for (var j = 0; j < animals.length; j++) {

        //Creating buttons
        var a = $("<button>");

        //adding class of animal to button
        a.addClass("animal");

        // Data attr added
        a.attr("data-title", animals[j]);

        //Provided inital button text
        a.text(animals[j]);

        // added the button to the button div
        $("#animalButtons").append(a);


    }
}
//function to grab input from textbox and add it to a button
$("#addAnimal").on("click", function (event) {
    //Stop the button from actally submitting
    event.preventDefault()

    //grab input from textbox
    var animal = $("#animalInput").val().trim();

    //the animal from the textbox will be added to our array
    animals.push(animal);

    //calling the function to render the button
    renderButtons();
});



//adding click event listerns to all element with a class of animal
$(document).on("click", ".animal", displayAnimalPictures);

//calling render buttons function to display inital buttons
renderButtons();


