 // Initial array of movies
    var topics = ["Eagles", "Cowboys", "Steelers"];

    // Function for displaying teams 
    function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("team-btn");
          // Adding a data-attribute
          a.attr("data-team", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }
    // This function handles events where a movie button is clicked
    $("#add-team").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#team-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(topic);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

    //Creat function to display the images
    function dispalyTeamGif() {
      //Clear the displaying images
      $("#gifs-appear-here").empty();
      // Grabbing and storing the data-animal property value from the button
      var search = $(this).attr("data-team")+" NFL";

      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=oCj4VUafjzbNv3DPReKh1767b1zmv0QE&q="+search+"&limit=10"

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var teamDiv = $("<div>");
            teamDiv.attr("class","teamDiv");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var teamImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
           
            teamImage.attr("src", results[i].images.fixed_height_still.url);
            teamImage.attr("data-still", results[i].images.fixed_height_still.url);
            teamImage.attr("data-animate", results[i].images.fixed_height.url);
            teamImage.attr("data-state", "still");
            teamImage.attr("class", "gif");
           
            // Appending the paragraph and image tag to the animalDiv
            teamDiv.append(p);
            teamDiv.append(teamImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(teamDiv);
          }
        });
    }
    
    // Adding click event listen listener to team buttons
    $("#buttons-view").on("click", ".team-btn", dispalyTeamGif);
    
    renderButtons();
    
    //Creat start page gifs
    function startPageGif(startTeam){
      $("#gifs-appear-here").empty();
      // Grabbing and storing the data-animal property value from the button
      var search = startTeam;

      // Constructing a queryURL using the animal name
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=oCj4VUafjzbNv3DPReKh1767b1zmv0QE&q="+search+"&limit=10"

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function(response) {
          console.log(response);
          // storing the data from the AJAX request in the results variable
          var results = response.data;

          // Looping through each result item
          for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var teamDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var teamImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
           
            teamImage.attr("src", results[i].images.fixed_height_still.url);
            teamImage.attr("data-still", results[i].images.fixed_height_still.url);
            teamImage.attr("data-animate", results[i].images.fixed_height.url);
            teamImage.attr("data-state", "still");
            teamImage.attr("class", "gif");

            // Appending the paragraph and image tag to the animalDiv
            teamDiv.append(p);
            teamDiv.append(teamImage);

            // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
            $("#gifs-appear-here").prepend(teamDiv);
          }
        });
    };

    startPageGif('Panthers NFL');

    //Creat a function changes the state of pics
    function gifStateChange() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    };
    //Adding click event listen listener to gif class
    $("#gifs-appear-here").on("click", ".gif", gifStateChange);

    
