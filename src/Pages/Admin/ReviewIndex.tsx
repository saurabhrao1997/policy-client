import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ThumbsUp, MessageCircle, Search, Calendar, Award } from 'lucide-react'

interface Review {
  id: string
  name: string
  role: string
  avatar: string
  rating: number
  review: string
  policyType: string
  date: string
  verified: boolean
  helpful: number
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Business Owner',
    avatar: 'https://i.pravatar.cc/100?img=1',
    rating: 5,
    review: 'SecureLife made getting comprehensive insurance coverage incredibly simple. Their term life policy gave my family the security we needed. The process was transparent and the customer service team was very helpful throughout.',
    policyType: 'Term Life Insurance',
    date: '2024-01-15',
    verified: true,
    helpful: 24
  },
  {
    id: '2',
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    avatar: 'https://i.pravatar.cc/100?img=3',
    rating: 5,
    review: 'The health insurance claim process was seamless. They covered my surgery expenses without any hassle. Excellent customer service and quick response time made all the difference during a difficult time.',
    policyType: 'Health Insurance',
    date: '2024-01-20',
    verified: true,
    helpful: 31
  },
  {
    id: '3',
    name: 'Maria D\'souza',
    role: 'Teacher',
    avatar: 'https://i.pravatar.cc/100?img=5',
    rating: 5,
    review: 'Their endowment plan helped me save for my daughter\'s education while providing life coverage. Best investment decision ever! The returns have been consistent and the policy terms are very clear.',
    policyType: 'Endowment Plan',
    date: '2024-02-02',
    verified: true,
    helpful: 18
  },
  {
    id: '4',
    name: 'Amit Patel',
    role: 'Retired Government Officer',
    avatar: 'https://i.pravatar.cc/100?img=7',
    rating: 4,
    review: 'The pension plan ensures I have a steady income post-retirement. The team guided me through every step of the process. Very satisfied with the monthly payouts and professional service.',
    policyType: 'Pension Plan',
    date: '2024-02-10',
    verified: true,
    helpful: 27
  },
  {
    id: '5',
    name: 'Sneha Reddy',
    role: 'Marketing Manager',
    avatar: 'https://i.pravatar.cc/100?img=9',
    rating: 5,
    review: 'Quick policy approval and competitive premiums. Their money-back policy is perfect for my financial planning needs. I appreciate the flexibility and the bonus payments.',
    policyType: 'Money Back Policy',
    date: '2024-02-18',
    verified: true,
    helpful: 22
  },
  {
    id: '6',
    name: 'Vikram Singh',
    role: 'Entrepreneur',
    avatar: 'https://i.pravatar.cc/100?img=11',
    rating: 4,
    review: 'Great customer support and competitive rates. The team helped me choose the right policy for my family. The online portal is user-friendly and makes managing policies easy.',
    policyType: 'Family Plan',
    date: '2024-02-25',
    verified: false,
    helpful: 15
  },
  {
    id: '7',
    name: 'Anita Mehta',
    role: 'Doctor',
    avatar: 'https://i.pravatar.cc/100?img=13',
    rating: 5,
    review: 'Professional service and hassle-free claims. I\'ve recommended SecureLife to many of my colleagues. The coverage is comprehensive and the premium is very reasonable.',
    policyType: 'Professional Plan',
    date: '2024-03-05',
    verified: true,
    helpful: 33
  },
  {
    id: '8',
    name: 'Ravi Gupta',
    role: 'Sales Manager',
    avatar: 'https://i.pravatar.cc/100?img=15',
    rating: 4,
    review: 'Good value for money. The policy features are well explained and the claim settlement is prompt. Happy with my choice of insurance provider.',
    policyType: 'Term Life Insurance',
    date: '2024-03-12',
    verified: true,
    helpful: 19
  }
]

const policyTypes = ['All', 'Term Life Insurance', 'Health Insurance', 'Endowment Plan', 'Pension Plan', 'Money Back Policy', 'Family Plan', 'Professional Plan']

export default function ReviewIndex() {
  const [filteredReviews, setFilteredReviews] = useState(reviews)
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter)
    let filtered = reviews

    if (filter !== 'All') {
      filtered = reviews.filter(review => review.policyType === filter)
    }

    if (searchTerm) {
      filtered = filtered.filter(review => 
        review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.review.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.policyType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort reviews
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating)
    } else if (sortBy === 'helpful') {
      filtered.sort((a, b) => b.helpful - a.helpful)
    }

    setFilteredReviews(filtered)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    handleFilter(selectedFilter)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const
      }
    }
  }

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
  const totalReviews = reviews.length
  const verifiedReviews = reviews.filter(review => review.verified).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header Section */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-16 px-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MessageCircle className="w-16 h-16 text-white drop-shadow-lg" />
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Customer Reviews
          </motion.h1>
          
          <motion.p 
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            See what our valued customers have to say about their experience with SecureLife Insurance
          </motion.p>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center mb-2">
                <Star className="w-6 h-6 text-yellow-400 fill-current mr-2" />
                <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
              </div>
              <p className="text-white/80">Average Rating</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center mb-2">
                <MessageCircle className="w-6 h-6 text-blue-300 mr-2" />
                <span className="text-2xl font-bold">{totalReviews}</span>
              </div>
              <p className="text-white/80">Total Reviews</p>
            </div>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-center mb-2">
                <Award className="w-6 h-6 text-green-400 mr-2" />
                <span className="text-2xl font-bold">{verifiedReviews}</span>
              </div>
              <p className="text-white/80">Verified Reviews</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Filters and Search Section */}
      <motion.div 
        className="bg-white shadow-lg border-b border-gray-200 py-6 px-6 sticky top-0 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <motion.div 
              className="relative flex-1 max-w-md"
              whileFocus={{ scale: 1.02 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </motion.div>

            {/* Sort Dropdown */}
            <motion.select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white"
              whileFocus={{ scale: 1.02 }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="rating">Highest Rating</option>
              <option value="helpful">Most Helpful</option>
            </motion.select>
          </div>

          {/* Filter Tabs */}
          <motion.div 
            className="flex flex-wrap gap-2 mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {policyTypes.map((type) => (
              <motion.button
                key={type}
                onClick={() => handleFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedFilter === type
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {type}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Reviews Grid */}
      <motion.div 
        className="max-w-6xl mx-auto py-12 px-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence mode="wait">
          <motion.div 
            key={`${selectedFilter}-${searchTerm}-${sortBy}`}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredReviews.map((review) => (
              <motion.div
                key={review.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Card Header */}
                <div className="p-6 pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <motion.img
                        src={review.avatar}
                        alt={review.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-200"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-gray-800">{review.name}</h3>
                          {review.verified && (
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Award className="w-4 h-4 text-blue-500" />
                            </motion.div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{review.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  {/* Policy Type Badge */}
                  <motion.span 
                    className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-4"
                    whileHover={{ scale: 1.05 }}
                  >
                    {review.policyType}
                  </motion.span>

                  {/* Review Text */}
                  <motion.p 
                    className="text-gray-700 leading-relaxed mb-4"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    "{review.review}"
                  </motion.p>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(review.date)}</span>
                    </div>
                    
                    <motion.div 
                      className="flex items-center space-x-1 cursor-pointer hover:text-blue-600 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>{review.helpful}</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredReviews.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No reviews found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
