import React, { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import clsx from 'clsx';
import FullFeatureTable from "../../../component/ReactTable/tableData";
import { useGetAllPolicysQuery } from "../../../API/Policy/policy";
import moment from "moment";
import { policyColumn } from "../../../ReactColumn";
import { downloadPolicyApi } from "../../../HelpingApi";
import { Shield, FileText, Download, Eye, Search, Filter } from 'lucide-react';
import Sidebar from "../../../component/SideBar";

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

export default function PolicyIndex() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // const data = Array.from({ length: 1000 }).map((_, i) => ({
  //   id: i + 1,
  //   name: `Name ${i + 1}`,
  //   age: 20 + (i % 30),
  //   email: `user${i + 1}@example.com`,
  //   address: `Address ${i + 1}`,
  // }));

  const { data: policyList } = useGetAllPolicysQuery();
  console.log("policyList", policyList);

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
          <FileText className="w-16 h-16 text-purple-300 drop-shadow-lg" />
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
          Policy Management Dashboard
        </motion.h1>
        
        <motion.p 
          className="text-lg md:text-xl text-purple-200 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Comprehensive policy management with advanced features and real-time insights
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
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Total Policies</p>
                <p className="text-2xl font-bold text-white">{policyList?.data?.length || 0}</p>
              </div>
              <Shield className="w-8 h-8 text-purple-300" />
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Active Policies</p>
                <p className="text-2xl font-bold text-white">{(policyList?.data as any)?.filter((p: any) => p.policyDetails && p.policyDetails.length > 0)?.length || 0}</p>
              </div>
              <Eye className="w-8 h-8 text-green-400" />
            </div>
          </motion.div>

          <motion.div
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Downloads</p>
                <p className="text-2xl font-bold text-white">127</p>
              </div>
              <Download className="w-8 h-8 text-blue-400" />
            </div>
          </motion.div>
        </div>

        {/* Enhanced Table Container */}
        <motion.div
          className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          whileHover={{ boxShadow: "0 25px 50px rgba(139, 92, 246, 0.3)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <motion.h2 
              className="text-2xl font-bold text-white flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <FileText className="w-8 h-8 text-purple-300" />
              Policy Table - Advanced Features
            </motion.h2>
            
            <motion.div 
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-purple-600/50 text-white rounded-lg hover:bg-purple-600/70 transition-all duration-300 border border-purple-400/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-4 h-4" />
                Search
              </motion.button>
              <motion.button
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600/50 text-white rounded-lg hover:bg-indigo-600/70 transition-all duration-300 border border-indigo-400/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Filter className="w-4 h-4" />
                Filter
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="overflow-hidden rounded-2xl"
          >
            <FullFeatureTable 
              data={policyList?.data as any || []} 
              parentColumn={policyColumn as any} 
              showDelete={true}
              showEdit={true}
              showDownload={true}
              handleDownload={(row: any) => {
                console.log("Download", row, 1111);
                downloadPolicyApi(row?.policyDetails?.[0]?.policyNumber);
              }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
