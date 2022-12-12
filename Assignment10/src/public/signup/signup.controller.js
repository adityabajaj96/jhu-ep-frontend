(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['user', 'saveUser'];
function SignUpController(user, saveUser) {
  var signUpCtr = this;

    // first check to make sure user is defined before trying to access properties of the object
    // reference properties of the user object so it isn't manipulating the same object in memory as the service prior to submitting the form
  if(user){
    signUpCtr.firstName = user.firstName;
    signUpCtr.lastName = user.lastName;
    signUpCtr.phone = user.phone;
    signUpCtr.email = user.email;
    signUpCtr.favoriteDish = user.favoriteDish;
  }

  signUpCtr.submit = function(){
    // create a new user object to be saved
    const newUserData = {
      firstName: signUpCtr.firstName,
      lastName: signUpCtr.lastName,
      email: signUpCtr.email,
      phone: signUpCtr.phone,
      favoriteDish: signUpCtr.favoriteDish
    };

    saveUser(newUserData);
    signUpCtr.saved = true;
  }
}

})();
