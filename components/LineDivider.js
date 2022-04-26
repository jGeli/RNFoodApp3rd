import React from 'react';
import {
    View
} from 'react-native';

import {
    COLORS,
} from "../constants";

const LineDivider = ({LineStyle}) => {
    return (
        <View
            style={{
                height: 2,
                width: "100%",
                backgroundColor: COLORS.lightGray2,
                ...LineStyle
            }}
        >

        </View>
    )
}

export default LineDivider;