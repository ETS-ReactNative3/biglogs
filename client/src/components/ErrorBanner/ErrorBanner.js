import React from 'react';
import './ErrorBanner.css'

const ErrorBanner = ({err}) => (
  <div className={"errorBanner "+(err ? "show" : "")}>
    {err ? (
      <div>
        <p>{err ? err.toString() : ""}</p>
        <button className="errorRefresh" onClick={()=>window.location.reload()}>Reload</button>
      </div>
    ): null}
</div>
);

export default ErrorBanner;
