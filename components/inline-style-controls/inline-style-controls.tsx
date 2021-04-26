import { BoldOutlined, ItalicOutlined, StrikethroughOutlined, UnderlineOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { EditorState, RichUtils } from 'draft-js'
import React from 'react'
import { StyleButton } from '../style-button'

const INLINE_STYLES = [
  { render: () => <BoldOutlined />, style: 'BOLD' },
  { render: () => <ItalicOutlined />, style: 'ITALIC' },
  { render: () => <UnderlineOutlined />, style: 'UNDERLINE' },
  { render: () => <StrikethroughOutlined />, style: 'STRIKETHROUGH' }
]

export type InlineStyleControlsProps = {
  editorState: EditorState
  onChange: (state: EditorState) => void
}

export function InlineStyleControls (
  {
    editorState,
    onChange
  }: InlineStyleControlsProps
): React.ReactElement {
  const styles = editorState.getCurrentInlineStyle()
  return (
    <Button.Group>
      {INLINE_STYLES.map((type) =>
        <StyleButton
          key={type.style}
          active={styles.has(type.style)}
          onToggle={() => onChange(RichUtils.toggleInlineStyle(editorState, type.style))}
        >
          {type.render}
        </StyleButton>
      )}
    </Button.Group>
  )
}
