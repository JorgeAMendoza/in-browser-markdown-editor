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
  cy.setLocalStorage(
    'my-markdown',
    JSON.stringify(['# Welcome to my markdown!'])
  );
  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="markdownTextArea"]').as('markdownTextArea');
    cy.get('[data-testid="previewText"]').as('previewText');
    cy.get('[data-testid="documentName"]').as('documentNameTab');
    cy.get('[data-testid="menuButton"]').as('menuButton');
  });

  it('saved markdown text displayed and markdown area and preview', () => {
    cy.get('@markdownTextArea').should(
      'contain.text',
      '# Welcome to my markdown!'
    );
    cy.get('@previewText')
      .find('h1')
      .should('contain.text', 'Welcome to my markdown!');
    cy.get('@documentNameTab').should('contain.text', 'my-markdown.md');
  });

  it('saved markdown displayed in document list', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 1);
    cy.get('[data-testid="documentList"]')
      .children()
      .find(':first-child')
      .should('contain.text', 'my-markdown.md');
  });
});

describe('user opens page with multiple saved documents in local storage', () => {
  // save multiple documents to local storage
  // before each which visits the page and grabs markdown and preview text areas.
  // first test, welcome exist in the local storage, so if we save we get a "overwrite" prompt
  // second test, welcome does not exist, so when we save "welcome.md" will be a title in local storage, a key should at least exist.
  // third test, a document named 'todo-list' will consist of unoredered list, so when user clicks it on the left panel, then we will get a prompt asking to save teh current "welcome", click no, then a new document popping up with text appears, compare text, ensure that name matches, and save.
});
