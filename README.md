# In-Browser Markdown Editor Web-Application

<div align="center"><img src="./public/desktop-preview.png" width=700 alt="image of desktop preview of markdown editor"></div>

Project requirements and design provided thanks to [FrontEndMentors](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9).

The requirement of the project is to create a single-page markdown editor application that is capable of the following:

- Preview markdown syntax as HTML while editing
- Save markdown documents
- Switch between saved markdown documents
- Delete and edit markdown documents

## Techstack Used

This Project was bootstrapped with [Vite](https://vitejs.dev/guide/) using the the React/Typescript template. The project is linted with [ESLint](https://eslint.org/docs/latest/user-guide/getting-started) using react, prettier, cypress, and the [jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) rules. The application was built with the following technologies:

- [React](https://reactjs.org/docs/getting-started.html), a JavaScript library for building user interfaces
- [Cypress](https://docs.cypress.io/guides/overview/why-cypress), a JavaScript testing library for creating end-to-end and unit tests
- [Styled Components](https://styled-components.com/), a CSS-in-JS tool for styling React components
- [Redux](https://redux.js.org/) and [Redux toolkit](https://redux-toolkit.js.org/), a state management tool for JavaScript applications
- [marked](https://www.npmjs.com/package/marked), a low-level compiler for parsing markdown without caching or blocking for long periods of time

The [Local Storage Browser API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is used to save markdown documents to the user's browser.

## Runing the Application

To run the application locally, please follow these instructions.

1. Clone the repository to your local machine with `git clone` and `cd` into the project directory.
2. Install the dependencies with `npm install`.
3. Run the application with `npm run dev` and navigate to `localhost:3000` in your browser.

## Development

This section discusses the development process of the application, and the challenges that were faced.

### Rendering Markdown

The first goal I wanted to complete was converting/parsing string and rendering it into markdown on the page. It would take an extenstive amount of time to create my own implementation, so it was decided early in development to utilize a library that would handle this.

After researching, I came upon the _marked_ library which was easy to configure and provided fast results. It takes in some string, and returns valid markdown syntax back as HTML string.

One issue with the package is that it does not sanitize the output HTML, meaning that attackers can inject potentially harmful code/syntax into the application. To remedy this, the [DOMPurify](https://www.npmjs.com/package/dompurify) package was installed which sanitizes HTML string. The logic for rendering markdown is as follows:

1. Have _marked_ create the HTML representation of the markdown
2. Pass the results of _marked_ into _DOMPurify_ for sanitation
3. Inject the HTML string onto the page with `dangerouslySetInnerHTML`

### Redux

Each markdown document is set to include the following information:

1. The markdown content
2. The document name
3. New document status
4. The _original_ name of the document

When I initally planned the application and got the markdown render working, I came to the realization that I was creating many instances of state, and more importantly, was passing this state as props down through multiple components (_prop-drilling_). Some examples of this include:

- The left side-bar having to take in documents to display and switch over to another document.
- The top-bar needing document information to save documents and delete documents

Too much information was being passed down to each of these components, making it harder to understand what was going on and to read the application code.

After a bit of research, I came to the conclusion that a state management tool will be needed for this application. **Redux along with Redux Toolkit** was chosen to manage the state of the application. The main reason for this was that I wanted to practice using Redux, and Redux Toolkit makes it easier to implement Redux into an application.

#### Implementing Redux

As I implemented Redux into the applicaiton, I came to this conclusion: **the redux slice will hold information about the current document that is on the page**. This means that the left side-bar and top-bar components will no longer need to take in props, and instead can extract the document information from the redux store using the safely typed `useAppSelector` hook.

Another aspect of the application was to make it clear to the user when a major change to the application was occuring, these events include:

- Deleting a document
- Saving a document
- Changing the document title
- Overwriting a document

If any of these events occured, a modal would appear giving the user the ability to confirm these actions, or cancel and leave the document in its current state.

See the implementation of the redux slice below:

```typescript
const initialState: DocumentContext = {
  document: {
    originalDocumentTitle: 'welcome.md',
    currentDocumentTitle: 'welcome.md',
    documentMarkdown: welcomeMarkdownText,
    isNewDocument: true,
  },
  modalAction: null,
  modalInformation: null,
  targetSwitch: null,
};

const documentContextSlice = createSlice({
  name: 'documentContext',
  initialState,
  reducers: {
    setMarkdownInformation(_state, action: PayloadAction<DocumentContext>) {
      const markdownInformation = action.payload;
      return markdownInformation;
    },
    setCurrentMarkdownTitle(state, action: PayloadAction<string>) {
      if (!state.document) return state;
      state.document.currentDocumentTitle = action.payload;
      return state;
    },
    setMarkdownContent(state, action: PayloadAction<string>) {
      if (!state.document) return state;
      state.document.documentMarkdown = action.payload;
      return state;
    },
    setNullDocument(_state) {
      return {
        document: null,
        targetSwitch: null,
        modalAction: null,
        modalInformation: null,
      };
    },
    documentSaved(state) {
      if (!state.document) return state;
      state.document.originalDocumentTitle =
        state.document.currentDocumentTitle;
      state.document.isNewDocument = false;
      return state;
    },
    showModal(
      state,
      action: PayloadAction<{
        action: ModalAction;
        message: string;
        title: string;
      }>
    ) {
      state.modalAction = action.payload.action;
      state.modalInformation = {
        title: action.payload.title,
        message: action.payload.message,
      };
      return state;
    },
    hideModal(state) {
      state.modalAction = null;
      state.modalInformation = null;
      return state;
    },
    searchDoc(state, action: PayloadAction<string | null>) {
      state.targetSwitch = action.payload;
      return state;
    },
  },
});
```

The redux slice for the markdown documents above handles the following actions:

- **Load a document**, the dispatch function can take in a document object and use it set the store to this document's information, displaying it on the page
- **Update the markdown content**, when a user types into the markdown text area, the slice's **current markdown** property is updated.
- **change the document title**, change the title in the redux store (local storage change done somewhere else)
- **remove a document/set store to null**, a user can delete a document and potentially be left with no document to view, thus the store should have a "null" state to indicate there is no document on the page to edit.
- **Hide/show a message to the user**, a "modal" object in the store, when it has information, will render a `Modal` component on the page, and the component itself will extract the information from the store and display it to the user. Two methods in the store either show or hide the modal, and entire page resets will ensure to remove the modal as well.

#### Redux Dispatch Functions

Instead of calling the dispatch function in the components and passing down the payload information directly, functions that return another function that will call the store's dispatch with the arguments provided were created. I did this because it was easier to understand what dispatch was doing based on the name of the function, and it made the components easier to read.

Examples of two of these functions below:

```typescript
// when a user clicks a document in the list, switch to this page (if no conflicts exist)
export const changeDocument = (
  documentTitle: string,
  documentMarkdown: string
) => {
  return (dispatch: AppDispatch) => {
    const document: DocumentContext = {
      document: {
        originalDocumentTitle: documentTitle,
        currentDocumentTitle: documentTitle,
        documentMarkdown: documentMarkdown,
        isNewDocument: false,
      },
      modalAction: null,
      modalInformation: null,
      targetSwitch: null,
    };
    dispatch(setMarkdownInformation(document));
  };
};
```

The `changeDocument` function will take in a document title and markdown, and call the dispatch method of `setMarkdownInformation` to render the document on the page.

```typescript
// if user clicks new page (and accepts save or discard) then set context to new document markdown
export const setNewDocument = () => {
  return (dispatch: AppDispatch) => {
    const newMarkdown: DocumentContext = {
      document: {
        originalDocumentTitle: 'new-document.md',
        currentDocumentTitle: 'new-document.md',
        documentMarkdown: newDocumentMarkdownText,
        isNewDocument: true,
      },
      modalAction: null,
      modalInformation: null,
      targetSwitch: null,
    };
    dispatch(setMarkdownInformation(newMarkdown));
  };
};
```

The `setNewDocument` method will also call the dispatch method `setMarkdownInformation`, but instead takes in the prepared `new-document` markdown content found in the [markdown-text.ts file](https://github.com/JorgeAMendoza/in-browser-markdown-editor/blob/main/src/utils/markdown-text.ts)

#### Redux Actions

Originally, this application had functions within related components that used the application `selector` and `dispatch` to modify the store. However, this implementation was lacking in multiple ways:

- Making component files larger and harder to read.
- Making it harder to debug.

I wasn't a fan of coming back to revisit a component and seeing complex logic within the component itself, there should be a better way for the component to call the needed action without over-bloating. The solution to this was a simple one, put the related functionaility into a React Hook.

Within the [document-action.ts file](/src/hooks/document-actions.ts), the `useDocumentAction` hook contains multiple functions that modify the document store in various ways. This hook uses the `useAppSelector` and `useAppDispatch` hooks to retrieve the store information and dispatch method. This implementation makes it so that not every component needs to call the reducer hooks directly, instead, this hook acts as a proxy between the components and the actions needed to interact with the store.

For example, see the snippet for the `newDoc` function:

```typescript
const newDoc = useCallback(() => {
  if (!document) {
    dispatch(setNewDocument());
    return;
  } else if (document.isNewDocument)
    dispatch(
      displayModal(
        `do you want to discard the document ${document.currentDocumentTitle}? This cannot be reversed.`,
        'Discard new document',
        'discard'
      )
    );
  else
    dispatch(
      displayModal(
        `do you want to discard any changes made to ${
          document?.currentDocumentTitle || ''
        }? This cannot be reversed.`,
        'Discard changes',
        'discard'
      )
    );
}, [document]);
```

The function is wrapped around the `useCallback` react hook, which ensures that the function is only recreated when `document` property is modified. When called, it sets a new document if the `document` is not set (meaning there is no document rendered on the page), else it will use a dispatch method to render a modal that asks the user if they want to discard a new or saved document.

Other functions exist within this hook as well, all of them which were originally within components but moved here. Moving all these functions into the hook doesn't improve performance, but having just one location where they can exist makes it easier to organize and extract.

This same implementation was used for actions that result from a user's choice on the modal. The same logic applies here as well, have one hook that contains the store actions, and return functions that modify the store. This file can be found within the `Modal` feature folder in the [modal-aciton.ts file](/src/features/Modal/hooks/modal-actions.ts).

### Application Logic & Structure

This section will discuss some of the major functionality implemented into the application, going into more detail about the component created and the redux action.

#### Modal

As I developed the application, I was coming to realize just how tedious implementing the modal would become. It seemed simple at first, just render a modal that confirms whether some action should occur or not. But as I began to implement custom titles, messages, and more; it starts to pile up into something unmanageable. As stated before, functions were created within the component and passed into the modal. However, it was adjusted so that the modal renders only when there is a message to display, and instead of taking in the messages as props, it would be extracted from the store, and that informatino would be used to determine what action the modal should take.

See a snippet of [Modal.tsx](/src/features/Modal/components/Modal/Modal.tsx) below:

```tsx
export const Modal = ({ showMenu }: ModalProps) => {
  const { modalAction, modalInformation } = useAppSelector((state) => state);
  const methods = useModalAction();
  const dispatch = useAppDispatch();

  return (
    <ModalStyled showMenu={showMenu}>
      <div data-cy="modalPrompt">
        <h3>{modalInformation?.title}</h3>
        <p>{modalInformation?.message}</p>

        <div>
          {modalAction !== 'title' ? (
            <button onClick={() => dispatch(removeModal())}>Cancel</button>
          ) : null}

          {/* <button onClick={dispatch(methods['switch'])}>Confirm</button> */}
          {modalAction !== null && modalAction !== 'title' ? (
            <button onClick={() => dispatch(methods[modalAction])}>
              Confirm
            </button>
          ) : null}
        </div>

        {modalAction === 'title' ? (
          <button onClick={() => dispatch(removeModal())}>OK</button>
        ) : null}
      </div>
    </ModalStyled>
  );
};
```

All modal actions (confirmSave, discard, etc) were declared and are extracted from the `useModalAction` hook. Ssing the `modalAction` string value extracted from the store, we can use bracket notation to easily extract the desired function from the object without using lengthy conditionals. This behavior isn't consistent for every modal render howevever. For example, for invalid title changes, the modal should only render an OK button, and not a cancel button.

#### Saving a Document

When a user saves a document, the application must ensure the following:

- The document title is valid
- The document title does not already exist

In the `document-action.ts` file, the following function is returned by the hook:

```typescript
const saveDoc = useCallback(() => {
  const savedDocuments = localStorage.getItem('savedMarkdown');
  const validDocumentTitle = /^[-\w^&'@{}[\],$=!#()%+~]+\.md$/;
  if (!document) return;

  if (!validDocumentTitle.test(document.currentDocumentTitle)) {
    dispatch(
      displayModal(
        `The document title ${
          document?.currentDocumentTitle || ''
        } is invalid, please enter a valid document name`,
        'Invalid document title',
        'title'
      )
    );
    return;
  }

  if (!savedDocuments) {
    localStorage.setItem(
      'savedMarkdown',
      JSON.stringify({
        [document.currentDocumentTitle]: {
          documentMarkdown: document.documentMarkdown,
          date: createSaveDate(new Date()),
        },
      })
    );
    dispatch(saveDocumentInformation());
    window.dispatchEvent(new Event('storage'));
  } else if (document.isNewDocument) {
    const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
    if (document.currentDocumentTitle in savedDocumentsObject)
      dispatch(
        displayModal(
          `Document ${
            document?.currentDocumentTitle || ''
          } will have its contents overwritten. This action cannnot be reversed.`,
          'Duplicate document',
          'overwrite'
        )
      );
    else {
      const newSave = {
        documentMarkdown: document.documentMarkdown,
        date: createSaveDate(new Date()),
      };
      savedDocumentsObject[document.currentDocumentTitle] = newSave;
      localStorage.setItem(
        'savedMarkdown',
        JSON.stringify(savedDocumentsObject)
      );
      dispatch(saveDocumentInformation());
      window.dispatchEvent(new Event('storage'));
    }
  } else if (!document.isNewDocument) {
    const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
    if (document.originalDocumentTitle === document.currentDocumentTitle) {
      savedDocumentsObject[document.originalDocumentTitle].documentMarkdown =
        document.documentMarkdown;
      savedDocumentsObject[document.originalDocumentTitle].date =
        createSaveDate(new Date());
      localStorage.setItem(
        'savedMarkdown',
        JSON.stringify(savedDocumentsObject)
      );
      dispatch(saveDocumentInformation);
      window.dispatchEvent(new Event('storage'));
    } else {
      if (!(document.currentDocumentTitle in savedDocumentsObject)) {
        savedDocumentsObject[document.currentDocumentTitle] = {
          documentMarkdown: document.documentMarkdown,
          date: createSaveDate(new Date()),
        };
        delete savedDocumentsObject[document.originalDocumentTitle];
        localStorage.setItem(
          'savedMarkdown',
          JSON.stringify(savedDocumentsObject)
        );
        dispatch(saveDocumentInformation());
        window.dispatchEvent(new Event('storage'));
      } else {
        dispatch(
          displayModal(
            `Document ${
              document?.currentDocumentTitle || ''
            } will have its contents overwritten. This action cannnot be reversed.`,
            'Duplicate document',
            'overwrite'
          )
        );
      }
    }
  }
}, [document]);
```

the `saveDocument` function is responsible for validating document titles, checking the _new_ document status, and confirming if a document needs to be overwritten. Within the [TopBar.tsx component](/src/features/TopBar/components/TopBar/TopBar.tsx), when the _save button_ is clicked, the function is called and executes the following:

1. If there is no current document (users can go into the local storage and erase the data), then the function returns.
2. The current document title is verified using a regex, if invalid, then the `displayModal` function is called with the "title" argument, which is passed into the dispatch function to display the _invalid title_ modal to the user. The function then returns.
3. Next the function checks if there are any documents in the local storge, if none exist, then it is safe to assume that there is no document with the same title as the current one, so the markdown information is stringified and set as the local storage data, a date property is also inserted into the object to keep track of when the document was last saved (more on this later).

   - After this, the dispatch function is passed the result of `saveDocumentInformation` which will update the redux store with the current document information, which sets the original title to the current title, and sets the `newDocument` property to false. Finally, the `window` object fires a storage event, which will ensure that the left-side bar will populate the document list with the latest saved document infomration.

4. If documents exist in local storage and the current document is new, then we need check if the current document title already exists in the local storage. If it does, then the `displayModal` function is called with the "overwrite" argument, which is passed into the dispatch function to display the _overwrite_ modal to the user.

   - If the title does not exist, then the current document is added to the local storage data, and the dispatch function is passed the result of `saveDocumentInformation` which will update the redux store with the current document information. Like before, the `storage` event is fired to ensure that our document list is up to date with what we just inserted into local storage.

5. If documents exists in local storage and the current document is not new, then we check to see if the current document title is the same as the original document title. If it is, then we can safely assume that the user is saving the document with the same title, so we can just overwrite the local storage data with the current document information and the dispatch function is passed the result of `saveDocumentInformation` which will update the redux store with the current document information. If the current document doesn't exist in local storage then just add it to the local storage data, else if the document exists that means the markdown document needs to be overwritten and the _ovewrite_ modal will be displayed.

When the _overwrite_ modal appears, user's must confirm the action before it is executed.

#### Deleting a Document

When deleting the document, there are two main actions that occur:

1. Rendering the modal to confirm the deletion
2. The deletion itself.

Within `document-action.ts`, the following function is declared:

```typescript
const deleteDoc = useCallback(() => {
  dispatch(
    displayModal(
      'Are you sure you want to delete the current document and its contents? This action cannot be reversed.',
      'Delete Document',
      'delete'
    )
  );
}, []);
```

In `TopBar.tsx`, the delete button will fire the function above, which in turn will render the modal. Once the modal renders and the user confirms the action, the following function will be called:

```typescript
const confirmDelete = useCallback(() => {
  if (!document) return;

  if (document.isNewDocument) {
    dispatch(deleteDocument());
    return;
  }

  const savedDocuments = localStorage.getItem('savedMarkdown');
  if (!savedDocuments) {
    dispatch(removeModal());
    dispatch(deleteDocument());
    return;
  }
  const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
  delete savedDocumentsObject[document.originalDocumentTitle];
  localStorage.setItem('savedMarkdown', JSON.stringify(savedDocumentsObject));

  dispatch(removeModal());
  dispatch(deleteDocument());
  window.dispatchEvent(new Event('storage'));
}, [document]);
```

In the `confirmDelete` function above, the following occurs:

1. If there is no document present, return to avoid errors.
2. Grab all documents in local storage, and if there are no documents, then delete the document from the redux store.
3. If documents exist in local storage, delete the object with the title name, and set local storage to a new object which no longer has the current document information.
4. Finally, the dispatch to remove the modal is fired, the document is removed from the Redux store, and the `window` object fires a storage event which ensures the document list reflects this change.

#### Creating a new Document

The `Menu.tsx` renders a button to create a new document, but since we don't want to immediately lose all saved work, the `newDoc` function from the `useDocumentAction` hook is used to render a modal that displays the two variants:

- A modal that asks the user if they want to discard a _new_ document.
- A modal that asks the user if they want to discard a _saved_ document.

Either way, the following function from the `useModalAction` hook will execute when user confirms the action:

```typescript
const confirmDiscard = useCallback(() => {
  dispatch(setNewDocument());
  dispatch(removeModal());
}, []);
```

The `confirmDiscard` function will render the `newDocument` markdown text on the page, and hide the modal.

#### Switching Documents

[DocumentList.tsx](/src/features/Menu/components/DocumentList/DocumentList.tsx) renders a list of saved documents based on data from the local storage. Each document is represented by the [DocumentListItem.tsx](/src/features/Menu/components/DocumentList/DocumentListItem/DocumentListItem.tsx) component, which when clicked, fires the `switchDoc` function from the `useDocumentAction` hook. If there is no document on the page and the clicked doc is valid, then it is rendered on the page. Else, a modal that asks the user if they want to switch will be rendered. If the user confirms the action, the following function is called:

```typescript
const confirmSwitch = useCallback(() => {
  const targetDocumentTitle = targetSwitch;
  const savedMarkdown = localStorage.getItem('savedMarkdown');
  if (!savedMarkdown || !targetDocumentTitle) return;

  const savedMarkdownObject = JSON.parse(savedMarkdown) as SavedDocument;

  if (!savedMarkdownObject[targetDocumentTitle]) {
    dispatch(removeTargetDoc());
    dispatch(removeModal());
    return;
  } else {
    dispatch(
      changeDocument(
        targetDocumentTitle,
        savedMarkdownObject[targetDocumentTitle].documentMarkdown
      )
    );
  }
  dispatch(removeTargetDoc());
  dispatch(removeModal());
}, [document]);
```

The `confirmSwitch` function within the `useModalAction` hook executes the following:

1. Grabs all documents in local storage and the current document title.
2. If no documents exists in local storage, or there is no document to switch to, return.
3. If the target document cannot be found in the local storage, ensuring to catch errors, then remove the target document and the modal.
4. If all checks had passed at this point, then there is a document to switch to. The `changeDocument` method is passed into the dispatch, taking in the document title and markdown to render on the page.
5. The modal and target document are removed.

#### Editing Markdown.

The [MarkdownTextArea.tsx component](/src/features/DocumentEdit/components/MarkdownTextArea/MarkdownTextArea.tsx) contains the `textarea` where users can edit markdown. As users edit the text area, the `updateDoc` function from the `useDocumentAction` hook is called to update the markdown in the Redux store. Originally I planned to just have this state contained within component itself, however, multiple components around the application needed access to this information; so the state would need to exist within the redux store. `updateDoc` simply calls the `updateMarkdown` action from the reducer.

One tricky part of editing the document was inserting a _tab_ character when the user presses the tab key. By default, when a user tabs in a text-area, the keyboard navigates to the next tab target. To insert a tab character, a `keyDown` event was implemented within the `textarea`, see below:

```typescript
<textarea
  data-cy="markdownTextArea"
  value={document?.documentMarkdown || ''}
  onChange={(e) => updateDoc(e.target.value)}
  onBlur={(e) => updateDoc(e.target.value)}
  onKeyDown={(e) => {
    const textArea = e.target;
    if (!(textArea instanceof HTMLTextAreaElement)) return;
    if (e.key == 'Tab') {
      e.preventDefault();
      const start = textArea.selectionStart;
      const end = textArea.selectionEnd;

      textArea.value =
        textArea.value.substring(0, start) +
        '   ' +
        textArea.value.substring(end);

      textArea.selectionStart = textArea.selectionEnd = start + 3;
      updateDoc(textArea.value);
    }
  }}
/>
```

The `onKeyDown` attribute placed within the `textarea` executes the following:

1. Extract the text area from the event target and ensure that it is an HTMLTextAreaElement (Typescript check).
2. If the key pressed is the tab key, prevent the default action of leaving the `textarea`.
3. Grab the start and end of the selection in the text area, then insert three spaces at the start position, and concat the rest of the string after the end position.
4. Set the selection start and end to the start position plus 3 (the length of the tab character) to position cursor in its new position.
5. Call `updateDoc` to update the markdown in the store.

#### Preview Markdown

The [PreviewTextArea.tsx component](/src/features/DocumentEdit/components/PreviewTextArea/PreviewTextArea.tsx) extracts the document markdown from the Redux store and uses _marked_ library to parse the markdown into a valid HTML string. The component can be seen below:

```typescript
export const PreviewTextArea = ({
  adjustPreview,
  fullPreview,
}: PreviewTextAreaProps) => {
  const documentState = useAppSelector((state) => state);
  const html = marked.parse(documentState.document?.documentMarkdown || '');

  return (
    <PreviewTextAreaStyled data-fullpreview={fullPreview}>
      <div>
        <h1>preview</h1>
        <button onClick={adjustPreview} aria-label="toggle full screen preview">
          <img src={showPreviewIcon} alt="" />
        </button>
      </div>
      <PreviewText
        data-cy="previewTextArea"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(html, { USE_PROFILES: { html: true } }),
        }}
      ></PreviewText>
    </PreviewTextAreaStyled>
  );
};
```

The prop `fullPreview` will display the preview area as full screen if true, else it will share the screen with the `MarkdownTextArea.tsx` component. The `dangerouslySetInnerHTML` prop is used to render the HTML string returned from the `marked` function. The markdown is first passed through the `sanitize` method from the `DomPurify` method to sanitize the HTML string.

## Conclusion

Overall this was a fun project to work on. I felt that I was able to get a good grasp on Redux fundamentals, discover a new way to render markdown on a web page, and work on a project that was more complex than previous projects I have worked on.

Some things I look to improve include:

1. Implement unit test that would have helped me solve some of the bugs I encountered in specific components.
2. Migrate from local storage to `IndexedDB` for offline storage, and eventually add support for authentication so users can save their documents to a database to be accessed anywhere.

I would like to discuss the _render_ issues that some may notice. Most actions on the page (menu open, type, etc.) will cause almost the entire page to re-render. As of the current state of the application, since renders are short and efficient, this isn't much of a problem. I believe in the idea of not "over-optimizing"; React is meant to render the application and is built to be very good at that. Introducing multiple optimization techniques when the performance is fine does nothing more than over-complicate our components. Plus, these methods themselves come at a price. Until peformance becomes noticeable issue, it is best to leave it be.

If you find problems or have suggestions, please feel free to open an issue or pull request! Thanks for reading!
