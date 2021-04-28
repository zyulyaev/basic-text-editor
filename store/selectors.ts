import { State } from './state'

export const getActiveNoteId = (state: State) => state.activeNoteId
export const isCreatingNewNote = (state: State) => state.creatingNewNote
export const getEditorState = (state: State) => state.editorState
