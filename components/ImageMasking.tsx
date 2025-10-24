import Image from "next/image";

import AboutImage from '../app/assets/images/sumit-pic.jpg'

export default function ImageMasking() {
  return (
    <div className="relative w-[310px] h-[400px] bg-white">
      {/* Inverted masking - image shows through the exact same shapes */}
      <div className="relative w-[310px] h-[412px] z-10">
        <Image src={AboutImage} alt="About Image" width={310} height={412} className="object-cover w-full h-full"/>
      </div>
      
      {/* White shapes that create the mask effect - same as original but positioned to mask the image */}
      <div className="bg-white absolute top-0 left-0 rounded-t-full rounded-l-full z-50 w-[100px] h-[100px]" style={{maskOrigin:"border-box", WebkitMaskOrigin:"border-box"}}/>
      <div className="bg-white absolute top-0 left-[105px] rounded-t-full rounded-r-full z-50 w-[100px] h-[100px]"/>
      <div className="bg-white absolute top-0 right-0 rounded-t-full rounded-r-full z-50 w-[100px] h-[205px]"/>
      <div className="bg-white absolute top-[105px] left-0 rounded-t-full rounded-l-full z-50 w-[100px] h-[200px]"/>
      <div className="bg-white absolute left-[105px] top-[155px] -translate-y-1/2 rounded-tr-[50px] rounded-bl-[50px] z-50 w-[100px] h-[100px]"/>
      <div className="bg-white absolute top-[53%] right-0 rounded-b-full rounded-r-full z-50 w-[205px] h-[87px]"/>
      <div className="bg-white absolute bottom-0 left-0 rounded-b-full rounded-l-full z-50 w-[100px] h-[100px]"/>
      <div className="bg-white absolute left-[105px] bottom-0 rounded-tl-[50px] rounded-br-[50px] z-50 w-[100px] h-[100px]"/>
      <div className="bg-white absolute right-0 bottom-0 rounded-b-full rounded-r-full z-50 w-[100px] h-[100px]"/>
    </div>
  )
}