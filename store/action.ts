import { ContentState, EditorState } from 'draft-js'

export type SetActiveNoteAction = {
  type: 'set-active-note'
  noteId: string
}

export type UpdateEditorContentStateAction = {
  type: 'update-editor-content-state'
  contentState: ContentState
}

export type UpdateEditorStateAction = {
  type: 'update-editor-state'
  editorState: EditorState
}

export type NewNoteCreationStartedAction = {
  type: 'new-note-creation-started'
}

export type NewNoteCreationFailedAction = {
  type: 'new-note-creation-failed'
  message: string
}

export type CreateNewNoteAction = {
  type: 'create-new-note'
}

export type NewNoteCreatedAction = {
  type: 'new-note-created'
}

export type Action
  = SetActiveNoteAction
  | UpdateEditorStateAction
  | UpdateEditorContentStateAction
  | CreateNewNoteAction
  | NewNoteCreationStartedAction
  | NewNoteCreationFailedAction
  | NewNoteCreatedAction
