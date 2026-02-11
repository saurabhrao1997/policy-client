import { useEffect, useState } from "react";

export   const useCounter = ()=>{

    const [timer,setTimer] =useState(0)
    const increment = ()=>{
      setTimer((pre)=> pre+1)
    }
    const reset = ()=>{
      setTimer(0)
    }
    return {
      timer,
      increment,
      reset,
    }
  }


export default function Practice({show}:any) {
    const [user,setUser]= useState("")
const [count,setCount]=useState<number>(0)
  const handleRefresh = ()=>{
setCount((pre)=>pre+1)
  }

  const [email,setEmail] = useState("")

  const handleSubmit = ()=>{
    console.log("submitted")
  }


  useEffect(()=>{
   setTimeout(()=>{
setUser("prasad")
   },500)
  },[])


  return (
    <>
    <h1>Practice</h1>
    <div>{"count :"+ count}</div>
    {/* <input type="text" onChange={handleRefresh}/> */}
     <button onClick={handleRefresh}>Increment</button>
   {show ? "login" : "signup"}
   
   <label htmlFor="email">Email</label>
   <input id="email" type="text" onChange={(e)=>setEmail(e?.target?.value)} />
      {email}
   {!user ? "loading" :  "prasad"}

  <Button onClick={handleSubmit} />
    </>
  );
}

export const Button = ({onClick}:any)=>{
  return <button onClick={onClick}>click</button>
}


