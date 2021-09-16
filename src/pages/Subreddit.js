import { useState,useEffect } from 'react';
import snoowrap from 'snoowrap';
import Gallery from '../componenents/Gallery';
import NavBar from '../componenents/Navbar';
import { useLocation } from 'react-router-dom';

export default function Subreddit(){
  const location = useLocation();
  const sub = location.pathname.substring(1)

  const [show, setShow] = useState('Hot')
  const [time, setTime] = useState('all')
  const[showTop, setShowTop] = useState(false)

  const [list, setList] = useState([])

  useEffect(()=>{
    if(list.length === 0){
      async function asignData(){
        try{
        const newList = await getData(sub,show,time)
        setList(newList)}
        catch(err){
        }
      }
      asignData()
    }
  },[list,show,sub,time])

  async function getNext(){
    if(!list || list.length <=0){
      return
    }
    const nextItems = await nextBatch(list,sub,show,time)
    await setList(prev=>{
      const newList= prev.concat(nextItems)
      return newList
    })
    
  }

  function changeShow(newshow){
    setShow(newshow)
    setList([])
    return
  }
  function setTop(time){
    setTime(time)
    setShow('Top')
    setList([])
  }
    return(
        <div className='page-container'>
            <NavBar title={sub}/>
            <div className='top-container'>
            <div className='sorting-container'>
                <ul className='sorting-types'>
                    <li onClick={()=>changeShow('Hot')} className={show === 'Hot' ? 'selected' :'none'}><i className="fab fa-hotjar"></i><span>Hot</span></li>
                    <li onClick={()=>changeShow('New')} className={show === 'New' ? 'selected' :'none'}><i className="fas fa-bahai"></i><span>New</span></li>
                    <li className={show === 'Top' ? 'selected' :'none'} onClick={()=>setShowTop(!showTop)}><i className="fas fa-sort-amount-up"></i>
                        <span>Top</span>
                        {showTop && <ul className='top-options'>
                          <li onClick={()=>setTop('hour')} className='top-time'>Hour</li>
                          <li onClick={()=>setTop('day')} className='top-time'>Day</li>
                          <li onClick={()=>setTop('week')} className='top-time'>Week</li>
                          <li onClick={()=>setTop('month')} className='top-time'>Month</li>
                          <li onClick={()=>setTop('year')} className='top-time'>Year</li>
                          <li onClick={()=>setTop('all')} className='top-time'>All</li>
                        </ul>}
                    </li>
                </ul>
            </div>
            </div>
            <Gallery data={list} next={getNext}/>
        </div>
    )
  }

  async function nextBatch(list,subreddit,show,time){
    if(list && list.length > 0){
      const last = list[list.length -1].name
      const r = new snoowrap({
      userAgent: 'web:image gallery:v0.1 (by /u/0pt1c0)',
      clientId: 'a9yCMNR-nzCR1QtHzv0JOA',
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      refreshToken: process.env.REACT_APP_REFRESH_TOKEN,
    });
    switch(show){
      case 'Hot':
        const data = await r.getSubreddit(subreddit).getHot({limit:50, after:last})
        const json = JSON.stringify(data)
        const jsonData = JSON.parse(json)
        return jsonData
      case 'New':
        const dataNew = await r.getSubreddit(subreddit).getNew({limit:50, after:last})
        const jsonN = JSON.stringify(dataNew)
        const jsonDataN = JSON.parse(jsonN)
        return jsonDataN
      case 'Top':
        const dataTop = await r.getSubreddit(subreddit).getTop({time:time ,limit:50, after:last})
        const jsonT = JSON.stringify(dataTop)
        const jsonDataT = JSON.parse(jsonT)
        return jsonDataT
      default: return
    }
    }
  }


  async function getData(sub,show,time){
    const r = new snoowrap({
      userAgent: 'web:image gallery:v0.1 (by /u/0pt1c0)',
      clientId: 'a9yCMNR-nzCR1QtHzv0JOA',
      clientSecret: process.env.REACT_APP_CLIENT_SECRET,
      refreshToken: process.env.REACT_APP_REFRESH_TOKEN,
    });
    switch(show){
      case 'Hot':
        const data = await r.getSubreddit(sub).getHot({limit:50})
        const json = JSON.stringify(data)
        const jsonData = JSON.parse(json)
        return jsonData
      case 'New':
        const dataNew = await r.getSubreddit(sub).getNew({limit:50})
        const jsonN = JSON.stringify(dataNew)
        const jsonDataN = JSON.parse(jsonN)
        return jsonDataN
      case 'Top':
        const dataTop = await r.getSubreddit(sub).getTop({time:time ,limit:50})
        const jsonT = JSON.stringify(dataTop)
        const jsonDataT = JSON.parse(jsonT)
        return jsonDataT
      default: return
    }
  }
  
  