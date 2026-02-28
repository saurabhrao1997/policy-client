
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery } from '../../API/userAPI/userApi';
import { clearToken } from '../../store/Slice/TokenSlice';





const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const userId = useSelector((state: any) => state.tokenSlice.userId);
    
    const {data:profielData} = useGetUserByIdQuery(userId)

console.log("profile data",profielData,userId)
  const user = {
    name: (profielData as any)?.data?.Name,
    email: (profielData as any)?.data?.email,
    phone: (profielData as any)?.data?.Mobile,
    location: 'Pune, India',
    role: (profielData as any)?.data?.role?.label,
    bio: 'MERN Developer passionate about React, Node.js, and building scalable apps.',
    avatar: 'https://i.pravatar.cc/150?img=3', // Example image
  };

  return (
    <div className=" py-10 px-4 flex justify-center">
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-6 rounded-2xl shadow-md max-w-2xl w-full">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <img
            src={user.avatar}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-white">{user.name}</h2>
            <p className="text-white">{user.email}</p>
            <p className="text-white">{user.phone}</p>
            <p className="text-white">{user.location}</p>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-semibold text-white mb-2">About Me</h3>
          <p className="text-white">{user.bio}</p>
        </div>

        <div className="mt-6 flex justify-end gap-4">
                <button className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
             onClick={()=>{
                navigate("/")
             }}
             >
           Back To Home
          </button>
             <button className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200"
             onClick={()=>{
                  dispatch(clearToken());
                  navigate("/login")
             }}
             >
           Log Out
          </button>
          <button className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
