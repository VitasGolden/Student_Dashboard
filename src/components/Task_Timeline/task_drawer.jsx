import React, { useState, useEffect } from 'react'
import { X, Calendar, FileText, Flag, Clock } from 'lucide-react'

const TaskDrawer = ({ isOpen, task, onSave, onClose, onDelete }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    status: 'Not started',
    priority: 'normal'
  })

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        start: task.start ? task.start.toISOString().split('T')[0] : '',
        end: task.end ? task.end.toISOString().split('T')[0] : '',
        status: task.status || 'Not started',
        priority: task.priority || 'normal'
      })
    }
  }, [task])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!task) return

    const updatedTask = {
      ...task,
      title: formData.title,
      description: formData.description,
      start: new Date(formData.start),
      end: new Date(formData.end),
      status: formData.status,
      priority: formData.priority
    }

    onSave(updatedTask)
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-96 bg-[#1a1a1a] shadow-xl transform transition-transform">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Task Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
            <div className="flex-1 p-4 space-y-6 overflow-y-auto">
              {/* Title */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <FileText size={16} />
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#97e7aa] focus:border-transparent"
                  placeholder="Enter task title..."
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <FileText size={16} />
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#97e7aa] focus:border-transparent resize-none"
                  placeholder="Enter task description..."
                />
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Calendar size={16} />
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.start}
                    onChange={(e) => handleChange('start', e.target.value)}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#97e7aa] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Calendar size={16} />
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.end}
                    onChange={(e) => handleChange('end', e.target.value)}
                    min={formData.start}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#97e7aa] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Clock size={16} />
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleChange('status', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#97e7aa] focus:border-transparent"
                >
                  <option value="Not started">Not started</option>
                  <option value="In progress">In progress</option>
                  <option value="Completed">Completed</option>
                  <option value="On hold">On hold</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                  <Flag size={16} />
                  Priority
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleChange('priority', 'normal')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      formData.priority === 'normal'
                        ? 'bg-[#97e7aa] text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange('priority', 'urgent')}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                      formData.priority === 'urgent'
                        ? 'bg-[#ff6b35] text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    🔥 Urgent
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700 flex gap-3">
              <button
                type="button"
                onClick={onDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#97e7aa] text-white rounded-lg hover:bg-[#75b384] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TaskDrawer