import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    const isLoggedIn = context.auth.user != null;

    console.log(isLoggedIn, 'Auth check//////////////',context.auth);

    if (!isLoggedIn) {
      throw redirect({
        to: '/login'
      });
    }
    else{
      <Outlet/>
    }
  },
}

);

