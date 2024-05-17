/**
 * Set inputs state
 * @param {object} event
 * @param {function} setInputs
 */
export const handleChange = (event, setInputs) => {
  const name = event.target.name;
  const value = event.target.value;
  setInputs((values) => ({ ...values, [name]: value }));
  // console.log(inputs);
};

/**
 * Check user email
 * @param {string} userMail
 * @returns boolean
 */
const validateEmail = (userMail) => {
  let regexEmail = new RegExp('[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+');
  return regexEmail.test(userMail);
};

/**
 * Check user password
 * @param {string} userMessage
 * @returns boolean
 */
const validatePassword = (userPassword) => {
  if (userPassword !== undefined) {
    userPassword = userPassword.trim();
    return userPassword.length >= 5;
  }
};

/**
 *
 * @param {object} event
 * @param {function} setErrorEmail
 * @param {function} setErrorPassword
 * @param {object} inputs
 * @param {function} callback
 */
export const handleSubmit = (
  event,
  setErrorEmail,
  setErrorPassword,
  inputs,
  callback
) => {
  event.preventDefault();
  setErrorEmail(!validateEmail(inputs.email) ? 'Invalide email!' : '');
  setErrorPassword(
    !validatePassword(inputs.password)
      ? 'Too short, must be > 5 characters!'
      : ''
  );
  validateEmail(inputs.email) & validatePassword(inputs.password) &&
    callback(inputs.email, inputs.password);
};
