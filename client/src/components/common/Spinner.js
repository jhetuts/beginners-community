import React from 'react'
import Spinner from './spinner.gif'

export default () => {
    return (
      <div>
        <img 
            src={Spinner}
            style={{display: 'block', width: '200px', margin: '0 auto'}}
            alt='Loading...'
        />
      </div>
    )
}
