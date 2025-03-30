import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { GoogleLensSvg } from "../assets/svg";
import { colors } from './colors';


export const bottomSheetList = [
    {
        id:1,
        icon:<MaterialIcons name='history' size={22}/>,
        name:'Search history',
        halfDivider:true,
    },
    {
        id:2,
        icon:'',
        name:'Delete last 15 minutes',
        divider:true
    },
    {
        id:3,
        icon:<MaterialIcons name='star-outline' size={23}/>,
        name:'Search personalisation',
    },
    {
        id:4,
        icon:<MaterialIcons name='manage-search' size={23}/>,
        name:'SafeSearch',
    },
    {
        id:5,
        icon:<MaterialCommunityIcons style={{marginLeft:-1}} name='file-document-outline' size={23}/>,
        name:'Results about you',
    },
    {
        id:6,
        icon:<MaterialIcons name='task-alt' size={23}/>,
        name:'Tasks',
    },
    {
        id:7,
        icon:<MaterialCommunityIcons  name='bookmark-multiple-outline' size={23}/>,
        name:'Saves and collections',
    },
    {
        id:8,
        icon:<FeatherIcon name='user' size={23}/>,
        name:'Your Profile',
    },
    

]

export const bottomSheetList2 = [
    {
        id:1,
        icon:<IoniconsIcon name='settings-outline' color={colors.black} size={22}/>,
        name:'Settings',
    },
    {
        id:2,
        icon:<MaterialCommunityIcons name='help-circle-outline' size={23}/>,
        name:'Help and feedback',
    },
]

export const lensBottomData = [{
    id:1,
    icon:<IoniconsIcon name='language' color={colors.google.blue} size={20}/>,
    name:'Translate'
},
{
    id:2,
    icon:<MaterialIcons name='search' color={colors.google.blue} size={20}/>,
    name:'Search'
},
{
    id:3,
    icon:<EntypoIcons name='graduation-cap' color={colors.google.blue} size={20}/>,
    name:'Homework'
},]

export const searchList = ["cricket", "gmail","shirts","news","shoppin","chatgpt","watches","linkedin","instagram","facebook","naruto","one Piece","github"]