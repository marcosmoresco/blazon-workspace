import { useState, useEffect } from 'react'

const useMockRequest = (mock: any, timeout: number = 4000) => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(undefined)

  setTimeout(() => {
    setData(mock)
    setLoading(false)
  }, timeout)
  return { loading, data }
}

export default useMockRequest
