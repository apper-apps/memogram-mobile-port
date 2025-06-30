import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import QRCodeDisplay from '@/components/molecules/QRCodeDisplay'
import MediaUploadZone from '@/components/molecules/MediaUploadZone'
import MediaGrid from '@/components/molecules/MediaGrid'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import ApperIcon from '@/components/ApperIcon'
import { eventsService } from '@/services/api/eventsService'
import { mediaService } from '@/services/api/mediaService'

const EventPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [event, setEvent] = useState(null)
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [mediaLoading, setMediaLoading] = useState(true)
  const [error, setError] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const [passwordRequired, setPasswordRequired] = useState(false)
  const [password, setPassword] = useState('')

  useEffect(() => {
    loadEvent()
    loadMedia()
  }, [id])

  const loadEvent = async () => {
    try {
      setLoading(true)
      setError('')
      const eventData = await eventsService.getById(parseInt(id))
      
      if (eventData.password && !passwordRequired) {
        setPasswordRequired(true)
        setLoading(false)
        return
      }
      
      setEvent(eventData)
    } catch (err) {
      setError('Event not found or access denied.')
    } finally {
      setLoading(false)
    }
  }

  const loadMedia = async () => {
    try {
      setMediaLoading(true)
      const mediaData = await mediaService.getByEventId(parseInt(id))
      setMedia(mediaData)
    } catch (err) {
      console.error('Failed to load media:', err)
    } finally {
      setMediaLoading(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    
    if (!password.trim()) {
      toast.error('Please enter the event password')
      return
    }

    try {
      const eventData = await eventsService.getById(parseInt(id))
      
      if (eventData.password === password) {
        setEvent(eventData)
        setPasswordRequired(false)
        toast.success('Access granted!')
      } else {
        toast.error('Incorrect password. Please try again.')
      }
    } catch (err) {
      toast.error('Failed to verify password')
    }
  }

  const handleUploadComplete = (newMedia) => {
    setMedia(prev => [...newMedia, ...prev])
    setShowUpload(false)
    toast.success('Photos uploaded successfully! 📸')
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'EEEE, MMMM dd, yyyy')
    } catch {
      return 'Invalid Date'
    }
  }

  const getRecentMedia = () => {
    return media.slice(0, 8) // Show only first 8 items
  }

  if (loading) {
    return <Loading message="Loading event details..." />
  }

  if (error) {
    return (
      <Error
        title="Event Not Found"
        message={error}
        onRetry={loadEvent}
      />
    )
  }

  // Password Protection Screen
  if (passwordRequired) {
    return (
      <div className="max-w-md mx-auto mt-16">
        <motion.div
          className="card p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ApperIcon name="Lock" className="h-8 w-8 text-primary-600" />
          </div>
          
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Password Protected Event
          </h2>
          
          <p className="text-gray-600 mb-6">
            This event is private. Please enter the password to continue.
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <input
              type="password"
              placeholder="Enter event password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field text-center"
              autoFocus
            />
            
            <Button type="submit" className="w-full" icon="Unlock">
              Access Event
            </Button>
          </form>
        </motion.div>
      </div>
    )
  }

  if (!event) return null

  return (
    <div className="space-y-8">
      {/* Event Header */}
      <motion.div
        className="card p-8 bg-gradient-to-r from-primary-50 to-secondary-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Badge variant="primary">
                {event.theme || 'Wedding'}
              </Badge>
              {event.password && (
                <Badge variant="secondary" icon="Lock">
                  Private
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-3">
              {event.name}
            </h1>
            
            <div className="space-y-2 text-gray-600">
              <div className="flex items-center">
                <ApperIcon name="Calendar" className="h-5 w-5 mr-3" />
                {formatDate(event.date)}
              </div>
              
              {event.location && (
                <div className="flex items-center">
                  <ApperIcon name="MapPin" className="h-5 w-5 mr-3" />
                  {event.location}
                </div>
              )}
              
              <div className="flex items-center">
                <ApperIcon name="Images" className="h-5 w-5 mr-3" />
                {media.length} photos & videos shared
              </div>
            </div>

            {event.description && (
              <p className="text-gray-700 mt-4 leading-relaxed">
                {event.description}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => setShowUpload(!showUpload)}
              icon={showUpload ? "Eye" : "Upload"}
              size="lg"
            >
              {showUpload ? "View Gallery" : "Upload Photos"}
            </Button>
            
            <Button
              onClick={() => navigate(`/event/${id}/gallery`)}
              variant="secondary"
              icon="Images"
              size="lg"
            >
              Full Gallery
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {showUpload ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <MediaUploadZone
                eventId={parseInt(id)}
                onUploadComplete={handleUploadComplete}
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Recent Uploads
                </h2>
                
                {media.length > 8 && (
                  <Button
                    onClick={() => navigate(`/event/${id}/gallery`)}
                    variant="ghost"
                    icon="ArrowRight"
                  >
                    View All ({media.length})
                  </Button>
                )}
              </div>

              <MediaGrid 
                media={getRecentMedia()} 
                loading={mediaLoading}
              />

              {media.length === 0 && !mediaLoading && (
                <div className="text-center py-12 bg-gray-50 rounded-xl">
                  <ApperIcon name="ImagePlus" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No photos uploaded yet
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Be the first to share memories from this event!
                  </p>
                  <Button
                    onClick={() => setShowUpload(true)}
                    icon="Upload"
                  >
                    Upload First Photo
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <QRCodeDisplay event={event} />
          </motion.div>

          {/* Event Stats */}
          <motion.div
            className="card p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
              <ApperIcon name="BarChart3" className="h-5 w-5 mr-2" />
              Event Stats
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Media</span>
                <span className="font-semibold text-gray-900">{media.length}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Photos</span>
                <span className="font-semibold text-gray-900">
                  {media.filter(m => m.type === 'photo').length}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Videos</span>
                <span className="font-semibold text-gray-900">
                  {media.filter(m => m.type === 'video').length}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Contributors</span>
                <span className="font-semibold text-gray-900">
                  {new Set(media.map(m => m.uploaderName)).size}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default EventPage