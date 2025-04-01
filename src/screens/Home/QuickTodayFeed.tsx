import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {fontFamily} from '../../utils/styles';
import SmallText from '../../components/TextInputs/SmallText';
import BoldText from '../../components/TextInputs/BoldText';
import {quickTodayFeed} from '../../utils/appData';

const QuickTodayFeed = () => {
  const {
    mainContainer,
    mainBox,
    basicContentContainer,
    todayFeedBox,
    teamContainer,
    teamIcon,
    teamName,
    teamOvers,
  } = styles;

  
  return (
    <View style={mainContainer}>
      <ScrollView horizontal>
        <View
          style={todayFeedBox}>
          {quickTodayFeed?.map((e, i: number) => {
            return (
              <Pressable key={i.toString()} style={[mainBox]}>
                <BoldText text={e.title} />
                {e?.type == 'weather' || e?.type == 'match' ? (
                  <View style={basicContentContainer}>
                    {e?.type == 'match' ? (
                      <SmallText
                        style={{fontSize: 11, width: 80}}
                        text={e.content || ''}
                      />
                    ) : (
                      <BoldText style={{fontSize: 20}} text={e.content || ''} />
                    )}
                    {e?.icon}
                  </View>
                ) : (
                  e?.type == 't20' && (
                    <View style={{gap: 2}}>
                      <View style={teamContainer}>
                        <View style={teamIcon}>
                          {e?.teamA&& e.teamA.icon}
                          <Text style={teamName}>{e?.teamA?.name}</Text>
                        </View>
                        <View style={{alignItems: 'center'}}>
                          <Text style={teamOvers}>
                            {e.teamA?.runs + ' ' + '(' + e.teamA?.overs + ')'}
                          </Text>
                        </View>
                      </View>

                      <View style={teamContainer}>
                        <View style={teamIcon}>
                          {e?.teamB&& e.teamB.icon}
                          <BoldText
                            style={[
                              teamOvers,
                              {fontFamily: fontFamily.ProductSansMedium},
                            ]}
                            text={e?.teamB?.name || ''}
                          />
                        </View>
                        <View style={{alignItems: 'center'}}>
                          <BoldText
                            style={[
                              teamOvers,
                              {fontFamily: fontFamily.ProductSansMedium},
                            ]}
                            text={
                              e.teamB?.runs + ' ' + '(' + e.teamB?.overs + ')'
                            }
                          />
                        </View>
                      </View>
                    </View>
                  )
                )}
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
  mainContainer:{marginTop: 17},
  mainBox: {
    borderWidth: 0.7,
    borderRadius: 15,
    borderColor: 'rgba(128, 128, 128, 0.5)',
    padding: 10,
    paddingHorizontal: 15,
    width: 150,
    height: 85,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  todayFeedBox:{
    flexDirection: 'row',
    gap: 8,
    marginLeft: 20,
    marginRight: 20,
  },
  basicContentContainer: {
    bottom: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamIcon: {flexDirection: 'row', alignItems: 'center', gap: 2, width: 45},
  teamName: {
    fontSize: 12,
    lineHeight: 15,
    fontFamily: fontFamily.ProductSansRegular,
  },
  teamOvers: {fontSize: 12, fontFamily: fontFamily.ProductSansRegular},
});
