import { CompositeDecorator, EditorState } from 'draft-js'
import { linkDecorator } from '../components/link-decorator'
import { Action } from './action'
import { initialState, State } from './state'

export function reducer (state = initialState, action: Action): State {
  switch (action.type) {
    case 'new-note-creation-started':
      return {
        ...state,
        creatingNewNote: true
      }
    case 'new-note-creation-failed':
      console.error('Failed to create new note', action.message)
      return {
        ...state,
        creatingNewNote: false
      }
    case 'new-note-created':
      return {
        ...state,
        creatingNewNote: false
      }
    case 'set-active-note':
      return {
        ...state,
        activeNoteId: action.noteId,
        editorState: null
      }
    case 'update-editor-state':
      return {
        ...state,
        editorState: action.editorState
      }
    case 'update-editor-content-state': {
      const { editorState } = state
      return {
        ...state,
        editorState: editorState == null
          ? EditorState.createWithContent(action.contentState, new CompositeDecorator([
              linkDecorator
            ]))
          : EditorState.set(editorState, {
            currentContent: action.contentState
          })
      }
    }
    default:
      return state
  }
}

