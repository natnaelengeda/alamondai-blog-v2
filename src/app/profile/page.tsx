
import Main from './components/main';

export default function Page() {
  return (
    <div
      className='w-full h-full px-3 sm:px-10 xl:px-40 2xl:max-w-[1280px] mx-auto'>
      {/* Main Content */}
      <div className='container flex flex-row items-center justify-between w-full h-full mx-auto'>
        <Main />
      </div>
    </div>
  )
}
