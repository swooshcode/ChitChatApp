import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import appTheme from '@constants/theme';



export default function ImageIcon(props) {
  return (
    <LinearGradient style={[styles.con,props.style]} start={{ x: 0, y: 0 }} colors={[appTheme.COLORS.lightPink , appTheme.COLORS.lightPink,]}>
        <Image style={[styles.img,props.imgstyle]} source={props.src}/>
    </LinearGradient>
  )
}
const styles = StyleSheet.create({
    con:{
        width:55,
        height:55,
        borderRadius:100,
        padding:3
    },
    img:{
        borderWidth:3,
        borderColor:'white',
        borderRadius:100,
        width:50,
        height:50
    }
})