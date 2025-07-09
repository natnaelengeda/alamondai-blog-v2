import BlogSkeleton from './blog-skeleton';

interface ILoading {
  loading: boolean;
  count?: number
}

const LoadingBlogs = ({ loading, count = 6 }: ILoading) => {
  if (!loading) return null;
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <BlogSkeleton key={index} />
      ))}
    </>
  );
}


export default LoadingBlogs;