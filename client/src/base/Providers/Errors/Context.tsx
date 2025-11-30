import React, { createContext } from "react"


interface IErrorContext {
    parseErrorMessage: (error: string) => any
}

const Context = createContext<Partial<IErrorContext>>({})

export default Context