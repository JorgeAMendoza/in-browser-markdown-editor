/// <reference types="cypress" />
/// <reference types="cypress-localstorage-commands" />

describe('creating a new document from the inital page', () => {
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
    cy.get('[data-testid="documentName"]').as('documentNameTab');
    cy.get('[data-testid="menuButton"]').as('menuButton');
    cy.get('[data-testid="saveDocumentButton"]').as('saveDocumentButton');
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  test('discard the document and move to new document', () => {
    cy.get('@saveDocumentButton').click();
    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document?');

    cy.get('[data-testid="savePromptDiscard"]').click();
    cy.get('[data-testid="savePrompt"').should('not.exist');
    cy.get('@documentNameTab').should('contain.text', 'new-document.md');
  });

  test('save current document, no conflict with local storage', () => {
    cy.get('@saveDocumentButton').click();
    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document?');

    cy.get('[data-testid="savePromptSave"]').click();
    cy.get('[data-testid="savePrompt"]').should('not.exist');
    cy.get('@documentNameTab').should('contain.text', 'new-document.md');

    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').children().should('have.length', 2);
    cy.get('[data-testid="documentList"]').should('contain.text', 'welcome.md');

    // TODO: Go into local storage and ensure that the length is 2
    // ensure that one of them is "welcome.md"
  });

  test('save current document, conflict with local storage, return to document', () => {
    cy.get('@saveDocumentButton').click();
    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document?');

    cy.get('[data-testid="savePromptSave"]').click();
    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Document already exists');
    cy.get('[data-testid="savePromptCancel"]').click();

    cy.get('[data-testid="savePrompt"]').should('not.exist');
    cy.get('@documentNameTab').should('contain.text', 'welcome.md');
  });

  test('save current document, conflict with local storage, overwrite local storage document', () => {
    cy.get('@markdownTextArea').type(
      '{selectAll}{backspace}this is new welcome text'
    );
    cy.get('@saveDocumentButton').click();
    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Discard new document?');

    cy.get('[data-testid="savePromptSave"]').click();
    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('contain.text', 'Document already exists');
    cy.get('[data-testid="savePromptOverwrite"]').click();

    // TODO: Check local storage to ensure that new markdown text was saved into local storage.
    // Ensure that teh docunment named welcome.md has "this is new welcome text"
  });
});

describe('creating a new document from a page saved in local storage', () => {
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
    cy.get('[data-testid="documentName"]').as('documentNameTab');
    cy.get('[data-testid="menuButton"]').as('menuButton');
    cy.get('[data-testid="saveDocumentButton"]').as('saveDocumentButton');
    cy.get('@menuButton').click();
    cy.get('[data-testid="documentList"]').find('li:first-of-type').click();
  });
  afterEach(() => {
    cy.saveLocalStorage();
  });

  test('current document is saved, move to new document', () => {
    cy.get('@documentNameTab').should('have.text', 'my-doc.md');
    cy.get('@menuButton').click();
    cy.get('[data-testid="newDocumentButton"]').click();

    cy.get('@documentNameTab').should('have.text', 'new-document.md');
  });

  test('current document not saved, prompt appears', () => {
    cy.get('@markdownTextArea').type('editing the document');
    cy.get('@documentNameTab').should('have.text', 'my-doc.md');
    cy.get('@menuButton').click();
    cy.get('[data-testid="newDocumentButton"]').click();

    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('have.text', 'Discard changes to my.doc.md?');
  });

  test('current document not saved, prompt appears, return to document', () => {
    cy.get('@markdownTextArea').type('editing the document');
    cy.get('@documentNameTab').should('have.text', 'my-doc.md');
    cy.get('@menuButton').click();
    cy.get('[data-testid="newDocumentButton"]').click();

    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('have.text', 'Discard changes to my.doc.md?');

    cy.get('[data-testid]="savePromptCancel').click();

    cy.get('[data-testid="savePrompt"]').should('not.exist');
    cy.get('@documentNameTab').should('contain.text', 'my-doc.md');
  });

  test('current document not saved, prompt appears, discard changes', () => {
    cy.get('@markdownTextArea').type('editing the document');
    cy.get('@documentNameTab').should('have.text', 'my-doc.md');
    cy.get('@menuButton').click();
    cy.get('[data-testid="newDocumentButton"]').click();

    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('have.text', 'Discard changes to my.doc.md?');

    cy.get('[data-testid="savePromptDiscard"]').click();
    cy.get('@documentNameTab').should('have.text', 'new-document.md');

    // TODO: Check local storage to ensure that original text is still there
  });

  test('current document not saved, prompt appears, save changes', () => {
    cy.get('@markdownTextArea').type(
      '{selectAll}{backspace}editing the document'
    );
    cy.get('@documentNameTab').should('have.text', 'my-doc.md');
    cy.get('@menuButton').click();
    cy.get('[data-testid="newDocumentButton"]').click();

    cy.get('[data-testid="savePrompt"]')
      .find('h3')
      .should('have.text', 'Discard changes to my.doc.md?');

    cy.get('[data-testid="savePromptSave"]').click();
    cy.get('@documentNametab').should('contain.text', 'new-document.md');

    // TODO: Check local storage to ensure that new markdown text was saved into local storage.
  });
});
