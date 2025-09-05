import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/myphotos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/myphotos"!</div>
}
