import PostSnippet from '../components/PostSnippet';
function ProfilePage() {
    return ( 
        <div>
            <div>
                <h3>Your Saved Garden:</h3>
            </div>
            <PostSnippet 
                plantName='Tomatoes'
                plantTempRange='70-90f'
                plantZone='9b'
                plantSunReq='Full sun'
                plantDescription='Yummy :)'
            />
            <PostSnippet 
                plantName='Bell peppers'
                plantTempRange='60-80f'
                plantZone='9b'
                plantSunReq='Full sun'
                plantDescription='Not spicy'
            />
            <PostSnippet 
                plantName='Basil'
                plantTempRange='70-90f'
                plantZone='9b'
                plantSunReq='Full sun'
                plantDescription='Smells good'
            />
        </div>
     );
}

export default ProfilePage;