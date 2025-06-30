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
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-artistic rounded-full blur-3xl opacity-20 floating-element"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-celebration rounded-full blur-3xl opacity-15 floating-element" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative space-y-20">
        {/* Hero Section */}
        <motion.section
          className="text-center space-y-12 pt-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="space-y-8">
            <motion.div
              className="floating-element"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
            >
              <h1 className="artistic-heading">
                Craft Visual
                <br />
                <span className="block font-display italic transform -rotate-2">Stories</span>
              </h1>
            </motion.div>
            
            <motion.p
              className="text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
            >
              Transform your celebrations into cinematic experiences. 
              <span className="gradient-text font-semibold">Memogram</span> creates 
              immersive galleries where every moment becomes art.
            </motion.p>
</div>

          <motion.div
            className="flex flex-col lg:flex-row items-center justify-center gap-8 pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <Button
              onClick={() => navigate('/create')}
              size="lg"
              icon="Plus"
              className="min-w-64 text-xl py-6 shadow-glow"
            >
              Begin Your Story
            </Button>
            
            <Button
              onClick={() => navigate('/my-events')}
              variant="secondary"
              size="lg"
              icon="Calendar"
              className="min-w-64 text-xl py-6"
            >
              Explore Galleries
            </Button>
          </motion.div>
        </motion.section>
{/* Features Grid */}
        <motion.section
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="text-center space-y-6"
            variants={itemVariants}
          >
            <h2 className="text-5xl font-experimental font-bold gradient-text">
              Cinematic Capabilities
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto font-light">
              Each feature crafted with artistic precision to transform ordinary moments into extraordinary visual narratives.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={containerVariants}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card p-8 text-center group relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="absolute inset-0 bg-gradient-artistic opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
                
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-gradient-artistic rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-glow">
                    <ApperIcon 
                      name={feature.icon} 
                      className="h-10 w-10 text-white" 
                    />
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:gradient-text transition-all duration-500">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white/70 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>
{/* CTA Section */}
        <motion.section
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="cinematic-container p-12 md:p-16 text-center relative overflow-hidden">
            {/* Artistic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl animate-pulse-slow"></div>
              <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
            </div>
            
            <div className="relative z-10 max-w-4xl mx-auto space-y-8">
              <motion.h2 
                className="text-4xl md:text-6xl font-experimental font-bold gradient-text"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                Your Story Awaits
              </motion.h2>
              
              <motion.p 
                className="text-2xl text-white/80 leading-relaxed font-light max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.8 }}
              >
                Step into a realm where technology meets artistry. Create galleries that don't just store memories—they transform them into visual poetry.
              </motion.p>
              
              <motion.div 
                className="flex flex-col lg:flex-row items-center justify-center gap-8 pt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8 }}
              >
                <Button
                  onClick={() => navigate('/create')}
                  size="lg"
                  icon="Sparkles"
                  className="min-w-64 text-xl py-6 shadow-glow shimmer-effect"
                >
                  Craft Your Vision
                </Button>
                
                <Button
                  onClick={() => navigate('/my-events')}
                  variant="secondary"
                  size="lg"
                  icon="ArrowRight"
                  className="min-w-64 text-xl py-6"
                >
                  Discover Artistry
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}

export default HomePage