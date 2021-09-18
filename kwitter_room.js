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


var username = localStorage.getItem("user_name");
console.log("Username = " + username);
document.getElementById("user_name").innerHTML = "Welcome " + username + "!";
//ADD YOUR FIREBASE LINKS HERE

function addRoom() {
 var room_name=document.getElementById("roomName").value;
 firebase.database().ref("/").child(room_name).update({
       purpose:"Adding Room Name"
 });
 localStorage.setItem("room_name", room_name);
 window.location="kwitter_page.html"
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log("room_name"+ Room_names);
row ="<div class='room_name' id="+ Room_names +" onclick='redirectToRoomName(this.id)' > #"+ Room_names + "</div> <hr>";
                  document.getElementById("output").innerHTML +=row; 
            });
      });
}
getData();

function redirectToRoomName(Name) {
    console.log("room id = " + Name);
    localStorage.setItem("room_name",Name);
    window.location="kwitter_page.html";
}

function logout() {
  localStorage.removeItem("user_name");  
  localStorage.removeItem("room_name");
  window.location="index.html";
}
