import firebase from '../firebase'
import { unsafeFirestoreConverter } from '../utils/unsafe-firestore-converter'

export type NoteContent = {
  content: any
}

export const noteContents = firebase.firestore()
  .collection('note-contents')
  .withConverter(unsafeFirestoreConverter<NoteContent>())

export async function storeNoteContent (noteId: string, content: any): Promise<void> {
  await noteContents.doc(noteId).set({ content })
}
