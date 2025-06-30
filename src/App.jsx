import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import HomePage from '@/components/pages/HomePage'
import CreateEventPage from '@/components/pages/CreateEventPage'
import EventPage from '@/components/pages/EventPage'
import MyEventsPage from '@/components/pages/MyEventsPage'
import GalleryPage from '@/components/pages/GalleryPage'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateEventPage />} />
          <Route path="/my-events" element={<MyEventsPage />} />
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/event/:id/gallery" element={<GalleryPage />} />
        </Routes>
      </Layout>
      
<ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastStyle={{
          background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          color: '#ffffff',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(168, 85, 247, 0.1)',
          backdropFilter: 'blur(12px)',
        }}
        style={{ zIndex: 9999 }}
      />
    </BrowserRouter>
  )
}

export default App