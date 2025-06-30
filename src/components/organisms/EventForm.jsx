import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import Input from '@/components/atoms/Input'
import Button from '@/components/atoms/Button'
import ThemeSelector from '@/components/molecules/ThemeSelector'
import { themesService } from '@/services/api/themesService'

const EventForm = ({ initialData, onSubmit, loading = false }) => {
  const [themes, setThemes] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    theme: '',
    password: '',
    ...initialData
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    loadThemes()
  }, [])

  const loadThemes = async () => {
    try {
      const data = await themesService.getAll()
      setThemes(data)
      if (data.length > 0 && !formData.theme) {
        setFormData(prev => ({ ...prev, theme: data[0].Id }))
      }
    } catch (error) {
      console.error('Failed to load themes:', error)
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Event name is required'
    }

    if (!formData.date) {
      newErrors.date = 'Event date is required'
    } else {
      const selectedDate = new Date(formData.date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      if (selectedDate < today) {
        newErrors.date = 'Event date cannot be in the past'
      }
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Event location is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Event description is required'
    }

    if (!formData.theme) {
      newErrors.theme = 'Please select a theme'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  // Format date for input (YYYY-MM-DD)
  const formatDateForInput = (dateString) => {
    if (!dateString) return ''
    try {
      return format(new Date(dateString), 'yyyy-MM-dd')
    } catch {
      return ''
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Event Name"
          placeholder="Sarah & John's Wedding"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          error={errors.name}
          icon="Heart"
        />

        <Input
          label="Event Date"
          type="date"
          value={formatDateForInput(formData.date)}
          onChange={(e) => handleChange('date', e.target.value)}
          error={errors.date}
          icon="Calendar"
        />
      </div>

      <Input
        label="Location"
        placeholder="Grand Ballroom, The Plaza Hotel"
        value={formData.location}
        onChange={(e) => handleChange('location', e.target.value)}
        error={errors.location}
        icon="MapPin"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          className="input-field resize-none"
          rows={4}
          placeholder="Tell guests about your special event..."
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-error">{errors.description}</p>
        )}
      </div>

      <ThemeSelector
        selectedTheme={formData.theme}
        onThemeSelect={(themeId) => handleChange('theme', themeId)}
        themes={themes}
      />
      {errors.theme && (
        <p className="text-sm text-error">{errors.theme}</p>
      )}

      <Input
        label="Password Protection (Optional)"
        type="password"
        placeholder="Leave empty for public access"
        value={formData.password}
        onChange={(e) => handleChange('password', e.target.value)}
        icon="Lock"
      />

      <div className="flex justify-end space-x-4 pt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={loading}
          icon="Save"
        >
          {initialData ? 'Update Event' : 'Create Event'}
        </Button>
      </div>
    </form>
  )
}

export default EventForm