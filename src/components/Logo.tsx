import Image from "next/image";

export default function Logo() {
  return (

    <div className="position-center top-0 w-screen pt-24 flex items-center justify-center">
      <div className=" p-6  text-white">
        <Image src="/logo.png" priority  alt="state logo" width={320} height={60} />
      </div>
    </div>
  );
}
