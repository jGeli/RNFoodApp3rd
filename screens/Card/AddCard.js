import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Header, IconButton, TextButton, CardItem } from "../../components"
import { FONTS, SIZES, COLORS, icons, dummyData } from "../../constants";
const AddCard = ({ navigation, route }) => {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <Header 
                // title="MY CARDS"
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 40,
                }}
                leftComponent={
                    <IconButton 
                        icon={icons.back}
                        containerStyle={{
                            width: 40,
                            height: 40,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderWidth: 1,
                            borderRadius:  SIZES.radius,
                            borderColor: COLORS.gray2
                        }}
                        iconStyle={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray2
                        }}
                        onPress={() => navigation.goBack()}
                    /> 
                }
                rightComponent={
                    <View
                        containerStyle={{
                            height: 50,
                            marginHorizontal: SIZES.padding,
                            marginTop: 40,
                        }}
                        iconStyle={{
                            width: 20,
                            height: 20,
                            tintColor: COLORS.gray2
                        }}
                    >
            <TouchableOpacity
                containerStyle={{
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderRadius:  SIZES.radius,
                    borderColor: COLORS.gray2
                }}
                onPress={() => navigation.navigate()}
            >
                    <Ionicon name="add" size={40}></Ionicon>

                    
            </TouchableOpacity>
                    </View>
                }
            />
        </View>
    )
}

export default AddCard;