import { saveAs } from 'file-saver';

export default function Image(props){
    function saveImage(){
        saveAs(props.post.url, "image.jpg");
    }
    return(
    <div className='image-container' key={props.post.id}>
        <img src={props.post.url} alt={props.post.title}></img>
        <div className='image-info'>
            <a href={`https://reddit.com${props.post.permalink}`} target='_blank' rel="noopener noreferrer" className='title'>{removeSource(props.post.title)}</a>
            <p>{getSource(props.post.title)}</p>
        </div>
        <div className='image-options'>
            <div onClick={saveImage} >
                <i class="fas fa-arrow-alt-circle-down"></i>
            </div>
        </div>
    </div>
    )
}



function removeSource(string){
    return string.replace(/ *\[[^)]*\] */g, "");
}
function getSource(string){
    const init = string.indexOf('[');
    const fin = string.indexOf(']');
    return string.substring(init + 1, fin)
}