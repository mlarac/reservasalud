import { createContext, useState } from "react"; 
export const UsuarioContext = createContext(); 
const UsuarioProvider = ({ children }) => {  
    //const [usuario, setUsuario] = useState(null)
    const [usuario, setUsuario] = useState(
        {email:"enrique@asd.cl", displayName: "Enrique P."}
    )
    return (    
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>      
    {children}    
    </UsuarioContext.Provider>  ); 
    }
export default UsuarioProvider;