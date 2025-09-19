import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Chatbot, Landing, Login, User, Home, Market, CropRecommend, Farm, DiseaseDetection, Alerts, Community, Tracker, Crops} from './components/index.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Signup from './components/pages/Signup.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {path: '', element: <Landing />},
      {path: 'login', element: <Login />},
      {path: 'signup', element: <Signup />},
      {
        path: 'user/:userId',
        element: <User />,
        children: [
          {path: 'home', element: <Home />},
          {path: 'chatbot', element: <Chatbot />},
          {path: 'market', element: <Market />},
          {path: 'crop-recommend', element: <CropRecommend />},
          {path: 'disease-detection', element: <DiseaseDetection />},
          {path: 'farm', element: <Farm />, 
          children: [ 
            {path: '', element: <Crops />},
            {path: ':cropname', element: <Tracker />} 
          ]
          },
          {path: 'alerts', element: <Alerts />},
          {path: 'community', element: <Community />}
        ]
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
