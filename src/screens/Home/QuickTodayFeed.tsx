import {Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {deviceWidth} from '../../utils/styles';
import { SunSvg } from '../../assets/svg';
import CricketBall from '../../assets/svg/AnimatedBallSvg';
import { kkrTeam, rrTeam } from '../../assets/images';

const QuickTodayFeed = () => {
  const content = [
    {
      id: 1,
      title: 'T20 6 of 74',
      type: 't20',
      teamA: {
        name: 'RR',
        runs: '151/9',
        overs: '20',
        icon:<Image source={rrTeam} width={20} height={20} style={{width:17,height:15}}/>
    },
      teamB: {
        name: 'KKR',
        runs: '153/2',
        overs: '17.3',
        icon:<Image source={kkrTeam} width={20} height={20} style={{width:13,height:19}}/>

      },
    },
    {
      id: 2,
      title: 'T20 Mini Cup',
      type: 'match',
      position: 'running',
      content: 'Score points for your team!',
      icon:<CricketBall size={25} duration={1250} />
    },
    {
      id: 3,
      title: 'Mandsaur',
      type: 'weather',
      position: 'running',
      content: '24°',
      icon:<SunSvg/>
    },
 
   
  ];
  const {mainBox,titleText,basicContentContainer,teamContainer,teamIcon,teamName,teamOvers} = styles
  return (
    <View style={{marginTop: 17}}>
  <ScrollView horizontal>
  <View style={{flexDirection:'row',gap:8}}>
     {content?.map((e, i: number) => {
        return (
          <Pressable
            key={i.toString()}
            style={mainBox}>
            <Text style={titleText}>{e?.title}</Text>
            {
               ( e?.type == 'weather' || e?.type == 'match')?
              (  <View style={basicContentContainer}>
                   {
                    e?.type == 'match'?
                    <Text style={{fontSize:11,width:80,lineHeight:15}}>{e?.content}</Text>
                    : <Text style={{fontWeight:500,color:'black',fontSize:20}}>{e?.content}</Text>
                   }
                    {e?.icon}
                </View>)
                :e?.type == 't20'&&(
                    <View style={{gap:2}}>
                        <View style={teamContainer}>
                         <View style={teamIcon}>
                            {e.teamA.icon}                                             
                            <Text style={teamName}>{e?.teamA?.name}</Text>
                         </View>
                         <View style={{alignItems:'center'}}>
                            <Text style={teamOvers}>{e.teamA?.runs +' '+'('+e.teamA?.overs+')'}</Text>
                         </View>
                        </View>

                        {/* Team B */}
                        <View style={teamContainer}>
                        <View style={teamIcon}>
                            {e.teamB.icon}                                             
                            <Text style={teamName}>{e?.teamB?.name}</Text>
                         </View>
                         <View style={{alignItems:'center'}}>
                            <Text style={[teamOvers,{fontWeight:'bold'}]} >{e.teamB?.runs +' '+'('+e.teamB?.overs+')'}</Text>
                         </View>
                        </View>
                    </View>
                )
                
            }
          </Pressable>
        );
      })}
     </View>
  </ScrollView>
    </View>
  );
};

export default QuickTodayFeed;

const styles = StyleSheet.create({
  mainBox:{
    borderWidth: .7,
    borderRadius: 15,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    padding: 10,
    paddingHorizontal:15,
    width: 150,
    height: 85,
    flexDirection:'column',
    justifyContent:'space-between'
  },
  titleText:{fontWeight:'500',color:'black',fontSize:14},
  basicContentContainer:{bottom:1,flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  teamContainer:{flexDirection:'row',alignItems:'center',justifyContent:'space-between'},
  teamIcon:{flexDirection:'row',alignItems:'center',gap:2},
  teamName:{fontSize:12,lineHeight:15},
  teamOvers:{fontSize:12}
});
