import {useEffect, useState} from "react";

export default function problemsPage() {
  const [problems,setProblems]=useState([]);
  const [isLoading,setLoading]=useState(true);
  const problemss = [
    {
      id: "#1",
      title: "2 sum problem",
      tags: ["Array", "2 Pointer"],
      last_user_solved: {
        name: "Kripa",
        avatar_img:
          "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
      },
    },
    {
      id: "#2",
      title: "2 sum problem",
      tags: ["Array", "2 Pointer"],
      last_user_solved: {
        name: "Kripa",
        avatar_img:
          "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
      },
    },
    {
      id: "#3",
      title: "2 sum problem",
      tags: ["Array", "Recusion", "Characters"],
      last_user_solved: {
        name: "Kripa",
        avatar_img:
          "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
      },
    },
    {
      id: "#4",
      title: "2 sum problem",
      tags: ["String", "Dynamic Programming"],
      last_user_solved: {
        name: "Kripa",
        avatar_img:
          "https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp",
      },
    },
  ];
  async function getProblems(){
    try{
      const response=await fetch("http://localhost:3000/api/problems");
      const data=await response.json();
      console.log(data);
      setProblems(data);
      setLoading(false);
    }catch(error){
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(()=>{
    getProblems();
  },[])

  if(isLoading){
    <div>Loading...Please wait!!</div>
  }
  return (
    <div className="flex justify-center">
      <div className="w-4/5 flex gap-12 mt-8">
        <div className="w-8/12">
            <p className="text-2xl text-slate-600 mb-6">All Problems</p>
          {problems.length>0 && problems.map((p) => {
            return (
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <div className="flex gap-16">
                    <p className="text-lg text-slate-600 cursor-pointer">{p._id}</p>
                    <p className="text-lg text-slate-600 cursor-pointer">{p.title}</p>
                  </div>
                  <div className="flex gap-3">
                    <p className="text-lg text-slate-600">recently solved by</p>
                    <img className="w-8" src={p.last_user_solved.avatar_img} />
                  </div>
                </div>
                <div className="flex gap-2 ml-20">
                  {p.topic_tags.length>0 && p.topic_tags.map((t) => {
                    return (
                      <p className="bg-slate-600 text-slate-100 text-sm p-1 cursor-pointer">
                        {t}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })}


          {/* {problemss.map((p) => {
            return (
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <div className="flex gap-16">
                    <p className="text-lg text-slate-600 cursor-pointer">{p.id}</p>
                    <p className="text-lg text-slate-600 cursor-pointer">{p.title}</p>
                  </div>
                  <div className="flex gap-3">
                    <p className="text-lg text-slate-600">recently solved by</p>
                    <img className="w-8" src={p.last_user_solved.avatar_img} />
                  </div>
                </div>
                <div className="flex gap-2 ml-20">
                  {p.tags.map((t) => {
                    return (
                      <p className="bg-slate-600 text-slate-100 text-sm p-1 cursor-pointer">
                        {t}
                      </p>
                    );
                  })}
                </div>
              </div>
            );
          })} */}


        </div>
        <div>Progress and submission activity chart</div>
      </div>
    </div>
  );
}
