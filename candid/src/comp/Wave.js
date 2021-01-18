import React, { Component } from 'react'
import './Wave.css'

export default class Wave extends Component {
    render() {
        return (
            <div className='svg'>
                <div className='wave0'>
                </div>
                <div className='p'>
                    {this.props.children}
                </div>
                <div className='wave'>
                </div>
            </div>
        )
    }
}