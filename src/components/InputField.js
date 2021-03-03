import React, { useState } from 'react'
import PropTypes from 'prop-types';

function InputField({ calculate }) {
    const [ipAddr, setIpaddr] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!ipAddr) {
            alert('Please input an IP address')
            return
        }
                
        if(!isValidip(ipAddr)) {
            alert('Alamat IP tidak valid')
            return
        }

        calculate(ipAddr)
    }

    const isValidip = (ip) => {
        const regex = /^((\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\.){3}(\d|[1-9]\d|1\d\d|2([0-4]\d|5[0-5]))\/(\d|[12]\d|3[0-2])$/g
        if(!ip.match(regex)) {
            return false
        }
        return true
    }

    return (
        <form onSubmit={onSubmit} >
            <fieldset>
                <legend>IPv4 Subnet Calculator</legend>
                <div className='input-group'>
                    <label htmlFor='username'>IP Address and Subnet</label>
                    <input type='text' id='Username' placeholder='192.168.0.1/24' value={ipAddr} onChange={(e) => setIpaddr(e.target.value.replaceAll(/\s/g,''))}/>
                </div>
                <input className='inverse' type='submit' value='Calculate'/>
            </fieldset>
        </form>
    )
}

InputField.propTypes = {
    calculate: PropTypes.func
}

export default InputField
