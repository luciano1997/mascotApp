import { NavigationContainer } from "@react-navigation/native";
import AuthStackNavigator from "./auth/AuthStackNavigator";
import TabsNavigator from "./tabs/TabsNavigator";
import { useSelector, useDispatch } from "react-redux";
// import { useGetProfilePictureQuery } from "../services/profileApi";
// import { setImage } from "../store/slices/userSlice";
import { useEffect } from "react";

const MainNavigator = () => {
    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn)
    // const localId = useSelector(state => state.userReducer.localId)

    // const dispatch = useDispatch()

    // const { data: profilePicture, isLoading, error } = useGetProfilePictureQuery(localId)

    //console.log("ProfilePicture desde firebase:", profilePicture)

    // useEffect(()=>{
    //     if(profilePicture){
    //         dispatch(setImage(profilePicture.image))
    //     }
    // },[profilePicture])

    return (
        <NavigationContainer>
            {
                isLoggedIn ? <TabsNavigator /> : <AuthStackNavigator />
            }
        </NavigationContainer>
    )
}

export default MainNavigator