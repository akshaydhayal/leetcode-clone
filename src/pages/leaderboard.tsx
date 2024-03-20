import {useEffect,useState} from "react";

export default function leaderboardPage() {
  const [userss,setUser]=useState([]);
  const users = [
    {
      rank:1,
      name: "Akshay Dhayal",
      avatar_img:
        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
      points_scored: 121,
    },
    {
      rank:2,
      name: "Akshay Dhayal",
      avatar_img:
        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
      points_scored: 212,
    },
    {   
        rank:3,
      name: "Akshay Dhayal",
      avatar_img:
        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
      points_scored: 221,
    },
    {
        rank:4,
      name: "Akshay Dhayal",
      avatar_img:
        "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
      points_scored: 221,
    },
  ];

  async function getUsers(){
    const response=await fetch("http://localhost:3000/api/users");
    const data=await response.json();
    console.log(data);
    setUser(data);
  }
  useEffect(()=>{
    getUsers();
  },[])

  return (
    <div className="flex justify-center">
      <div className="flex w-4/5 gap-12 mt-8">
        <div className="w-3/4">
          <p className="text-2xl text-slate-600 mb-6">Leaderboard</p>

          { userss.length>0 && userss.map((u) => {
            return (
              <div className="flex gap-36 mb-2">
                <div className="flex gap-10">
                    <p className="text-lg text-slate-600">1</p>
                    <img className="w-9" src={u.avatar_img} />
                <p className="text-lg text-slate-600 cursor-pointer">
                  {u.name}
                </p>
                </div>
                <p className="text-lg text-slate-600">{u.points_scored}</p>
              </div>
            );
          })}
        </div>
        <div className="">Top contributors</div>
      </div>
    </div>
  );
}
