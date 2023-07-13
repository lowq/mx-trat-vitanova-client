import App from './App.tsx'
import './index.css'
import { UserContextProvider } from './constans/userContext.tsx'
import ReactDOM from 'react-dom/client'
import {CookiesProvider} from 'react-cookie'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <CookiesProvider>
    <UserContextProvider>
        <App />
    </UserContextProvider>
  </CookiesProvider>
)