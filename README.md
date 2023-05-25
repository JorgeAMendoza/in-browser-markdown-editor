# In-Browser Markdown Editor Web-Application

<div align="center"><img src="./public/desktop-preview.png" width=700 alt="image of desktop preview of markdown editor"></div>

Project requirements and design provided thanks to [FrontEndMentors](https://www.frontendmentor.io/challenges/inbrowser-markdown-editor-r16TrrQX9).

The requirement of the project is to create a single-page markdown editor application that is capable of the following:

- Preview markdown syntax as HTML while editing
- Save markdown documents for later editing
- Switch between saved markdown documents
- Delete and edit markdown documents

## Techstack Used

This Project was bootstrapped with [Vite](https://vitejs.dev/guide/) using the the React/Typescript template. The project is linted with [Eslint](https://eslint.org/docs/latest/user-guide/getting-started) using react, prettier, cypress, and the [jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y) rules.

- [React](https://reactjs.org/docs/getting-started.html), a JavaScript library for building user interfaces
- [Cypress](https://docs.cypress.io/guides/overview/why-cypress), a JavaScript testing library for creating end-to-end and unit tests
- [Styled Components](https://styled-components.com/), a CSS-in-JS tool for styling React components
- [Redux](https://redux.js.org/) and [Redux toolkit](https://redux-toolkit.js.org/), a state management tool for JavaScript applications
- [marked](https://www.npmjs.com/package/marked), a low-level compiler for parsing markdown without caching or blocking for long periods of time

The [Local Storage Browser API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) is used to save markdown documents to the user's browser

## Runing the Application

To run the application locally, please follow these instructions.

1. Clone the repository to your local machine with `git clone` and `cd` into the project directory.
2. Install the dependencies with `npm install`.
3. Run the application with `npm run dev` and navigate to `localhost:3000` in your browser.

## Development

This section discusses the development process of the application, and the challenges that were faced.

### Rendering Markdown

The first goal I wanted to complete was converting/parsing string and rendering it into markdown on the page. It would take an extenstive amount of time to create my own implementation, so it was decided early in development to implement a package that would handle this.

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

#### Disorgnaized State

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
const initialState: DocumentContext = {} as DocumentContext;

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
        showDeleteModal: false,
        showDiscardNewModal: false,
        showDiscardSavedModal: false,
        showOverwriteModal: false,
        showTitleModal: false,
        showSwitchModal: false,
        targetSwitch: null,
      };
    },
    documentSaved(state) {
      if (!state.document) return state;
      state.document.originalDocumentTitle =
        state.document.currentDocumentTitle;
      state.document.isNewDocument = false;
      return state;
    },
    showModal(state, action: PayloadAction<ModalTypes>) {
      switch (action.payload) {
        case 'delete': {
          state.showDeleteModal = true;
          break;
        }
        case 'discardNew': {
          state.showDiscardNewModal = true;
          break;
        }
        case 'discardSaved': {
          state.showDiscardSavedModal = true;
          break;
        }
        case 'overwrite': {
          state.showOverwriteModal = true;
          break;
        }
        case 'title': {
          state.showTitleModal = true;
          break;
        }
        case 'switch': {
          state.showSwitchModal = true;
          break;
        }
        default:
          return state;
      }
      return state;
    },
    hideModal(state, action: PayloadAction<ModalTypes>) {
      switch (action.payload) {
        case 'delete': {
          state.showDeleteModal = false;
          break;
        }
        case 'discardNew': {
          state.showDiscardNewModal = false;
          break;
        }
        case 'discardSaved': {
          state.showDiscardSavedModal = false;
          break;
        }
        case 'overwrite': {
          state.showOverwriteModal = false;
          break;
        }
        case 'title': {
          state.showTitleModal = false;
          break;
        }
        case 'switch': {
          state.showSwitchModal = false;
          break;
        }
        default:
          return state;
      }
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
- **Hide/show a message to the user**, multiple boolean values were created that, if active, will display a certian modal (deleting, saving, overwriting, etc.), giving them the option to cancel/confirm the action. The show method for the modal ensures that every modal display boolean value is set to false, except the one that is passed into the payload. The hide action will set the payload's target to false, hiding the modal.

#### Redux Dispatch Functions

Instead of calling the dispatch function in the components and passing down the payload information directly, functions that return another function that will call the store's dispatch with the arguments provided were created. I did this because it was easier to understand what dispatch was doing based on the name of the function, and it made the components more readable.

Example of three of these functions below:

```typescript
// On page load, intialize the context with the welcome markdown content, set the title as well
export const initializeWelcomeMarkdown = () => {
  return (dispatch: AppDispatch) => {
    const welcomeMarkdown: DocumentContext = {
      document: {
        originalDocumentTitle: 'welcome.md',
        currentDocumentTitle: 'welcome.md',
        documentMarkdown: welcomeMarkdownText,
        isNewDocument: true,
      },
      showDeleteModal: false,
      showDiscardNewModal: false,
      showDiscardSavedModal: false,
      showOverwriteModal: false,
      showTitleModal: false,
      showSwitchModal: false,
      targetSwitch: null,
    };
    dispatch(setMarkdownInformation(welcomeMarkdown));
  };
};

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
      showDeleteModal: false,
      showDiscardNewModal: false,
      showDiscardSavedModal: false,
      showOverwriteModal: false,
      showTitleModal: false,
      showSwitchModal: false,
      targetSwitch: null,
    };
    dispatch(setMarkdownInformation(document));
  };
};
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
      showDeleteModal: false,
      showDiscardNewModal: false,
      showDiscardSavedModal: false,
      showOverwriteModal: false,
      showTitleModal: false,
      showSwitchModal: false,
      targetSwitch: null,
    };
    dispatch(setMarkdownInformation(newMarkdown));
  };
};
```

### Application Logic & Structure

With Redux now implemented, the next step was to use these actions together to create the application structure and logic flow.

#### Initializing The Page

When the page loads, the application should display a _welcome_ markdown document. This document is created by calling the dispatch function with the `initalizeWelcomeMarkdown` function which creates a document object with the welcome markdown content, and sets the title of the document. This function is called in the `App.tsx` file, which is the main entry point of the application. This is done in a `useEffect` hook that is only called once, when the page loads. This hook also checks to user's theme preferences and sets the color theme accordingly.

The `App.tsx` component can be seen below:

```typescript
function App() {
  const [showMenu, setShowMenu] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const dispatch = useAppDispatch();
  const {
    showTitleModal,
    showDeleteModal,
    showDiscardNewModal,
    showDiscardSavedModal,
    showOverwriteModal,
    showSwitchModal,
    targetSwitch,
    document,
  } = useAppSelector((state) => state);
  useEffect(() => {
    dispatch(initializeWelcomeMarkdown());
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme('dark');
    } else setTheme('light');
  }, []);
    ...
}
```

#### Saving a Document

When a user saves a document, the application must ensure the following:

- The document title is valid
- The document title does not already exist

In the `TopBar.tsx` component, the `saveDocument` function is responsible for validating document titles, confirming that documents are new, and confirming if a document needs to be overwritten. Implementation of that function can be seen below:

```typescript
const TopBar = ({ showMenu, setShowMenu }: TopBarProps) => {
  const [disableAction, setDisableAction] = useState(false);
  const { document } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!document) setDisableAction(true);
    else setDisableAction(false);
  }, [document]);

  const saveDocument = () => {
    const savedDocuments = localStorage.getItem('savedMarkdown');
    const validDocumentTitle = /^[-\w^&'@{}[\],$=!#()%+~]+\.md$/;
    if (!document) return;

    if (!validDocumentTitle.test(document.currentDocumentTitle)) {
      dispatch(displayModal('title'));
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
        dispatch(displayModal('overwrite'));
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
          dispatch(displayModal('overwrite'));
        }
      }
    }
  };

  ...

}
```

The `saveDocument` function works as follows:

1. The function grabs all saved documents from local storage, if somehow there is no current document (users can go into the local storage and erase the data), then the function returns.
2. The current document title is then verified using a regex, if invalid, then the `displayModal` function is called with the "title" argument, which is passed into the dispatch function to display the _invalid title_ modal to the user. The function then returns.
3. Next the function checks if there are any documents in the local storge, if none exist, then it is safe to assume that there is no document with the same title as the current one, so the markdown information is stringified and set as the local storage data, a date property is also inserted into the object to keep track of when the document was last saved (more on this later).

   - After this, the dispatch function is passed the result of `saveDocumentInformation` which will update the redux store with the current document information, which sets the original title to the current title, and sets the `newDocument` property to false. Finally, the `window` object fires a storage event, which will ensure that the left-side bar will populate the document list with the latest saved document infomration.

4. If documents exist in local storage and the current document is new, then we check to see if the current document title already exists in the local storage. If it does, then the `displayModal` function is called with the "overwrite" argument, which is passed into the dispatch function to display the _overwrite_ modal to the user (modal logic will be explained later).

   - If the title does not exist, then the current document is added to the local storage data, and the dispatch function is passed the result of `saveDocumentInformation` which will update the redux store with the current document information. Finally, the `window` object fires a storage event, which will ensure that the left-side bar will populate the document list with the latest saved document.

5. If documents exists in local storage and the current document is not new, then we check to see if the current document title is the same as the original document title. If it is, then we can safely assume that the user is saving the document with the same title, so we can just overwrite the local storage data with the current document information, and the dispatch function is passed the result of `saveDocumentInformation` which will update the redux store with the current document information. Finally, the `window` object fires a storage event, which updates the left side bar with the latest saved document information.

   - If the current document doesnt exist in local storage then just add it to the local storage data, else if the document exists that means the markdown document needs to be overwritten and the _ovewrite_ modal will be displayed.

If the document needs to be overwritten, the function which executes this action is in `App.tsx`:

```typescript
const confirmOverwrite = () => {
  if (!document) return;
  const isNewDocument = document.isNewDocument;
  const savedMarkdown = localStorage.getItem('savedMarkdown');
  if (!savedMarkdown) return;
  const savedMarkdownObject = JSON.parse(savedMarkdown) as SavedDocument;

  if (isNewDocument) {
    savedMarkdownObject[document.currentDocumentTitle].documentMarkdown =
      document.documentMarkdown;
    savedMarkdownObject[document.currentDocumentTitle].date = createSaveDate(
      new Date()
    );
    dispatch(saveDocumentInformation());
  } else {
    delete savedMarkdownObject[document.originalDocumentTitle];
    savedMarkdownObject[document.currentDocumentTitle].documentMarkdown =
      document.documentMarkdown;
    savedMarkdownObject[document.currentDocumentTitle].documentMarkdown =
      createSaveDate(new Date());
    dispatch(saveDocumentInformation());
  }

  localStorage.setItem('savedMarkdown', JSON.stringify(savedMarkdownObject));
  dispatch(removeModal('overwrite'));
  window.dispatchEvent(new Event('storage'));
};
```

If the overwrite occurs with a new document, then the function will grab the current document title and markdown information, and update the local storage data with the new information and fire the dispatch to update the redux store. If not a new document, that means we the currnet document had its title changed, so the document with teh original title is deleted from the local storage and the current document information is added to the local storage data. 


#### Deleting a Document

The logic for deleting a document exists in `App.tsx`, but the function to display the modal to fire the action to delete the document lives in the `TopBar.tsx` component.

In `TopBar.tsx`:

```typescript
<DocOptions>
  <DeleteButton
    disabled={disableAction}
    onClick={() => dispatch(displayModal('delete'))}
  >
    <img src={deleteIcon} alt="Click to delete the document" />
  </DeleteButton>
  <SaveButton
    disabled={disableAction}
    data-cy="saveDocumentButton"
    onClick={() => saveDocument()}
  >
    <div>
      <img src={saveIcon} alt="Save the document" />
    </div>
    <p>save changes</p>
  </SaveButton>
</DocOptions>
```

In the code block above, when a user clicks the delete button, the dispatch function is called with the result of `displayModal` passed the 'delete' argument to display the _delete_ modal.

The user is shown the modal, and can cancel or confirm the action.

In `App.tsx`:

```typescript
const confirmDelete = () => {
  if (!document) return;

  if (document.isNewDocument) {
    dispatch(deleteDocument());
    return;
  }

  const savedDocuments = localStorage.getItem('savedMarkdown');
  if (!savedDocuments) {
    dispatch(removeModal('delete'));
    dispatch(deleteDocument());
    setShowMenu(false);
    return;
  }
  const savedDocumentsObject = JSON.parse(savedDocuments) as SavedDocument;
  delete savedDocumentsObject[document.originalDocumentTitle];
  localStorage.setItem('savedMarkdown', JSON.stringify(savedDocumentsObject));

  dispatch(removeModal('delete'));
  dispatch(deleteDocument());
  window.dispatchEvent(new Event('storage'));
};
```

In the `confirmDelete` function above, the following occurs:

1. If there is no document present, just return to avoid errors.
2. Grab all documents in local storage, and if there are no documents, then just delete the document from the redux store.
3. If documents exists in local storage, delete the object with the title name, and set local storage to a new object which no longer has the current document information.
4. Finally, the dispatch to remove the modal is fired, the document is removed from the Redux store, and the `window` object fires a storage event which ensures the document list reflects this change.

#### Creating a new Document

The `Menu.tsx` component contains the function to display the modal to create a new document, depending on if the current document is _new_ or not, a variant of this modal will be shown. `App.tsx` contains the function to clear the modal and set a new document in the Redux store.

In `Menu.tsx`:

```typescript
const Menu = ({ showMenu, setTheme, theme }: MenuProps) => {
  const { document } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const newDocumentToggle = () => {
    if (!document) dispatch(setNewDocument());
    else if (document.isNewDocument) dispatch(displayModal('discardNew'));
    else dispatch(displayModal('discardSaved'));
  };
  return (
    <MenuStyled menuVisible={showMenu}>
      <MenuLogo>
        <img src={MarkdownLogo} alt="Markdown logo" />
      </MenuLogo>
      <MenuTitle>my documents</MenuTitle>
      <MenuDocButton onClick={newDocumentToggle} data-cy="newDocumentButton">
        + new document
      </MenuDocButton>

      <DocumentList />
      <ThemeToggle setTheme={setTheme} theme={theme} />
    </MenuStyled>
  );
};
```

The `newDocumentToggle` function executes the following:

1. If there is no document currently store, call the dispatch function with the results of `setNewDocument` which will set a new document in the redux store.
2. If there is a document, and the document is new, then call the dispatch function with the results of `displayModal` which will display the _discard new_ modal to the user.
3. If there is a document, and the document is not new, then call the dispatch function with the results of `displayModal` which will display the _discard saved_ modal to the user.

The only difference between the two modals is that one indicates to the user that any un-saved changes will be lost, and the other indicates that the new document will be discarded.

In `App.tsx`

```typescript
const confirmDiscard = () => {
  dispatch(setNewDocument());
  setShowMenu(false);
};
```

The function above sets the redux store to a new document, and sets a boolean to false to hide the menu.

#### Switching Documents

Each `DocumentListItem.tsx` component contains the function `switchDocument` which when fired, will set the target document in the redux store. The `DocumentList.tsx` component grabs all documents from local storage and maps over them to render each instance of `DocumentListItem.tsx`.

In `DocumentListItem.tsx`:

```typescript
const DocumentListItem = ({
  documentDate,
  documentTitle,
}: DocumentListItemProps) => {
  const dispatch = useAppDispatch();
  const { document } = useAppSelector((state) => state);
  const switchDocument = () => {
    const savedMarkdown = localStorage.getItem('savedMarkdown');
    if (!savedMarkdown) {
      return;
    }

    if (!document) {
      const savedMarkdownObject = JSON.parse(savedMarkdown) as SavedDocument;
      if (!savedMarkdownObject[documentTitle]) {
        return;
      }

      dispatch(
        changeDocument(
          documentTitle,
          savedMarkdownObject[documentTitle].documentMarkdown
        )
      );
      return;
    } else {
      dispatch(applyTargetDoc(documentTitle));
      dispatch(displayModal('switch'));
    }
  };

  return (
    <DocumentListItemStyled tabIndex={0} onClick={switchDocument}>
      <div>
        <img src={fileIcon} alt="file icon" />
      </div>
      <ListItemInfo>
        <p>{documentDate}</p>
        <h4>{documentTitle}</h4>
      </ListItemInfo>
    </DocumentListItemStyled>
  );
};
```

The `switchDocument` function executes the following:

1. Grabs all documents in local storage
2. If no documents exists, return to avoid errors.
3. If there is no document in the redux store and the target document does exist in local storage, call the dispatch function with `changeDocument` which takes in the target document title and the markdown to render.
   - If a document currently exists in the store, the user will be notified that any unsaved changes will be lost on the switch by calling `DisplayModal` with the `switch` variant in the dispatch function. `App.tsx` contains the function to confirm or discard the switch.

In `DocumentList.tsx`:

```typescript
const DocumentList = () => {
  const [docList, setDocList] = useState<SavedDocument>({});

  useEffect(() => {
    const checkLocalStorage = () => {
      const savedMarkdown = localStorage.getItem('savedMarkdown');
      if (savedMarkdown) {
        const savedMarkdownObject = JSON.parse(savedMarkdown) as SavedDocument;
        setDocList(savedMarkdownObject);
      }
    };

    checkLocalStorage();

    window.addEventListener('storage', checkLocalStorage);

    return () => {
      window.removeEventListener('storage', checkLocalStorage);
    };
  }, []);

  if (Object.keys(docList).length === 0)
    return (
      <div>
        <p>No Documents</p>
      </div>
    );

  return (
    <DocumentListStyled data-cy="documentList">
      {Object.keys(docList).map((doc) => (
        <DocumentListItem
          key={doc}
          documentDate={docList[doc].date}
          documentTitle={doc}
        />
      ))}
    </DocumentListStyled>
  );
};
```

In the component above, a `useEffect` hook is used to extract document information from local storage, parse it into a format that can be used by the state, and apply document list to the state. The `useEffect` hook also adds an event listener to the window object to listen for changes to local storage. If a change is detected, the `checkLocalStorage` function is called again to update the state with the new document list.

#### Editing Markdown.

The `MarkdownTextArea.tsx` component contains the `textarea` where users can edit markdown and fires the dispatch function to update the Redux store with the new markdown. The component can be seen below:

```typescript
const MarkdownTextArea = ({ adjustPreview }: MarkdownTextAreaProps) => {
  const documentState = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <MarkdownTextAreaStyled>
      <div>
        <h1>markdown</h1>
        <button onClick={adjustPreview} aria-label="toggle fullscreen preview">
          <img src={showPreviewIcon} alt="" />
        </button>
      </div>
      <div>
        <textarea
          data-cy="markdownTextArea"
          value={documentState.document?.documentMarkdown || ''}
          onChange={(e) => dispatch(updateMarkdown(e.target.value))}
          onBlur={(e) => dispatch(updateMarkdown(e.target.value))}
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
              dispatch(updateMarkdown(textArea.value));
            }
          }}
        />
      </div>
    </MarkdownTextAreaStyled>
  );
};
```

One tricky part of editing the document was inserting a _tab_ character when the user presses the tab key. By default, when a user tabs in a text-area, the keyboard navigates to the next tab target. To insert a tab character, a `keyDown` event was required that did the following:

1. Extract the text area from the event target and ensure that it is an HTMLTextAreaElement (Typescript check).
2. If the key pressed is the tab key, prevent the default action of leaving the `textarea`.
3. Grab the start and end of the selection in the text area, then insert three spaces at the start position, and concat the rest of the string after the end position.
4. Set the selection start and end to the start position plus 3 (the length of the tab character) to position cursor in its new position.
5. Dispatch the `updateMarkdown` action with the new markdown string.

#### Preview Markdown

The `PreviewTextArea.tsx` component extracts the document markdown from the Redux store and uses _marked_ to parse the markdown into HTML. The component can be seen below:

```typescript
const PreviewTextArea = ({
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

The prop `fullPreview` will display the preview area as full screen if true, else it will share the screen with the markdown editor component. The `dangerouslySetInnerHTML` prop is used to render the HTML string returned from the `marked` function. The `DOMPurify` library is used to sanitize the HTML string to prevent XSS attacks. Since each store change renders the component, the variable `html` will be constantly updated with the new markdown.

## Conclusion

Overall this was a fun project to work on. I felt that I was able to get a good grasp on Redux fundamentals, discover a new way to render markdown on a web page, and work on a project that was more complex than previous projects I have worked on.

Some things I look to improve include:

1. Simplying logic, I feel that I put too many important functions in `App.tsx`, using Redux there must be a better way to organize these fucntions.
2. Implement unit test that would have helped me solve some of the bugs I encountered in specific components.
3. Migrate from local storage to `IndexedDB` for offline storage, and eventually add support for authentication so users can save their documents to a database to be accessed anywhere.

If you find any issues or have suggestions, please feel free to open an issue or pull request!
