import BottomSheet from "@gorhom/bottom-sheet";
import React,{ createContext } from "react";

interface BottomSheetContextType {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

export const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

export const BottomSheetContextprovider = ({ children }:any) => {

  const bottomSheetRef = React.useRef<any>(null)

  return (
    <BottomSheetContext.Provider
      value={{bottomSheetRef}}
    >
      {children}
    </BottomSheetContext.Provider>
  );
};








