export const passwordValidation = (password) => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  if (!password.match(/[a-z]/)) {
    return "Password must contain at least one lowercase letter";
  }

  if (!password.match(/[A-Z]/)) {
    return "Password must contain at least one uppercase letter";
  }

  if (!password.match(/[0-9]/)) {
    return "Password must contain at least one number";
  }

  if (!password.match(/[^a-zA-Z0-9]/)) {
    return "Password must contain at least one special character";
  }

  return "";
};

export const emailValidation = (email) => {
  if (!email) {
    return "Email is required";
  }

  if (
    !email.match(
      // eslint-disable-next-line
      /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,})$/
    )
  ) {
    return "Email is invalid";
  }

  return "";
};

export const confirmPasswordValidation = (password, confirmPassword) => {
  if (!confirmPassword) {
    return "Confirm Password is required";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return "";
};

export const phoneValidation = (phone) => {
  if (!phone) {
    return "Phone number is required";
  }

  if (phone.length < 10) {
    return "Phone number is invalid";
  }

  return "";
}