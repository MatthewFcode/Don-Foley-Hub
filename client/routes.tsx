/* eslint-disable react/jsx-key */
import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App'
import Frank from './components/Frank.tsx'
import CareerTimeline from './components/Timeline.tsx'
const routes = createRoutesFromElements(
  <>
    <Route index element={<App />} />
    <Route path="chat" element={<Frank />} />
    <Route path="timeline" element={<CareerTimeline />} />
  </>,
)

export default routes
