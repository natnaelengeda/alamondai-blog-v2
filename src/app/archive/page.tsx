import Title from '@/components/title'

export default function Archive() {
  return (
    <div
      className="w-full h-full px-3 sm:px-10 xl:px-40 2xl:max-w-[1280px] mx-auto font-serif ">
      <div className="container flex flex-col items-start justify-start w-full h-full gap-5 pt-5 mx-auto ">
        <Title text={"Archive"} />

        <p>No Archive for the moment.</p>
      </div>
    </div>
  )
}
