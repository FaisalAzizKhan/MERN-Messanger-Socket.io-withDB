import axios from "axios"

export const Signup: React.FC = () => {


    const handleSignup = async (e: React.FormEvent<HTMLFormElement>) : Promise<any> => {
                e.preventDefault()
                const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries())
               try {
                console.log(formData)
                const res = await axios.post('http://localhost:9002/signup', formData)
                console.log(res)
                
               } catch (err) {
                console.error(err)
                
               }
           
                
    }
        
        return (<div className=" m-auto h-screen w-screen">
                    <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Messager Signup</h2>
            <form onSubmit={handleSignup}>
            <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="username">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
              
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="username">
                  Email
                </label>
                <input
                  name="email"
                  type="text"
            
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your username"
                />
              </div>
              
              <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">
              Password
            </label>
            <input
              type="text"
              name="password"
    
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        </div>)
    }