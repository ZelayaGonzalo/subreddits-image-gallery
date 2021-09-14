import React, { memo, useEffect, useState } from 'react';
import {handleViewport} from 'react-in-viewport';


function LazyLoading(props){
    const { inViewport, forwardedRef } = props;
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (inViewport && !loaded) {
          console.log('Load More!!!!!')
          props.next()
        }
      }, [inViewport, loaded]);
    return(
        <div className='load-more' ref={forwardedRef}>
            asd
        </div>
    )
}

const LazyLoad = handleViewport(memo(LazyLoading), {}, { disconnectOnLeave: false });
export default LazyLoad;