import { StyleSheet, Text, View, Pressable, Image, ActivityIndicator } from 'react-native'
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import { usePutProfilePictureMutation } from '../../services/userProfileApi'
import { setEmail, setImage, setIsLoggedIn, setLocalId } from '../../store/slices/authSlice';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { clearSession } from '../../database';

const UserProfileScreen = () => {

    const [location, setLocation] = useState("")
    const [errorMsg, setErrorMsg] = useState("");
    const [address, setAddress] = useState("")
    const [locationLoaded, setLocationLoaded] = useState(false)

    const user = useSelector(state => state.authReducer.email)
    const localId = useSelector(state => state.authReducer.localId)
    const image = useSelector(state => state.authReducer.image)

    const [triggerPutProfilePicture, result] = usePutProfilePictureMutation()

    const dispatch = useDispatch()

    console.log("Address", address)

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true
        })

        //console.log(result)
        if (!result.canceled) {
            const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`
            dispatch(setImage(imgBase64))
            triggerPutProfilePicture({ localId: localId, image: imgBase64 })
        }
    }
    const handleLogout = async () => {

        await clearSession();
        dispatch(setEmail(null))
        dispatch(setLocalId(null))
        dispatch(setIsLoggedIn(false))
    }

    useEffect(() => {
        console.log("location effect");
        
        async function getCurrentLocation() {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Los permisos fueron denegados');
                    return;
                }

                let location = await Location.getCurrentPositionAsync({});
                if (location) {
                    const response = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_MAPS_KEY}`
                    );
                    const data = await response.json()
                    //console.log("Data desde geocoding", data)
                    setLocation(location)
                    setAddress(data.results[0].formatted_address)
                }
            } catch (error) {
                console.log("Error al obtener la ubicación:", error);
            } finally {
                setLocationLoaded(true);
            }
        }

        getCurrentLocation();
    }, []);

    return (
        <View style={styles.profileContainer}>
            <View style={styles.imageProfileContainer}>
                {
                    image
                        ?
                        <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                        :
                        <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                }
                <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                  <Text style={{ fontSize: 32, color: colors.purple }}>📷</Text>
                </Pressable>
            </View>
            <Text style={styles.profileData}>Email: {user} </Text>
            <View style={styles.mapContainer}>
                {
                    location
                        ?
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={{ "latitude": location.coords.latitude, "longitude": location.coords.longitude }} title={"Tu ubicacion"} />
                        </MapView>
                        :
                        (
                            locationLoaded
                                ?
                                <Text>Hubo un problema al obtener la ubicación</Text>
                                :
                                <ActivityIndicator />
                        )


                }
                <View style={styles.placeDescriptionContainer}>
                    <View style={styles.addressContainer}>
                        <Text>Dirección:</Text>
                        <Text style={styles.address}>{address || ""}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.placeDescriptionContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{address || ""}</Text>
                </View>
            </View>
            <View style={styles.rememberTextContainer}>
                <Text style={styles.rememberText}> Recuerda que tienes envio Gratis y en 24H para la region metropolitana en tu primera compra</Text>
            </View>
            <View style={styles.logoutContainer}>
                <Pressable onPress={handleLogout}> 
                    <Text style={styles.logoutText}> Cerrar sesión</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default UserProfileScreen

const styles = StyleSheet.create({
    profileContainer: {
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.purple,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: colors.white,
        fontSize: 48,
    },
    profileData: {
        paddingVertical: 16,
        fontSize: 16
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
    mapContainer: {
        width: '100%',
        height: 240,
        overflow: "hidden",
        elevation: 5,
        marginBottom: 16
    },
    map: {
        height: 240,
    },
    placeDescriptionContainer: {
        flexDirection: 'row',
        gap: 16
    },
    rememberTextContainer: {
        marginTop: 16,
        paddingHorizontal: 16
    },
    rememberText: {
        fontSize: 16,
        textAlign: 'center',
        fontFamily: 'textMeOn',
        marginTop: 16,
        color: colors.gray

    },
    addressContainer: {
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        marginTop: 8
    },
    address: {
        fontWeight: 'bold',
        flexShrink: 1,
        textAlign: 'center',
        fontFamily: 'textMeOn'
    },
    logoutContainer: {
        marginTop: 32,  
        backgroundColor: colors.error,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
        width: 'auto',
        height: 40,
    },
    logoutText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold'
    }
})