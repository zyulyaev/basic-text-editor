import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import { Note, notes } from '../../collections/notes'
import { getActiveNoteId, isCreatingNewNote } from '../../store/selectors'
import { useDispatch, useSelector } from '../../store/use-store'
import { NotesListView } from './notes-list.view'

export function NotesList (): React.ReactElement {
  const [snapshot, loading] = useCollection<Note>(notes)
  const activeNoteId = useSelector(getActiveNoteId)
  const newNoteCreating = useSelector(isCreatingNewNote)
  const dispatch = useDispatch()

  return (
    <NotesListView
      notes={snapshot?.docs.map(note => ({
        id: note.id,
        label: note.data().label
      })) ?? []}
      activeNoteKey={activeNoteId}
      loading={loading}
      newNoteCreating={newNoteCreating}
      extractKey={item => item.id}
      onNoteClick={item => dispatch({ type: 'set-active-note', noteId: item.id })}
      onNewNoteClick={() => dispatch({ type: 'create-new-note' })}
    />
  )
}
