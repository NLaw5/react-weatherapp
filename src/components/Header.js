function Header() {
//Note: Alert-notice class is custom class, not part of tailwind css
  return (
    <ul className="flex ml-auto w-full font-bold">
        <li className="text-xs text-gray800 ml-auto mr-6 border-b-2 border-green-400 border-t-1 cursor-pointer">Weather</li>
        <li className="text-xs text-gray800 mr-6 alert-notice cursor-pointer border-b-2 hover:border-green-400"><a href="https://newman-law-portfolio-alpha.vercel.app/" target="_blank">Portfolio Link</a></li>
        {/* <li className="text-xs text-gray800 mr-6 cursor-pointer border-b-2 hover:border-green-400">Map</li>
        <li className="text-xs text-gray800 mr-6 cursor-pointer border-b-2 hover:border-green-400">Satellite</li>
        <li className="text-xs text-gray800 cursor-pointer border-b-2 hover:border-green-400">News</li> */}
    </ul>
  )
}

export default Header