describe('Email Extractor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('extracts emails correctly', () => {
    cy.get('textarea').first().type('test@example.com\nother@test.com');
    cy.contains('Extract Email Addresses').click();
    cy.get('textarea').last().should('contain.value', 'test@example.com');
    cy.get('textarea').last().should('contain.value', 'other@test.com');
  });

  it('supports dark mode toggle', () => {
    cy.get('[aria-label="Toggle dark mode"]').click();
    cy.get('html').should('have.class', 'dark');
  });
});