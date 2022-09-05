/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('user switching document from new document', () => {
  before(() => {
    cy.clearLocalStorage();
    cy.setLocalStorage(
      'savedDocuemnts',
      JSON.stringify({ 'my-doc.md': 'this is a saved document' })
    );
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-testid="markdownTextArea"]').as('markdownTextArea');
    cy.get('[data-testid="previewText"]').as('previewText');
    cy.get('[data-testid="documentName"]').as('documentNameTab');
    cy.get('[data-testid="menuButton"]').as('menuButton');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  test('switch document, save prompt appears', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').find('li').click();

    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document?');
  });

  test('switch document, discard the new document', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').find('li').click();

    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document?');

    cy.get('[data-testid="savePromptDiscard"]').click();
    cy.get('[data-testid="savePrompt"]').should('not.exist');

    cy.get('@documentNameTab').should('contain.text', 'new-document.md');

    // TODO, local storage should not contain welcome.md
  });

  test('switch document, save new document, no conflicts', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').find('li').click();

    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document?');

    cy.get('[data-testid="savePromptSave"]').click();
    cy.get('[data-testid="savePrompt"]').should('not.exist');

    cy.get('@documentNameTab').should('contain.text', 'new-document.md');

    // TODO: Check localstorage to see that welcome.md is now saved.
  });

  test('switch document, conflict with local storage, return to doc', () => {
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').find('li').click();

    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document?');

    cy.get('[data-testid="savePromptSave"]').click();

    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Overwrite Document?');

    cy.get('[data-testid="savePromptCancel"]');

    cy.get('[data-testid="savePrompt"]').should('not.exist');
    cy.get('@documentNameTab').should('contain.text', 'welcome.md');
  });

  test('switch document, conflict with local storage, overwrite', () => {
    cy.get('@markdownTextArea').type(
      '{selectAll}{backspace}This is new markdown'
    );

    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').find('li').click();

    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document?');

    cy.get('[data-testid="savePromptSave"]').click();

    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Overwrite Document?');

    cy.get('[data-testid="savePromptConfirm"]').click();

    cy.get('@documentNameTab').should('contain.text', 'new-document.md');

    // TODO: Check local storage to see that welcome.md has the updated text of this is new markdown
  });
});
