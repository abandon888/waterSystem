import React, { useState } from 'react'
import { Col, Input, Row } from 'antd'

import SearchAddress from './search'
import AdvancedMap from './map'

const Index = () => {
  const [position, setPosition] = useState({
    lng: 115.796127,
    lat: 28.647924,
  })
  const [addressName, setAddressName] = useState('')

  const changePosition = (value) => {
    setPosition(value)
  }

  const changeAddressName = (value) => {
    setAddressName(value)
  }

  return (
    <div style={{ width: '100%', }}>
      <SearchAddress
        changePosition={changePosition}
        changeAddressName={changeAddressName}
        addressName={addressName}
      />
      <br />
      <AdvancedMap
        position={position}
        changePosition={changePosition}
        changeAddressName={changeAddressName}
      />
    </div>
  )
}

export default Index
