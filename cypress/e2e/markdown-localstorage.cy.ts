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

  it('No saved documents', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 0);
  });
});

describe('User opens page with saved document in local storage', () => {
  beforeEach(() => {
    cy.setLocalStorage(
      'savedMarkdown',
      JSON.stringify({
        'my-doc.md': {
          documentMarkdown: 'this is a saved document',
          date: '01 January 2022',
        },
      })
    );
    cy.visit('/');
    cy.get('[data-testid="markdownTextArea"]').as('markdownTextArea');
    cy.get('[data-testid="previewText"]').as('previewText');
    cy.get('[data-testid="documentName"]').as('documentNameTab');
    cy.get('[data-testid="menuButton"]').as('menuButton');
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
  beforeEach(() => {
    cy.visit('/');
    cy.setLocalStorage(
      'savedDocuemnts',
      JSON.stringify({
        'my-doc.md': {
          documentMarkdown: 'this is a saved document',
          date: '01 January 2022',
        },
        'other-doc.md': {
          documentMarkdown: 'this is another document',
          date: '01 January 2022',
        },
      })
    );
    cy.get('[data-testid="markdownTextArea"]').as('markdownTextArea');
    cy.get('[data-testid="previewText"]').as('previewText');
    cy.get('[data-testid="documentName"]').as('documentNameTab');
    cy.get('[data-testid="menuButton"]').as('menuButton');
  });

  it('welcome.md displayed on page load up', () => {
    cy.get('@markdownTextArea').should('contain.text', '# Welcome to Markdown');
    cy.get('@previewText')
      .find('h1')
      .should('contain.text', 'Welcome to markdown');
    cy.get('@documentNameTab').should('contain.text', 'welcome.md');
  });

  it('document list populated with two items', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 2);
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
