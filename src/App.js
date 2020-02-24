import React from "react";
import { Header } from "./components/layout/Header";
import { Content } from "./components/layout/Content";
import { ProjectsProvider, SelectedProjectProvider } from "./context";
import { firebase } from "./firebase";

export const App = () => {
  var currentUser = firebase.auth().currentUser
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      currentUser = user
      console.log("User is signed in successfully " + user.email)
    } else {
      console.log("No user is signed in.")
    }
  });
  if(currentUser) {

  } else {
    console.log("logging in user.")
    firebase
      .auth()
      .signInWithEmailAndPassword("williammakau070@gmail.com", "makau1993")
      .catch(function name(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("errorCode", errorCode);
        console.log("errorMessage", errorMessage);
      });
  }

  return (
    <SelectedProjectProvider>
      <ProjectsProvider>
        <div className="App">
          <Header />
          <Content />
        </div>
      </ProjectsProvider>
    </SelectedProjectProvider>
  );
};
