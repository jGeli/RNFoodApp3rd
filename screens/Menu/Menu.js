import React from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import { 
    FONTS,
    COLORS,
    SIZES,
    icons,
    images,
    dummyData
} from "../../constants";
import {
    Header, 
    IconButton,
    CartQuantityButton,
    IconLabel,
    TextButton,
    LineDivider,
    Rating,
    StepperInput
} from "../../components";

import { SwipeListView } from 'react-native-swipe-list-view'; 



const Menu = ({ navigation }) => {
    const [qty, setQty] = React.useState(1)
    const [products, setProducts] = React.useState([]);
    const [myCartList, setMyCartList] = React.useState(dummyData.myCart) 
    const [fTotal, setFTotal] = React.useState(0) 
    const [selected, setSelected] = React.useState({});
    const [rndr, setRndr] = React.useState(0);

    function renderHeader() {
        return (
            <Header 
                title="PRODUCT LIST"
                containerStyle={{
                    height: 50,
                    marginHorizontal: SIZES.padding,
                    marginTop: 40
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
                        onPress={() => console.log("Back")}
                    /> 
                }
                rightComponent={
                    <CartQuantityButton
                        quantity={3}
                        onPress={() => navigation.navigate('MyCart')}
                    />
                }
            /> 
        )
    }

    function renderProductList() {
        return (
            <SwipeListView 
                data={products}
                keyExtractor={(item, index) => index}
                contentContainerStyle={{
                    marginTop:SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding * 2
                }}
                rightOpenValue={-75}
                renderItem={(data, rowMap) => {
                    // console.log(selected.id)
                    // console.log(data.item.id)
                    const isSelected = `${selected?.key}-${selected?.id}` == `NewProduct-${data.item.id}`
                    console.log(isSelected)
                    return (
                        <TouchableOpacity
                        style={{
                            backgroundColor: COLORS.white,
                            flexDirection: 'row',
                            height: 100,
                            alignItems: 'center',
                            marginTop: SIZES.radius,
                            paddingHorizontal: SIZES.padding,
                            borderWidth: 2,
                            borderRadius: SIZES.radius,
                            borderColor: isSelected ? COLORS.primary : COLORS.lightGray2
                        }}
                        // style={{
                        //     flexDirection: 'row',
                        //     height: 100,
                        //     alignItems: 'center',
                        //     marginTop: SIZES.radius,
                        //     paddingHorizontal: SIZES.padding,
                        //     borderWidth: 2,
                        //     borderRadius: SIZES.radius,
                        //     // borderColor:  COLORS.lightGray2
                        //     // borderColor: selected && selected.id == data.item.id ? COLORS.primary : COLORS.lightGray2

                        // }}
                        
                        onPress={() => setSelected({...data.item, key: 'NewProduct'})}
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
                            <Text style={{color: COLORS.primary, ...FONTS.h3}}>₱{data.item.price}</Text>
                        </View>
                        {/* Quantity */}
                        {/* <StepperInput 
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
                                } else {
                                    removeMyCartHandler(data.item.id)
                                }
                            }}
                        />  */}
                    </TouchableOpacity>
                )
                }}
                renderHiddenItem={(data, rowMap) => (
                    <IconButton 
                        containerStyle={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            backgroundColor: COLORS.primary,
                            ...styles.cartItemContainer
                        }}
                        icon={icons.eye}
                        iconStyle={{
                            marginRight: 10
                        }}
                        onPress={() => { 
                            navigation.navigate('FoodDetail')
                            setRndr(Math.random())
                        }
                        }
                    />
                )}
            />
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    display: selected.id ? 'flex' : 'none',
                    flexDirection: 'row',
                    height: 120,
                    alignItems: 'center',
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.radius
                }}
            >
                {/* Stepper Input */}
                <StepperInput 
                    value={qty}
                    onAdd={() => setQty(qty + 1)}
                    onMinus={() => {
                        if (qty > 1) {
                            setQty(qty -1)
                        }
                    }}
                />
                {/* Text Button */}
                <TextButton 
                    buttonContainerStyle={{
                        flex: 1,
                        flexDirection: 'row',
                        height: 60,
                        marginLeft: SIZES.radius,
                        paddingHorizontal: SIZES.radius,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary
                    }}
                    label="Add to cart"
                    label2={qty * selected.price}
                    onPress={() => { 
                        setSelected({})
                        setQty(1);  
                    }}
                />
            </View>
        )
    }


    React.useEffect(() => {
        setProducts([])
        setProducts(dummyData.products)

    }, [rndr])



    React.useEffect(() => {
        setProducts(dummyData.products);
    }, [])

    return (
        <View
        style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}
    >
        {/* Header */}
        {renderHeader()}
        {/* Body */}
        <ScrollView>
        {/* Food Detail */}
        {renderProductList()}


        <LineDivider />

        {/* Restaurant */}
        {/* {renderRestaurant()} */}
        </ScrollView>
        {/* Footer */}
        <LineDivider />

        {renderFooter()}
        
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

export default Menu