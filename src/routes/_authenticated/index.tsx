import { createFileRoute } from '@tanstack/react-router'
import Home from "../../pages/Home" 
export const Route = createFileRoute('/_authenticated/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Home/>
}
