import { NavLink } from 'react-router-dom';
import { Home, FileText, Users, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { label: 'policy list', icon: <Home size={20} />, path: '/employee/policyindex' },
  { label: 'Policy create', icon: <FileText size={20} />, path: '/employee/createpolicy' },
  { label: 'Feature', icon: <Users size={20} />, path: '/feature' },
  { label: 'Settings', icon: <Settings size={20} />, path: '/settings' },
];

const Sidebar = () => {
  return (
    <div className="fixed top-1/4 left-0 z-50 group">
      <motion.div 
        className="flex flex-col gap-2 bg-gradient-to-b from-blue-700 to-blue-800 text-white rounded-r-xl p-3 shadow-2xl border-r-4 border-blue-500 w-16 group-hover:w-48 transition-all duration-300 ease-in-out overflow-hidden hover:overflow-visible"
        initial={{ x: -10 }}
        animate={{ x: 0 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)"
        }}
        transition={{ duration: 0.3 }}
      >
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `group/item flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ease-in-out relative overflow-hidden
              ${isActive 
                ? 'bg-blue-900 shadow-lg transform scale-105' 
                : 'hover:bg-blue-600 hover:transform hover:scale-105'
              }`
            }
          >
            <motion.div 
              className="flex-shrink-0 z-10"
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {item.icon}
            </motion.div>
            
            <span 
              className="whitespace-nowrap font-medium text-sm opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 ease-in-out z-20 relative"
            >
              {item.label}
            </span>

            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          </NavLink>
        ))}
        
        {/* Decorative element */}
        <motion.div
          className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400 rounded-full opacity-20 group-hover:opacity-60 transition-opacity duration-300"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.6, 0.2]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};

export default Sidebar;
