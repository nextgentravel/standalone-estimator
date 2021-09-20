import React from "react"

export default function Layout({ children }) {
    return <div className="app-wrapper">
      <div id="bootstrap-4">
        {children}
      </div>
    </div>
}