import React from 'react';
import Papa from "papaparse";
import { jsPDF } from "jspdf";
import {calculateKpis} from "../services/utils"

const doc = new jsPDF();

const Home: React.FC<{}> = ({ }) => {
    return (
        <div>
            <input
        type="file"
        accept=".csv,.xlsx,.xls"
        onChange={(e) => {
          const files = e.target.files;
          console.log(files);
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
        }}
      />
        </div>
    );
}

export { Home };