import { Button } from 'antd'
import React from 'react'

type StyleButtonProps = {
  active: boolean
  onToggle: () => void
  children?: () => React.ReactNode
}

export function StyleButton (
  {
    active,
    onToggle,
    children
  }: StyleButtonProps
): React.ReactElement {
  return (
    <Button
      type={active ? 'primary' : 'default'}
      onClick={onToggle}
    >
      {children?.()}
    </Button>
  )
}
