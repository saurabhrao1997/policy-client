


// PolicyForm.jsx
import { useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { User, FileText, Calendar, MapPin, CreditCard, Users, Plus, Send } from 'lucide-react';
import { useCreatePolicyMutation, useGetAllPolicyTypeQuery } from '../../../API/Policy/policy';
import { ToastContainer, toast } from 'react-toastify';
import { paymentModeOptions } from '../../../Helper';
import { useGetAllEmployeeQuery, useGetAllRoleQuery } from '../../../API/userAPI/userApi';
import { useNavigate } from 'react-router-dom';


// Yup schema for validation
const schema = yup.object().shape({
  clientName: yup.string().required(),
  number: yup.string(),
  email: yup.string().email().required(),
  dateOfBirth: yup.string().required(),
  address: yup.string().required(),
  policyDetails: yup.array().of(
    yup.object().shape({
      salesmanId: yup.string().required(),
      policyType: yup.string().required(),
      sumAssured: yup.string().required(),
      paymentMode: yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      }),
      PremiumDueDate: yup.string().required(),
      PremiumStartDate: yup.string().required(),
      PremiumEndDate: yup.string().required(),
      nomineeDetails: yup.array().of(
        yup.object().shape({
          name: yup.string().required(),
          relation: yup.string().required(),
          gender: yup.string().required(),
          address: yup.string().required(),
        })
      ),
    })
  ),
});

const PolicyForm = () => {
const navigate = useNavigate()
const [CreatePolicy] = useCreatePolicyMutation()
  const { data: policyTypeData } = useGetAllPolicyTypeQuery();
  const {data:getAllEmployeeData} = useGetAllEmployeeQuery();
  const {data:roleData} =useGetAllRoleQuery()

console.log("slflsk",getAllEmployeeData,roleData)

const getRole = (_employeeId: any, roleId: any) => {
  console.log("roleData",roleData,roleId)
  return (roleData as any)?.data?.find((role: any) => role._id === roleId)?.label || '';
}
const employeeOptions = useMemo(()=>{
  return (getAllEmployeeData as any)?.data?.map((employee: any) => ({
    label: `${employee.Name} ${getRole(employee._id,employee.role)}` ,
    value: employee._id
  })) || [];
},[getAllEmployeeData])

  const {
    register,
    control,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      clientName: '',
      number: '',
      email: '',
      dateOfBirth: '',
      address: '',
      policyDetails: [
        {
          salesmanId: '',
          policyType: "",
          sumAssured: '',
          paymentMode: { label: '', value: '' },
          PremiumDueDate: '',
          PremiumStartDate: '',
          PremiumEndDate: '',
          nomineeDetails: [
            { name: '', relation: '', gender: '', address: '' },
          ],
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'policyDetails',
  });

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
    CreatePolicy({
      ...data
    }).then((res: any)=>{
      console.log("response success",res)
      if(res?.data?.status == 200){
       toast.success(`Successfully policy created`);
       navigate("/employee/policyindex")
      }else{
        toast.error(`${res?.error?.data?.message}`);
      }
    }).catch((err: any)=>{
      console.log("response",err)
        toast.error(`${err?.error?.data?.message}`);
    })

    // API call here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-8"
    >
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 px-8 py-6">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-3xl font-bold text-white flex items-center gap-3"
            >
              <FileText className="w-8 h-8" />
              Create New Policy
            </motion.h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* Client Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Client Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Client Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('clientName')}
                      placeholder="Enter client name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                    />
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <input
                    {...register('number')}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    {...register('email')}
                    type="email"
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                  />
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      {...register('dateOfBirth')}
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                    />
                  </div>
                </motion.div>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
                className="space-y-2"
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <textarea
                    {...register('address')}
                    placeholder="Enter complete address"
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 resize-none"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Policy Details Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Policy Details</h2>
              </div>

              {fields.map((field, policyIndex) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: policyIndex * 0.1 }}
                  whileHover={{ scale: 1.01 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-750 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Policy Type */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Policy Type</label>
                      <div className="relative">
                        <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          {...register(`policyDetails.${policyIndex}.policyType`)}
                          className="w-full pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 appearance-none cursor-pointer"
                        >
                          <option value="">Select Policy Type</option>
                          {(policyTypeData as any)?.data?.map((opt: any) => (
                            <option key={opt.value} value={opt?._id}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    {/* Salesman */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Salesman</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          {...register(`policyDetails.${policyIndex}.salesmanId`)}
                          className="w-full pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 appearance-none cursor-pointer"
                        >
                          <option value="">Select Salesman</option>
                          {employeeOptions?.map((opt: any, index: number) => (
                            <option key={index} value={opt?.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    {/* Sum Assured */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sum Assured</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...register(`policyDetails.${policyIndex}.sumAssured`)}
                          placeholder="Enter sum assured"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                        />
                      </div>
                    </motion.div>

                    {/* Payment Mode */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Mode</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                          {...register(`policyDetails.${policyIndex}.paymentMode.label`)}
                          className="w-full pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500 appearance-none cursor-pointer"
                        >
                          <option value="">Select Payment Mode</option>
                          {paymentModeOptions.map((opt: any) => (
                            <option key={opt.value} value={opt.label}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>

                    {/* Payment Value */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Payment Value</label>
                      <input
                        {...register(`policyDetails.${policyIndex}.paymentMode.value`)}
                        placeholder="Enter payment value"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                      />
                    </motion.div>

                    {/* Premium Start Date */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Premium Start Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...register(`policyDetails.${policyIndex}.PremiumStartDate`)}
                          type="date"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                        />
                      </div>
                    </motion.div>

                    {/* Premium Due Date */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Premium Due Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...register(`policyDetails.${policyIndex}.PremiumDueDate`)}
                          type="date"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                        />
                      </div>
                    </motion.div>

                    {/* Premium End Date */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Premium End Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          {...register(`policyDetails.${policyIndex}.PremiumEndDate`)}
                          type="date"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                        />
                      </div>
                    </motion.div>
                  </div>

                  {/* Nominee Details */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="col-span-full mt-6"
                  >
                    <h3 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Nominee Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <input
                          {...register(`policyDetails.${policyIndex}.nomineeDetails.0.name`)}
                          placeholder="Nominee Name"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <input
                          {...register(`policyDetails.${policyIndex}.nomineeDetails.0.relation`)}
                          placeholder="Relation"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <input
                          {...register(`policyDetails.${policyIndex}.nomineeDetails.0.gender`)}
                          placeholder="Gender"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                        />
                      </motion.div>
                      <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                        <input
                          {...register(`policyDetails.${policyIndex}.nomineeDetails.0.address`)}
                          placeholder="Nominee Address"
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    append({
                      salesmanId: '',
                      policyType: '',
                      sumAssured: '',
                      paymentMode: { label: '', value: '' },
                      PremiumDueDate: '',
                      PremiumStartDate: '',
                      PremiumEndDate: '',
                      nomineeDetails: [
                        { name: '', relation: '', gender: '', address: '' },
                      ],
                    })
                  }
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Add Another Policy
                </motion.button>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-green-700 dark:to-green-800 dark:hover:from-green-800 dark:hover:to-green-900 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 font-medium"
                >
                  <Send className="w-5 h-5" />
                  Submit Policy
                </motion.button>
              </div>
            </motion.div>
          </form>
        </motion.div>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </motion.div>
  );
};

export default PolicyForm;

