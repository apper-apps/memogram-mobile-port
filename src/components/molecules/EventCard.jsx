import { motion } from 'framer-motion'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import Badge from '@/components/atoms/Badge'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const EventCard = ({ event, showActions = true }) => {
  const navigate = useNavigate()

  const handleViewEvent = () => {
    navigate(`/event/${event.Id}`)
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy')
    } catch {
      return 'Invalid Date'
    }
  }

  return (
    <motion.div
      className="card overflow-hidden group"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header with gradient background */}
      <div className="h-32 bg-gradient-celebration relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center justify-between">
            <Badge variant="primary" size="sm">
              {event.theme || 'Wedding'}
            </Badge>
            {event.password && (
              <ApperIcon name="Lock" className="h-4 w-4 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {event.name}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center text-gray-500 text-sm">
            <ApperIcon name="Calendar" className="h-4 w-4 mr-2" />
            {formatDate(event.date)}
          </div>
          
          {event.location && (
            <div className="flex items-center text-gray-500 text-sm">
              <ApperIcon name="MapPin" className="h-4 w-4 mr-2" />
              <span className="truncate">{event.location}</span>
            </div>
          )}
          
          <div className="flex items-center text-gray-500 text-sm">
            <ApperIcon name="Images" className="h-4 w-4 mr-2" />
            {event.mediaCount || 0} photos & videos
          </div>
        </div>

        {showActions && (
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleViewEvent}
              variant="primary"
              size="sm"
              className="flex-1"
              icon="Eye"
            >
              View Event
            </Button>
            <Button
              onClick={() => navigate(`/event/${event.Id}/gallery`)}
              variant="secondary"
              size="sm"
              icon="Images"
            >
              Gallery
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default EventCard