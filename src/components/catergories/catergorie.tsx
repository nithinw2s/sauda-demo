import Image from "next/image";
import Link from "next/link";
import { Categories } from "@/utils/const";

const Catergorie = () => {
  return (
    <>
      <div className="custom_container catergorie_div">
        {Categories.map((item) => (
            <Link href={item.link} className="catergorie_box" key={item.id}>
              <Image src={item.image} alt="catergorie" width={80} height={70} className="" />
              <p>{item.name}</p>
            </Link>
          )
        )}
      </div>
    </>
  );
};
export default Catergorie;
