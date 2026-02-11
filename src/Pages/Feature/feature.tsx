import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  useCreatePolicyTypeMutation,
  useGetAllPolicyTypeQuery,
} from '../../API/Policy/policy';
import {
  useCreateRoleMutation,
  useGetAllRoleQuery,
} from '../../API/userAPI/userApi';

const roleSchema = yup.object().shape({
  roleName: yup.string().required('Role is required'),
});

const policySchema = yup.object().shape({
  type: yup.string().required('Policy Type is required'),
});

export default function Feature() {
  const [createRole] = useCreateRoleMutation();
  const { data: userRoleTypeData } = useGetAllRoleQuery();

  const [createPolicy] = useCreatePolicyTypeMutation();
  const { data: policyTypeData } = useGetAllPolicyTypeQuery();


  console.log("adklak",userRoleTypeData,policyTypeData)
  const {
    register: registerRole,
    handleSubmit: handleSubmitRole,
    reset: resetRoleForm,
    formState: { errors: roleErrors },
  } = useForm({
    resolver: yupResolver(roleSchema),
  });

  const {
    register: registerPolicy,
    handleSubmit: handleSubmitPolicy,
    reset: resetPolicyForm,
    formState: { errors: policyErrors },
  } = useForm({
    resolver: yupResolver(policySchema),
  });

  const submitRole = async (data) => {
    try {
      await createRole({ label: data.roleName }).unwrap();
      alert('Role created successfully');
      resetRoleForm();
    } catch (err) {
      console.error(err);
      alert('Failed to create role');
    }
  };

  const submitPolicyType = async (data) => {
    try {
      await createPolicy({ label: data.type }).unwrap();
      alert('Policy Type created successfully');
      resetPolicyForm();
    } catch (err) {
      console.error(err);
      alert('Failed to create policy type');
    }
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 p-4 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-900  transition-colors duration-300 mt-20">
      {/* Role Form */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-3">Add Role</h2>
        <form onSubmit={handleSubmitRole(submitRole)} className="space-y-3">
          <div>
            <input
              {...registerRole('roleName')}
              type="text"
              placeholder="Enter role name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded outline-none focus:ring-2 focus:ring-blue-500"
            />
            {roleErrors.roleName && (
              <p className="text-red-400 text-sm mt-1">
                {roleErrors.roleName.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Submit Role
          </button>
        </form>
        <div>
            <div className='font-bold'>Present Role</div>
          {
            userRoleTypeData?.data?.map((obj:{label:string,value:string})=>{
                return(
                    <div>
                       {obj?.label}
                    </div>
                )
            })
          }
        </div>
      </div>

      {/* Policy Type Form */}
      <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-3">Add Policy Type</h2>
        <form onSubmit={handleSubmitPolicy(submitPolicyType)} className="space-y-3">
          <div>
            <input
              {...registerPolicy('type')}
              type="text"
              placeholder="Enter policy type"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded outline-none focus:ring-2 focus:ring-green-500"
            />
            {policyErrors.type && (
              <p className="text-red-400 text-sm mt-1">
                {policyErrors.type.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Submit Policy Type
          </button>
        </form>
           <div>
            <div className='font-bold'>Present Policy type</div>
          {
            policyTypeData?.data?.map((obj:{label:string,value:string})=>{
                return(
                    <div>
                       {obj?.label}
                    </div>
                )
            })
          }
        </div>
      </div>
    </div>
  );
}
