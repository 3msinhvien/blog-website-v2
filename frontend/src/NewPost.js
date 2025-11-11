import React from 'react'
import { useForm } from 'react-hook-form'

const API_URL = 'http://localhost:8080/api/post'

export default function NewPost() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const [result, setResult] = React.useState('')

  const onSubmit = async (data) => {
    setResult('')
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(payload.message || `Request failed (${response.status})`)
      setResult('Post created successfully!')
      reset()
    } catch (error) {
      setResult(`Post created failed: ${error.message}`)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 10 }}>
        <span>Slug:</span><br />
        <input type="text" {...register('slug', { required: true })} /><br />
        {errors.slug && <div style={{ color: 'red' }}>Slug is required</div>}
        <span>Title:</span><br />
        <input type="text" {...register('title', { required: true })} /><br />
        {errors.title && <div style={{ color: 'red' }}>Title is required</div>}
        <span>Description:</span><br />
        <input type="text" {...register('description', { required: true })} /><br />
        {errors.description && <div style={{ color: 'red' }}>Description is required</div>}
        <br />
        <button type="submit" disabled={isSubmitting}>Add New</button>
        <p className="text-success">{result}</p>
      </div>
    </form>
  )
}
