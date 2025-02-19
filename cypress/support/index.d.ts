declare namespace Cypress {
  interface Chainable {
    /**
     * Toggle dark mode
     * @example cy.toggleDarkMode()
     */
    toggleDarkMode(): Chainable<Element>

    /**
     * Extract emails from input text
     * @example cy.extractEmails('test@example.com')
     */
    extractEmails(text: string): Chainable<Element>

    /**
     * Get output textarea containing extracted emails
     * @example cy.getOutputEmails()
     */
    getOutputEmails(): Chainable<Element>
  }
}