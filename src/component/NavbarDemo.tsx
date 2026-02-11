import { useState } from 'react';
import { motion } from 'framer-motion';
import FloatingNavbar from './Navbar';
import EnhancedNavbar from './EnhancedNavbar';

const NavbarDemo = () => {
  const [currentNavbar, setCurrentNavbar] = useState<'floating' | 'enhanced'>('floating');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Render the selected navbar */}
      {currentNavbar === 'floating' ? <FloatingNavbar /> : <EnhancedNavbar />}
      
      {/* Demo content */}
      <div className="pt-32 px-6">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Enhanced Navigation
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Experience our beautiful, animated navigation bars with stunning visual effects,
            smooth transitions, and responsive design powered by Tailwind CSS and Framer Motion.
          </p>

          {/* Navbar switcher */}
          <motion.div 
            className="flex justify-center gap-4 mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setCurrentNavbar('floating')}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                currentNavbar === 'floating'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
              }`}
            >
              Floating Style
            </button>
            <button
              onClick={() => setCurrentNavbar('enhanced')}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                currentNavbar === 'enhanced'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
              }`}
            >
              Enhanced Style
            </button>
          </motion.div>

          {/* Feature cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Smooth Animations",
                description: "Powered by Framer Motion for buttery smooth transitions and micro-interactions",
                icon: "✨"
              },
              {
                title: "Responsive Design", 
                description: "Adapts beautifully to all screen sizes with mobile-optimized layouts",
                icon: "📱"
              },
              {
                title: "Visual Effects",
                description: "Stunning gradients, backdrop blur, and particle effects for modern aesthetics",
                icon: "🎨"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.2 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Scroll content to test navbar behavior */}
          <div className="space-y-8">
            {Array.from({ length: 10 }, (_, i) => (
              <motion.div
                key={i}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10"
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
              >
                <h4 className="text-2xl font-semibold text-white mb-4">
                  Section {i + 1}
                </h4>
                <p className="text-gray-400">
                  This is demo content to test the navbar scroll behavior. 
                  The navbar should scale and adjust its appearance as you scroll through the page.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                  tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NavbarDemo;
