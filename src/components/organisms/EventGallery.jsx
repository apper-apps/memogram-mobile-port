import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import Button from '@/components/atoms/Button'
import MediaGrid from '@/components/molecules/MediaGrid'
import MediaUploadZone from '@/components/molecules/MediaUploadZone'
import ApperIcon from '@/components/ApperIcon'
import { mediaService } from '@/services/api/mediaService'

const EventGallery = ({ eventId, allowUploads = true }) => {
  const [media, setMedia] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'upload'
  const [sortBy, setSortBy] = useState('newest') // 'newest', 'oldest', 'uploader'

  useEffect(() => {
    loadMedia()
  }, [eventId])

  const loadMedia = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await mediaService.getByEventId(eventId)
      setMedia(data)
    } catch (err) {
      setError('Failed to load media. Please try again.')
      toast.error('Failed to load media')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadComplete = (newMedia) => {
    setMedia(prev => [...newMedia, ...prev])
    setViewMode('grid')
  }

  const getSortedMedia = () => {
    const sorted = [...media]
    
    switch (sortBy) {
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.uploadedAt) - new Date(b.uploadedAt))
      case 'uploader':
        return sorted.sort((a, b) => a.uploaderName.localeCompare(b.uploaderName))
      case 'newest':
      default:
        return sorted.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
    }
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="AlertCircle" className="h-16 w-16 text-red-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Unable to load gallery
        </h3>
        <p className="text-gray-500 mb-4">{error}</p>
        <Button onClick={loadMedia} variant="primary" icon="RefreshCw">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Event Gallery
          </h2>
          <p className="text-gray-600">
            {media.length} photos and videos shared
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Sort Options */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="uploader">By uploader</option>
          </select>

          {/* View Toggle */}
          {allowUploads && (
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`
                  px-3 py-1 rounded-md text-sm font-medium transition-colors
                  ${viewMode === 'grid' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-primary-600'
                  }
                `}
              >
                <ApperIcon name="Grid3X3" className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('upload')}
                className={`
                  px-3 py-1 rounded-md text-sm font-medium transition-colors
                  ${viewMode === 'upload' 
                    ? 'bg-white text-primary-600 shadow-sm' 
                    : 'text-gray-600 hover:text-primary-600'
                  }
                `}
              >
                <ApperIcon name="Upload" className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {viewMode === 'upload' ? (
          <MediaUploadZone 
            eventId={eventId}
            onUploadComplete={handleUploadComplete}
          />
        ) : (
          <MediaGrid 
            media={getSortedMedia()} 
            loading={loading}
          />
        )}
      </motion.div>

      {/* Upload FAB for mobile */}
      {allowUploads && viewMode === 'grid' && (
        <motion.button
          onClick={() => setViewMode('upload')}
          className="fixed bottom-6 right-6 bg-gradient-accent text-white p-4 rounded-full shadow-floating hover:scale-110 transition-all duration-200 z-30 md:hidden"
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <ApperIcon name="Plus" className="h-6 w-6" />
        </motion.button>
      )}
    </div>
  )
}

export default EventGallery