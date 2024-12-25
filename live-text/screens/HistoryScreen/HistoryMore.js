import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image, FlatList, Dimensions, Share } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { icons, theme } from '../../constrants';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import '../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';

export default function HistoryMore({ navigation }) {

  // Share
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'React Native | A framework for building native apps using React',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const {t, i18n} = useTranslation();
  
  const { COLORS, FONTS, SIZES } = theme;
  
  const translateY = useSharedValue(0);
  
  const MAX_TRANSLATE_Y = -844 + 50;
  
  const context = useSharedValue({ y: 0});
  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value < 844 / 2) {
        translateY.value = withSpring(0, { damping: 50 });
      }
    });
  
  useEffect(() => {
    translateY.value = withTiming( -844 / 2, { damping: 50 });
  }, []);
  
  const rBottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });
  
    return (  
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rBottomSheetStyle]}>
          <StatusBar style="dark" />
          <View style={styles.line}></View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionItem}>
              <Text style={{color: '#0038FF', ...FONTS.name}}>{t('historyMcopyButton')}</Text>
              <Image 
                source={icons.copy}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
            <View style={styles.lineItem}></View>
            <TouchableOpacity style={styles.actionItem}>
              <Text style={{color: '#FF0000', ...FONTS.name}}>{t('historyMdelButton')}</Text>
              <Image 
                source={icons.bin}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
            <View style={styles.lineItem}></View>
            <TouchableOpacity style={styles.actionItem} onPress={onShare}>
              <Text style={{...FONTS.name}}>{t('historyMshareButton')}</Text>
              <Image 
                source={icons.share}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
            <View style={styles.lineItem}></View>
            <TouchableOpacity style={styles.actionItem}>
              <Text style={{...FONTS.name}}>{t('historyMfindButton')}</Text>
              <Image 
                source={icons.loupe}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureDetector> 
    );
}

const styles = StyleSheet.create({
  container: {
    height: 844,
    width: '100%',
    backgroundColor: '#EFEFF0',
    position: 'absolute',
    top: 844,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignItems: 'center',
  },
  line: {
    width: 45,
    height: 4,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  actions: {
    height: 220,
    width: 364,
    backgroundColor: '#F9F9FB',
    borderRadius: 13,
    justifyContent: 'space-around',
    marginTop: 32,
    paddingVertical: 8,
  },
  lineItem: {
    width: 364,
    backgroundColor: '#DCDBDB',
    height: 1,
  },
  actionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  }
});