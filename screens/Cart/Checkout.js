import React from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { Header, IconButton, TextButton, CardItem, StepperInput, CartQuantityButton, } from "../../components"
import { FONTS, SIZES, COLORS, icons, dummyData } from "../../constants";

const CheckOut = ({ navigation, route }) => {
    const [myCartList, setMyCartList] = React.useState(dummyData.myCart) 
    const [selectedCard, setSelectedCard] = React.useState(null)
     // hander section
     function updateQuantityHander(newQty, id) {
        const newMyCartList = myCartList.map(cl => (
            cl.id  === id ? { ...cl, qty: newQty} : cl
        ))
        setMyCartList(newMyCartList)
    }

    function removeMyCartHandler(id) {
        let newMyCartList = [...myCartList]

        const index = newMyCartList.findIndex(cart => cart.id === id) 

        newMyCartList.splice(index, 1)

        setMyCartList(newMyCartList)
    }
    function renderHeader() {
        return (
            <Header 
                title="Order Summary"
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
                        style={{
                            width: 40
                        }}
                    >


                    </View>
                }
            />
        )
    }
    // function renderMyCards() {
    //     return (
    //         <View>
    //             {dummyData.myCards.map((item, index) => {
    //                 return (
    //                     <CardItem 
    //                         key={`MyCard-${item.id}`}
    //                         item={item}
    //                         isSelected={`${selectedCard?.key}-${selectedCard?.id}` == `MyCard-${item.id}`}
    //                         onPress={() => setSelectedCard({ ...item,
    //                         key: "MyCard" })}
    //                     />
    //                 )
    //             })}
    //         </View>
    //     )
    // }
    function renderCartList() {
        return (
            <SwipeListView 
                data={myCartList}
                keyExtractor={item => `${item.id}`}
                contentContainerStyle={{
                    marginTop:SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding * 2
                }}
                disableRightSwipe={true}
                rightOpenValue={-75}
                renderItem={(data, rowMap) => (
                    <View
                        style={{
                            height: 100,
                            backgroundColor: COLORS.lightGray2,
                            ...styles.cartItemContainer
                        }}
                    >
                        {/* Food Image */}
                        <View
                            style={{
                                width: 90,
                                height: 100,
                                marginLeft: -10
                            }}
                        >
                            <Image 
                                source={data.item.image}
                                resizeMode="contain"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: 'absolute',
                                    top: 10
                                }}
                            />
                        </View>
                        {/* Food Info  */}
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <Text style={{ ...FONTS.body3}}>{data.item.name}</Text>
                            <Text style={{color: COLORS.primary, ...FONTS.h3}}>${data.item.price}</Text>
                        </View>
                        {/* Quantity */}
                        <StepperInput 
                            containerStlye={{
                                height: 50,
                                width: 125,
                                backgroundColor: COLORS.white
                            }}
                            value={data.item.qty}
                            onAdd={() => updateQuantityHander(data.item.qty + 1, data.item.id)}
                            onMinus={() =>{
                                if (data.item.qty > 1) {
                                    updateQuantityHander(data.item.qty -1, data.item.id)
                                }
                            }}
                        />
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <IconButton 
                        containerStyle={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor: COLORS.primary,
                            ...styles.cartItemContainer
                        }}
                        icon={icons.delete_icon}
                        iconStyle={{
                            marginRight: 10
                        }}
                        onPress={() => removeMyCartHandler(data.item.id)}
                    />
                )}
            />
        )
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Cards */}
            
                 {/* My Card */}
                 {renderCartList()}
                {/* My Card */}
                {/* {renderMyCards()} */}

                {/* Add New Card */}
                {/* {renderAddNewCard()} */}
            

            {/* Footer */}
            {/* {renderFooter()} */}
        </View>
    )
}

const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius
    }
})
export default CheckOut;