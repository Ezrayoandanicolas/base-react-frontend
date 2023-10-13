import ArticleList from "./ArticleList"
import ArticleMega from "./ArticleMega"

const MasterHomePage = () => {
    return(
        <>
            <div className="master-home-page">
                <div className="mt-20">
                    {/* <ArticleMega /> */}
                    <ArticleList />
                </div>
            </div>
        </>
    )
}

export default MasterHomePage