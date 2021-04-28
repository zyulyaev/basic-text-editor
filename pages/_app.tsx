import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { Provider } from 'react-redux'
import { initStore } from '../store/init-store'

// TODO use tree-shaking
import 'antd/dist/antd.min.css'

export default function App({ Component, pageProps }: AppProps): React.ReactElement {
  const router = useRouter()
  const store = useMemo(() => initStore(router, pageProps.activeNoteId ?? null), [router])

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
