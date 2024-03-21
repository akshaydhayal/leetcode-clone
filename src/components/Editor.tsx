import Editor, { useMonaco } from "@monaco-editor/react";
import { useState } from "react";
import axios from "axios";

export default function EditorComponent() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const monaco = useMonaco();
  const [stdout,setStdout]=useState("hello world \n this is good\n");
  const [stdin,setStdin]=useState("");
  const [codeSubmittedToken,setCodeSubmittedToken]=useState('aGVsbG8gd29ybGQgYnkgYWtzaGF5Cg== ')

  function handleEditorChange(value, event) {
    console.log("this is editor value : " + value);
    setCode(value);
    // console.log(`monaco instance : ${JSON.stringify(monaco)}`);
  }
  async function handleGetCodeResult(token){
    //judge0-ce.p.rapidapi.com/submissions/aGVsbG8gd29ybGQgYnkgYWtzaGF5Cg==%20?base64_encoded=true&fields=*
    const response = await axios.get(process.env.NEXT_PUBLIC_RAPID_API_URL+"/"+token,
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
    if(response.data.stdout){
        let stringOp=atob(response.data.stdout);
        setStdout(stringOp);
    }
  }

  async function handleSubmitCode(){
    const response=await axios.post(process.env.NEXT_PUBLIC_RAPID_API_URL,
      {
        source_code: btoa(code),
        language_id: 63,
        stdin: stdin,
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
    const data=response.data;
    console.log(data);
    handleGetCodeResult(data.token);
  }
  return (
    <div>
      <select
        onChange={(e) => {
          setLanguage(e.target.value);
          console.log(JSON.parse(e.target.value));
          console.log((e.target.value));
        }}
      >
        <option
          value="javascript"
          selected

        >
          javascript
        </option>
        <option
          value={JSON.stringify({language:"typescript",language_id:64})}
        >
          typescript
        </option>
      </select>

      <div className="flex gap-8">
        <Editor
          height="90vh"
          width="100vw"
          language={language}
          defaultValue="console.log(hello world)"
          value={code}
          onChange={handleEditorChange}
          theme="cobalt"
          options={{ minimap: { enabled: false } }}
        />
        <div className="w-56 flex flex-col justify-between">
          <div className=" h-56 p-4 border-2 border-sky-300">{stdout}</div>
            <textarea className="h-32 p-4 rounded-md" placeholder="Custom Input" 
            onChange={(e)=>{
                setStdin(e.target.value);
            }}/>
          <button className="p-2 px-4 rounded-md text-slate-200 border-2 border-sky-200
           font-semibold" onClick={handleSubmitCode}>
            Compile and Execute</button>
          <button className="p-2 px-4 rounded-md text-slate-200 border-2 border-sky-200
           font-semibold" onClick={()=>{handleGetCodeResult('aGVsbG8gd29ybGQgYnkgYWtzaGF5Cg');}}>
            Get Code Result</button>
        </div>
      </div>
    </div>
  );
}
