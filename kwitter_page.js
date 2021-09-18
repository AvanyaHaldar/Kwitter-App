var firebaseConfig = {
      apiKey: "AIzaSyDuSPReeGKYlzUk3xQ0B7mcWr9SIjTvYlE",
      authDomain: "kwitter-app-26620.firebaseapp.com",
      databaseURL: "https://kwitter-app-26620-default-rtdb.firebaseio.com",
      projectId: "kwitter-app-26620",
      storageBucket: "kwitter-app-26620.appspot.com",
      messagingSenderId: "29205964220",
      appId: "1:29205964220:web:545344f5efef0a3cb777b9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      var msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0

      });

      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log("firebase id= " + firebase_message_id);
                        console.log(message_data);

                        Uname = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];

                        name_with_tag = "<h4>" + Uname + "<img class='user_tick' src='tick.png'> </h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-warning' id=" + firebase_message_id + " value=" + like + " onclick='updateLike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'> Like : " + like + "</span> </button> <hr>";

                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById("output").innerHTML += row;

                        //End code

                        

                        
                              
                        
                  }
            });
      });
}
getData();


function updateLike(message_id) {
      console.log("clicked an like button :"+ message_id);
      button_id=message_id;
      likes= document.getElementById(button_id).value;
      updated_likes=Number(likes) + 1;
      console.log("updated likes = "+ updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes 
      });
  }


  function logout() {
        localStorage.removeItem("room_name");
        localStorage.removeItem("user_name");
        window.location="index.html";

  }
