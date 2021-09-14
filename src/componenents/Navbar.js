import { useState } from 'react'
import '../styles/navbar.scss'
import { useHistory } from 'react-router'

export default function NavBar(props){
    const history= useHistory()
    const [search, setSearch] = useState('')
    function handleSearch(e){
        setSearch(e.target.value)
    }
    function redirect(e){
        history.push(`/r/${search}`)
    }
    return(
        <div className='nav-bar-container'>
            <h2 className='sub'>{props.title || ''}</h2>
            <div className='search-bar'>
                <form onSubmit={redirect}>
                    <input type='text' placeholder='subreddit' value={search} className='search' onChange={handleSearch}>
                        
                    </input>
                    <button className='search-btn'><i className="fas fa-arrow-circle-right"></i></button>
                    
                </form>
            </div>
        </div>
    )
}