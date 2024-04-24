import LeftHero from "../lefthero/LeftHero";
import RightHero from "../righthero/RightHero";

export default function Hero(){
    return(
        <>
        <div className="flex">
          <LeftHero/>
          <RightHero/>
        </div>
        </>
    );
}