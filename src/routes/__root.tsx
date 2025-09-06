import * as React from 'react'
import { Outlet, createRootRoute, createRootRouteWithContext } from '@tanstack/react-router'
import type { AuthContextData } from '../context/userAuthContext'


type RouterContext={
  auth:AuthContextData
}
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
