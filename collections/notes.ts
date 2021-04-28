import firebase from '../firebase'
import { unsafeFirestoreConverter } from '../utils/unsafe-firestore-converter'

export type Note = {
  label: string
}

export const notes = firebase.firestore()
  .collection('notes')
  .withConverter(unsafeFirestoreConverter<Note>())
