import { LinkOutlined } from '@ant-design/icons'
import { Button, Col, Input, Modal, Row } from 'antd'
import { EditorState, RichUtils } from 'draft-js'
import React, { useCallback, useState } from 'react'
import { getSelectedLinkEntity } from './get-selected-link-entity'

type LinkControlProps = {
  editorState: EditorState
  onChange: (state: EditorState) => void
}

export function LinkControl (
  {
    editorState,
    onChange
  }: LinkControlProps
): React.ReactElement {
  const [modalVisible, setModalVisible] = useState(false)
  const [editedLink, setEditedLink] = useState<string>('')

  const handleClick = useCallback(() => {
    const selectedLink = getSelectedLinkEntity(editorState)
    setEditedLink(selectedLink?.getData().url ?? '')
    setModalVisible(true)
  }, [editorState])

  const handleSaveLink = useCallback(() => {
    const contentState = editorState.getCurrentContent()
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: editedLink }
    )
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey()
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity })
    onChange(RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    ))
    setModalVisible(false)
  }, [editorState, editedLink])

  const handleRemoveLink = useCallback(() => {
    onChange(RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      null
    ))
    setModalVisible(false)
  }, [editorState])

  return (
    <>
      <Button
        disabled={editorState.getSelection().isCollapsed()}
        onClick={handleClick}
      >
        <LinkOutlined />
      </Button>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        title='Enter link URL'
        footer={
          <Row gutter={16}>
            <Col><Button danger onClick={handleRemoveLink}>Remove</Button></Col>
            <Col flex='auto' />
            <Col><Button type='primary' onClick={handleSaveLink}>Save</Button></Col>
            <Col><Button onClick={() => setModalVisible(false)}>Cancel</Button></Col>
          </Row>
        }
      >
        <Input
          placeholder='Enter link URL here...'
          value={editedLink ?? ''}
          onChange={e => setEditedLink(e.target.value)}
          autoFocus
          onPressEnter={handleSaveLink}
        />
      </Modal>
    </>
  )
}
