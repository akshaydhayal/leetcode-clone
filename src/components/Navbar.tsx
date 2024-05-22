import Link from "next/link";
import { userState } from "@/store/userAtom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

export default function Navbar() {
  const [user, setUser] = useRecoilState(userState);
  const router=useRouter();

  const nav = [
    { title: "About", route: "/about" },
    { title: "Activity", route: "/activity" },
    { title: "Problems", route: "/problems" },
    { title: "Leaderboard", route: "/leaderboard" },
    { title: "My Profile", route: "/profile" },
    { title: "Login", route: "/signin" },
  ];
  return (
    // <div className="h-[10vh] flex w-full px-5">
    <div className="h-[10vh] border-b border-slate-700 flex justify-between items-center w-full px-10">
      <div className="flex items-center cursor-pointer" onClick={()=>{
        router.push("/");
      }}>
        <img src="/code1.avif" className="w-20 h-20 "/>
        {/* <img src="/code2.avif" className="w-20 object-cover border"/> */}
        {/* <img src="/code3.png" className="w-20 object-cover"/> */}
        <p className="text-white text-4xl p-0 font-medium font-serif">CodeLabs</p>
      </div>
      <div className="flex justify-start gap-11 px-4">
        {nav.map((item,ind) => {
          if (item.title === "Login" && user) {
            return (
              <p key={ind}
                className="text-slate-400 text-lg hover:text-white cursor-pointer"
                onClick={() => {
                  setUser(null);
                }}
              >
                Logout
              </p>
            );
          }
          if (item.title === "My Profile" && !user) {
            return;
          }
          return (
            <Link href={item.route}>
              <p className="text-slate-100 text-lg hover:text-white cursor-pointer">
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
    // </div>
  );
}
