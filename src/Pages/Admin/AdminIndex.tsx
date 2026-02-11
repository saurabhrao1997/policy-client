import { motion } from 'framer-motion'
import clsx from 'clsx'
import ClientReviewSlider from './ReviewSlider'
import ReviewIndex from './ReviewIndex'
import { useGetAllPolicyTypeQuery } from '../../API/Policy/policy'
import { Shield, Phone, Mail, MapPin, Clock, Users, CheckCircle, TrendingUp } from 'lucide-react'

const FloatingOrb = ({ delay = 0, size = 'w-32 h-32' }) => (
  <motion.div
    className={clsx(
      'absolute rounded-full blur-xl opacity-20',
      size,
      'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500'
    )}
    animate={{
      x: [0, 120, -60, 0],
      y: [0, -100, 60, 0],
      scale: [1, 1.3, 0.7, 1],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: 10,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      filter: 'blur(20px)',
    }}
  />
);

export default function AdminIndex() {
  const { data: policyTypeData } = useGetAllPolicyTypeQuery()
console.log("alklakd", policyTypeData)
   
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
      {/* Enhanced floating orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingOrb delay={0} size="w-48 h-48" />
        <FloatingOrb delay={2} size="w-32 h-32" />
        <FloatingOrb delay={4} size="w-40 h-40" />
        <FloatingOrb delay={6} size="w-28 h-28" />
        <FloatingOrb delay={8} size="w-36 h-36" />
      </div>

      {/* Enhanced animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500"
        animate={{
          background: [
            "linear-gradient(45deg, #4f46e5, #ec4899)",
            "linear-gradient(90deg, #8b5cf6, #06b6d4)",
            "linear-gradient(135deg, #10b981, #f59e0b)",
            "linear-gradient(180deg, #ef4444, #8b5cf6)",
            "linear-gradient(45deg, #4f46e5, #ec4899)",
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      {/* Hero Section - Policy Dashboard Header */}
      <motion.header 
        className="relative flex flex-col items-center justify-center text-center py-24 px-4 z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="relative mb-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Shield className="w-16 h-16 text-white drop-shadow-lg" />
          <motion.div
            className="absolute inset-0 w-16 h-16 rounded-full bg-white/20"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-extrabold mb-4"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        >
          Policy <motion.span 
            className="text-white drop-shadow-lg"
            animate={{ 
              textShadow: [
                "0 0 20px rgba(255,255,255,0.5)",
                "0 0 40px rgba(147,51,234,0.8)",
                "0 0 20px rgba(255,255,255,0.5)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Dashboard
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl max-w-xl text-white/90 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Comprehensive insurance solutions tailored for your security and peace of mind.
        </motion.p>
        
        <motion.div 
          className="flex gap-4 flex-wrap justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.a
            href="/employee/policyform"
            className="group relative px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow-lg overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Create New Policy
            </span>
          </motion.a>
          
          <motion.a
            href="/employee/policyindex"
            className="group relative px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl overflow-hidden"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.div
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100"
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10 group-hover:text-blue-600 transition-colors duration-300">
              View All Policies
            </span>
          </motion.a>
        </motion.div>
      </motion.header>

      {/* Enhanced Policy Stats Section */}
      <motion.section 
        className="relative bg-white/20 backdrop-blur-lg py-16 px-6 z-10 border-y border-white/10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Our Impact in Numbers
            </motion.h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Trusted by thousands for comprehensive insurance solutions and exceptional service
            </p>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Users, title: "1,250+", subtitle: "Active Policies", color: "text-blue-300", bgGradient: "from-blue-500/30 to-cyan-500/30" },
              { icon: CheckCircle, title: "98.5%", subtitle: "Claim Success Rate", color: "text-green-300", bgGradient: "from-green-500/30 to-emerald-500/30" },
              { icon: TrendingUp, title: "₹45M+", subtitle: "Coverage Amount", color: "text-purple-300", bgGradient: "from-purple-500/30 to-violet-500/30" },
              { icon: Clock, title: "24/7", subtitle: "Customer Support", color: "text-yellow-300", bgGradient: "from-yellow-500/30 to-orange-500/30" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="group text-center p-8 bg-white/10 rounded-2xl backdrop-blur-sm cursor-pointer border border-white/20 relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: index * 0.15, 
                  duration: 0.6, 
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -10,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(255,255,255,0.1)",
                  borderColor: "rgba(255,255,255,0.4)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Gradient background on hover */}
                <motion.div
                  className={clsx("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 rounded-2xl", stat.bgGradient)}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="relative z-10">
                  <motion.div
                    className="flex justify-center mb-4"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 10, 0],
                      scale: 1.2
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={clsx("p-3 rounded-full bg-white/20 backdrop-blur-sm", stat.color)}>
                      <stat.icon className="w-8 h-8" />
                    </div>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold mb-2 text-white"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {stat.title}
                  </motion.h3>
                  
                  <p className="text-white/80 group-hover:text-white transition-colors duration-300 font-medium">
                    {stat.subtitle}
                  </p>
                </div>

                {/* Animated border effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover:border-white/30"
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Enhanced Policy Types Section */}
      <motion.section 
        className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 text-gray-800 py-20 px-6 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Our Policy Types
            </motion.h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Choose from our comprehensive range of insurance policies designed to protect what matters most to you. 
              Each policy is crafted with care to provide maximum coverage and peace of mind.
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.isArray(policyTypeData) && policyTypeData.length > 0 && policyTypeData.map((policy: any, index: number) => (
              <motion.div 
                key={policy._id} 
                className="group bg-white p-8 rounded-2xl shadow-xl border border-gray-100 cursor-pointer overflow-hidden relative hover:shadow-2xl transition-all duration-500"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -12,
                  rotateY: 5,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.12)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Gradient border effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 rounded-2xl"
                  transition={{ duration: 0.4 }}
                />
                
                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-5 group-hover:opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle at 20px 20px, #3b82f6 1px, transparent 0)',
                    backgroundSize: '40px 40px'
                  }}
                  transition={{ duration: 0.4 }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="flex items-center mb-6"
                    whileHover={{ x: 8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg mr-4"
                      whileHover={{ 
                        rotate: [0, -10, 10, -5, 5, 0],
                        scale: 1.1
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <Shield className="w-8 h-8 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                        {policy.label}
                      </h3>
                      <motion.div
                        className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-1 w-0 group-hover:w-full transition-all duration-500"
                      />
                    </div>
                  </motion.div>
                  
                  <p className="text-gray-600 mb-6 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                    Comprehensive {policy.label.toLowerCase()} insurance coverage with flexible terms, competitive premiums, and exceptional customer service support.
                  </p>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300 block">
                        Starting from
                      </span>
                      <span className="text-2xl font-bold text-blue-600">₹5,000</span>
                      <span className="text-sm text-gray-400">/year</span>
                    </div>
                    <motion.a
                      href="/employee/policyform"
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold overflow-hidden relative shadow-lg hover:shadow-xl transition-all duration-300"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      />
                      <span className="relative z-10 flex items-center">
                        Get Quote
                        <motion.span
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </span>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {/* Default policy types if none available */}
            {(!Array.isArray(policyTypeData) || policyTypeData.length === 0) && (
              <>
                <motion.div 
                  className="group bg-white p-6 rounded-xl shadow-lg border-l-4 border-blue-500 cursor-pointer overflow-hidden relative"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0, duration: 0.5, type: "spring" }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10">
                    <motion.div 
                      className="flex items-center mb-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Shield className="w-8 h-8 text-blue-600 mr-3" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Term Life Insurance</h3>
                    </motion.div>
                    <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                      Pure life insurance coverage with affordable premiums and high coverage amounts.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">Starting from ₹3,000</span>
                      <motion.a
                        href="/employee/policyform"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium overflow-hidden relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">Get Quote</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="group bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 cursor-pointer overflow-hidden relative"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.5, type: "spring" }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10">
                    <motion.div 
                      className="flex items-center mb-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Shield className="w-8 h-8 text-green-600 mr-3" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors duration-300">Health Insurance</h3>
                    </motion.div>
                    <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                      Comprehensive health coverage for medical expenses and hospital bills.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">Starting from ₹8,000</span>
                      <motion.a
                        href="/employee/policyform"
                        className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium overflow-hidden relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">Get Quote</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="group bg-white p-6 rounded-xl shadow-lg border-l-4 border-purple-500 cursor-pointer overflow-hidden relative"
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                  whileHover={{ 
                    scale: 1.03,
                    y: -8,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-purple-50 to-violet-50 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  <div className="relative z-10">
                    <motion.div 
                      className="flex items-center mb-4"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Shield className="w-8 h-8 text-purple-600 mr-3" />
                      </motion.div>
                      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">Endowment Plan</h3>
                    </motion.div>
                    <p className="text-gray-600 mb-4 group-hover:text-gray-700 transition-colors duration-300">
                      Combination of insurance and investment for long-term wealth creation.
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">Starting from ₹12,000</span>
                      <motion.a
                        href="/employee/policyform"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium overflow-hidden relative"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-purple-700 to-violet-700 opacity-0 hover:opacity-100"
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">Get Quote</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </div>
      </motion.section>

      {/* Comprehensive Reviews Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <ReviewIndex />
      </motion.section>

      {/* Client Reviews Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <ClientReviewSlider/>
      </motion.section>

      {/* Contact Details Section */}
      <motion.section 
        className="relative bg-gray-900 text-white py-16 px-6 z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl font-bold mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Get in Touch
            </motion.h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Have questions about our policies? Our expert team is here to help you choose the right coverage.
            </p>
          </motion.div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Phone, title: "Call Us", subtitle: "Mon-Fri 9AM-6PM", info: "+91 123 456 7890", href: "tel:+911234567890", color: "text-blue-400", bgColor: "from-blue-500/20 to-cyan-500/20" },
              { icon: Mail, title: "Email Us", subtitle: "24/7 Support", info: "support@securelife.com", href: "mailto:support@securelife.com", color: "text-green-400", bgColor: "from-green-500/20 to-emerald-500/20" },
              { icon: MapPin, title: "Visit Us", subtitle: "Main Office", info: "123 Insurance Street\nMumbai, MH 400001", href: "#", color: "text-red-400", bgColor: "from-red-500/20 to-pink-500/20" },
              { icon: Clock, title: "Office Hours", subtitle: "Mon-Fri: 9:00 AM - 6:00 PM\nSat: 10:00 AM - 4:00 PM\nSun: Closed", info: "", href: "#", color: "text-yellow-400", bgColor: "from-yellow-500/20 to-orange-500/20" }
            ].map((contact, index) => (
              <motion.div 
                key={index}
                className="group text-center p-6 bg-gray-800 rounded-xl cursor-pointer overflow-hidden relative"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Hover background effect */}
                <motion.div
                  className={clsx("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100", contact.bgColor)}
                  transition={{ duration: 0.3 }}
                />
                
                <div className="relative z-10">
                  <motion.div
                    className="flex justify-center mb-4"
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <contact.icon className={clsx("w-8 h-8", contact.color)} />
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-semibold mb-2 group-hover:text-white transition-colors duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {contact.title}
                  </motion.h3>
                  
                  <p className="text-gray-400 mb-2 group-hover:text-gray-300 transition-colors duration-300">
                    {contact.subtitle}
                  </p>
                  
                  {contact.info && (
                    <motion.a 
                      href={contact.href} 
                      className={clsx("font-medium transition-colors duration-300 hover:opacity-80", contact.color)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {contact.info}
                    </motion.a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Quick Contact Form */}
          <motion.div 
            className="mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.div 
              className="bg-gray-800 p-8 rounded-xl relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 100 }}
            >
              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20"
                animate={{ 
                  background: [
                    "linear-gradient(0deg, #3b82f6, #8b5cf6, #ec4899)",
                    "linear-gradient(90deg, #8b5cf6, #ec4899, #3b82f6)",
                    "linear-gradient(180deg, #ec4899, #3b82f6, #8b5cf6)",
                    "linear-gradient(270deg, #3b82f6, #8b5cf6, #ec4899)"
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                <motion.h3 
                  className="text-2xl font-bold mb-6 text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  Quick Contact
                </motion.h3>
                
                <form className="space-y-4">
                  <motion.div 
                    className="grid gap-4 md:grid-cols-2"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    <motion.input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none transition-all duration-300"
                      whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
                    />
                    <motion.input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none transition-all duration-300"
                      whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
                    />
                  </motion.div>
                  
                  <motion.input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
                  />
                  
                  <motion.select 
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
                  >
                    <option value="">Select Policy Type</option>
                    <option value="term">Term Life Insurance</option>
                    <option value="health">Health Insurance</option>
                    <option value="endowment">Endowment Plan</option>
                    <option value="pension">Pension Plan</option>
                  </motion.select>
                  
                  <motion.textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    whileFocus={{ scale: 1.02, borderColor: "#3b82f6" }}
                  />
                  
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg relative overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.4 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative z-10">Send Message</span>
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        className="relative text-center py-6 text-sm bg-blue-700 text-white z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.p
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              &copy; {new Date().getFullYear()} SecureLife Insurance Co. All rights reserved.
            </motion.p>
            <motion.div 
              className="flex gap-4 mt-2 md:mt-0"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {["Privacy Policy", "Terms of Service", "Contact"].map((link, index) => (
                <motion.a 
                  key={link}
                  href="#" 
                  className="hover:text-blue-200 transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {link}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}
