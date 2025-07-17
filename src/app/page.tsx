
// Components
import Title from "@/components/title";
import LatestBlogs from "@/components/latest-blogs";
import FeaturedBlog from "@/components/featured-blog";
import HeadingBar from "@/components/heading-bar";

export default function Home() {

  return (
    <div className="w-full h-full px-3 sm:px-10 xl:px-40 2xl:max-w-[1280px] mx-auto font-serif">
      {/* Main Content */}
      <div className="w-full h-full mx-auto container flex flex-col items-start justify-start pt-5 gap-5 ">

        <div className="w-full h-auto">
          <Title />
          <HeadingBar />
        </div>
        {/* Banner */}
        <FeaturedBlog />
        <LatestBlogs />
      </div>
    </div>
  );
}

