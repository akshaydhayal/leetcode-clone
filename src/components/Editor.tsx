import Editor, { useMonaco } from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";

export default function EditorComponent({ testCases }) {
  const [language, setLanguage] = useState({
    language_name: "javascript",
    language_id: 63,
  });
  const [code, setCode] = useState("");
  const monaco = useMonaco();
  const [stdout, setStdout] = useState("hello world \n this is good\n");
  const [codeTestCaseOutputs, setCodeTestCaseOutputs] = useState([]);
  const [stdin, setStdin] = useState("");
  const [codeSubmittedToken, setCodeSubmittedToken] = useState(
    "aGVsbG8gd29ybGQgYnkgYWtzaGF5Cg== "
  );
  
  const [problemAccepted, setProblemAccepted] = useState(null);
  const [problemAcceptedDetails,setProblemAcceptedDetails]=useState({});

  function handleEditorChange(value, event) {
    console.log("this is editor value : " + value);
    setCode(value);
    // console.log(`monaco instance : ${JSON.stringify(monaco)}`);
  }
  async function handleGetCodeResult(token) {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_RAPID_API_URL + "/" + token,
      {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        },
        params: {
          base64_encoded: "true",
          fields: "*",
        },
      }
    );
    console.log(response.data);
    if (response.data) {
      const data = response.data;
      if (data.status_id === 6) {
        setStdout(atob(data.compile_output));
      }
      if (response.data.stdout) {
        let stringOp = atob(response.data.stdout);
        setStdout(stringOp);
      }
    }
  }

  async function handleRunCode() {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_RAPID_API_URL,
      {
        source_code: btoa(code),
        language_id: language.language_id,
        stdin: btoa(stdin),
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        },
        params: {
          base64_encoded: "true",
          fields: "*",
        },
      }
    );
    const data = response.data;
    console.log(data);
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log("after waiting 1.5 sec");
        resolve();
      }, 1500);
    });
    handleGetCodeResult(data.token);
  }

  async function handleGetMultpleCodeResult(tokens) {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_RAPID_API_URL}/batch`,
      {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        },
        params: {
          tokens: tokens,
        },
      }
    );
    const data = response.data;

    console.log(data);
    if (data) {
      let runtime=0,memory=0,noOfCasesPasses=0;
      let op = data.submissions.map((s) => {
        // return atob(`${s.stdout}`);
        if(s.time>runtime){
            runtime=s.time;
        }
        if(s.memory>memory){
            memory=s.memory;
        }
        return s.stdout;
      });
      console.log("op : " + op);
      setCodeTestCaseOutputs(op);
      let acceptStatus = true;
      for (let i = 0; i < testCases.length; i++) {
        console.log(
          `code op: ${op[i]} , correct op with btoa: ${btoa(
            testCases[i].output
          )}`
        );
        console.log(
          `code op: ${op[i]} , correct op without : ${testCases[i].output}`
        );
        console.log("equal: " + op[i] == testCases[i].output);
        console.log("equal: " + op[i] === testCases[i].output);
        console.log("sum of both : " + op[i] + testCases[i].output);
        // if(op[i]!=testCases[i].output){
        if (op[i] != testCases[i].output) {
          acceptStatus = false;
        }else{
            noOfCasesPasses+=1;
        }
        // if(op[i]!=btoa(testCases[i].output)){
        //     acceptStatus=false;
        // }
      }
      if (acceptStatus) {
        console.log("Code Accepted!!, congrats!!");
        setProblemAccepted(true);
        setProblemAcceptedDetails({runtime,memory,noOfCasesPasses})
      } else {
        console.log("acceptStatus" + acceptStatus);
        setProblemAccepted(false);
      }
    }
    console.log(data);
  }

  async function handleSubmitCode() {
    let submissions =
      testCases &&
      testCases.map((t) => {
        return {
          language_id: language.language_id,
          source_code: btoa(code),
          stdin: btoa(t.input),
        };
      });
    console.log(submissions);
    const response = await axios.post(`${process.env.NEXT_PUBLIC_RAPID_API_URL}/batch`,
      {
        submissions: submissions,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
          "X-RapidAPI-host": process.env.NEXT_PUBLIC_RAPID_API_HOST,
        },
        params: {
          base64_encoded: "true",
          fields: "*",
        },
      }
    );

    const data = response.data;
    console.log(response);
    console.log(data);
    if (data) {
      let tokens = "";
      for (let i = 0; i < data.length; i++) {
        tokens += data[i].token;
        tokens += ",";
      }
      console.log(tokens);

      await new Promise((resolve) => {
        setTimeout(() => {
          console.log("after waiting 1.5 sec");
          resolve();
        }, 1500);
      });

      handleGetMultpleCodeResult(tokens);
    }
  }
  return (
    <div className="w-4/5">
      <select
        onChange={(e) => {
          setLanguage(JSON.parse(e.target.value));
          console.log(JSON.parse(e.target.value));
        }}
      >
        <option
          value={JSON.stringify({
            language_name: "javascript",
            language_id: 63,
          })}
          selected
        >
          javascript
        </option>
        <option
          value={JSON.stringify({
            language_name: "typescript",
            language_id: 74,
          })}
        >
          typescript
        </option>
        <option
          value={JSON.stringify({ language_name: "cpp", language_id: 54 })}
        >
          C++
        </option>
        <option value={JSON.stringify({ language_name: "c", language_id: 50 })}>
          C
        </option>
        <option
          value={JSON.stringify({ language_name: "python", language_id: 71 })}
        >
          Python
        </option>
        <option
          value={JSON.stringify({ language_name: "java", language_id: 62 })}
        >
          Java
        </option>
      </select>

      <div className="flex gap-8">
        <div className="">
          <Editor
            height="60vh"
            width="60vw"
            language={language.language_name}
            defaultValue="console.log('hello world') #include <iostream>  
            using namespace std;  
            int main() {  
                                int num1, num2, sum;  
                                cin >> num1;  
                                cin >> num2;  
                                sum = num1 + num2;  
                                cout << sum;  
                                return 0; 
                            } 
                        }  "
            value={code}
            onChange={handleEditorChange}
            theme="cobalt"
            options={{ minimap: { enabled: false } }}
          />
            <OutputWindow problemAccepted={problemAccepted} problemAcceptedDetails={problemAcceptedDetails} testCases={testCases}/>
        </div>

        <div className="w-fit flex flex-col justify-between">
          <div className=" h-56 p-4 border-2 border-sky-300">{stdout}</div>
          <textarea
            className="h-32 p-4 rounded-md"
            placeholder="Custom Input"
            onChange={(e) => {
              setStdin(e.target.value);
            }}
          />
          <button
            className="p-2 px-4 rounded-md text-slate-200 border-2 border-sky-200
           font-semibold"
            onClick={handleRunCode}
          >
            Compile and Execute
          </button>
          <button
            className="p-2 px-4 rounded-md text-slate-200 border-2 border-sky-200
           font-semibold"
            onClick={handleSubmitCode}
          >
            Submit
          </button>
          <button
            className="p-2 px-4 rounded-md text-slate-200 border-2 border-sky-200
           font-semibold"
            onClick={() => {
              handleGetCodeResult("aGVsbG8gd29ybGQgYnkgYWtzaGF5Cg");
            }}
          >
            Get Code Result
          </button>
        </div>
      </div>
    </div>
  );
}


function OutputWindow({problemAccepted,problemAcceptedDetails,testCases}){
    return (
      <div>
        {problemAccepted && (
          <div>
            <div className="flex items-center gap-2 mb-8">
              <p className="text-2xl text-slate-400 font-semibold">
                Problem Solved Successfully
              </p>
              <img src="/correct.png" className="w-5 h-5" />
            </div>

            <div className="flex justify-between">
              <div>
                <p className="text-lg text-slate-400 font-extralight">
                  Test Cases Passed
                </p>
                <p className="text-2xl text-slate-400 font-semibold">
                  {problemAcceptedDetails.noOfCasesPasses} / {testCases.length}
                </p>
              </div>
              <div>
                <p className="text-lg text-slate-400 font-extralight">
                  Points Scored
                </p>
                <p className="text-2xl text-slate-400 font-semibold">0 / 0</p>
              </div>
              <div>
                <p className="text-lg text-slate-400 font-extralight">
                  Time Taken
                </p>
                <p className="text-2xl text-slate-400 font-semibold">
                  {problemAcceptedDetails.runtime} sec
                </p>
              </div>
              <div>
                <p className="text-lg text-slate-400 font-extralight">
                  Memory used
                </p>
                <p className="text-2xl text-slate-400 font-semibold">
                  {problemAcceptedDetails.memory / 1000} MB
                </p>
              </div>
            </div>
          </div>
        )}

        {problemAccepted === false && (
          <div className="flex items-center gap-2 mb-8">
            <p className="text-2xl text-slate-400 font-semibold">
              Wrong Answer. !!!
            </p>
            <img src="/wrong.png" className="w-5 h-5" />
          </div>
        )}
      </div>
    );
}