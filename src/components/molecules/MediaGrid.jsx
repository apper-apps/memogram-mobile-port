import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import MediaLightbox from '@/components/molecules/MediaLightbox'

const MediaGrid = ({ media = [], loading = false }) => {
  const [selectedMedia, setSelectedMedia] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = (mediaItem, index) => {
    setSelectedMedia(mediaItem)
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setSelectedMedia(null)
  }

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="aspect-square bg-gray-200 rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (media.length === 0) {
    return (
      <div className="text-center py-12">
        <ApperIcon name="ImageOff" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No media uploaded yet
        </h3>
        <p className="text-gray-500">
          Be the first to share photos and videos from this event!
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {media.map((item, index) => (
          <motion.div
            key={item.Id}
            className="aspect-square group cursor-pointer overflow-hidden rounded-lg bg-gray-100"
            whileHover={{ scale: 1.02 }}
            onClick={() => openLightbox(item, index)}
            layout
          >
            <div className="relative w-full h-full">
              {item.type === 'photo' ? (
                <img
                  src={item.thumbnailUrl || item.url}
                  alt={item.caption || 'Event photo'}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              ) : (
                <div className="relative w-full h-full bg-black">
                  <video
                    src={item.url}
                    className="w-full h-full object-cover"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-colors">
                    <ApperIcon name="Play" className="h-8 w-8 text-white" />
                  </div>
                </div>
              )}

              {/* Overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-2 left-2 right-2">
                  {item.caption && (
                    <p className="text-white text-xs font-medium line-clamp-2">
                      {item.caption}
                    </p>
                  )}
                  <p className="text-white/80 text-xs mt-1">
                    by {item.uploaderName}
                  </p>
                </div>
              </div>

              {/* Media type indicator */}
              <div className="absolute top-2 right-2">
                {item.type === 'video' && (
                  <div className="bg-black/60 rounded-full p-1">
                    <ApperIcon name="Video" className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedMedia && (
          <MediaLightbox
            media={media}
            currentIndex={lightboxIndex}
            onClose={closeLightbox}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default MediaGrid