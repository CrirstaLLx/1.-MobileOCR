import React from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Animated,
    Image,
    TouchableOpacity,
} from "react-native";

// StatusBar color
import { StatusBar } from 'expo-status-bar';

import { LinearGradient } from 'expo-linear-gradient';

// MultiLanguage Support
import '../../assets/i18n/i18n';
import {useTranslation} from 'react-i18next';

// Constrants
import { images, theme } from '../../constrants';
const { onboarding1 } = images;

// Theme
const { COLORS, FONTS, SIZES } = theme;

const OnBoarding = ({ navigation }) => {
    const {t, i18n} = useTranslation();
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Animated.ScrollView
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="center"
                    showsHorizontalScrollIndicator={false}
                    >
                    <View style={{ width: SIZES.width }}>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <Image 
                                source={onboarding1}
                                resizeMode="cover"
                                style={{
                                    width: "100%",
                                    height: "100%"
                                }}
                            />
                        </View>
                        <View style={{ position: 'absolute', bottom: '20%', left: 30, right: 30 }}>
                            <Text style={{...FONTS.h1, textAlign: 'center', color: COLORS.black }}>
                                {t('onboardingStitle')}
                            </Text>
                            <Text style={{...FONTS.h1, textAlign: 'center', color: COLORS.black }}>
                                {t('onboardingStitle_2')}
                            </Text>
                            <Text style={{...FONTS.h2, textAlign: 'center', paddingTop: 16, color: COLORS.gray}}>
                                {t('onboardingSdescription')}
                            </Text>
                            <Text style={{...FONTS.h2, textAlign: 'center', paddingTop: 8, color: COLORS.gray}}>
                                {t('onboardingSattention')}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={[styles.shadow, {
                                position: 'absolute',
                                bottom: 40,
                                width: 335,
                                height: 50,
                                borderRadius: 15,
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: COLORS.blue
                            }]}
                            onPress={() => navigation.navigate("CameraScreen")}
                            >
                            <LinearGradient
                                style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}
                                colors={['#46aeff', '#5884ff']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1}}
                                >
                                <Text style={{...FONTS.button, color: 'white' }}>{t('onboardingSbuttonStart')}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <StatusBar style="dark"/>
                    </View>
                </Animated.ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    }
})

export default OnBoarding;