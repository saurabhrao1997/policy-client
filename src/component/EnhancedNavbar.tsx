import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const links = [
  { to: '/', label: 'Home', icon: '🏠', gradient: 'from-blue-500 to-cyan-500' },
  { to: '/employee', label: 'Employee', icon: '👥', gradient: 'from-purple-500 to-pink-500' },
  { to: '/profile', label: 'Profile', icon: '👤', gradient: 'from-green-500 to-emerald-500' },
  { to: '/login', label: 'Login', icon: '🔐', gradient: 'from-orange-500 to-red-500' },
  { to: '/register', label: 'Sign Up', icon: '📝', gradient: 'from-indigo-500 to-purple-500' },
];

const FloatingOrb = ({ delay = 0, size = 'w-32 h-32' }) => (
  <motion.div
    className={clsx(
      'absolute rounded-full blur-xl opacity-20',
      size,
      'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500'
    )}
    animate={{
      x: [0, 100, -50, 0],
      y: [0, -80, 40, 0],
      scale: [1, 1.2, 0.8, 1],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

const EnhancedNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative">
      {/* Floating orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingOrb delay={0} size="w-40 h-40" />
        <FloatingOrb delay={2} size="w-28 h-28" />
        <FloatingOrb delay={4} size="w-36 h-36" />
      </div>

      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={clsx(
          'fixed top-6 left-1/2 transform -translate-x-1/2 z-50',
          'transition-all duration-700 ease-out',
          scrolled ? 'top-2' : 'top-6'
        )}
        style={{
          filter: `drop-shadow(0 20px 40px rgba(147, 51, 234, 0.3))`
        }}
      >
        {/* Main navbar container */}
        <motion.div
          className={clsx(
            'relative bg-black/20 backdrop-blur-2xl',
            'border border-white/10 rounded-3xl p-1',
            'shadow-2xl shadow-purple-500/25'
          )}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated gradient border */}
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{
              background: `conic-gradient(from 0deg, 
                #3b82f6, #8b5cf6, #ec4899, #f59e0b, #10b981, #3b82f6)`,
              padding: '2px',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-full h-full rounded-3xl bg-black/80 backdrop-blur-2xl" />
          </motion.div>

          {/* Navigation links */}
          <div className="relative flex gap-2 p-2">
            {links.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: index * 0.1, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                  damping: 10
                }}
              >
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    clsx(
                      'relative group px-6 py-4 rounded-2xl',
                      'flex items-center gap-3 min-w-max',
                      'font-semibold text-sm transition-all duration-500',
                      'overflow-hidden',
                      isActive 
                        ? `bg-gradient-to-r ${link.gradient} text-white shadow-lg` 
                        : 'text-gray-300 hover:text-white'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Background effects */}
                      {!isActive && (
                        <>
                          <motion.div
                            className={clsx(
                              'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100',
                              `bg-gradient-to-r ${link.gradient}`
                            )}
                            transition={{ duration: 0.3 }}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100"
                            transition={{ duration: 0.3 }}
                          />
                        </>
                      )}

                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: '100%' }}
                        transition={{ duration: 0.6 }}
                      />

                      {/* Icon with magical hover effect */}
                      <motion.span 
                        className="text-xl relative z-10"
                        whileHover={{ 
                          scale: 1.3,
                          rotate: [0, -15, 15, -15, 0],
                          filter: "drop-shadow(0 0 10px currentColor)"
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        {link.icon}
                      </motion.span>

                      {/* Label with typewriter effect */}
                      <motion.span 
                        className="relative z-10 overflow-hidden"
                        initial={{ width: 0 }}
                        animate={{ width: 'auto' }}
                        transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
                      >
                        <motion.span
                          className="inline-block"
                          whileHover={{ 
                            scale: 1.05,
                            letterSpacing: '0.1em'
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {link.label}
                        </motion.span>
                      </motion.span>

                      {/* Glow effect */}
                      <motion.div
                        className={clsx(
                          'absolute inset-0 rounded-2xl blur-lg opacity-0',
                          `bg-gradient-to-r ${link.gradient}`
                        )}
                        whileHover={{ opacity: 0.3 }}
                        transition={{ duration: 0.3 }}
                      />
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </div>

          {/* Interactive cursor follower */}
          <motion.div
            className="absolute pointer-events-none"
            style={{
              width: 20,
              height: 20,
              background: 'radial-gradient(circle, rgba(147, 51, 234, 0.6), transparent)',
              borderRadius: '50%',
              filter: 'blur(10px)',
            }}
            animate={{
              x: mousePosition.x - window.innerWidth / 2,
              y: mousePosition.y - 100,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
          />
        </motion.div>

        {/* Status indicator */}
        <motion.div
          className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.nav>
    </div>
  );
};

export default EnhancedNavbar;
