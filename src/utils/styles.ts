import { Dimensions } from "react-native";

export const deviceWidth = Dimensions.get('window').width
export const deviceHeight = Dimensions.get('window').height


export const globalFlexStyle ={flexDirection:'row',alignItems:'center'}

export const fontFamily = {
    ProductSansBlack:'ProductSans-Black',
    ProductSansBlackItalic:'ProductSans-BlackItalic',
    ProductSansBold:'ProductSans-Bold',
    ProductSansItalic:'ProductSans-Italic',
    ProductSansLight:'ProductSans-Light',
    ProductSansLightItalic:'ProductSans-LightItalic',
    ProductSansMedium:'ProductSans-Medium',
    ProductSansMediumItalic:'ProductSans-MediumItalic',
    ProductSansRegular:'ProductSans-Regular',
    ProductSansThin:'ProductSans-Thin',
    ProductSansThinItalic:'ProductSans-ThinItalic'
}