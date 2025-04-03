import React,{ createContext } from "react";
import { useSharedValue } from "react-native-reanimated";
import { cropToolDimensions } from "../utils/appData";
import { deviceWidth } from "../utils/styles";

interface CropToolContextType {
 
}

export const CroptoolContext = createContext<CropToolContextType | null>(null);

export const CroptoolContextprovider = ({ children }:any) => {
    const boxX = useSharedValue((deviceWidth - cropToolDimensions.INITIAL_WIDTH) / 2);
    const boxY = useSharedValue((cropToolDimensions.MAX_HEIGHT - cropToolDimensions.INITIAL_HEIGHT) / 2);
    const boxWidth = useSharedValue(cropToolDimensions.INITIAL_WIDTH);
    const boxHeight = useSharedValue(cropToolDimensions.INITIAL_HEIGHT);
    const imageScale = useSharedValue(1);

    const [storedXValue, setSetstoredXValue] = React.useState((deviceWidth - cropToolDimensions.INITIAL_WIDTH) / 2)
    const [yStored, yValueSet] = React.useState((cropToolDimensions.MAX_HEIGHT - cropToolDimensions.INITIAL_HEIGHT) / 2)
  const [resizedImageUri, setResizedImageUri] = React.useState('')
    const [isSecondViewScrolling, setIsSecondViewScrolling] = React.useState(false)
    
  

  return (
    <CroptoolContext.Provider
      value={{boxWidth,boxHeight,boxX,boxY,isSecondViewScrolling,setResizedImageUri,resizedImageUri,setIsSecondViewScrolling,setSetstoredXValue,yValueSet,yStored,storedXValue,imageScale}}
    >
      {children}
    </CroptoolContext.Provider>
  );
};








