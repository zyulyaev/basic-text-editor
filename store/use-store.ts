import { createDispatchHook, createSelectorHook } from 'react-redux'
import { Action } from './action'
import { State } from './state'

export const useSelector = createSelectorHook<State, Action>()
export const useDispatch = createDispatchHook<State, Action>()
