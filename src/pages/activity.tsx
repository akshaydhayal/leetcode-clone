import { useEffect, useState } from "react";
import { act } from "react-dom/test-utils";

export default function activityPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const activity = [
    {
      name: "Akshay Dhayal(randomzz)",
      problem: "#321",
      time: "about 3 hours ago",
      correct: false,
    },
    {
      name: "Akshay Dhayal(randomzz)",
      problem: "#321",
      time: "about 3 hours ago",
      correct: true,
    },
    {
      name: "Akshay Dhayal(randomzz)",
      problem: "#321",
      time: "about 3 hours ago",
      correct: false,
    },
    {
      name: "Akshay Dhayal(randomzz)",
      problem: "#321",
      time: "about 3 hours ago",
      correct: false,
    },
    {
      name: "Akshay Dhayal(randomzz)",
      problem: "#321",
      time: "about 3 hours ago",
      correct: false,
    },
    {
      name: "Akshay Dhayal(randomzz)",
      problem: "#321",
      time: "about 3 hours ago",
      correct: false,
    },
    {
      name: "Akshay Dhayal(randomzz)",
      problem: "#321",
      time: "about 3 hours ago",
      correct: false,
    },
  ];
  async function getActivityData() {
    try {
      const response = await fetch("http://localhost:3000/api/submission");
      const data = await response.json();
      console.log(data);
      setSubmissions(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    getActivityData();
  }, []);

  // if(loading){
  //   return<div>Loading...please wait!!</div>
  // }

  function calculateSubmitTime(time) {
    const currTime = new Date();
    const submitTime = new Date(time);
    const diffTimeInHours = Math.round(
      (currTime - submitTime) / (1000 * 60 * 60)
    );
    let totalDiff='';
    if (diffTimeInHours <= 24){
      totalDiff+=`${diffTimeInHours} hours`
    }else{
      let days = Math.round(diffTimeInHours / 24);
      totalDiff+=`${days} days`;
      if(days>=30){
        let months=Math.round(days/30);
        totalDiff+=`${months} months`;
        if(months>=12){
          let years=Math.round(months/12);
          totalDiff+=`${years} years`;
        }
      }
    }
    return totalDiff;
  }
  return (
    <div className="flex justify-center">
      <div className="w-4/5 flex">
        <div className="w-3/4">
          <p className="text-2xl text-slate-600 mb-6">Submissions</p>
          {submissions.map((act) => {
            return (
              <div className="flex justify-between mb-2">
                <p className="text-lg text-slate-600 cursor-pointer">
                  {act.user.name}
                </p>
                <p className="text-lg text-slate-600 cursor-pointer">
                  {act.problem._id}
                </p>
                {/* <p className="text-lg text-slate-600">{act.createdAt}</p> */}
                {/* <p className="text-lg text-slate-600">{Math.round((currTime-new Date(act.createdAt))/(1000*60*60))}</p> */}
                <p className="text-lg text-slate-600">
                  about {calculateSubmitTime(act.createdAt)} ago
                </p>
                <img
                  className="w-8"
                  src={
                    act.problem_correct === true ? "correct.png" : "wrong.png"
                  }
                />
              </div>
            );
          })}

          {/* {activity.map((act) => {
            return (
              <div className="flex justify-between mb-2">
                <p className="text-lg text-slate-600 cursor-pointer">{act.name}</p>
                <p className="text-lg text-slate-600 cursor-pointer">{act.problem}</p>
                <p className="text-lg text-slate-600">{act.time}</p>
                <img
                  className="w-8"
                  src={act.correct === true ? "correct.png" : "wrong.png"}
                />
              </div>
             );
          })} */}
        </div>
        <div>Activity chart</div>
      </div>
    </div>
  );
}
