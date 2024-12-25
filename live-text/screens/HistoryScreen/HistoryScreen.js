import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';

// StatusBar color
import { StatusBar } from 'expo-status-bar';

// Constrants
import { icons, theme } from '../../constrants';

// AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';

// Translation
import '../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';


export default function HistoryScreen({ navigation }) {

  // using Translation for Interface
  const {t, i18n} = useTranslation();

  // parse Data from AsyncStorage
  const [values, setValues] = useState([]);

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key)
      if (jsonValue !== null) {
        setValues(JSON.parse(jsonValue));
        console.log(JSON.parse(jsonValue));
      } else {
        console.log('reading err');
      }
    } catch(e) {
      // error reading value
      console.log('reading err');
    }
  };

  // clear AsyncStorage
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
      console.log('EROOR CLEAR');
    }
  
    console.log('Done.')
  };

  useEffect(() => {
    // clearAll();
    getData('sexykey');
  }, []);

  const { COLORS, FONTS, SIZES } = theme;

  const renderHistoryItem = ({ item }) => {
    return (
      <View style={[styles.HistoryItem, styles.shadowProp]}>
        <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => navigation.navigate("HistoryEditor", {singleNote: item.content})}>
          <View style={{width: 300, height: 84, borderRadius: 15, justifyContent: 'space-between', paddingHorizontal: 15, paddingVertical: 10}}>
            <Text style={{...FONTS.name}}>{item.name + '...'}</Text>
            <Text style={{...FONTS.name, color: '#9A9A9A'}}>{item.datetime}</Text>
          </View>
          <Image source={icons.next} resizeMode='contain' style={{ width: 20, height: 20, alignSelf: 'flex-end', paddingBottom: 84}}/>
        </TouchableOpacity>
      </View>
    );
  };

  return (    
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
            <Text style={{...FONTS.backbutton, color: COLORS.black, paddingTop: 2}}>{t('historySbuttonBack')}</Text>
          </TouchableOpacity>
          <Text style={{...FONTS.title, paddingTop: 64}}>{t('historyStitleHistory')}</Text>
          <View style={{ borderBottomColor: 'black', borderBottomWidth: 2, paddingTop: 4 }}/>
        </View>
      </View>
      <View style={styles.content}>
          <FlatList
            data={values}
            renderItem = {renderHistoryItem}
            keyExtractor = { (item) => item.id}
            />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F6',
  },
  header: {
    flex: 0.2,
  },
  headerbutton: {
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