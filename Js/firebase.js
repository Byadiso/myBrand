// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAi54Nrxz1GpLIykzV-PNg64SsM1adu9Vs",
  authDomain: "mybrand-97ee1.firebaseapp.com",
  projectId: "mybrand-97ee1",
  storageBucket: "mybrand-97ee1.appspot.com",
  messagingSenderId: "899192042567",
  appId: "1:899192042567:web:e69d5713cfa097525bad62",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//refernce a collection
const loginRef = firebase.database().ref("User");

//my login button

const loginSubmit = document.getElementById("loginSubmit");

// subtmit on clcik
loginSubmit.addEventListener("click", (e) => {
  e.preventDefault();

  const name = getInputValue("name");
  const email = getInputValue("email");
  const password = getInputValue("password");

  saveUser(name, email, password);
});

//function to get inpu value

function getInputValue(id) {
  return document.getElementById(id).value;
}

//save user to firebaseapp
function saveUser(name, email, password) {
  var newLoginRef = loginRef.push();

  newLoginRef.set({
    name: name,
    email: email,
    password: password,
  });
}
