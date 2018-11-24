import React, { Component } from 'react';

export const TextHelper = ({ text, type }) =>{
    if(text){

        return (
            <span style={{ color: type == 'success' ? 'green' : 'red' }} >{text}</span>
        )
    }else{
        return <span></span>
    }
}