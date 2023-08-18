import React from 'react'

export default function DebugInfo({ value }) {
    return (
        <pre style={{color:"lime",textAlign:"left", padding:"2rem", border:"3px solid"}}>{JSON.stringify(value, null, 2)}</pre>
    )
}
