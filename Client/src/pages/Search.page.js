import PostSnippet from '../components/PostSnippet';

function SearchPage() {
    return ( 
        <div>
            <div>
                <h3>Search Results:</h3>
            </div>
            <PostSnippet 
                plantName=''
                plantTempRange=''
                plantZone=''
                plantSunReq=''
                plantDescription=''
            />
            <PostSnippet 
                plantName=''
                plantTempRange=''
                plantZone=''
                plantSunReq=''
                plantDescription=''
            />
            <PostSnippet 
                plantName=''
                plantTempRange=''
                plantZone=''
                plantSunReq=''
                plantDescription=''
            />
        </div>
     );
}

export default SearchPage;