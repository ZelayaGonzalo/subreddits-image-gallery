import { useState,useEffect } from "react";
import LazyLoad from "./LazyLoading";
import '../styles/gallery.scss'
import Image from "./Image";

export default function Gallery(props){
    const [list, setList] = useState([])
    const [rows, setRows] = useState([])
    const [nRows, setNRows] = useState(4)
    //Lazy Load
    const size = useWindowSize()

    useEffect(()=>{
        if(size.width >= 1200){
            setNRows(4)
        }
        else if (size.width >=700 ){
            setNRows(3)
        }
        else{
            setNRows(2)
        }
        setList(props.data)
        setRows(addToList(props.data,[],nRows))
    },[props.data,size])

    return(
        <div className='gallery-container'>
            {rows.map((column,index)=>{
                return(<div className='image-column' key={index}>
                    {column.map(post => {
                        return(
                            <Image key={post.id} post={post}/> 
                        )
                        })}
                </div>)
            })}
            <LazyLoad list={list} next={props.next}/>
        </div>
    )
}


function addToList(list,rows,nrows){
    let i =0
    const newRows = rows
    list.forEach(post=>{
        if(i >= nrows){
            i=0
        }
        if (post.post_hint === 'image'){
            if(!newRows[i]) newRows[i] = []
            newRows[i].push(post)
            i = i+1
        }
        return
    })
    return newRows
}

function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
  
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
  
      // Add event listener
      window.addEventListener("resize", handleResize);
  
      // Call handler right away so state gets updated with initial window size
      handleResize();
  
      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
  
    return windowSize;
  }

function removeSource(string){
    return string.replace(/ *\[[^)]*\] */g, "");
}
function getSource(string){
    const init = string.indexOf('[');
    const fin = string.indexOf(']');
    return string.substring(init + 1, fin)
}