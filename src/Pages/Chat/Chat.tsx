import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { useGetMassagesBetweenUsersQuery, useGetSidebarUserListQuery, useSendMassageMutation } from '../../API/ChatApi';

export const socket = io("http://localhost:5000",{
  query:{
    token: localStorage.getItem('token') ? localStorage.getItem('token')  : '',
    userId: localStorage.getItem('userId') ?    localStorage.getItem('userId')  : ''
  } 
  
});

interface Message {
  createdAt: string;
  image: null;
  messageText: string;
  receiverId: string;
  seen: boolean;
  senderId: string;
  updatedAt: string;
  __v?: number;
  _id: string;
}

const Chat: React.FC = () => {
  const  params = new URLSearchParams(window.location.search);
const receiverId = params.get('id');

// apis -------------------
     const {data: sidebarUserList} = useGetSidebarUserListQuery();
     const {data:massageBetweenUser}= useGetMassagesBetweenUsersQuery(receiverId!);
       const [sendMassage] = useSendMassageMutation();

       // states
       const [isConnected,setIsConnected] = useState(socket.connected);
       const [fooEvent,setFooEvent] = useState<any[]>([]);
       console.log("jldskdl",massageBetweenUser,fooEvent)


useEffect(()=>{
  if(massageBetweenUser?.data){
  setMessages(massageBetweenUser?.data)   
  }
     
},[massageBetweenUser?.data]);

useEffect(() => {
  const handleNewMessage = (msg: any) => {
    console.log("new-message", msg);
    setMessages((prev) => [...prev, msg]);
  };

  socket.on("new-message", handleNewMessage);

  console.log("isConnected", isConnected);

  return () => {
    socket.off("new-message", handleNewMessage);
  };
}, [socket]);

    

 let onConnect = useCallback(()=>{
     
     setIsConnected(true)
socket.on("getOnlineUsers",(userIds:any)=>{
  console.log("sdkjgkjskj",userIds)

})

  },[setIsConnected])
 let onDisconnect =useCallback(()=>{
  setIsConnected(false)

 },[setIsConnected])
  let onFooEvent = useCallback((value:any)=>{
   setFooEvent((pre:any)=> ([...pre,value]))
 },[setFooEvent])
useEffect(()=>{

 socket.on("connect",onConnect);
 socket.on("disconnect",onDisconnect);
 socket.on("foo",onFooEvent);


 return ()=>{
   socket.off("connect",onConnect);
 socket.off("disconnect",onDisconnect);
 socket.off("foo",onFooEvent);
 }


})








  const [messages, setMessages] = useState<Message[]>([
    {
      createdAt: "",
      image: null,
      messageText: "how are you?",
      receiverId: "",
      seen: false,
      senderId: "",
      updatedAt: "",
      __v: 0,
      _id: "",
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // const [createChat] = useCreateChatMutation();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
     setIsLoading(true);
     
 let aa: any =    {
        id: Math.floor(Math.random()* 1000),
      text: inputValue,
      sender:"bot",
      timestamp: new Date(),
      name:"pawan"

     }

     socket.timeout(1000).emit("send_message",aa,()=>{
      setIsLoading(false)
     })
     sendMassage({
      // id:receiverId,
      // message:inputValue,
     receiverId,
     messageText:inputValue,
     image :null
     });

      let bb: Message =    {
   
        createdAt:"",
  image: null,
  messageText: inputValue,
  receiverId: receiverId!,
  seen: false,
  senderId: "",
  updatedAt: "",
  __v: 0,
  _id: "",

     }

         setMessages((prev) => [...prev, bb]);
         setInputValue("")
    

  };


    useEffect(() => {
    // receive message from server
    socket.on("receive_message", (data) => {
      console.log("receive_message",data)
      setMessages((prev) => [...prev, data]);
    });

    // cleanup
    return () => {
      socket.off("receive_message");
    };
  }, []);
const navigate = useNavigate();
  return (
    <div className='flex gap-2'>

   
    <div className="w-1/4 h-screen bg-gray-800 text-white p-4">
      <h2 className="text-lg font-semibold mb-4">Sidebar Users</h2>
      <ul>
        {Array.isArray(sidebarUserList?.data) && sidebarUserList?.data.map((user: any) => (
          <li key={user._id} className="mb-2 p-2 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer"
          onClick={() => navigate(`/chat?id=${user._id}`)}>
            <div className="font-medium">{user.Name}</div>
            <div className="text-sm text-gray-400">{user.email}</div>   
          </li>
        ))}
      </ul>

    </div>


    <div className="flex flex-col h-screen bg-gray-900 w-full">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 shadow-lg">
        <h1 className="text-xl font-semibold">AI Chat Assistant</h1>
        <p className="text-blue-100 text-sm">Ask me anything!</p>
      </div>

      {/* Messages Container */}
      <div className=" flex-1 overflow-y-auto p-4 space-y-4">
        {/* <div><button className='border-2 p-2 bg-blue-400 text-white' onClick={onConnect}>connect</button></div>
        <div><input type="text" value={name} onChange={(e)=>{setName(e?.target?.value)}}/></div>
        <div><button className='border-2 p-2 bg-blue-400 text-white' onClick={onDisconnect}>Disconnect</button></div> */}
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${message.receiverId ===  receiverId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.receiverId ===  receiverId
                  ? ' bg-gray-500 text-gray-800 rounded-bl-none shadow-md'
                  : 'bg-blue-500 text-white rounded-br-none'
              }`}
            >
              <p className="text-sm">{message.messageText}</p>
              <p className={`text-xs mt-1 ${
                message.receiverId ===  receiverId ? 'text-blue-100' : 'text-gray-500'
              }`}>
                {/* {message?.timestamp?.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })} */}
              </p>
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {/* {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 rounded-lg rounded-bl-none shadow-md px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )} */}
        
        {/* <div ref={messagesEndRef} /> */}
      </div>

      {/* Input Form */}
      <div className="bg-gray-800 border-t border-gray-700 p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="   flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 placeholder:text-white text-white"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>
    </div>
     </div>
  );
};

export default Chat;
