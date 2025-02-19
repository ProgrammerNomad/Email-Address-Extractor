// Custom commands for Email Extractor

Cypress.Commands.add('toggleDarkMode', () => {
  cy.get('[aria-label="Toggle dark mode"]').click();
});

Cypress.Commands.add('extractEmails', (text) => {
  cy.get('textarea').first().clear().type(text);
  cy.contains('Extract Email Addresses').click();
});

Cypress.Commands.add('getOutputEmails', () => {
  return cy.get('textarea').last();
});