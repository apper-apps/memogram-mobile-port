import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import EventCard from '@/components/molecules/EventCard'
import SearchBar from '@/components/molecules/SearchBar'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import ApperIcon from '@/components/ApperIcon'
import { eventsService } from '@/services/api/eventsService'

const MyEventsPage = () => {
  const [events, setEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [events, searchQuery])

  const loadEvents = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await eventsService.getAll()
      setEvents(data)
    } catch (err) {
      setError('Failed to load events. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filterEvents = () => {
    if (!searchQuery.trim()) {
      setFilteredEvents(events)
      return
    }

    const filtered = events.filter(event =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    
    setFilteredEvents(filtered)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  if (loading) {
    return <Loading type="events" message="Loading your events..." />
  }

  if (error) {
    return (
      <Error
        title="Unable to load events"
        message={error}
        onRetry={loadEvents}
      />
    )
  }

  if (events.length === 0) {
    return (
      <Empty
        icon="Calendar"
        title="No events created yet"
        message="Create your first event to start collecting memories from your special occasions."
        actionLabel="Create Your First Event"
        onAction={() => navigate('/create')}
      />
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            My Events
          </h1>
          <p className="text-gray-600">
            Manage your event galleries and view shared memories
          </p>
        </div>

        <Button
          onClick={() => navigate('/create')}
          icon="Plus"
          size="lg"
        >
          Create New Event
        </Button>
      </motion.div>

      {/* Search and Stats */}
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="lg:col-span-3">
          <SearchBar
            placeholder="Search events by name, location, or description..."
            onSearch={handleSearch}
          />
        </div>

        <div className="card p-4 text-center">
          <div className="text-2xl font-bold text-primary-600 mb-1">
            {events.length}
          </div>
          <div className="text-sm text-gray-600">
            Total Events
          </div>
        </div>
      </motion.div>

      {/* Events Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <ApperIcon name="Search" className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No events match your search
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search terms or create a new event.
            </p>
            <Button
              onClick={() => setSearchQuery('')}
              variant="secondary"
              icon="X"
            >
              Clear Search
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Results Summary */}
      {searchQuery && (
        <motion.div
          className="text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          Showing {filteredEvents.length} of {events.length} events
        </motion.div>
      )}
    </div>
  )
}

export default MyEventsPage