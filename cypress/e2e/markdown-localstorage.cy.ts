/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('User opens page for first time', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="markdownTextArea"]').as('markdownTextArea');
    cy.get('[data-testid="previewText"]').as('previewText');
    cy.get('[data-testid="documentName"]').as('documentNameTab');
    cy.get('[data-testid="menuButton"]').as('menuButton');
  });

  it('Welcome markdown text and preview visable', () => {
    cy.get('@documentNameTab').should('contain.text', 'welcome.md');
    cy.get('@markdownTextArea').contains('# Welcome to Markdown');
    cy.get('@previewText')
      .find('h1')
      .should('contain.text', 'Welcome to Markdown');
  });

  it('No saved documents', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 0);
  });
});

describe('User opens page with saved document in local storage', () => {
  before(() => {
    cy.clearLocalStorage();
    cy.setLocalStorage(
      'savedDocuemnts',
      JSON.stringify({ 'my-doc.md': 'this is a saved document' })
    );
  });

  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/');
    cy.get('[data-testid="markdownTextArea"]').as('markdownTextArea');
    cy.get('[data-testid="previewText"]').as('previewText');
    cy.get('[data-testid="documentName"]').as('documentNameTab');
    cy.get('[data-testid="menuButton"]').as('menuButton');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('welcome.md is displayed when user loads page', () => {
    cy.get('@markdownTextArea').should('contain.text', '# Welcome to Markdown');
    cy.get('@previewText')
      .find('h1')
      .should('contain.text', 'Welcome to markdown');
    cy.get('@documentNameTab').should('contain.text', 'welcome.md');
  });

  it('saved markdown displayed in document list', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 1);
    cy.get('[data-testid="documentList"]')
      .children()
      .find(':first-child')
      .should('contain.text', 'my-doc.md');
  });
});

describe('user opens page with multiple saved documents in local storage', () => {
  before(() => {
    cy.clearLocalStorage();
    cy.setLocalStorage(
      'savedDocuemnts',
      JSON.stringify({
        'my-doc.md': 'this is a saved document',
        'my-other-doc.md': 'this is another saved docuement',
        'test-doc.md': 'this is a test document',
      })
    );
  });
  beforeEach(() => {
    cy.restoreLocalStorage();
    cy.visit('/');
    cy.get('[data-testid="markdownTextArea"]').as('markdownTextArea');
    cy.get('[data-testid="previewText"]').as('previewText');
    cy.get('[data-testid="documentName"]').as('documentNameTab');
    cy.get('[data-testid="menuButton"]').as('menuButton');
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });
  it('welcome.md displayed on page load up', () => {
    cy.get('@markdownTextArea').should('contain.text', '# Welcome to Markdown');
    cy.get('@previewText')
      .find('h1')
      .should('contain.text', 'Welcome to markdown');
    cy.get('@documentNameTab').should('contain.text', 'welcome.md');
  });

  it('document list populated with three items', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 3);
  });

  it('document list has three named documents from local storage', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]')
      .children()
      .then(($item) => {
        cy.wrap($item[0]).should('contain.text', 'my-doc.md');
        cy.wrap($item[1]).should('contain.text', 'my-other-doc.md');
        cy.wrap($item[2]).should('contain.text', 'test-doc.md');
      });
  });
});
