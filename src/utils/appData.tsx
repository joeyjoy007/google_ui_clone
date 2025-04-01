import {SunSvg} from '../assets/svg';
import {colors} from './colors';
import {
  ajio,
  amazon,
  anime,
  digital,
  feed1,
  feed2,
  feed3,
  feed4,
  flipcart,
  KkrTeam,
  myntra,
  RrTeam,
  snapdeal,
  sony,
  toi,
} from '../assets/images';
import {Image} from 'react-native';
import CricketBall from '../assets/svg/AnimatedBallSvg';
import {
  EntypoIcons,
  FeatherIcon,
  IoniconsIcon,
  MaterialCommunityIcons,
  MaterialIcons,
} from './icons';

export const bottomSheetList = [
  {
    id: 1,
    icon: <MaterialIcons name="history" size={22} />,
    name: 'Search history',
    halfDivider: true,
  },
  {
    id: 2,
    icon: '',
    name: 'Delete last 15 minutes',
    divider: true,
  },
  {
    id: 3,
    icon: <MaterialIcons name="star-outline" size={23} />,
    name: 'Search personalisation',
  },
  {
    id: 4,
    icon: <MaterialIcons name="manage-search" size={23} />,
    name: 'SafeSearch',
  },
  {
    id: 5,
    icon: (
      <MaterialCommunityIcons
        style={{marginLeft: -1}}
        name="file-document-outline"
        size={23}
      />
    ),
    name: 'Results about you',
  },
  {
    id: 6,
    icon: <MaterialIcons name="task-alt" size={23} />,
    name: 'Tasks',
  },
  {
    id: 7,
    icon: <MaterialCommunityIcons name="bookmark-multiple-outline" size={23} />,
    name: 'Saves and collections',
  },
  {
    id: 8,
    icon: <FeatherIcon name="user" size={23} />,
    name: 'Your Profile',
  },
];

export const bottomSheetList2 = [
  {
    id: 1,
    icon: (
      <IoniconsIcon name="settings-outline" color={colors.black} size={22} />
    ),
    name: 'Settings',
  },
  {
    id: 2,
    icon: <MaterialCommunityIcons name="help-circle-outline" size={23} />,
    name: 'Help and feedback',
  },
];

export const quickTodayFeed = [
  {
    id: 1,
    title: 'T20 7 of 74',
    type: 't20',
    teamA: {
      name: 'RR',
      runs: '151/9',
      overs: '20',
      icon: (
        <Image
          source={RrTeam}
          width={20}
          height={20}
          style={{width: 15, height: 13}}
        />
      ),
    },
    teamB: {
      name: 'KKR',
      runs: '153/2',
      overs: '17.3',
      icon: (
        <Image
          source={KkrTeam}
          width={20}
          height={20}
          style={{width: 14, height: 19}}
        />
      ),
    },
  },
  {
    id: 2,
    title: 'T20 Mini Cup',
    type: 'match',
    position: 'running',
    content: 'Score points for your team!',
    icon: <CricketBall size={25} duration={1250} />,
  },
  {
    id: 3,
    title: 'Mandsaur',
    type: 'weather',
    position: 'running',
    content: '24°',
    icon: <SunSvg />,
  },
];

export const realFeedData = [
  {
    id: 1,
    source: 'Animestyle',
    sourceImg: anime,
    desc: 'You’d Be Disappointed If You Were Expecting ‘Sakamoto Days’ to Remain as the Perfect Slice-of-Life Action Anime',
    image: feed1,
  },
  {
    id: 2,
    source: 'Collider',
    sourceImg: digital,
    image: feed2,
    desc: 'How to create free Ghibli-style AI images using Grok with help from ChatGPT: Check our step-by-step guide',
  },
  {
    id: 3,
    source: 'Times of India',
    sourceImg: toi,

    image: feed3,
    desc: 'Best touchscreen laptops of 2025: 10 laptops that define productivity, style and innovation',
  },
  {
    id: 4,
    source: 'Sony',
    sourceImg: sony,
    image: feed4,
    desc: 'Viltrox AF 25mm F1.7 Air Lens Review: Budget Prime, Pro-Level Results',
  },
];

export const lensBottomData = [
  {
    id: 1,
    icon: <IoniconsIcon name="language" color={colors.google.blue} size={20} />,
    name: 'Translate',
  },
  {
    id: 2,
    icon: <MaterialIcons name="search" color={colors.google.blue} size={20} />,
    name: 'Search',
  },
  {
    id: 3,
    icon: (
      <EntypoIcons name="graduation-cap" color={colors.google.blue} size={20} />
    ),
    name: 'Homework',
  },
];

export const searchList = [
  'cricket',
  'gmail',
  'shirts',
  'news',
  'shoppin',
  'chatgpt',
  'watches',
  'linkedin',
  'instagram',
  'facebook',
  'naruto',
  'one Piece',
  'github',
];

export const mockSearchData = [
  {
    query: 'Latest iPhone',
    search_results: [
      {
        title: 'iPhone Pro',
        url: 'https://www.apple.com/iphone-15-pro/',
        snippet:
          'Discover the new iPhone 15 Pro and iPhone 15 Pro Max. Featuring an A17 Pro chip, titanium design, and a powerful camera system.',
        image_url:
          'https://images.pexels.com/photos/9218538/pexels-photo-9218538.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        source: 'Myntra',
        source_icon: myntra
      },
      {
        title: 'iPhone Plus',
        url: 'https://www.apple.com/iphone-15/',
        snippet:
          'The iPhone 15 and iPhone 15 Plus bring a dynamic island, a new 48MP main camera, and USB-C connectivity.',
        image_url:
          'https://images.pexels.com/photos/5424917/pexels-photo-5424917.jpeg?auto=compress&cs=tinysrgb&w=600',
        source: 'Flipcart',
        source_icon: flipcart,
      },
      {
        title: 'iPhone Review',
        url: 'https://www.theverge.com/iphone-15-review',
        snippet:
          'The iPhone 15 offers significant camera upgrades, USB-C charging, and an improved display. But is it worth upgrading?',
        image_url:
          'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600',
        source: 'Amazon',
        source_icon: amazon,
      },
      {
        title: 'Compare iPhones',
        url: 'https://www.apple.com/iphone/compare/',
        snippet:
          'See a side-by-side comparison of the latest iPhone models to choose the one that’s right for you.',
        image_url:
          'https://images.pexels.com/photos/11021985/pexels-photo-11021985.jpeg?auto=compress&cs=tinysrgb&w=600',
        source: 'AJIO',
        source_icon: ajio,
      },
      {
        title: 'iPhone Deals',
        url: 'https://www.bestbuy.com/site/iphone-15/',
        snippet:
          'Find the best deals on the iPhone 15 at Best Buy, including trade-in offers and installment plans.',
        image_url:
          'https://images.pexels.com/photos/4641824/pexels-photo-4641824.jpeg?auto=compress&cs=tinysrgb&w=600',

        source: 'Snapdeal',
        source_icon: snapdeal,
      },
   
    ],
    related_searches: [
      {
        title: 'iPhone Price',
        image_url: 'https://store.storeimages.cdn-apple.com/iphone-price.jpg',
      },
      {
        title: 'iPhone Camera',
        image_url: 'https://store.storeimages.cdn-apple.com/iphone-camera.jpg',
      },
      {
        title: 'iPhone Battery',
        image_url: 'https://store.storeimages.cdn-apple.com/iphone-battery.jpg',
      },
      {
        title: 'iPhone Features',
        image_url:
          'https://store.storeimages.cdn-apple.com/iphone-features.jpg',
      },
    ],
  },
];
