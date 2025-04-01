import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import { GoogleLensSvg, MyntraSvg } from "../assets/svg";
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

export const mockSearchData =[
    {
        "query": "Latest iPhone",
        "search_results": [
          {
            "title": "iPhone Pro",
            "url": "https://www.apple.com/iphone-15-pro/",
            "snippet": "Discover the new iPhone 15 Pro and iPhone 15 Pro Max. Featuring an A17 Pro chip, titanium design, and a powerful camera system.",
            "image_url": "https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "source":'Myntra',
            "source_icon":require('../assets/images/realfeed/myntra.png')   
          },
          {
            "title": "iPhone Plus",
            "url": "https://www.apple.com/iphone-15/",
            "snippet": "The iPhone 15 and iPhone 15 Plus bring a dynamic island, a new 48MP main camera, and USB-C connectivity.",
            "image_url": "https://images.pexels.com/photos/5424917/pexels-photo-5424917.jpeg?auto=compress&cs=tinysrgb&w=600",
             "source":'Flipcart',
             "source_icon":require('../assets/images/realfeed/flipcart.jpg')   
            },
          {
            "title": "iPhone Review",
            "url": "https://www.theverge.com/iphone-15-review",
            "snippet": "The iPhone 15 offers significant camera upgrades, USB-C charging, and an improved display. But is it worth upgrading?",
            "image_url": "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
             "source":'Amazon',
             "source_icon":require('../assets/images/realfeed/amazon.png')   
            },
          {
            "title": "Compare iPhones",
            "url": "https://www.apple.com/iphone/compare/",
            "snippet": "See a side-by-side comparison of the latest iPhone models to choose the one that’s right for you.",
            "image_url": "https://images.pexels.com/photos/11021985/pexels-photo-11021985.jpeg?auto=compress&cs=tinysrgb&w=600",
            "source":'AJIO',
            "source_icon":require('../assets/images/realfeed/ajio.jpg')   
          },
          {
            "title": "iPhone Deals",
            "url": "https://www.bestbuy.com/site/iphone-15/",
            "snippet": "Find the best deals on the iPhone 15 at Best Buy, including trade-in offers and installment plans.",
            "image_url": "https://images.pexels.com/photos/4641824/pexels-photo-4641824.jpeg?auto=compress&cs=tinysrgb&w=600",

            "source":'Snapdeal',
            "source_icon":require('../assets/images/realfeed/snapdeal2.png')   
          },
          {
            "title": "iPhone Pro",
            "url": "https://www.apple.com/iphone-15-pro/",
            "snippet": "Discover the new iPhone 15 Pro and iPhone 15 Pro Max. Featuring an A17 Pro chip, titanium design, and a powerful camera system.",
            "image_url": "https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "source":'Myntra',
            "source_icon":require('../assets/images/realfeed/myntra.png')   
          },
          {
            "title": "iPhone Plus",
            "url": "https://www.apple.com/iphone-15/",
            "snippet": "The iPhone 15 and iPhone 15 Plus bring a dynamic island, a new 48MP main camera, and USB-C connectivity.",
            "image_url": "https://images.pexels.com/photos/5424917/pexels-photo-5424917.jpeg?auto=compress&cs=tinysrgb&w=600",
             "source":'Flipcart',
             "source_icon":require('../assets/images/realfeed/flipcart.jpg')   
            },
          {
            "title": "iPhone Review",
            "url": "https://www.theverge.com/iphone-15-review",
            "snippet": "The iPhone 15 offers significant camera upgrades, USB-C charging, and an improved display. But is it worth upgrading?",
            "image_url": "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
             "source":'Amazon',
             "source_icon":require('../assets/images/realfeed/amazon.png')   
            },
          {
            "title": "Compare iPhones",
            "url": "https://www.apple.com/iphone/compare/",
            "snippet": "See a side-by-side comparison of the latest iPhone models to choose the one that’s right for you.",
            "image_url": "https://images.pexels.com/photos/11021985/pexels-photo-11021985.jpeg?auto=compress&cs=tinysrgb&w=600",
            "source":'AJIO',
            "source_icon":require('../assets/images/realfeed/ajio.jpg')   
          },
          {
            "title": "iPhone Deals",
            "url": "https://www.bestbuy.com/site/iphone-15/",
            "snippet": "Find the best deals on the iPhone 15 at Best Buy, including trade-in offers and installment plans.",
            "image_url": "https://images.pexels.com/photos/4641824/pexels-photo-4641824.jpeg?auto=compress&cs=tinysrgb&w=600",

            "source":'Snapdeal',
            "source_icon":require('../assets/images/realfeed/snapdeal2.png')   
          },
          {
            "title": "iPhone Pro",
            "url": "https://www.apple.com/iphone-15-pro/",
            "snippet": "Discover the new iPhone 15 Pro and iPhone 15 Pro Max. Featuring an A17 Pro chip, titanium design, and a powerful camera system.",
            "image_url": "https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "source":'Myntra',
            "source_icon":require('../assets/images/realfeed/myntra.png')   
          },
          {
            "title": "iPhone Plus",
            "url": "https://www.apple.com/iphone-15/",
            "snippet": "The iPhone 15 and iPhone 15 Plus bring a dynamic island, a new 48MP main camera, and USB-C connectivity.",
            "image_url": "https://images.pexels.com/photos/5424917/pexels-photo-5424917.jpeg?auto=compress&cs=tinysrgb&w=600",
             "source":'Flipcart',
             "source_icon":require('../assets/images/realfeed/flipcart.jpg')   
            },
          {
            "title": "iPhone Review",
            "url": "https://www.theverge.com/iphone-15-review",
            "snippet": "The iPhone 15 offers significant camera upgrades, USB-C charging, and an improved display. But is it worth upgrading?",
            "image_url": "https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
             "source":'Amazon',
             "source_icon":require('../assets/images/realfeed/amazon.png')   
            },
          {
            "title": "Compare iPhones",
            "url": "https://www.apple.com/iphone/compare/",
            "snippet": "See a side-by-side comparison of the latest iPhone models to choose the one that’s right for you.",
            "image_url": "https://images.pexels.com/photos/11021985/pexels-photo-11021985.jpeg?auto=compress&cs=tinysrgb&w=600",
            "source":'AJIO',
            "source_icon":require('../assets/images/realfeed/ajio.jpg')   
          },
          {
            "title": "iPhone Deals",
            "url": "https://www.bestbuy.com/site/iphone-15/",
            "snippet": "Find the best deals on the iPhone 15 at Best Buy, including trade-in offers and installment plans.",
            "image_url": "https://images.pexels.com/photos/4641824/pexels-photo-4641824.jpeg?auto=compress&cs=tinysrgb&w=600",

            "source":'Snapdeal',
            "source_icon":require('../assets/images/realfeed/snapdeal2.png')   
          },
       
        ],
        "related_searches": [
          {
            "title": "iPhone Price",
            "image_url": "https://store.storeimages.cdn-apple.com/iphone-price.jpg"
          },
          {
            "title": "iPhone Camera",
            "image_url": "https://store.storeimages.cdn-apple.com/iphone-camera.jpg"
          },
          {
            "title": "iPhone Battery",
            "image_url": "https://store.storeimages.cdn-apple.com/iphone-battery.jpg"
          },
          {
            "title": "iPhone Features",
            "image_url": "https://store.storeimages.cdn-apple.com/iphone-features.jpg"
          }
        ]
      }
      
]