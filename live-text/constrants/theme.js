import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

export const COLORS = {
    black: "#1e1f20",
    white: "#FFFFFF",
    blue: "#444BF1",
    gray: "#8b9097",
}

export const SIZES = {
    // Global Sizes
    base: 8,
    font: 14, 
    radius: 12,
    padding: 24,

    // Font Sizes
    h1: 24,
    h2: 16,
    button: 18,
    backbutton_size: 14,
    title: 36,
    h3: 14,

    // App dimensions
    width,
    height
};

export const FONTS = {
    h1: { fontFamily: 'Montserrat-Bold', fontSize: SIZES.h1 },
    h2: { fontFamily: 'Montserrat-Medium', fontSize: SIZES.h2 },
    button: { fontFamily: 'Montserrat-Bold', fontSize: SIZES.button },
    backbutton: { fontFamily: 'Montserrat-SemiBold', fontSize: SIZES.backbutton_size },
    title: { fontFamily: 'Montserrat-Bold', fontSize: SIZES.title },
    name: { fontFamily: 'Montserrat-Regular', fontSize: SIZES.h3 },
    camera: { fontFamily: 'Montserrat-Bold', fontSize: SIZES.button },
    cameraName: { fontFamily: 'Montserrat-Regular', fontSize: SIZES.button }
};

const appTheme = { COLORS, SIZES, FONTS }

export default appTheme;