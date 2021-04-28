import type firebase  from 'firebase'

// better to use strict schema like io-ts/Codec or runtypes or superstruct, etc
export function unsafeFirestoreConverter<T = unknown>(): firebase.firestore.FirestoreDataConverter<T> {
  return {
    fromFirestore (snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): T {
      return snapshot.data(options) as T
    },
    toFirestore (modelObject: T): firebase.firestore.DocumentData {
      return modelObject
    }
  }
}
