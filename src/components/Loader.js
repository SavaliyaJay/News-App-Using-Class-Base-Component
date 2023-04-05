// import PropTypes from 'prop-types'
import React, { Component } from 'react'
import loading from './Fading wheel.gif'

export default class Loader extends Component {

    render() {
        return (
            <div className="text-center">
                <img src={loading} alt="loading" srcSet="" />
            </div>
        )
    }
}
