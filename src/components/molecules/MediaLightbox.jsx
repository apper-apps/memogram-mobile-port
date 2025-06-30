import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { format } from 'date-fns'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const MediaLightbox = ({ media, currentIndex, onClose, onNavigate }) => {
  const currentMedia = media[currentIndex]

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') navigatePrevious()
      if (e.key === 'ArrowRight') navigateNext()
    }

    document.addEventListener('keydown', handleKeyPress)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyPress)
      document.body.style.overflow = 'unset'
    }
  }, [currentIndex])

  const navigatePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1)
    }
  }

  const navigateNext = () => {
    if (currentIndex < media.length - 1) {
      onNavigate(currentIndex + 1)
    }
  }

  const downloadMedia = () => {
    const link = document.createElement('a')
    link.href = currentMedia.url
    link.download = currentMedia.fileName || `media-${currentMedia.Id}`
    link.click()
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy \'at\' h:mm a')
    } catch {
      return 'Unknown date'
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full p-2 transition-colors"
        onClick={onClose}
      >
        <ApperIcon name="X" className="h-6 w-6" />
      </button>

      {/* Navigation Buttons */}
      {currentIndex > 0 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full p-3 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            navigatePrevious()
          }}
        >
          <ApperIcon name="ChevronLeft" className="h-6 w-6" />
        </button>
      )}

      {currentIndex < media.length - 1 && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full p-3 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            navigateNext()
          }}
        >
          <ApperIcon name="ChevronRight" className="h-6 w-6" />
        </button>
      )}

      {/* Media Content */}
      <div 
        className="max-w-7xl max-h-full w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {currentMedia.type === 'photo' ? (
          <motion.img
            key={currentMedia.Id}
            src={currentMedia.url}
            alt={currentMedia.caption || 'Event photo'}
            className="max-w-full max-h-full object-contain rounded-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        ) : (
          <motion.video
            key={currentMedia.Id}
            src={currentMedia.url}
            controls
            className="max-w-full max-h-full rounded-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            autoPlay
          />
        )}
      </div>

      {/* Media Info */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between text-white">
            <div className="flex-1">
              {currentMedia.caption && (
                <p className="text-lg font-medium mb-2">
                  {currentMedia.caption}
                </p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-300">
                <span>
                  Uploaded by {currentMedia.uploaderName}
                </span>
                <span>•</span>
                <span>
                  {formatDate(currentMedia.uploadedAt)}
                </span>
                <span>•</span>
                <span>
                  {currentIndex + 1} of {media.length}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              <Button
                onClick={downloadMedia}
                variant="ghost"
                size="sm"
                icon="Download"
                className="text-white hover:bg-white/20"
              >
                Download
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default MediaLightbox