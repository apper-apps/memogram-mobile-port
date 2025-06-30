import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import EventGallery from '@/components/organisms/EventGallery'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { eventsService } from '@/services/api/eventsService'

const GalleryPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadEvent()
  }, [id])

  const loadEvent = async () => {
    try {
      setLoading(true)
      setError('')
      const eventData = await eventsService.getById(parseInt(id))
      setEvent(eventData)
    } catch (err) {
      setError('Event not found or access denied.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <Loading message="Loading event gallery..." />
  }

  if (error) {
    return (
      <Error
        title="Gallery Not Found"
        message={error}
        onRetry={loadEvent}
      />
    )
  }

  if (!event) return null

return (
    <div className="space-y-10">
      {/* Cinematic Header */}
      <motion.div
        className="cinematic-container p-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-artistic opacity-10"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate(`/event/${id}`)}
                variant="secondary"
                size="sm"
                icon="ArrowLeft"
                className="backdrop-blur-md"
              >
                Return to Event
              </Button>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-experimental font-bold gradient-text">
              {event.name}
            </h1>
            
            <div className="flex items-center text-white/70 text-lg">
              <ApperIcon name="Images" className="h-5 w-5 mr-3" />
              <span>Cinematic Gallery Experience</span>
            </div>
          </div>
<div className="flex items-center gap-4">
            <Button
              onClick={() => navigate(`/event/${id}`)}
              variant="primary"
              icon="Eye"
              className="shadow-glow"
            >
              Event Experience
            </Button>
          </div>
        </div>
      </motion.div>
{/* Artistic Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative"
      >
        <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-artistic opacity-5 rounded-3xl blur-xl"></div>
        <EventGallery 
          eventId={parseInt(id)}
          allowUploads={true}
        />
      </motion.div>
    </div>
  )
}

export default GalleryPage