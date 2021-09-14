import React, { memo, useEffect } from 'react';
import {handleViewport} from 'react-in-viewport';


function LazyLoading(props){
    const { inViewport, forwardedRef } = props;
    useEffect(() => {
        if (inViewport) {
          props.next()
        }
      }, [inViewport,props]);
    return(
        <div className='load-more' ref={forwardedRef}>
            asd
        </div>
    )
}

const LazyLoad = handleViewport(memo(LazyLoading), {}, { disconnectOnLeave: false });
export default LazyLoad;