// import clsx from 'clsx'; // optional, for cleaner class handling (can remove if not using)
// import { AnimatePresence, motion } from 'framer-motion';
// import { useEffect, useRef, useState } from 'react';
// import { NavLink } from 'react-router-dom';

// const links = [
//   { to: '/', label: 'Home', icon: '🏠' },
//   { to: '/employee', label: 'Employee', icon: '👥' },
//   { to: '/chat', label: 'Chat', icon: '💬' },
//   { to: '/profile', label: 'Profile', icon: '👤' },
//   { to: '/login', label: 'Login', icon: '🔐' },
//   { to: '/practice', label: 'Practice', icon: '📝' },
// ];

// const FloatingNavbar = () => {
//   const [isExpanded, setIsExpanded] = useState(true);
// const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   useEffect(() => {
//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   const handleMouseEnter = () => {
//     setIsExpanded(true);
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   const handleMouseLeave = () => {
//     // Start 1-minute timer to auto-close
//     timeoutRef.current = setTimeout(() => {
//       setIsExpanded(false);
//     }, 10000); // 60 seconds
//   };

//   const handleNavLinkClick = () => {
//     // Close navbar when a link is clicked
//     setIsExpanded(false);
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
//   };

//   return (
//     <div 
//       className="bottom-4 right-4 z-50"
//       // onMouseEnter={handleMouseEnter}
//       // onMouseLeave={handleMouseLeave}
//     >
//       <motion.nav 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//         className={clsx(
//           'transition-all duration-500 ease-in-out',
//           'bg-gradient-to-r from-slate-900/90 via-purple-900/90 to-slate-900/90',
//           'backdrop-blur-xl shadow-2xl border border-white/20 rounded-2xl',
//           'navbar-glow hover:shadow-purple-500/25 hover:shadow-2xl',
//           isExpanded 
//             ? 'px-2 py-2 flex gap-1 flex-col w-48' 
//             : 'w-12 h-12 flex items-center justify-center'
//         )}
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//       >
//         <motion.div 
//           className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl"
//           animate={{ 
//             background: [
//               'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))',
//               'linear-gradient(to right, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
//               'linear-gradient(to right, rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))',
//               'linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1))'
//             ]
//           }}
//           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
//         />
        
//         {/* Hamburger menu icon when collapsed */}
//         {!isExpanded && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="text-white text-xl font-bold cursor-pointer"
//           >
//             ☰
//           </motion.div>
//         )}
        
//         {/* Navigation links when expanded */}
//         <AnimatePresence>
//           {isExpanded && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: 'auto' }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3 }}
//               className="flex flex-col gap-1"
//             >
//               {links.map((link, index) => (
//                 <motion.div
//                   key={link.to}
//                   initial={{ opacity: 0, x: 20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: 20 }}
//                   transition={{ delay: index * 0.1, duration: 0.3 }}
//                   whileHover={{ x: 5 }}
//                 >
//                   <NavLink
//                     to={link.to}
//                     onClick={handleNavLinkClick}
//                     className={({ isActive }) =>
//                       clsx(
//                         'relative rounded-xl text-sm font-semibold transition-all duration-300 ease-out',
//                         'flex items-center gap-3 group overflow-hidden',
//                         'transform hover:scale-105 active:scale-95',
//                         'px-3 py-2 w-full',
//                         isActive
//                           ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30'
//                           : 'text-gray-300 hover:text-white hover:bg-white/10',
//                         'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent',
//                         'before:translate-x-[-100%] before:transition-transform before:duration-500',
//                         'hover:before:translate-x-[100%]'
//                       )
//                     }
//                   >
//                     <motion.span 
//                       className="text-lg"
//                       whileHover={{ 
//                         scale: 1.2, 
//                         rotate: [0, -10, 10, -10, 0],
//                         transition: { duration: 0.5 }
//                       }}
//                     >
//                       {link.icon}
//                     </motion.span>
//                     <span className="relative z-10 transition-all duration-300 group-hover:tracking-wide">
//                       {link.label}
//                     </span>
                    
//                     {/* Glow effect on hover */}
//                     <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 
//                                    group-hover:from-blue-400/20 group-hover:via-purple-400/20 group-hover:to-pink-400/20 
//                                    transition-all duration-300 blur-sm"></div>
//                   </NavLink>
//                 </motion.div>
//               ))}
//             </motion.div>
//           )}
//         </AnimatePresence>
        
//         {/* Floating particles effect */}
//         <motion.div 
//           className="absolute -top-1 -left-1 w-2 h-2 bg-blue-400 rounded-full opacity-30"
//           animate={{
//             scale: [1, 1.5, 1],
//             opacity: [0.3, 0.8, 0.3],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             ease: "easeInOut"
//           }}
//         />
//         <motion.div 
//           className="absolute -bottom-1 -right-1 w-2 h-2 bg-purple-400 rounded-full opacity-30"
//           animate={{
//             scale: [1, 1.5, 1],
//             opacity: [0.3, 0.8, 0.3],
//           }}
//           transition={{
//             duration: 2,
//             repeat: Infinity,
//             delay: 1,
//             ease: "easeInOut"
//           }}
//         />
//       </motion.nav>
//     </div>
//   );
// };

// export default FloatingNavbar;

import clsx from "clsx";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home", icon: "🏠" },
  { to: "/employee", label: "Employee", icon: "👥" },
  { to: "/chat", label: "Chat", icon: "💬" },
  { to: "/profile", label: "Profile", icon: "👤" },
  { to: "/login", label: "Login", icon: "🔐" },
  { to: "/practice", label: "Practice", icon: "📝" },
];

const Navbar = () => {
  return (
    <nav className="w-full bg-slate-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo */}
          <div className="text-lg font-bold">MyApp</div>

          {/* Links */}
          <div className="flex gap-6">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  clsx(
                    "flex items-center gap-2 px-3 py-1 rounded-md text-sm transition",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-300 hover:text-white hover:bg-slate-700"
                  )
                }
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
