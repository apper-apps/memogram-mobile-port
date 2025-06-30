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
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Cinematic Header */}
      <motion.div
        className="text-center space-y-8 py-12"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="w-24 h-24 bg-gradient-artistic rounded-3xl flex items-center justify-center mx-auto shadow-glow floating-element"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        >
          <ApperIcon name="Sparkles" className="h-12 w-12 text-white" />
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-experimental font-bold gradient-text">
          Craft Your Vision
        </h1>
        
        <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
          Transform moments into cinematic experiences. Design a gallery where memories become art and stories unfold with visual elegance.
        </p>
      </motion.div>
{/* Artistic Form */}
      <motion.div
        className="cinematic-container p-12 relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-artistic opacity-10"></div>
        <div className="relative z-10">
          <EventForm
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </motion.div>
{/* Artistic Help Section */}
      <motion.div
        className="card p-10 relative overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-artistic opacity-5"></div>
        
        <div className="relative z-10 flex items-start space-x-6">
          <div className="w-16 h-16 bg-gradient-artistic rounded-3xl flex items-center justify-center flex-shrink-0 shadow-glow">
            <ApperIcon name="HelpCircle" className="h-8 w-8 text-white" />
          </div>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-display font-bold gradient-text">
              Artistic Guidance
            </h3>
            <ul className="text-lg text-white/80 space-y-3 font-light">
              <li>• Craft a name that resonates with your vision</li>
              <li>• Select themes that amplify your artistic narrative</li>
              <li>• Curate privacy settings for intimate experiences</li>
              <li>• Design location details that set the scene</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default CreateEventPage