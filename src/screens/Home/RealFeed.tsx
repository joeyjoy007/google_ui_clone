import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {realFeedImage1} from '../../assets/images';
import BoldText from '../../components/TextInputs/BoldText';
import SmallText from '../../components/TextInputs/SmallText';
import { fontFamily } from '../../utils/styles';
import { GoogleLensSvg } from '../../assets/svg';

const RealFeed = () => {
  const data = [1, 2, 3, 4];
  return (
    <View>
      {data?.map((e, i) => {
        return (
          <View
            key={i.toString()}
            style={{
              backgroundColor: 'white',
              marginTop: 15,
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <View style={{height: 230, borderRadius: 20}}>
              <Image
                source={realFeedImage1}
                style={{height: '100%', aspectRatio: 4 / 2}}
              />
            </View>
            <View
              style={{
                padding: 10,
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 130,
              }}>
              <View>
                <BoldText
                  style={{fontSize: 20, lineHeight: 25, opacity: 0.8}}
                  numberOfLines={3}
                  text={` Cabin approved 2% in \n dearness allowance for centrl \n goverment employess and parliament`}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                 <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',gap:5}}>
                 <GoogleLensSvg width={20} height={20}/>
                 <SmallText style={{fontFamily:fontFamily.ProductSansLight}} text='DD News'/>
                 </View>
                 <SmallText style={{fontFamily:fontFamily.ProductSansLight}} text='Actions'/>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default RealFeed;

const styles = StyleSheet.create({});
