import Image from "next/image";
import Feed from "@/components/Feed"
export default function Home() {
  return (
    <section className="w-full flex-center flex-col py-4 px-6">
      <h1 className="text-5xl font-bold text-center">
        Discover and Share
        <br className="max-md:hidden"/>
        <span className="text-center text-transparent bg-clip-text block
        bg-gradient-to-r from-amber-400 via-orange-600 to-amber-400"> AI-Powered Prompts</span>
      </h1>
      <p className="text-center w-full px-[15vw] sm:px-[25vw] mt-8 text-neutral-600">
        promptopia is an open-source AI promting tool for modern world to discover, create and share prompts
      </p>

    <Feed/>
    </section>
  );
}
