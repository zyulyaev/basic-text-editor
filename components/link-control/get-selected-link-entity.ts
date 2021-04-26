import { EditorState, EntityInstance } from 'draft-js'

export function getSelectedLinkEntity (editorState: EditorState): EntityInstance | null {
  const contentState = editorState.getCurrentContent()
  const startKey = editorState.getSelection().getStartKey()
  const startOffset = editorState.getSelection().getStartOffset()
  const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey)
  const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset)
  const entity = linkKey == null ? null : contentState.getEntity(linkKey)
  if (entity?.getType() === 'LINK') {
    return entity
  } else {
    return null
  }
}
