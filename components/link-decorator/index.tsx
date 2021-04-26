import { Popover } from 'antd'
import { ContentBlock, ContentState, DraftDecorator } from 'draft-js'
import React from 'react'

function findLinkEntities (
  block: ContentBlock,
  callback: (start: number, end: number) => void,
  contentState: ContentState
): void {
  block.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity()
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK'
    },
    callback
  )
}

type LinkProps = {
  entityKey: string
  contentState: ContentState
  children?: React.ReactNode
}

const Link = ({ contentState, entityKey, children }: LinkProps): React.ReactElement => {
  const { url } = contentState.getEntity(entityKey).getData()
  return (
    <Popover
      content={
        <a
          href={url}
          target='_blank'
        >
          {url}
        </a>
      }
    >
      <a href={url}>{children}</a>
    </Popover>
  )
}

export const linkDecorator: DraftDecorator = {
  strategy: findLinkEntities,
  component: Link
}
