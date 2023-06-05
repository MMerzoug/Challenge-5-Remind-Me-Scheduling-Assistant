// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(document).ready(function() {
  var currentHour = dayjs().format('H'); // Get the current hour in 24-hour format

  // Loop through each time block
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr('id').split('-')[1]); // Extract the hour from the id attribute

    // Compare the block hour with the current hour and add/remove the appropriate classes
    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });

  // Load saved data
  $(".time-block form").each(function() {
    var formId = $(this).attr('id'); // Get the id of the form
    var savedEvent = localStorage.getItem(formId); // Get the saved event

    if (savedEvent) {
      $(this).find('textarea.description').val(savedEvent); // Load the saved event
    }
  });

  // Save data
  $(".time-block form").on('submit', function(event) {
    event.preventDefault();

    var formId = $(this).attr('id'); // Get the id of the form
    var displayEvent = $(this).find('textarea.description').val();

    if (!displayEvent) {
      console.log('No event to be saved');
      return;
    }

    localStorage.setItem(formId, displayEvent); // Store the event
    $(this).find('textarea.description').val(''); // Clear the textarea

    alert('Event saved!'); // Inform the user that the event was saved
  });
});



    // TODO: Add a listener for click events on the save button. This code should
    // use the id in the containing time-block as a key to save the user input in
    // local storage. HINT: What does `this` reference in the click listener
    // function? How can DOM traversal be used to get the "hour-x" id of the
    // time-block containing the button that was clicked? How might the id be
    // useful when saving the description in local storage?
    //
    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    //
    // TODO: Add code to get any user input that was saved in localStorage and set
    // the values of the corresponding textarea elements. HINT: How can the id
    // attribute of each time-block be used to do this?
    //
    // TODO: Add code to display the current date in the header of the page.
  // });


// $(document).ready(function(){

//   var hour;
//   var timeInterval;
//   // header section
//   // display time and update every second
//   timeInterval = setInterval(function(){
//       // display day of week
//   $('#day-display').text(moment().format('dddd'));
//   // display time of day
//   $('#time-digits').text(moment().format('h:mm'));
//   // display am / pm for style purposes
//   $('#time-period').text(moment().format('a'));

//   // save time to variable
//   hour = parseInt(moment().format('H'));
//   var minutes = parseInt(moment().format('mm'));

//   // timeblocks
//   if (hour < 9){
//       $('.time-block').removeClass("present past").addClass("future");
//   }
//   if (hour > 16){
//       $('.time-block').removeClass("present future").addClass("past");
//   }
//   $( "div.time-block" ).each(function() {
//       var timeblockNum = parseInt($( this ).data("value"));
//       if (hour < timeblockNum){
//           $( this ).removeClass("past present").addClass("future");
//       }
//       if (hour == timeblockNum){
//           $( this ).removeClass("past future").addClass("present");
//       }
//       if (hour > timeblockNum){
//           $( this ).removeClass("present future").addClass("past");
//       }
      
//   });

//   // current time display
//   if (hour > 17 || hour < 9){
//       $('#current-time').css("display", "none");
//   } else {
//       $('#current-time').css("display", "grid");
//   }
//   // current time line position
//   var position = ((hour * 100) - 802) + (minutes * 1.65);
//   $('#current-time').css('top', position+'px');

// }, 100);



// // timeblocks object
// var blocks = {
//   block9: {
//       time: "9AM - 10AM",
//       title: "",
//       description: ""
//   },
//   block10: {
//       time: "10AM - 11AM",
//       title: "",
//       description: ""
//   },
//   block11: {
//       time: "11AM - 12PM",
//       title: "",
//       description: ""
//   },
//   block12: {
//       time: "12PM - 1PM",
//       title: "",
//       description: ""
//   },
//   block13: {
//       time: "1PM - 2PM",
//       title: "",
//       description: ""
//   },
//   block14: {
//       time: "2PM - 3PM",
//       title: "",
//       description: ""
//   },
//   block15: {
//       time: "3PM - 4PM",
//       title: "",
//       description: ""
//   },
//   block16: {
//       time: "4PM - 5PM",
//       title: "",
//       description: ""
//   }
// };


// // LOCAL STORAGE


// var storageKey = localStorage.getItem("storageKey");
// init();

// function renderBlocks(){
//   $( "div.time-block" ).each(function() {
//       var timeblockNum = $( this ).attr("data-value");
//       console.log(timeblockNum);
//       console.log(this);
//       // clear old text (need when saving)
//       $( this ).empty();
//       // add text to timeblocks
//       $( this ).append($("<h4 class='title'>"+blocks["block"+timeblockNum].title+"</h4>"));
//       $( this ).append($("<p class='description'>"+blocks["block"+timeblockNum].description+"</p>"));
//       if (blocks["block"+timeblockNum].title!==""||blocks["block"+timeblockNum].description!==""){
//           $( this ).removeClass("empty");
//       }
//   });
// };

// function init() {
//   // check if local storage has been used else get data from local storage
//   if(storageKey===null){
//       console.log("nothing in storage");
//   } else {
//       blocks = JSON.parse(localStorage.getItem("storageKey"));
//   }
//   // Render event text
//   renderBlocks();
// };

// function storeBlocks() {
//   // store timeblock objects in local storage
//   localStorage.setItem("storageKey", JSON.stringify(blocks));
// };

// // declare variables for functions
// var blockNum;

// // display form and info for selected time block
// function addText(timeblockdiv){
//   // get the selected time block number from the div.time-block data-value
//   blockNum = ( $( timeblockdiv ).attr("data-value")).toString();
//   // display values for selected timeblock in form
//   $('#form-time').text(blocks["block"+blockNum].time);
//   $('#title').val(blocks["block"+blockNum].title);
//   $('#description').val(blocks["block"+blockNum].description) ;       
// };


// // EVENTS


// // timeblock on click display form
// $('.time-block').on("click", function(){
//   // display form
//   $('#text-form').css('display', 'block');
//   addText(this);
// });

// // close button
// $('#close').on("click", function(){
//   $('#text-form').css('display', 'none');
// });

// // save button
// $('#save').on("click", function(event){
//   event.preventDefault();
  
//   // get values from form and add to blocks object
//   blocks["block"+blockNum].title = $('#title').val();
//   blocks["block"+blockNum].description = $('#description').val();
  
//   storeBlocks();
//   renderBlocks();
  
//   // close form pop up
//   $('#text-form').css('display', 'none');
// });

// }); // end document ready