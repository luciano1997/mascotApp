import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./auth/AuthStackNavigator";
import TabsNavigator from "./tabs/TabsNavigator";
import { useSelector, useDispatch } from "react-redux";
// import { useGetProfilePictureQuery } from "../services/profileApi";
// import { setImage } from "../store/slices/userSlice";
import { useEffect, useState } from "react";
import { useGetProfilePictureQuery } from "../services/userProfileApi";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../global/colors";
import { setEmail, setImage, setIsLoggedIn, setLocalId } from "../store/slices/authSlice";
import { getSession, initSessionTable } from "../database";
const MainNavigator = () => {
    
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)
    const email = useSelector(state => state.authReducer.email)
    const localId = useSelector(state => state.authReducer.localId)
    const [checkingSession, setCheckingSession] = useState(true);
    const dispatch = useDispatch();
    
    const { data: profilePicture, isLoading, error } = useGetProfilePictureQuery(localId)
    useEffect(() => {
        const bootstrap = async () => {
            await initSessionTable();
            const session = await getSession(); //En SQLite
            if (session) {
                dispatch(setEmail(session.email))
                dispatch(setIsLoggedIn(session.email))
                dispatch(setLocalId(session.localId))
            }
            setCheckingSession(false);
        };

        bootstrap();
    }, []);

    useEffect(() => {
        if (profilePicture) {
            dispatch(setImage(profilePicture.image))
        }
    }, [profilePicture])

    if (checkingSession) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={colors.cobaltBlue} />
            </View>
        );
    }


    return (
        <NavigationContainer>
            {
                isLoggedIn ? <TabsNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}

export default MainNavigator