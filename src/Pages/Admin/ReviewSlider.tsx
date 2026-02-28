import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const reviews = [
  {
    name: 'Priya Sharma',
    role: 'Business Owner',
    image: 'https://i.pravatar.cc/100?img=1',
    review: 'SecureLife made getting comprehensive insurance coverage incredibly simple. Their term life policy gave my family the security we needed.',
    rating: 5,
    policyType: 'Term Life Insurance'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Software Engineer',
    image: 'https://i.pravatar.cc/100?img=3',
    review: 'The health insurance claim process was seamless. They covered my surgery expenses without any hassle. Excellent customer service!',
    rating: 5,
    policyType: 'Health Insurance'
  },
  {
    name: 'Maria D\'souza',
    role: 'Teacher',
    image: 'https://i.pravatar.cc/100?img=5',
    review: 'Their endowment plan helped me save for my daughter\'s education while providing life coverage. Best investment decision ever!',
    rating: 5,
    policyType: 'Endowment Plan'
  },
  {
    name: 'Amit Patel',
    role: 'Retired Government Officer',
    image: 'https://i.pravatar.cc/100?img=7',
    review: 'The pension plan ensures I have a steady income post-retirement. The team guided me through every step of the process.',
    rating: 5,
    policyType: 'Pension Plan'
  },
  {
    name: 'Sneha Reddy',
    role: 'Marketing Manager',
    image: 'https://i.pravatar.cc/100?img=9',
    review: 'Quick policy approval and competitive premiums. Their money-back policy is perfect for my financial planning needs.',
    rating: 5,
    policyType: 'Money Back Policy'
  },
];

const slideVariants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -100 },
};

const ClientReviewSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % reviews.length);
    }, 6000); // Increased to 6 seconds for better readability
    return () => clearInterval(interval);
  }, []);

  const { name, role, image, review } = reviews[current];

  // const renderStars = (rating) => {
  //   return Array.from({ length: 5 }, (_, index) => (
  //     <span
  //       key={index}
  //       className={`text-xl ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}
  //     >
  //       ★
  //     </span>
  //   ));
  // };

  return (
    <div className="bg-purple-600 text-white py-16 px-4 flex justify-center">
      <div className="max-w-xl w-full text-center relative overflow-hidden min-h-[250px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 px-6"
          >
            <img
              src={image}
              alt={name}
              className="w-20 h-20 mx-auto rounded-full border-4 border-white mb-4 shadow-md"
            />
            <p className="italic text-lg mb-4">“{review}”</p>
            <h3 className="text-xl font-semibold">{name}</h3>
            <p className="text-white/70">{role}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ClientReviewSlider;
