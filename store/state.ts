import { EditorState } from 'draft-js'

export type State = {
  activeNoteId: string | null
  creatingNewNote: boolean
  editorState: EditorState | null
}

export const initialState: State = {
  activeNoteId: null,
  creatingNewNote: false,
  editorState: null
}
