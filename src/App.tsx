import { createRouter, RouterProvider } from '@tanstack/react-router'
import { useState } from 'react'
import { routeTree } from './routeTree.gen';
import { UserAuth,  type AuthContextType } from './context/userAuthContext';

export interface RouterContext {
  auth: AuthContextType;
}
 const router = createRouter({
  routeTree,
  context: {} as RouterContext, 
});
// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
 
  const auth = UserAuth()
 
    return <RouterProvider router={router} context={{ auth }} />
 
}

export default App
