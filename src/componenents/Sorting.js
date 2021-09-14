import { useState } from 'react'
import '../styles/sorting.scss'
export default function Sorting(props){
    const[showTop, setShowTop] = useState(false)
    return(
        <div className='top-container'>
            <div className='sorting-container'>
                <ul className='sorting-types'>
                    <li><i className="fab fa-hotjar"></i><span>Hot</span></li>
                    <li><i className="fas fa-bahai"></i><span>New</span></li>
                    <li><i className="fas fa-sort-amount-up"></i><span>Top</span></li>
                </ul>
            </div>
        </div>
    )
}