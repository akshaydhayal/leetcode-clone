import Link from "next/link";
import { userState } from "@/store/userAtom";
import { useRecoilState } from "recoil";

export default function Navbar() {
  const [user,setUser]=useRecoilState(userState);
  const nav = [
    { title: "About", route: "/about" },
    { title: "Activity", route: "/activity" },
    { title: "Problems", route: "/problems" },
    { title: "Competitions", route: "/competitions" },
    { title: "Leaderboard", route: "/leaderboard" },
    { title: "My Profile", route: "/profile" },
    { title: "Login", route: "/signin" },
  ];
  return (
    <div className="h-44 flex justify-center">
      <div className="w-4/5 bg-black">
        <p className="text-slate-200 text-8xl p-4">Coder</p>
        <div className="flex justify-start gap-11 px-4">
          {nav.map((item) => {
            if(item.title==="Login" && user){
              return <p className="text-slate-400 text-lg hover:text-white cursor-pointer"
                    onClick={()=>{setUser(null)}}>Logout</p>
            }
            if(item.title==='My Profile' && !user){
              return;
            }
            return (
              <Link href={item.route}>
                <p className="text-slate-400 text-lg hover:text-white cursor-pointer">
                  {item.title}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
