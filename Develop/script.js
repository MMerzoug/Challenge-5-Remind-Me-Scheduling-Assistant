// Executes code once the DOM is fully loaded
$(document).ready(function() {
  var today = dayjs();
  var lastSavedDate = localStorage.getItem('lastSavedDate');

  // Compare the current date with the last saved date
  if (lastSavedDate && today.isAfter(dayjs(lastSavedDate), 'day')) {
    localStorage.clear(); // Clear local storage if the dates are different
  }

  $("#currentDay").text(today.format('dddd, MMMM D, YYYY')); // display the date

  var currentHour = dayjs().format('H'); // Get the current hour in 24-hour format using Day.js

  // .each() function is used to iterate over each time block with the class .time-block.
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
  $(".time-block").each(function() {
    var formId = $(this).attr('id'); // Get the id of the form where I want to load saved data
    var savedEvent = localStorage.getItem(formId); // Get the saved event from localStorage

    if (savedEvent) {
      // use the formId to select the corresponding textarea and load the saved event
      $("#description-" + formId).val(savedEvent);
    }
  });

  // Save data
  $(".time-block").on('submit', function(event) {
    event.preventDefault();

    var formId = $(this).attr('id'); // Get the id of the form
    var displayEvent = $("#description-" + formId).val();

    if (!displayEvent) {
      console.log('No event to be saved');
      return;
    }

    localStorage.setItem(formId, displayEvent); // Store the event
    localStorage.setItem('lastSavedDate', today.format('YYYY-MM-DD')); // Store the current date as the last saved date

    alert('Event saved!'); // Inform the user that the event was saved
  });
});
