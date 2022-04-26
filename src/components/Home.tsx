import React, { useEffect, useState } from 'react';
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import {calculateKpis, resetKpis} from "../services/utils"
import {kpis} from "../services/kpi";

const doc = new jsPDF();



const Home: React.FC<{}> = () => {
  const [files,setFiles] = useState<File[]>([]);
  const [done,setDone] = useState<boolean>(false);
  const [count,setCount] = useState<number>(0);

  const DownloadKpis = ()=>{
    if (files) {
      console.log(files[0]);
      for(let i=0;i<files.length;i++){
        Papa.parse(files[i], {
          complete: function(results) {
            let cnt = calculateKpis(results.data as string[][])
            setCount(c=>c+cnt);
            if(i==files.length-1){
              setDone(true);
            }
          }}
        )
      }

    }
  }

  const reset = ()=>{
    setFiles([]);
    resetKpis();
    setCount(0);
  }

  useEffect(() => {
    console.log("uploaded",files);
  }, [files]);

  useEffect(() => {
    if(done){
      kpis[0].value = kpis[0].value/count;
      // console.log("finaly done kpis",kpis)
      // console.log("count",count);
      kpis.forEach(function(kpi, i){
        doc.text( kpi.title + " : " + kpi.value ,10, 10 + (i * 10));
      });
      doc.save("two-by-four.pdf");
      setDone(false);
    }
  }, [done]);

    return (
      <>
      <div className="relative h-screen flex flex-col items-center justify-center text-center py-0 px-3 bg-cyan-50">
        <h1 className="text-3xl font-bold leading-normal mt-0 mb-2 text-blue-800">CSV TO PDF</h1>
        <div className="flex justify-center mt-8">
        
    <div className="max-w-2xl rounded-lg shadow-xl bg-gray-50">
        <div className="m-4">
            <div className="flex items-center justify-center w-full ">
                {<label
                    className="flex flex-col w-full h-16 border-4 border-blue-200 border-dashed hover:bg-gray-100 hover:border-gray-300 cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-7 mt-auto">
                        {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg> */}
                        <p className="pt-4 text-sm tracking-wider text-gray-400 group-hover:text-gray-600 ">
                            Attach a csv</p>
                    </div>
                    <input
                      className="opacity-0"
                      type="file"
                      multiple={true}
                      accept=".csv,.xlsx,.xls"
                      onChange={(e) => {
                        var files = e.target.files;
                        if(files){
                          let file = files[0];
                          setFiles(f=>[...f,file]);
                        }
                      }}
                    />
                </label>}
            </div>
        </div>
    </div>
</div> 
        {
          files.map(f=>(
            <p className="p-3 mt-4  bg-blue-300 rounded-md">
              {f.name}
            </p>
          ))
        }
        {files&&(
        <div className="flex">
        <button onClick={DownloadKpis} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-10">
          Download Pdf
        </button>
        <button onClick={reset} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-10 mx-5">
          Reset
        </button>
        </div>
        )}

        </div >
      </>
    );
}

export { Home };