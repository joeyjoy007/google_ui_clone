import React,{ createContext } from "react";

interface LensContextType {
  capturedImage: string;
  setCapturedImage: (image: string) => void;
  scrollEnabled:boolean;
  setScrollEnabled: (scrollEnabled: boolean) => void;
}

export const LensContext = createContext<LensContextType | null>(null);

export const LensContextprovider = ({ children }:any) => {

  const [capturedImage, setCapturedImage] = React.useState<string>('')
  const [scrollEnabled, setScrollEnabled] = React.useState<boolean>(true); 
  

  return (
    <LensContext.Provider
      value={{capturedImage,setCapturedImage,scrollEnabled, setScrollEnabled}}
    >
      {children}
    </LensContext.Provider>
  );
};








