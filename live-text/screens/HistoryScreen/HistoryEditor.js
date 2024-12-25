import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, Image, Share } from 'react-native';
import { GestureHandlerRootView, TextInput } from 'react-native-gesture-handler';

// StatusBar color
import { StatusBar } from 'expo-status-bar';

// Constrants
import { icons, theme } from '../../constrants';

// Translation
import '../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';



export default function HistoryEditor({ navigation, route }) {

  // content of data rendering
  const { singleNote } = route.params;

  // Share
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: singleNote,
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

  // Translation for Interface
  const {t, i18n} = useTranslation();
  
  // using constrants
  const { COLORS, FONTS, SIZES } = theme;
  
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
          <View style={styles.header}>
            <View style={styles.headerbutton}>
              <TouchableOpacity style={{flexDirection: 'row'}} onPress={navigation.goBack}>
                <Image 
                  source={icons.back}
                  resizeMode="contain"
                  style={{width: 20, height: 20}}
                />
                <Text style={{...FONTS.backbutton, color: COLORS.black, paddingTop: 2}}>{t('historyEbuttonBack')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onShare}>
                  <Image
                    source={icons.more}
                    resizeMode="contain"
                    style={{width: 20, height: 20}} />
              </TouchableOpacity>
            </View>
          </View>
          <TextInput multiline style={{...FONTS.cameraName, paddingLeft: 12, paddingTop: 16}}>{singleNote}</TextInput>
        </SafeAreaView>
      </GestureHandlerRootView>    
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F6',
  },
  header: {
    flex: 0.1,
  },
  headerbutton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  content: {
    flex: 0.8,
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  HistoryItem: {
    backgroundColor: '#FBFBFB', 
    width: 350, 
    height: 84, 
    borderRadius: 15, 
    margin: 10,
  },
});