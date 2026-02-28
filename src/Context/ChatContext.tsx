import { createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';


interface ChatContextType {
    socket: Socket | null;
    setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
    getOnlineUsers: any[];
}
export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [getOnlineUsers, setGetOnlineUsers] = useState<any[]>([]);
  


    // call api of chat server
    //  const {data: sidebarUserList} = useGetSidebarUserListQuery();

//  const {data:massageBetweenUser}= useGetMassagesBetweenUsersQuery(selecedUser?._id!);
 
//  const {data: unseenMassagesList} = useMarkmassagesAsSeenQuery(selecedUser?._id!);
//   const [sendMassage] = useSendMassageMutation();






  const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        const newSocket = io(apiUrl, {
            transports: ['websocket'],
            query:{
                token: localStorage.getItem('token') || '',
                userId: localStorage.getItem('userId') || ''
            }
        });  
        setSocket(newSocket);
   
         newSocket.on('connect', () => {
            console.log('Connected to chat server');
        })
        newSocket.on("getOnlineUsers", (users:any) => {
            console.log("Online Users:", users);
                  setGetOnlineUsers(users);
        })


        // return () => {
        //     newSocket.close();
        // };  
    }, []);

    return (
        <ChatContext.Provider value={{ socket, setSocket ,getOnlineUsers}}>
            {children}
        </ChatContext.Provider>
    );
}