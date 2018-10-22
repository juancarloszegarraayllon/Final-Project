Template.newPoll.events({
  "click #preview": function(event){
    console.log("working");

    //Pull preview data
    const questionTextValue = $('#questionText').val();
    
    //Check for valid question text
    if (questionTextValue == "") {
      $('.questionMessage').html("Insert question text!");
      $('#publish').addClass('hide');
      $('#previewPoll').addClass('hide');
      return;
    }

    const choiceText = $('textarea#choiceInput').val();
    var choiceArray = choiceText.split('\n');

    //Create an array of choices
    var choicesToAdd = [];
    for (i=0; i<choiceArray.length; i++) {
      if (choiceArray[i] !== "") {
        choicesToAdd.push(choiceArray[i]);
      }
    }

    //Check for valid choices
    if (choicesToAdd.length < 2) {
      $('.choiceMessage').html("Insert at least 2 choices!");
      $('#publish').addClass('hide');
      $('#previewPoll').addClass('hide');
      return;
    }

    //display publish button & preview window
    $('#previewPoll').empty()
    $('#publish').removeClass('hide');
    $('#previewPoll').removeClass('hide');

    var timestamp = new Date();


    //Build up the element structure of the poll header
    var parentDiv1 = $('<div />', {class: 'row pollCard' });
    var parentDiv2 = $('<div />', {class: 'col s12' });
    var parentDiv3 = $('<div />', {class: 'row' });


    var parentDiv = $('<div />', {class: 'card green darken-1 col s12' })
    var childDiv = $('<div />', {class: "card-content white-text"})
    var childSpan = $('<span />', {class: 'card-title'});
    childSpan.html(questionTextValue);
    var creator = $('<p />', {class: 'pollCreated'});
    creator.html('Created by username ' + timestamp);

    // Merge elements for question text & author
    childDiv.append(childSpan);
    childDiv.append(creator);
    parentDiv.append(childDiv);
    parentDiv3.append(parentDiv);
    parentDiv2.append(parentDiv3);
    parentDiv1.append(parentDiv2);



    var allChoicesDiv = $('<div>', {class: 'col s4 pollClicked'});

    //Create buttons per choice
    for (i=0; i <choicesToAdd.length; i++) {
      //Create div to contain the choices
      var singleChoiceDiv = $('<div>', {class: 'choices col s12'});

      var InputTypeDiv = $('<div>', {class: 'voteButton btn'});
      var choiceSpan = $('<span>', {class: 'dChoiceText'});
      choiceSpan.append(choicesToAdd[i]);
      InputTypeDiv.append(choiceSpan);
      singleChoiceDiv.append(InputTypeDiv);
      allChoicesDiv.append(singleChoiceDiv);
      
    }

    // parentDiv1.append(allChoicesDiv);

    //Insert Vote Button
    // var voteButton = $('<div>', {class: 'voteButton btn waves-effect waves-light'});
    // voteButton.append("<i class='material-icons right'>send</i>Vote");
    // allChoicesDiv.append(voteButton);

    parentDiv1.append(allChoicesDiv);

    //Insert poll to preview
    $('#previewPoll').append(parentDiv1);

  },
  "submit form": function(event){
    // Prevent default browser form submit
    event.preventDefault();
    
    // Get values from form element
    const questionText = event.target.questionText.value;
    const choiceText = event.target.choiceText.value;

    if (questionText == null || choiceText == null) {
      console.log("Alert");
    }

    //Hide the preview elements
    $('#publish').addClass('hide');
    $('#previewPoll').addClass('hide');
    $('#questionText').val('');
    $('textarea#choiceInput').val('');

    Meteor.call("addPoll", [questionText, choiceText]);
  }
});