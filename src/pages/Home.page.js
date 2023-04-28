import PostSnippet from "../components/PostSnippet";

function HomePage() {
    return ( 
        <>
            <PostSnippet 
                plantName='Sunflower'
                plantTempRange='70-90f'
                plantZone='9b'
                plantSunReq='Full sun'
                plantDescription='Pretty :)'
            />
            <PostSnippet 
                plantName='Daisies'
                plantTempRange='60-80f'
                plantZone='8b'
                plantSunReq='Partial Sun'
                plantDescription='Cute :)'
            />
            <PostSnippet 
                plantName='Kale Bloom'
                plantTempRange='70-80f'
                plantZone='9b'
                plantSunReq='Partial'
                plantDescription="Yeah it's real"
            />
        </>
     );
}

export default HomePage;