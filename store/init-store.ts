import createSagaMiddleware from '@redux-saga/core'
import { NextRouter } from 'next/router'
import { applyMiddleware, createStore, Store } from 'redux'
import { reducer } from './reducer'
import { rootSaga } from './sagas'
import { initialState } from './state'

export function initStore (router: NextRouter, activeNoteId: string | null): Store {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducer, {
    ...initialState,
    activeNoteId
  }, applyMiddleware(sagaMiddleware))
  sagaMiddleware.run(rootSaga, router)
  return store
}
