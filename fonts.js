import * as Font from "expo-font";

export const loadFonts = async () => {
    await Font.loadAsync({
        'textMeOn': require('./assets/fonts/textMeOn.ttf')
    })
}