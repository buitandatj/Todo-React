import React, { createContext, useState } from 'react';


export interface LoadingContextType {
    loading: boolean;
    setLoading: (value: boolean) => void;
}
type ChildrenProps = { children: JSX.Element };
export const loadingContext = createContext<LoadingContextType | null>(null)
export const loadingProvider = ({ children }: ChildrenProps) => {
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(true)
    return (
        <loadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </loadingContext.Provider>
    )
}
