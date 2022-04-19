import React, { useEffect, useState } from 'react';
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import {calculateKpis} from "../services/utils"

const doc = new jsPDF();



const Home: React.FC<{}> = () => {
  const [files,setFiles] = useState<FileList|null>();

  const DownloadKpis = ()=>{
    if (files) {
      console.log(files[0]);
      Papa.parse(files[0], {
        complete: function(results) {
          console.log("Finished:", results.data);
          const kpis = calculateKpis(results.data as string[][])
          
          kpis.forEach(function(kpi, i){
              doc.text( kpi.title + " : " + kpi.value ,10, 10 + (i * 10));
          });
  
          console.log(doc);
          doc.save("two-by-four.pdf");
        }}
      )
    }
  }

  useEffect(() => {
    console.log(files);
  }, [files]);
    return (
      <>
      <div className="relative h-screen flex flex-col items-center justify-center text-center py-0 px-3 bg-cyan-50">
        <h1 className="text-3xl font-bold leading-normal mt-0 mb-2 text-blue-800">CSV TO PDF</h1>
          {/* <div>
              <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => {
            const files = e.target.files;
            setFiles(files);
          }}
        />
        </div> */}
        <div className="flex justify-center mt-8">
    <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
        <div className="m-4">
            <div className="flex items-center justify-center w-full ">
                {!files?<label
                    className="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-7 mt-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600 ">
                            Attach a file</p>
                    </div>
                    <input
                      className="opacity-0"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => {
                        const files = e.target.files;
                        setFiles(files);
                      }}
                    />
                    {/* <input type="file"  /> */}
                </label>:<p>{files&&(files[0] as any).name}</p>}
            </div>
        </div>
    </div>
</div> 
{files&&(

<div className="flex">
<button onClick={DownloadKpis} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10">
  Download Pdf
</button>
<button onClick={()=>setFiles(null)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-10 mx-5">
  Reset
</button>
</div>
)}

        </div >
      </>
    );
}

export { Home };