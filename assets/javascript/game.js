var topic = "star trek";
var items = ["kirk", "spock", "scotty", "uhuru", "checkov", "khan", "mccoy", "sulu", "data"];
//  "worf", "riker", "troi", "crusher", "geordi", "sulu"];
function build_game() {
    items.forEach(function(value) {
        var new_button = $("<button>");
        new_button.text(value);
        new_button.addClass("trek btn btn-primary")
        $("#buttons").append(new_button);
    });
}


$(".addTrek").click(function() {
    event.preventDefault();
    var newItem = $("#input_text").val();
    var new_button = $("<button>");
    new_button.text(newItem);
    new_button.addClass("trek btn btn-primary");
    var indx = parseInt(items.indexOf(newItem));
    if (indx == -1 && newItem.length > 0) {
        $("#buttons").append(new_button);
        items.push(newItem);
    }
    $("#input_text").val("");
});

function add_giphy_to_html(results) {
    // console.log(results)
    results.forEach(function(value, index) {
        var gifDiv = $("<div>");
        var rating = results[index].rating;
        var p = $("<p>").text("Rating: " + rating);
        var personImage = $("<img>");
        personImage.addClass("gifClick");
        personImage.attr("src", results[index].images.fixed_height_still.url);
        personImage.attr("still", results[index].images.fixed_height_still.url);
        personImage.attr("move", results[index].images.fixed_height.url);
        personImage.attr("moving", "0");
        gifDiv.append(p);
        gifDiv.append(personImage);
        $("#giphys").prepend(gifDiv);
    });
}

// $(".trek").on("click", function() {
$(document).on('click', '.trek', function() {
    event.preventDefault();
    var person = $(this).text();
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=star trek ' + person + '&api_key=dc6zaTOxFJmzC&limit=10';
    //   console.log(queryURL);
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function(response) {
            //  console.log(response);
            var results = response.data;
            add_giphy_to_html(response.data);
        });
});

$(document).on('click', '.gifClick', function() {
    event.preventDefault();
    // console.log(this);
    var moving = parseInt($(this).attr('moving'));
    // console.log("moving " + moving);
    if (moving === 0) {
        $(this).attr('src', $(this).attr('move'));
        $(this).attr('moving', '1');
    } else {
        $(this).attr('src', $(this).attr('still'));
        $(this).attr('moving', '0');
    }

});

build_game();