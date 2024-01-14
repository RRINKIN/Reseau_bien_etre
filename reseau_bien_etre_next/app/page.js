//import Categories from "./components/global/categories";
import PrestaireCards from "./components/homePage/prestataireCards";
import Image from 'next/image';
import Reinsurance from "./components/homePage/Reinsurance";
import CategorieDuMois from "./components/homePage/categorieDuMois";
import Slider_2 from "./components/homePage/slider_2";
 
async function HomePage() {
  return (
    <section>
      <section className="flex bg-gradient-to-b from-[#c3bef0] to-zinc-300 justify-content px-7 md:pl-20 pt-20 items-center">
        <div>
          <h1 className="text-4xl md:text-7xl text-white md:max-w-4xl font-extrabold">Prenez soin de vous Près de chez vous</h1>
          <div className="flex bg-white rounded-full h-10 md:h-12 w-2/3 border-none mt-10 mb-10">
            <input type="search" id="search" name="search" placeholder="Que cherchez-vous?" className="bg-transparent px-4" />
          </div>
        </div>
        <div className="hidden md:block">
          <Image src="/images/reseau_bien_etre_girl.png" width="900" height="700" alt="fille-bien-etre" />
        </div>
      </section>
      <section className="p-4 bg-zinc-100">
        <Slider_2 />
      </section>
      <section className="flex flex-col items-center justify-start max-w-screen-xl mx-auto">
        <h2 className=" text-2xl md:text-4xl font-extrabold pt-7">Votre bien-être commence ici</h2>
        <div className="flex bg-zinc-200 rounded-full h-10 md:h-12 md:w-1/3 border-none mt-10 mb-10">
            <input type="search" id="search" name="search" placeholder="Que cherchez-vous?" className="bg-transparent px-4" />
        </div>
          <PrestaireCards />
        <div className="flex flex-row justify-center bg-zinc-200 rounded-full h-10 md:h-12 w-1/3 border-none mt-10 mb-10">
            <input type="more" id="more" name="more" placeholder="J'en veux plus !" className="text-center bg-transparent px-4" />
        </div>
      </section>
      <CategorieDuMois />
      <Reinsurance />
    </section>

  );
}
export default HomePage;