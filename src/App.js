import 'mini.css'
import React, { useState } from 'react'
import InputField from './components/InputField'
import TableResult from './components/TableResult'
import Footer from './components/Footer'


function App() {
  const [result, setResult] = useState({status: false}) 
  const bin2dec = (bin) => {
    return parseInt(bin, 2).toString(10);
  }

  const dec2bin = (dec) => {
    return (dec >>> 0).toString(2)
  }

  const adjust8bit = (bin) => {
    return ("000000000" + bin).substr(-8)
  }

  const adjust32bit = (bin) => {
    return ("000000000000000000000000000000000000" + bin).substr(-32)
  }

  const bin2ip = (bin) => {
    if(bin.length != 32) {
      bin = adjust32bit(bin)
    }
    
    return bin.match(/.{8}/g).map(item => {
      return bin2dec(item)
    }).join('.')
  }

  const ip2bin = (ip) => {
    return ip.split('.').map(item => {
      return adjust8bit(dec2bin(item))
    }).join('')
  }

  const findBroadcast = (ipBin, cidr) => {
    return ipBin.substr(0, cidr) + '1'.repeat(32 - cidr)
  }

  const findNetworkaddr = (ipBin, cidr) => {
    return ipBin.substr(0, cidr) + '0'.repeat(32 - cidr)
  }

  const countIp = (ip, sum) => {
    const ipArr = ip.split('.')
    ipArr[3] = (parseInt(ipArr[3]) + sum).toString()
    return ipArr.join('.')
  }

  const findRangeip = (network, broadcast) => {
    return `${countIp(network, 1)} - ${countIp(broadcast, -1)}`
  }

  const calculate = (inputIp) => {
    const cidr = parseInt(inputIp.split('/')[1])
    const subnetBin = '1'.repeat(cidr) + '0'.repeat(32 - cidr)
    const subnetMask = bin2ip(subnetBin)
    
    const ip = inputIp.split('/')[0]
    const ipBin = ip2bin(ip)

    const host = 2**(32 - cidr)
    const usableHost = host - 2

    const networkAddr = bin2ip(findNetworkaddr(ipBin, cidr))
    const broadcastAddr = bin2ip(findBroadcast(ipBin, cidr))

    const rangeIp = findRangeip(networkAddr, broadcastAddr)

    setResult({
      subnetMask: subnetMask,
      subnetBinary: subnetBin.match(/.{8}/g).join('.'),
      ip: ip,
      ipBinary: ipBin.match(/.{8}/g).join('.'),
      amountHost: host,
      usableHost: usableHost,
      networkAddress: networkAddr,
      broadcastAddress: broadcastAddr,
      rangeIp: rangeIp,
      cidr: cidr,
      status: true
    })
  }

  return (
    <div>
      <h1>IPv4 Subnet Calculator</h1>
      <InputField calculate={calculate} />
      { result.status && <TableResult data={result} />}
      <Footer />
    </div>
  );
}

export default App;
