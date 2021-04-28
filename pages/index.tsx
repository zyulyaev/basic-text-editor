import { Layout } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { NotesList } from '../components/notes-list'
import css from './index.module.scss'

export default function IndexPage (): React.ReactElement {
  const router = useRouter()
  return (
    <Layout className={css['root-layout']}>
      <Layout.Content className={css['root-content']}>
        <Layout>
          <Layout.Sider>
            <NotesList />
          </Layout.Sider>
        </Layout>
      </Layout.Content>
    </Layout>
  )
}
