import {Ikpi,kpis} from "./kpi";


export const calculateKpis = (data:string[][]):Ikpi[]=>{
    const kpiIdx = new Map<number,number>();
    data[0].forEach((e,i)=>{
        let id = kpis.findIndex((kpi)=>kpi.title===e)
        if(id>=0){
            kpiIdx.set(i,id);
        }
    })

    for(let i=1;i<data.length;i++){
        for(let j=1;j<data[0].length;j++){
            if(kpiIdx.has(j)){
                // console.log(kpis[kpiIdx.get(j) as any].title,Number(data[i][j]))
                kpis[kpiIdx.get(j) as any].value += Number(data[i][j])
                // console.log("my kpi",)
            }
        }
    }

    return kpis;
}