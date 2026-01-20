/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App'
import Frank from './components/Frank.tsx'
const routes = createRoutesFromElements(
  <>
    <Route index element={<App />} />
    <Route path="chat" element={<Frank />} />
  </>,
)

export default routes
