import { OrderedListOutlined, UnorderedListOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { EditorState, RichUtils } from 'draft-js'
import React from 'react'
import { StyleButton } from '../style-button'

const BLOCK_TYPES = [
  { render: () => 'H1', style: 'header-one' },
  { render: () => 'H2', style: 'header-two' },
  { render: () => 'H3', style: 'header-three' },
  { render: () => 'H4', style: 'header-four' },
  { render: () => 'H5', style: 'header-five' },
  { render: () => 'H6', style: 'header-six' },
  { render: () => <UnorderedListOutlined />, style: 'unordered-list-item' },
  { render: () => <OrderedListOutlined />, style: 'ordered-list-item' }
]

type BlockStyleControlsProps = {
  editorState: EditorState
  onChange: (state: EditorState) => void
}

export function BlockStyleControls (
  {
    editorState,
    onChange
  }: BlockStyleControlsProps
): React.ReactElement {
  const selection = editorState.getSelection()
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType()

  return (
    <Button.Group>
      {BLOCK_TYPES.map((type) =>
        <StyleButton
          key={type.style}
          active={type.style === blockType}
          onToggle={() => onChange(RichUtils.toggleBlockType(editorState, type.style))}
        >
          {type.render}
        </StyleButton>
      )}
    </Button.Group>
  )
}
