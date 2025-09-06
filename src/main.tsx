import ReactDOM from 'react-dom/client'
import './index.css'
import { AuthContextProvider } from './context/userAuthContext'
import App from './App'



// Create a new router instance







// Render the app
const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  )
}