// the random buttom displays the 
$("#random").click(function () {
    $('#suggestions-list').empty();
    $('#suggestions-map').empty();

    locations = [];
  
   database.ref('num/').on("value", function(numSnap) {
  
  
  let randomKey
  
   for (j = 0; j < 3; j++) {
      
      randomKey = Math.floor(Math.random() * Number(numSnap.val().dataCount) + 1)
  
      console.log(j)
  
       database.ref(randomKey +'/').once('value').then(function(snapshot) {
        console.log(snapshot.val().name);
  
  
          let randomItem = $('<div class="suggestion">');

          let randomName = snapshot.val().name;
          let nameSpan = $('<span>').text(randomName);


          let randomAddress = snapshot.val().address;
          let addressDiv = $('<div class="address">').text(randomAddress);

          let randomDescription = snapshot.val().description;

          let itemDescription = $("<div class='description'>");
          itemDescription.text("Activity Description: " + randomDescription);

            randomItem.append(nameSpan, addressDiv, itemDescription);
            console.log(itemDescription);
         
                $('#suggestions-list').append(randomItem)
                $('.suggestion').addClass('list-group-item list-group-item-action list-group-item') 
       
        });
    };

       });


      }); 