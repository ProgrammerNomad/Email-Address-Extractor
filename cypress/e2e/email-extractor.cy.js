describe('Email Extractor', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('extracts emails correctly', () => {
    const testEmails = 'test@example.com\nother@test.com';
    cy.get('textarea').first().type(testEmails);
    cy.contains('Extract Email Addresses').click();
    cy.get('textarea').last().should('contain.value', 'test@example.com');
    cy.get('textarea').last().should('contain.value', 'other@test.com');
  });

  it('supports dark mode toggle', () => {
    cy.get('[aria-label="Toggle dark mode"]').click();
    cy.get('html').should('have.class', 'dark');
  });

  it('supports file upload', () => {
    cy.fixture('test-emails.txt').as('emailFile');
    cy.get('input[type="file"]').selectFile('@emailFile', { force: true });
    cy.get('textarea').first().should('not.be.empty');
  });

  it('supports export functionality', () => {
    const testEmail = 'test@example.com';
    cy.get('textarea').first().type(testEmail);
    cy.contains('Extract Email Addresses').click();
    cy.contains('Export').click();
    cy.contains('Text File (.txt)').click();
    cy.readFile('downloads/emails*.txt').should('contain', testEmail);
  });

  it('shows correct email count', () => {
    const emails = 'test1@example.com\ntest2@example.com\ntest3@example.com';
    cy.get('textarea').first().type(emails);
    cy.contains('Extract Email Addresses').click();
    cy.contains('Extracted Email Addresses (3)');
  });
});