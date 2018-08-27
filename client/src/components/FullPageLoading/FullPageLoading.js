import React from 'react';
import ReactLoading from 'react-loading'
import './FullPageLoading.css'

const FullPageLoading = ({active, color, height, width}) => {
  return (
    <div className={"loadingContainer "+(active ? "active" : "")}>
      <ReactLoading color={color || "blue"} height={height || 64} width={width || 64} type="spin" />
    </div>
  )
}

export default FullPageLoading;
