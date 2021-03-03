import React from 'react'
import PropTypes from 'prop-types';

function TableResult({ data }) {
    return (
        <table className="horizontal">
            <caption>Result</caption>
            <thead>
                <tr>
                    <th>Subnet Mask</th>
                    <th>Subnet Mask Bin</th>
                    <th>IP Address</th>
                    <th>IP Address Bin</th>
                    <th>CIDR</th>
                    <th>Network Address</th>
                    <th>Broadcast Address</th>
                    <th>Total Host</th>
                    <th>Usable Host</th>
                    <th>Range IP</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td data-label='Subnet Mask'>{data.subnetMask}</td>
                    <td data-label='Subnet Mask Bin'>{data.subnetBinary}</td>
                    <td data-label='IP Address'>{data.ip}</td>
                    <td data-label='IP Address Bin'>{data.ipBinary}</td>
                    <td data-label='CIDR'>{data.cidr}</td>
                    <td data-label='Network Address'>{data.networkAddress}</td>
                    <td data-label='Broadcast Address'>{data.broadcastAddress}</td>
                    <td data-label='Total Host'>{data.amountHost}</td>
                    <td data-label='Usable Host'>{data.usableHost}</td>
                    <td data-label='Range IP'>{data.rangeIp}</td>
                </tr>
            </tbody>
        </table>
    )
}

TableResult.propTypes = {
    data: PropTypes.object
}

export default TableResult
