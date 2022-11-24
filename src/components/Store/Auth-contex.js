import React,{useState,useEffect} from 'react'

const AuthContext =React.createContext({
   // we are doning nothing with data it is a jsut Dummy data for Auto Suggestion
   isLoggedIn : false,
   onLogin : ()=>{},
   onLogout: (email,password) =>{}
});

export const AuthContextProvider = (props) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(()=>{
      const storedUserLoggedInformation = localStorage.getItem("isLoggedIn");

      if (storedUserLoggedInformation=== '1'){
         setIsLoggedIn (true)
      }

   },[]);

   const loginHandler = () => {
     localStorage.setItem("isLoggedIn", "1");
     setIsLoggedIn(true);
   };
   const logoutHandler = () => {
     localStorage.removeItem("isLoggedIn");
     setIsLoggedIn(false);
   };

   return (
     <AuthContext.Provider
       value={{
         isLoggedIn: isLoggedIn,
         onLogin: loginHandler,
         onLogout: logoutHandler,
       }}
     >
       {props.children}
     </AuthContext.Provider>
   );

   
}

export default AuthContext;