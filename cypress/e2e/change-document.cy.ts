/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />
import createSaveDate from '../../src/utils/create-save-data';

describe('switching documents', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.setLocalStorage(
      'savedDocuemnts',
      JSON.stringify({ 'my-doc.md': 'this is a saved document' })
    );
    cy.get('[data-testid="markdownTextArea"]').as('markdownTextArea');
    cy.get('[data-testid="previewText"]').as('previewText');
    cy.get('[data-testid="documentName"]').as('documentNameInput');
    cy.get('[data-testid="menuButton"]').as('menuButton');
    cy.get('[data-testid="markdownTextArea"]').as('markdownTextArea');
  });

  it('switch from welcome.md document, cancel switch', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]')
      .find('li')
      .contains('my-doc.md')
      .click();

    cy.get('[data-testid="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document?');

    cy.get('[data-testid="modalPrompt"]').find('button:nth-of-type(1)').click();
    cy.get('[data-testid="modalPrompt"]').should('not.exist');
    cy.get('documentNameInput').should('contain.value', 'welcome.md');
  });

  it('switch from welcome.md document, discard the new document', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]')
      .find('li')
      .contains('my-doc.md')
      .click();

    cy.get('[data-testid="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document?');

    cy.get('[data-testid="modalPrompt"]').find('button:nth-of-type(2)').click();
    cy.get('[data-testid="modalPrompt"]').should('not.exist');

    cy.get('@documentNameTab').should('contain.text', 'my-doc.md');
  });

  it('switch document, edit document and save', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]')
      .find('li')
      .contains('my-doc.md')
      .click();

    cy.get('[data-testid="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document?');

    cy.get('[data-testid="modalPrompt"]').find('button:nth-of-type(2)').click();

    cy.get('@documentNameTab').should('contain.value', 'my-doc.md');
    cy.get('@markdownTextArea').type(
      '{selectAll}{backspace}The document has been edited'
    );
    cy.get('@saveDocumentButton').click();
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 1);
    cy.get('[data-testid="documentList"]')
      .find('li')
      .contains('my-doc.md')
      .find('div p')
      .should('contain.text', createSaveDate(new Date(0)));
  });

  it('create new saved document, switch to my-doc.md', () => {
    cy.get('@documentSaveButton').click();
    cy.get('@menuButton').click();

    cy.get('[data-testid="documentList"]').children().should('have.length', 2);
    cy.get('[data-testid="documentList"]')
      .find('li')
      .contains('my-doc.md')
      .click();
    cy.get('[data-testid="modalPrompt"]')
      .find('h3')
      .should('contain.text', 'Discard changes?');
    cy.get('[data-testid="documentList"]')
      .find('button:nth-of-type(2)')
      .click();

    cy.get('[data-testid="modalPrompt"]').should('not.exist');
    cy.get('@documentNameInput').should('contian.value', 'my-doc.md');
  });
});
