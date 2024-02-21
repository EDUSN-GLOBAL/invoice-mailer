'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '#/store/store'
import {NextUIProvider} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
  }) {
  const router=useRouter()
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
    
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>   <NextUIProvider navigate={router.push} >{children}</NextUIProvider></Provider>
}