import React, { useMemo, useState, useEffect } from 'react'
import { motion } from 'framer-motion';
import clsx from 'clsx';
import FullFeatureTable from '../../component/ReactTable/tableData';
import { useGetAllRoleQuery, useGetAllUsersQuery } from '../../API/userAPI/userApi';
import Sidebar from '../../component/SideBar';
import { Outlet } from 'react-router-dom';
import { userColumn } from '../../ReactColumn';
import { Users, Shield, UserCheck, Settings, Search, Filter } from 'lucide-react';

const FloatingOrb = ({ delay = 0, size = 'w-32 h-32' }) => (
  <motion.div
    className={clsx(
      'absolute rounded-full blur-xl opacity-10',
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

export default function userIndex() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

    const data = Array.from({ length: 1000 }).map((_, i) => ({
  id: i + 1,
  name: `Name ${i + 1}`,
  age: 20 + (i % 30),
  email: `user${i + 1}@example.com`,
  address: `Address ${i + 1}`,
}));


const {data:userList}= useGetAllUsersQuery()
const {data:roleData}= useGetAllRoleQuery()
console.log("slflsk",userList?.data,roleData?.data)
const getCurrentRoleById=(id)=>{
 let result = roleData?.data?.filter((obj)=>  obj?._id == id)

  return result?.length > 0 ? result[0] : {label:"Admin",value:"Admin"}
}

const tableData =useMemo(()=>{
  if(userList?.data?.length > 0){
      return  userList?.data?.map((obj:any)=>({...obj,role:getCurrentRoleById(obj?.role)??{label:"Admin",value:"Admin"}}))
  }
},[userList?.data])


  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Floating orbs background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <FloatingOrb delay={0} size="w-40 h-40" />
        <FloatingOrb delay={2} size="w-28 h-28" />
        <FloatingOrb delay={4} size="w-36 h-36" />
        <FloatingOrb delay={6} size="w-24 h-24" />
      </div>

      {/* Animated background gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-800 to-indigo-900"
        animate={{
          background: [
            "linear-gradient(45deg, #0f172a, #581c87)",
            "linear-gradient(90deg, #312e81, #1e1b4b)",
            "linear-gradient(135deg, #374151, #6b21a8)",
            "linear-gradient(45deg, #0f172a, #581c87)",
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Mouse follower effect */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Header Section */}
      <motion.header 
        className="relative flex flex-col items-center justify-center text-center py-16 px-4 z-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="relative mb-6"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          <Users className="w-16 h-16 text-purple-300 drop-shadow-lg" />
          <motion.div
            className="absolute inset-0 w-16 h-16 rounded-full bg-purple-400/20"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
        >
          User Management Dashboard
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Comprehensive user management with advanced features and real-time insights
        </motion.p>
      </motion.header>

      {/* Main Content Container */}
      <motion.div 
        className="relative max-w-7xl mx-auto mt-6 px-4 z-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Users className="w-8 h-8 text-blue-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{userList?.length || 0}</h3>
                <p className="text-blue-200">Total Users</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <UserCheck className="w-8 h-8 text-green-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{roleData?.length || 0}</h3>
                <p className="text-green-200">Active Roles</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.02, y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Shield className="w-8 h-8 text-purple-300" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Admin</h3>
                <p className="text-purple-200">Access Level</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Table Section */}
        <motion.div
          className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Settings className="w-6 h-6 text-purple-300" />
              <h2 className="text-2xl font-bold text-white">User Management Table</h2>
            </div>
            <p className="text-purple-200">Manage users with advanced filtering and controls</p>
          </div>
          
          <div className="p-6">
            <FullFeatureTable data={tableData??[]} parentColumn={userColumn as any} />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
