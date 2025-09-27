import Image from "next/image";


export default function notFound() {
  return (
    <>
      <Image src={"/assets/images/404image.png"} height={400} width={400} className="w-full h-screen" alt="404 page"/>
    </>
  )
}
