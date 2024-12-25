import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Platform, Alert, SafeAreaView } from 'react-native';

// StatusBar color
import { StatusBar } from 'expo-status-bar';

// navigation
import { useNavigation } from '@react-navigation/native';

// Camera and Media Library
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

// Constrants
import { icons, theme } from "../../constrants";

// Advertisement
import { AdMobRewarded } from 'expo-ads-admob';

// Storage Data
import AsyncStorage from '@react-native-async-storage/async-storage';

// MultiLanguage Support
import '../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';

export default function CameraScreen() {

  // using Translation
  const {t, i18n} = useTranslation();

  const [currentLanguage, setLanguage] = useState('ru');
  
  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch(err => console.log(err));
  };

  // using contrants
  const { COLORS, FONTS, SIZES } = theme;

  // using advertisement
  const adUnitId = Platform.select({
    ios: "ca-app-pub-9227833940957825/4845889533",
  });

  const loadAd = async () => {
    await AdMobRewarded.setAdUnitID(adUnitId);
    await AdMobRewarded.requestAdAsync({ servePersonalizedAds: true});
    await AdMobRewarded.showAdAsync();
  };

  // Permissions for camera access
  const [hasPermission, setHasPermission] = useState(null);

  // Camera useref
  const cameraRef = useRef(null);

  // function take a picture
  const takePhoto = async () => {
    if (cameraRef) {
      console.log('in take picture');
      try {
        let photo = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        postToServer(photo);
        loadAd();
      } catch (e) {
        console.log(e);
      }
    }
  };

  const navigation = useNavigation();

  // pick an image from phone library
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.uri);

    if (!result.cancelled) {
      postToServer(result);
      loadAd();
      setImage(result);
    }
    
  };

  // parse Data from AsyncStorage
  const [data, setData] = useState([]);

  const getData = async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        setData(JSON.parse(jsonValue));
        console.log(JSON.parse(jsonValue));
      } else {
        console.log('reading err');
      }
    } catch(e) {
      // error reading value
      console.log('reading err');
    }
  };

  // store data in AsyncStorage
  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
      console.log('sexy save')
    } catch (e) {
      // saving error
      console.log('saving error')
    }
  };

  // clear data
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
      console.log('EROOR CLEAR');
    }
  
    console.log('Done.')
  };

  // api to Django
  const postToServer = async (img) => {
    const formData = new FormData();
    
    formData.append('image', {
                uri: img.uri,
                type: 'image/jpeg', 
                name: 'test.jpg',
              })
    formData.append('title', 'title');      
    let res = await fetch('http://192.168.0.149:8000/api/textocr/', { //http://192.168.0.149:8000/api/textocr/ HomeNetwork, http://172.20.10.2:8000/api/textocr/ MobileNetwork
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });
    let json = await res.json(); // Get JSON Object from Django
    json = JSON.stringify(json.result); // Stringify this JSON to storeData func
    let resultjson = json; // This const is need to alert result on display
    resultjson = JSON.parse(resultjson); // Parse result
    Alert.alert(t('resultRecongnize'), resultjson);
    // getData('sexykey');
    const date = new Date().toLocaleString();
    let update = ([...data, {id: data.length, name: resultjson.substring(0, 30), content: resultjson, datetime: date } ]); //{id: data.length, name: json.substring(0, 15), content: json }
    let updatetest = JSON.stringify(update);
    setData(updatetest);
    storeData('sexykey', updatetest);
    getData('sexykey');
  };
  
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === false) {
    alert('No access to iPhone library')
  };

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Camera.requestCameraPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // };
  // if (hasPermission === false) {
  //   alert('No access to camera')
  // };
  
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.camera}>
        <View style={[styles.Helper, styles.shadowProp]}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{...FONTS.camera, textAlign: 'center', marginTop: 4}}>{t('cameraStitle')}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'column'}}>
                <Image 
                  source={icons.CameraIcon}
                  resizeMode="contain"
                  style={{
                    width: 42,
                    height: 42,
                    margin: 16,
                  }}/>
                  <Image 
                  source={icons.picture}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 40,
                    margin: 16,
                  }}/>
                  <Image 
                  source={icons.history}
                  resizeMode="contain"
                  style={{
                    width: 40,
                    height: 40,
                    margin: 16,
                  }}/>
              </View>
              <View style={{flexDirection: 'column'}}>
                <Text style={{...FONTS.cameraName, marginTop: 28}}>{t('cameraStitle')}</Text>
                <Text style={{...FONTS.cameraName, marginTop: 52}}>{t('cameraSlibraryTitle')}</Text>
                <Text style={{...FONTS.cameraName, marginTop: 52}}>{t('cameraShistoryTitle')}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={[styles.langChange, styles.shadowProp]}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{...FONTS.camera, textAlign: 'center', marginTop: 4}}>{t('cameraSetlanguage')}</Text>
          </View>
          <TouchableOpacity onPress={() => changeLanguage('ru')}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{...FONTS.cameraName, textAlign: 'center', marginTop: 4}}>Русский</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => changeLanguage('en')}>
            <View style={{flexDirection: 'column'}}>
              <Text style={{...FONTS.cameraName, textAlign: 'center', marginTop: 4}}>English</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    <View style={styles.tabs}>
      <TouchableOpacity
            onPress={pickImage}>
            <Image 
              source={icons.picture}
              resizeMode="contain"
              style={{
                width: 33,
                height: 33,
            }}/>
      </TouchableOpacity>
      <TouchableOpacity
            style={styles.camerabutton}
            onPress={ async () => {
              const r = await takePhoto();
              console.log('DEBUG', JSON.stringify(r))
            }}>
            <Image
              source={icons.camera}
              resizeMode="contain"
              style={{
                width: 43,
                height: 37,
              }}/>
      </TouchableOpacity>
      <TouchableOpacity
            onPress={() => navigation.navigate("HistoryScreen")}>
            <Image
              source={icons.history}
              resizeMode="contain"
              style={{
                width: 33,
                height: 33,
              }}/>
      </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    height: 120,
    backgroundColor: '#F4F4F6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  camerabutton: {
    width: 70,
    height: 70,
    backgroundColor: '#B07FFF',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 60,
  },
  camera: {
    flex: 1,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  Helper: {
    backgroundColor: '#FBFBFB', 
    width: 350, 
    height: 238, 
    borderRadius: 15, 
    margin: 10,
  },
  langChange: {
    backgroundColor: '#FBFBFB', 
    width: 350, 
    height: 150, 
    borderRadius: 15, 
    margin: 10,
  },
})
