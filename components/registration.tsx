'use client'

import { useState } from 'react'
import type { Advisor } from '@/app/page'

interface RegistrationProps {
  onRegister: (advisor: Omit<Advisor, 'certified'>) => boolean
}

export default function Registration({ onRegister }: RegistrationProps) {
  const [formData, setFormData] = useState({
    hederaId: '',
    advisorName: '',
    region: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.hederaId || !formData.advisorName || !formData.region) {
      alert('Please fill in all fields.')
      return
    }
    
    const success = onRegister({
      name: formData.advisorName,
      hederaId: formData.hederaId,
      region: formData.region
    })

    if (success) {
      setFormData({
        hederaId: '',
        advisorName: '',
        region: ''
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section className="registration" id="register">
      <h2>Register as Investment Advisor</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="hederaId">Hedera Account ID</label>
          <input 
            type="text" 
            id="hederaId" 
            name="hederaId"
            placeholder="0.0.123456" 
            value={formData.hederaId}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="advisorName">Full Name</label>
          <input 
            type="text" 
            id="advisorName" 
            name="advisorName"
            placeholder="Enter your full name" 
            value={formData.advisorName}
            onChange={handleChange}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="region">Registered Region</label>
          <select 
            id="region" 
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
          >
            <option value="">Select your region</option>
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
            <option value="Asia Pacific">Asia Pacific</option>
            <option value="South America">South America</option>
            <option value="Africa">Africa</option>
            <option value="Middle East">Middle East</option>
          </select>
        </div>
        <button type="submit" className="btn-primary" style={{ width: '100%' }}>
          Register Advisor
        </button>
      </form>
    </section>
  )
}
