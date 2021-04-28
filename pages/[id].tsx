import { Layout } from 'antd'

import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import React from 'react'
import { BasicTextEditor } from '../components/basic-text-editor'
import { NoteLabelInput } from '../components/note-label-input/note-label-input'
import { NotesList } from '../components/notes-list'
import css from './index.module.scss'

export default function NotePage (): React.ReactElement {
  return (
    <Layout className={css['root-layout']}>
      <Layout.Content className={css['root-content']}>
        <Layout>
          <Layout.Sider>
            <NotesList />
          </Layout.Sider>
          <Layout.Content className={css['note-content']}>
            <NoteLabelInput />
            <BasicTextEditor />
          </Layout.Content>
        </Layout>
      </Layout.Content>
    </Layout>
  )
}

export function getServerSideProps ({ params }: GetServerSidePropsContext): GetServerSidePropsResult<any> {
  return {
    props: {
      activeNoteId: params?.id ?? null
    }
  }
}
