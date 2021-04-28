import { eventChannel, Task } from '@redux-saga/core'
import { call, cancel, fork, put, select, spawn, StrictEffect, take, takeEvery } from '@redux-saga/core/effects'
import { convertFromRaw, convertToRaw } from 'draft-js'
import firebase from 'firebase'
import { NextRouter } from 'next/router'
import { NoteContent, noteContents, storeNoteContent } from '../collections/note-contents'
import { Note, notes } from '../collections/notes'
import { pushNotePage } from '../utils/push-note-page'
import { CreateNewNoteAction, UpdateEditorStateAction } from './action'
import { getActiveNoteId } from './selectors'

function* createNewNote (
  _action: CreateNewNoteAction
): Generator<StrictEffect, void, firebase.firestore.DocumentReference<Note>> {
  yield put({ type: 'new-note-creation-started' })
  try {
    const note = yield call(() => notes.add({ label: 'Untitled' }))
    yield put({ type: 'new-note-created' })
    yield put({ type: 'set-active-note', noteId: note.id })
  } catch (e) {
    yield put({ type: 'new-note-creation-failed', message: e.message })
  }
}

function* updateEditorState (
  { editorState }: UpdateEditorStateAction
): Generator<StrictEffect, void, string> {
  const noteId = yield select(getActiveNoteId)
  try {
    yield call(storeNoteContent, noteId, convertToRaw(editorState.getCurrentContent()))
  } catch (e) {
    console.error('Failed to store note content', e)
  }
}

type NoteContentSnapshot = firebase.firestore.DocumentSnapshot<NoteContent>

function* watchNoteContentChanges (noteId: string): Generator<StrictEffect, void, NoteContentSnapshot> {
  const channel = eventChannel<NoteContentSnapshot>(
    emitter => noteContents.doc(noteId).onSnapshot(emitter)
  )
  try {
    while (true) {
      const snapshot = yield take(channel)
      const snapshotContent = snapshot.data()?.content
      if (snapshotContent != null) {
        yield put({ type: 'update-editor-content-state', contentState: convertFromRaw(snapshotContent) })
      }
    }
  } finally {
    channel.close()
  }
}

function* watchActiveNoteChanges (router: NextRouter): Generator<StrictEffect, void, any> {
  const activeNoteId = yield select(getActiveNoteId)
  let bgTask: Task | null = activeNoteId == null ? null : yield fork(watchNoteContentChanges, activeNoteId)
  while (true) {
    const { noteId } = yield take('set-active-note')
    yield call(pushNotePage, router, noteId)
    if (bgTask != null) {
      yield cancel(bgTask)
    }
    bgTask = yield fork(watchNoteContentChanges, noteId)
  }
}

export function* rootSaga (router: NextRouter) {
  yield takeEvery('create-new-note', createNewNote)
  yield takeEvery('update-editor-state', updateEditorState)
  yield spawn(watchActiveNoteChanges, router)
}
