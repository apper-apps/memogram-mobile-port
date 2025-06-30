import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import EventForm from '@/components/organisms/EventForm'
import ApperIcon from '@/components/ApperIcon'
import { eventsService } from '@/services/api/eventsService'

const CreateEventPage = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (formData) => {
    setLoading(true)
    
    try {
      const eventData = {
        ...formData,
        qrCode: `qr-${Date.now()}`,
        shareLink: `${window.location.origin}/event/${Date.now()}`,
        hostId: 'host-' + Date.now(),
        createdAt: new Date().toISOString(),
        mediaCount: 0
      }
      
      const newEvent = await eventsService.create(eventData)
      
      toast.success('Event created successfully! 🎉')
      navigate(`/event/${newEvent.Id}`)
      
    } catch (error) {
      toast.error('Failed to create event. Please try again.')
      console.error('Error creating event:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        className="text-center space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-16 h-16 bg-gradient-celebration rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="Sparkles" className="h-8 w-8 text-white" />
        </div>
        
        <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900">
          Create Your Event
        </h1>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Set up a beautiful gallery where your guests can share photos and videos from your special event.
        </p>
      </motion.div>

      {/* Form */}
      <motion.div
        className="card p-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <EventForm
          onSubmit={handleSubmit}
          loading={loading}
        />
      </motion.div>

      {/* Help Section */}
      <motion.div
        className="bg-gradient-soft rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
            <ApperIcon name="HelpCircle" className="h-5 w-5 text-primary-600" />
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Need Help Getting Started?
            </h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Choose a descriptive name that guests will recognize</li>
              <li>• Select a theme that matches your event style</li>
              <li>• Add password protection for private events</li>
              <li>• Include detailed location information for guests</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CreateEventPage