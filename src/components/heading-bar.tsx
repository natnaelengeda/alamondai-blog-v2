
// Icons
import { CiLinkedin } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

import HeaderSearchComponent from "./header-search-component";

interface IHeadingBar {
  setTab: React.Dispatch<React.SetStateAction<string>>
}
export default function HeadingBar({ setTab }: IHeadingBar) {


  const socialLinks = [
    {
      icon: FaFacebook,
      url: "https://web.facebook.com/profile.php?id=61557949859443"
    },
    {
      icon: FaInstagram,
      url: "https://www.instagram.com/alamondai/"
    },
    {
      icon: CiLinkedin,
      url: "https://www.linkedin.com/company/102334748/admin/dashboard/"
    }
  ];

  return (
    <div className="flex flex-row items-center justify-between w-full pb-2 mt-20 border-b border-gray-200 font-roboto">
      {/* Latest / Newsletter */}
      <div className="flex flex-row items-center justify-between gap-2 space-x-2 text-gray-500 divide-x-2 divide-gray-300">
        <p
          className="pr-5 uppercase cursor-pointer"
          onClick={() => setTab('latest')}>latest</p>
        <p
          className="uppercase cursor-pointer"
          onClick={() => setTab('newsletter')}>newsletter</p>
      </div>

      {/* Social Media */}
      <div
        className="flex flex-row items-center justify-between gap-2">
        <HeaderSearchComponent />
        {socialLinks.map(({ icon: Icon, url }, index) => (
          <Icon
            key={index}
            onClick={() => window.open(url, "_blank")}
            className="text-2xl text-gray-500 cursor-pointer hover:text-black"
          />
        ))}
      </div>
    </div>
  )
}
