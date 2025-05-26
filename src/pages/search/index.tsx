import BannerSearch from "@/components/search/search";
import { SearchContent } from "@/utils/const";
import Head from "next/head";

const SearchPage =() => {
    return (
        <>
        <Head>
            <title>Search</title>
            <meta name="description" content="Search page" />
        </Head>
        <BannerSearch SearchContent={SearchContent}/>
        </>
    )
}
export default SearchPage;