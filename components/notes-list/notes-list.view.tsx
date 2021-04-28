import { PlusCircleOutlined } from '@ant-design/icons'
import { Menu, Spin } from 'antd'
import React from 'react'

export type Note = {
  label: string | null
}

export type NotesListProps<T extends Note> = {
  notes: T[]
  extractKey: (note: T, index: number) => string
  activeNoteKey?: string | null
  loading: boolean
  newNoteCreating: boolean

  onNewNoteClick?: () => void
  onNoteClick?: (note: T, index: number) => void
}

export function NotesListView<T extends Note> (
  {
    notes,
    activeNoteKey,
    extractKey,
    loading,
    newNoteCreating,
    onNewNoteClick,
    onNoteClick
  }: NotesListProps<T>
): React.ReactElement {
  return (
    <Menu
      mode='vertical'
      theme='dark'
      selectedKeys={activeNoteKey == null ? [] : [activeNoteKey]}
    >
      <Menu.Item
        onClick={onNewNoteClick}
        disabled={newNoteCreating}
        icon={<PlusCircleOutlined />}
      >
        New note...
      </Menu.Item>
      {notes.map((note, index) => (
        <Menu.Item
          key={extractKey(note, index)}
          onClick={() => {
            onNoteClick?.(note, index)
          }}
        >
          {note.label ?? 'Untitled'}
        </Menu.Item>
      ))}
      {loading ? (
        <Spin />
      ) : null}
    </Menu>
  )

}
