import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

export default function ImageBtn(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={props.style}>
        <Image style={props.imgStyle} source={props.source}/>
    </TouchableOpacity>
  )
}
