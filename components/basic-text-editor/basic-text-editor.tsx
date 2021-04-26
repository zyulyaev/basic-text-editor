import { Space } from 'antd'
import { CompositeDecorator, convertFromRaw, DraftHandleValue, Editor, EditorState, RichUtils } from 'draft-js'
import React, { useCallback, useState } from 'react'
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
  const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createWithContent(
    emptyContentState,
    new CompositeDecorator([
      linkDecorator
    ])
  ))
  const handleKeyCommand = useCallback((command: string, editorState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState != null) {
      setEditorState(newState)
      return 'handled'
    } else {
      return 'not-handled'
    }
  }, [])

  return (
    <div className={css.container}>
      <Space>
        <InlineStyleControls
          editorState={editorState}
          onChange={setEditorState}
        />
        <LinkControl
          editorState={editorState}
          onChange={setEditorState}
        />
        <BlockStyleControls
          editorState={editorState}
          onChange={setEditorState}
        />
      </Space>
      <Editor
        editorKey='some-key'
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  )
}
