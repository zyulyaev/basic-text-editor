import { NextRouter } from 'next/router'

export async function pushNotePage (router: NextRouter, noteId: string): Promise<void> {
  await router.push('/[id]', `/${noteId}`)
}
