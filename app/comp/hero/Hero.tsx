import LeftHero from "../lefthero/LeftHero";
import RightHero from "../righthero/RightHero";

export default function Hero() {
  return (
    <>
      <div className="flex m-2 rounded-xl p-2 gap-4 border-2 border-black">
        <LeftHero />
        <RightHero />
      </div>
    </>
  );
}
