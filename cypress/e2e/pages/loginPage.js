function navigateTo() {
  cy.visit('http://localhost:5173/login'); // Update the path accordingly
}

function getLoginForm() {
  return cy.get('form'); // Adjust the selector based on your HTML structure
}

function getUsernameInput() {
  return cy.get('[name="username"]');
}

function getPasswordInput() {
  return cy.get('[name="password"]');
}

function getLoginButton() {
  return cy.get('button[type="submit"]');
}

function fillLoginForm(username, password) {
  getUsernameInput().type(username);
  getPasswordInput().type(password);
}

function submitLoginForm() {
  getLoginButton().click();
}

function getErrorMessageBox() {
  return cy.get('.error-message'); // Adjust the selector based on your HTML structure
}

export default {
  navigateTo,
  getLoginForm,
  getUsernameInput,
  getPasswordInput,
  getLoginButton,
  fillLoginForm,
  submitLoginForm,
  getErrorMessageBox,
};
