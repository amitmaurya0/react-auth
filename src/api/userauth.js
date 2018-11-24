import React, { Component } from 'react';
import axios from 'axios'
import { urls } from './urls';

export const login = (user) =>{
    return axios.post( urls.login , {
        email: user.email,
        password: user.password
      })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
            return error;
      });
}
export const register = (user) =>{
    return axios.post( urls.register , user)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
            return error;
      });
}

