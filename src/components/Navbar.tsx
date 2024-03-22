import Link from "next/link";

export default function Navbar() {
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
