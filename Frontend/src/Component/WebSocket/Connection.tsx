import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

interface User {
  email?: string,
  name?: string,
  password?: string,
  socketId?: string,
  _id? : string,
  _v? : string,
}


export const Connection: React.FC = () => {
    const [socketId, setSocketId] = useState<string>("")
    const {receiverUserId} = useParams<string>()
    const [currentUserId, setCurrentUserId] = useState<string>("")
    const [allUsers, setAlUsers] = useState<[]>([])
    const [currentUser, setCurrentUser] = useState<User>({})
    const [messages, setMessages] = useState<{ content: string; from: string, senderid: string, name: string}[]>([]);
    const navigate = useNavigate()

    

    const socket = useMemo(
        () =>
          io("http://localhost:9002", {
            withCredentials: true,
            transports: ['websocket'],
          }),
        []
      );

      const insertIdInDatabase = async ({ currentUserId, socketId }: { currentUserId: string; socketId: string | undefined }): Promise<any> => {
        try {
          const res = await axios.post("http://localhost:9002/insertSocketId/InDatabase", { 
            userId: currentUserId, socketId 
          })
          console.log(res)
         } catch (error) {
          console.error(error)
            
         }
          
      }
      const getAllUsers = async (): Promise<any> => {
        try {
          // For Current User
          const userstring = localStorage.getItem("currentUser")
          if (userstring) {
            const user: User = JSON.parse(userstring)
            setCurrentUser(user);
            setCurrentUserId(user._id as string)
        }
          // For All User
          const res = await axios.get("http://localhost:9002/getAllUsers")
          console.log(res)
          setAlUsers(res.data)

         } catch (error) {
          console.error(error)
            
         }
          
      }
     
      interface Message {
        content: string;
        timestamp: number;
      }

      useEffect(() => {
        getAllUsers()

     
      }, []);
      useEffect(() => {
        socket.on("connect", () => {
          setSocketId(socket.id as string);
          
          socket.on('privateMessage', (data: Message) => {
            console.warn('received data', data); // Log received data for debugging
            setMessages((prev: any) => prev.content !== data.content ? [...prev as any, data] : prev)
          });
          
          socket.on('disconnect', () => {
            console.warn('User disconnect', socket.id); // Log received data for debugging
            // setMessages((prev) => [...prevMessages, data]);
          });


         
         
        });
      


      }, [])

      useEffect(() => {
        if (socketId && currentUserId) {
          console.log(socketId, "socket?.idsocket?.id")
          
        insertIdInDatabase({ currentUserId: currentUserId, socketId: socketId})
      }
        
      }, [socketId])


      const handleMesageSent = async (e: React.FormEvent<HTMLFormElement>) : Promise<any> => {
        e.preventDefault()
        const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries())
        console.log(formData) // formData.receiveruserid, formData.message
      if(!!(formData.receiveruserid as string).length) {
        const res = await axios.get(`http://localhost:9002/getSingleUser/${formData.receiveruserid}`)
        console.log(res)

        socket.emit('privateMessage', { content: formData.message, to: res.data.socketId, name: currentUser.name, senderid: currentUser._id   });
        setMessages((prev: any) => prev.content !== formData.message ? [...prev as any, {content: formData.message, name: currentUser.name, senderid: currentUser._id}] : prev)
      
        
      }

        

      }    
    


    return <div className="flex h-screen w-screen">
    <div className="w-1/3 bg-sky-200 flex flex-col p-4">
      <div className="text-2xl text-blue-200 my-2 mx-auto bg-blue-800 text-center p-2 rounded-lg">
        All Chats
      </div>
      {!!allUsers?.length && allUsers
        .filter((f: any) => f._id !== currentUser._id)
        .map((u: any, index: number) => (
          <div
            key={index}
            onClick={() => navigate(`/Home/${u._id}`, { replace: true })}
            className={`flex gap-3 w-full border rounded-lg p-3 cursor-pointer ${u.socketId ? 'bg-green-500' : 'bg-green-200'}`}
          >
            <div className="whitespace-normal">{u.name || ""}</div>
          </div>
        ))}
    </div>
    
    <div className="flex-1 flex flex-col p-4">
      <div className="w-full mb-4">
        <div onClick={() => console.log(messages)} className="text-green-500 text-3xl flex w-full items-start">
          Current User {currentUserId && socketId && currentUser.name || ""}
        </div>
      </div>
      
      <div className="flex flex-col flex-1 gap-4 overflow-y-auto">
        {messages.map((m: any) => (
          <div key={m._id} className="flex justify-start">
            {m.senderid !== currentUserId ? (
              <div className="flex gap-1 text-sm">
                <div className="text-xs p-2 w-8 h-8 flex items-center justify-center bg-yellow-300 rounded-full">{m.name.slice(0,1)}</div>
                <div className="p-2 bg-blue-100 rounded-lg">{m.content}</div>
              </div>
            ) : (
              <div className="flex gap-1 text-sm justify-end w-full">
                <div className="p-2 bg-blue-100 rounded-lg">{m.content}</div>
                <div className="text-xs p-2 w-8 h-8 flex items-center justify-center bg-yellow-300 rounded-full">{m.name.slice(0,1)}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <form className="flex gap-2 mt-4" onSubmit={handleMesageSent}>
        <input
          type="text"
          name="message"
          id="message"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your Message"
        />
        <input type="hidden" name="receiveruserid" value={receiverUserId} />
        <button
          type="submit"
          className="px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  </div>
  
}

