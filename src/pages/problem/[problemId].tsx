import EditorComponent from "@/components/Editor";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function programPage() {
  const router = useRouter();
  const problemId = router.query.problemId;
  const [problem, setProblem] = useState(null);
  const [problemTestCases,setProblemTestCases]=useState(null);
  const [loading, setLoading] = useState(true);
  const [hintOpenIndex, setHintOpenIndex] = useState([]);


  async function getProblemData() {
    console.log(`problemId : ${problemId}`);
    if (problemId) {
      try {
        const response = await fetch("http://localhost:3000/api/problem", {
          headers: {
            problem_id: `${problemId}`,
          },
        });
        const data = await response.json();
        console.log(data);
        setProblem(data);
        setProblemTestCases(data.test_cases);
        setHintOpenIndex(Array(data.hints.length).fill(false));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }
  useEffect(() => {
    if(problemId){
      getProblemData();
    }
  }, [problemId]);

  // function findProblemTestCasesFromExamples(examples){
  //   examples: [
  //   {
  //     input: 'nums = [2,7,11,15], target = 9',
  //     output: '[0,1]',
  //     _id: new ObjectId('65facb11273c1e18377082da')
  //   }
  // ]

  //   let testCases=examples.map((e)=>{
  //     let ip=e.input;
  //     let input='';
  //     let copyFlag=false;
  //     for(let i=0; i<ip.length; i++){
  //       if(ip[i]==='='){
  //         copyFlag=true;
  //       }else if(ip[i]===','){
  //         copyFlag=false;
  //       }
  //       if(copyFlag){
  //         input+=ip[i];
  //       }
  //     }
  //     return input;
  //   })
  //   return testCases;
  // }

  if (loading) {
    return <div>Loading...please wait!!</div>;
  }

  return (
    <div className="flex justify-center">
      {problem && (
        <div className="w-4/5">
          <p className="text-base text-slate-600 mb-2">Problem {problem._id}</p>
          <p className="text-2xl text-slate-600 mb-2">{problem.title}</p>
          <div className="flex gap-4 mb-4">
            <p className="bg-slate-600 text-slate-100 text-sm p-1 cursor-pointer">
              {problem.difficulty}
            </p>
            <p className="text-base text-slate-600">Points : {problem.point}</p>
          </div>
          <p className="text-base text-slate-600 mb-4">{problem.description}</p>
          <div className="flex gap-2 mb-2">
            {problem.topic_tags.map((t) => {
              return (
                <p className="bg-slate-600 text-slate-100 text-sm p-1 cursor-pointer">
                  {t}
                </p>
              );
            })}
          </div>
          <div className="mt-8">
            {problem.examples.map((e, ind) => {
              return (
                <div className="mb-3 pl-6 divide-x-2 divide-gray-400">
                  <p className="text-base text-slate-200 mb-2 font-bold">
                    Example {ind + 1}
                  </p>
                  <div className="pl-4">
                    <p className="text-base text-slate-600">
                      <span className="font-semibold text-slate-300">
                        Input :
                      </span>{" "}
                      {e.input}
                    </p>
                    <p className="text-base text-slate-600">
                      <span className="font-semibold text-slate-300">
                        Output :
                      </span>
                      {e.output}
                    </p>
                    <p className="text-base text-slate-600">
                      <span className="font-semibold text-slate-300">
                        Explaination :
                      </span>{" "}
                      {e.explaination}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8">
            <p className="text-base text-slate-200 mb-2 font-bold">
              Constraints{" "}
            </p>
            <ul className="list-disc ml-6">
              {problem.constraints.map((c) => {
                return <li className="text-base text-slate-600 mb-2">{c}</li>;
              })}
            </ul>
          </div>

          <EditorComponent testCases={problemTestCases}/>
          
          <div>
            {problem.hints.map((h, ind) => {
              return (
                <div>
                  <div className="flex">
                    <p className="text-base text-slate-600 font-medium">
                      Hint {ind + 1}
                    </p>
                    <button
                      onClick={() => {
                        // let changedHints = hintOpenIndex;
                        // changedHints[ind] = !changedHints[ind];
                        // setHintOpenIndex(changedHints);
                        console.log("1" + hintOpenIndex);
                        setHintOpenIndex((old) => {
                          old[ind] = !old[ind];
                          return old;
                        });
                        console.log("1.2" + hintOpenIndex);
                        console.log("1.3" + hintOpenIndex[0]);
                        // console.log("2" + changedHints);
                      }}
                    >
                      +
                    </button>
                  </div>
                  {hintOpenIndex[ind] === false && (
                    <p className="text-base text-slate-600">{h}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex gap-6 mt-8">
            <p className="text-sm text-slate-600">
              Accepted : {problem.problem_stats.total_correct_count}
            </p>
            <p className="text-sm text-slate-600">
              Submissions : {problem.problem_stats.total_submit_count}
            </p>
            <p className="text-sm text-slate-600">
              Acceptance Rate :{" "}
              {(problem.problem_stats.total_correct_count /
                problem.problem_stats.total_submit_count) *
                100}{" "}
              %
            </p>
          </div>
        </div>
      )}
    </div>
  );
}



function Dropdown(){
  return(
      <div className="dropdown w-80">
          <div className="dropdown-btn p-3 font-bold flex justify-between">Choose one</div>
          <div className="dropdown-content">
            <div>React</div>
          </div>
      </div>
  )
}