import { Input, Spin } from 'antd'
import React from 'react'
import { useDocument } from 'react-firebase-hooks/firestore'
import { Note, notes } from '../../collections/notes'
import { getActiveNoteId } from '../../store/selectors'
import { useSelector } from '../../store/use-store'

export function NoteLabelInput (): React.ReactElement {
  const activeNoteId = useSelector(getActiveNoteId)
  const doc = activeNoteId == null ? null : notes.doc(activeNoteId)
  const [note, loading] = useDocument<Note>(doc)
  if (doc == null) {
    return <></>
  }
  if (loading) {
    return <Spin />
  }
  return (
    <Input
      size='large'
      value={note?.data()?.label ?? 'Untitled'}
      onChange={(e) => doc.update('label', e.target.value)}
    />
  )
}
