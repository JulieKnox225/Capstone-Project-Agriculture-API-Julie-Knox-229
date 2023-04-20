function PostSnippet({ plantId, plantName, plantTempRange, plantZone, plantSunReq, plantDescription }) {
    return ( 
        <div className="PostSnippet--container">
            <div className="PostSnippet--top-row">
                <h2>Plant NickName</h2>
                <h3 className="right-edge-pusher">Low - High</h3>
                <h3>9b</h3>
                <h3>Full Sun</h3>
            </div>
            <h4>Brief Description...</h4>
        </div>
     );
}

export default PostSnippet;