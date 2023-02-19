import { useState } from "react";
import { createContext } from "react";


export const CounterContext = createContext();

export const CounterProvider = ({children})=>{
    const [counter , setCounter] = useState(5);
    return(
        <CounterContext.Provider value={{counter,setCounter}}>
            {children}
        </CounterContext.Provider>
    )

}