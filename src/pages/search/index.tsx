import BannerSearch from "@/components/search/search";
import { SearchContent } from "@/utils/const";

const SearchPage =() => {
    return (
        <>
        <head>
            <title>Search</title>
            <meta name="description" content="Search page" />
        </head>
        <BannerSearch SearchContent={SearchContent}/>
        </>
    )
}
export default SearchPage;