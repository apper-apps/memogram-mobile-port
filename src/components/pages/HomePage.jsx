import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const HomePage = () => {
  const navigate = useNavigate()

  const features = [
    {
      icon: 'QrCode',
      title: 'QR Code Access',
      description: 'Generate unique QR codes for instant guest access to your event gallery.'
    },
    {
      icon: 'Upload',
      title: 'Batch Upload',
      description: 'Upload multiple photos and videos at once with optional captions.'
    },
    {
      icon: 'Images',
      title: 'Centralized Gallery',
      description: 'All event media stored in one beautiful, easy-to-navigate gallery.'
    },
    {
      icon: 'Lock',
      title: 'Password Protection',
      description: 'Secure your events with optional password protection for privacy.'
    },
    {
      icon: 'Palette',
      title: 'Custom Themes',
      description: 'Choose from beautiful themes to match your event style perfectly.'
    },
    {
      icon: 'Download',
      title: 'Easy Download',
      description: 'Download individual photos or entire albums with one click.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <motion.section
        className="text-center space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="space-y-4">
          <motion.h1
            className="text-4xl md:text-6xl font-display font-bold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Capture Every{' '}
            <span className="gradient-text">Memory</span>
          </motion.h1>
          
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Create beautiful event galleries where your guests can easily share photos and videos. 
            Perfect for weddings, parties, and special celebrations.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Button
            onClick={() => navigate('/create')}
            size="lg"
            icon="Plus"
            className="min-w-48"
          >
            Create Your Event
          </Button>
          
          <Button
            onClick={() => navigate('/my-events')}
            variant="secondary"
            size="lg"
            icon="Calendar"
            className="min-w-48"
          >
            View My Events
          </Button>
        </motion.div>
      </motion.section>

      {/* Features Grid */}
      <motion.section
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="text-center space-y-4"
          variants={itemVariants}
        >
          <h2 className="text-3xl font-display font-bold text-gray-900">
            Everything You Need
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make sharing event memories effortless and beautiful.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="card p-6 text-center group hover:shadow-celebration"
              variants={itemVariants}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-16 h-16 bg-gradient-soft rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <ApperIcon 
                  name={feature.icon} 
                  className="h-8 w-8 text-primary-600" 
                />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="bg-gradient-celebration rounded-2xl p-8 md:p-12 text-center text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Ready to Create Your Event?
          </h2>
          
          <p className="text-xl text-white/90 leading-relaxed">
            Join thousands of event hosts who trust Memogram to capture and share their special moments.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={() => navigate('/create')}
              variant="secondary"
              size="lg"
              icon="Sparkles"
              className="bg-white text-primary-600 hover:bg-gray-50 min-w-48"
            >
              Start Creating
            </Button>
            
            <Button
              onClick={() => navigate('/my-events')}
              variant="ghost"
              size="lg"
              icon="ArrowRight"
              className="text-white hover:bg-white/20 min-w-48"
            >
              Browse Events
            </Button>
          </div>
        </div>
      </motion.section>
    </div>
  )
}

export default HomePage