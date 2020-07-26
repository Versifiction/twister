const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.verified = !isEmpty(data.verified) ? data.verified : "";
  data.connected = !isEmpty(data.connected) ? data.connected : "";
  data.creationDate = !isEmpty(data.creationDate) ? data.creationDate : "";
  data.lastConnection = !isEmpty(data.lastConnection)
    ? data.lastConnection
    : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  if (Validator.isEmpty(data.username)) {
    errors.username = "Le pseudo est requis";
  }

  if (!Validator.isAlphanumeric(data.username)) {
    errors.username =
      "Le pseudo doit seulement contenir des chiffres et des lettres";
  }

  if (!Validator.isLength(data.username, { min: 3, max: 15 })) {
    errors.username = "Le pseudo doit faire entre 3 et 15 caractères";
  }

  if (Validator.isEmpty(data.name)) {
    errors.firstname = "Le nom est requis";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "L'adresse email est requise";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "L'adresse email est invalide";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Le mot de passe est requis";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "La confirmation du mot de passe est requise";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Le mot de passe doit faire entre 6 et 30 caractères";
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Les mots de passe doivent correspondre";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
