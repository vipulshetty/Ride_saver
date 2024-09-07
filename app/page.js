'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Car, MapPin, DollarSign, IndianRupeeIcon } from 'lucide-react'

// Mock function to simulate fetching prices
const fetchPrices = (source, destination) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        Ola: Math.floor(Math.random() * 300) + 100,
        Uber: Math.floor(Math.random() * 300) + 100,
        Rapido: Math.floor(Math.random() * 300) + 100,
      })
    }, 1000)
  })
}

export default function Home() {
  const [source, setSource] = useState('')
  const [destination, setDestination] = useState('')
  const [prices, setPrices] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    setShowAnimation(true)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await fetchPrices(source, destination)
    setPrices(result)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Car className="text-blue-600 w-8 h-8 mr-2" />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            Ride Saver
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className={`text-center mb-16 transition-all duration-1000 ease-out ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-5xl font-extrabold text-blue-800 mb-4">Save on Every Ride</h2>
          <p className="text-xl text-gray-600 mb-8">Compare prices across Ola, Uber, and Rapido instantly!</p>
          <a href="#compare" className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-600 hover:to-green-600 transition-all duration-300 inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            Start Comparing <ArrowRight className="ml-2 w-5 h-5" />
          </a>
        </section>

        <section id="compare" className="bg-white rounded-2xl shadow-2xl p-8 transition-all duration-500 ease-out transform hover:scale-[1.02]">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">Compare Ride Prices</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <MapPin className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              <Input
                id="source"
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
                placeholder="Enter pickup location"
                className="pl-10 py-3 rounded-lg "
              />
            </div>
            <div className="relative">
              <MapPin className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              <Input
                id="destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
                placeholder="Enter drop-off location"
                className="pl-10 py-3 rounded-lg"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 transition-all duration-300 transform hover:-translate-y-1">
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Comparing Prices...
                </span>
              ) : (
                'Compare Prices'
              )}
            </Button>
          </form>

          {prices && (
            <div className="mt-12 animate-fadeIn">
              <h4 className="text-2xl text-black font-semibold mb-6 text-center">Price Comparison</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(prices).map(([app, price], index) => (
                  <Card key={app} className="overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                    <CardHeader className={`bg-gradient-to-r ${
                      index === 0 ? 'from-blue-500 to-blue-600' :
                      index === 1 ? 'from-green-500 to-green-600' :
                      'from-purple-500 to-purple-600'
                    }`}>
                      <CardTitle className="text-white text-center">{app}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-center mt-4">
                        <IndianRupeeIcon className="w-6 h-6 text-gray-600 mr-2" />
                        <p className="text-4xl text-black font-bold">{price}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Ride Saver. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}