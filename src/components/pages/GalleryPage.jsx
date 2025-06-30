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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button
              onClick={() => navigate(`/event/${id}`)}
              variant="ghost"
              size="sm"
              icon="ArrowLeft"
            >
              Back to Event
            </Button>
          </div>
          
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-1">
            {event.name}
          </h1>
          
          <div className="flex items-center text-gray-600">
            <ApperIcon name="Images" className="h-4 w-4 mr-2" />
            <span>Complete Photo & Video Gallery</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => navigate(`/event/${id}`)}
            variant="secondary"
            icon="Eye"
          >
            Event Details
          </Button>
        </div>
      </motion.div>

      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <EventGallery 
          eventId={parseInt(id)}
          allowUploads={true}
        />
      </motion.div>
    </div>
  )
}

export default GalleryPage