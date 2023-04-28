function PostSnippet({ plantName, plantTempRange, plantZone, plantSunReq, plantDescription }) {
    return ( 
        <div className="PostSnippet--container">
            <div className="PostSnippet--top-row">
                <h2>{plantName}</h2>
                <h3 className="right-edge-pusher">{plantTempRange}</h3>
                <h3>{plantZone}</h3>
                <h3>{plantSunReq}</h3>
            </div>
            <h4>{plantDescription}</h4>
        </div>
     );
}

export default PostSnippet;