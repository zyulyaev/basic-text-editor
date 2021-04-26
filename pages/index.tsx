import { Layout } from 'antd'
import React from 'react'
import { BasicTextEditor } from '../components/basic-text-editor'
import css from './index.module.scss'

// TODO use tree-shaking
import 'antd/dist/antd.min.css'

const IndexPage = () => (
  <Layout className={css['root-layout']}>
    <Layout.Content className={css['root-content']}>
      <BasicTextEditor />
    </Layout.Content>
  </Layout>
)

export default IndexPage
