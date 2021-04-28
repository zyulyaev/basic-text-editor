import { Space } from 'antd'
import { CompositeDecorator, convertFromRaw, DraftHandleValue, Editor, EditorState, RichUtils } from 'draft-js'
import React, { useCallback, useRef } from 'react'
import { getEditorState } from '../../store/selectors'
import { useDispatch, useSelector } from '../../store/use-store'
import { BlockStyleControls } from '../block-style-controls'
import { InlineStyleControls } from '../inline-style-controls'
import { LinkControl } from '../link-control'
import { linkDecorator } from '../link-decorator'
import css from './basic-text-editor.module.scss'

// Trick to fix issue with NextJS https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/universal/editor.js
const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      text: '',
      key: 'foo',
      type: 'unstyled',
      entityRanges: [],
      depth: 0,
      inlineStyleRanges: []
    }
  ]
})

export function BasicTextEditor (): React.ReactElement {
  const editorState = useSelector(getEditorState) ?? EditorState.createWithContent(
    emptyContentState,
    new CompositeDecorator([
      linkDecorator
    ])
  )
  const dispatch = useDispatch()

  const setEditorStateAndStore = useCallback((editorState: EditorState): void => {
    dispatch({ type: 'update-editor-state', editorState })
  }, [dispatch])

  const handleKeyCommand = useCallback((command: string, editorState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState != null) {
      setEditorStateAndStore(newState)
      return 'handled'
    } else {
      return 'not-handled'
    }
  }, [setEditorStateAndStore])

  const editorRef = useRef<Editor>(null)

  const setStateAndFocus = useCallback((editorState: EditorState): void => {
    setEditorStateAndStore(editorState)
    setTimeout(() => editorRef.current?.focus(), 0)
  }, [setEditorStateAndStore])

  return (
    <div className={css.container}>
      <Space>
        <InlineStyleControls
          editorState={editorState}
          onChange={setStateAndFocus}
        />
        <LinkControl
          editorState={editorState}
          onChange={setStateAndFocus}
        />
        <BlockStyleControls
          editorState={editorState}
          onChange={setStateAndFocus}
        />
      </Space>
      <Editor
        ref={editorRef}
        editorKey='some-key'
        editorState={editorState}
        onChange={setEditorStateAndStore}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  )
}
