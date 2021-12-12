import React, { useState, useEffect } from 'react'
// import Link from 'next/link'

export default function Newsletter() {
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  async function fetchData(email) {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: email })
    })
    let data = ''
    if (response.ok) {
      data =
        'Please check your email inbox and confirm your Front Matter subscription.'
    } else {
      // show error message from API
      data = await response.json().then((data) => data.error)
    }
    setMessage(data)
  }

  useEffect(() => {
    fetchData(email)
  }, [email])

  const subscribeMember = (event) => {
    event.preventDefault()
    fetchData(email)
    event.target.reset()
  }

  let colorName = 'red-400'
  if (message && message.startsWith('Please check your email')) {
    colorName = 'green-400'
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-4 px-4 lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Subscribe to Front Matter
          </h2>
          <p className="mt-3 max-w-3xl text-lg text-gray-500">
            Subscribe to Front Matter to receive all blog posts and occasional
            announcements from Front Matter via email.
          </p>
          {message && (
            <div
              className={`bg-${colorName} font-sans px-3 py-2 rounded-md relative`}
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
            </div>
          )}
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8">
          <form onSubmit={subscribeMember} className="sm:flex">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email-address"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 border font-sans border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-green-600 focus:border-green-600 sm:max-w-xs rounded-md"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="w-full flex items-center justify-center py-2 px-3 border border-transparent text-base font-medium font-sans rounded-md text-white bg-green-600 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-green-600"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
