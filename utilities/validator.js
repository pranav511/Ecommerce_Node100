exports.ValidateName = function (name) {
  if (name.trim().length !== 0) {
    return true;
  }
  return false;
};

exports.ValidateAge = function (age) {
  if (age.length >= 18 ) {
    return true;
  }
  return false;
};

exports.ValidateGender = function (gender) {
  if (
    gender.toLowerCase() === "female" ||
    gender.toLowerCase() === "male" ||
    gender.toLowerCase() === "others"
  ) {
    return true;
  }
  return false;
};

exports.ValidatedPassword = function (Password) {
  // check regex having one Capital letter
  // Is 6 to 16 characters long.
  // Contains at least one digit.
  // Contains at least one special character from the set (!@#$%^&*).
  // Can include letters (both uppercase and lowercase), digits, and the specified special characters.

  const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (regex.test(Password)) {
    return true;
  } else if (Password.length >= 6) {
    return true;
  } else {
    return false;
  }
};

exports.ValidateEmail = function (EmailId) {
  const regex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
  if (regex.test(EmailId)) {
    return true;
  } else {
    return false;
  }
};

exports.ValidatePhoneNo = function (PhoneNo) {
  const regex = /^[0-9]{10}$/;
  if (regex.test(PhoneNo)) {
    return true;
  } else {
    return false;
  }
};
