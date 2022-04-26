import {Ikpi,kpis} from "./kpi";


export const calculateKpis = (data:string[][]):number=>{
    const kpiIdx = new Map<number,number>();
    data[0].forEach((e,i)=>{
        let id = kpis.findIndex((kpi)=>kpi.title===e)
        if(id>=0){
            kpiIdx.set(i,id);
        }
    })
    console.log("dat",data)
    for(let i=1;i<data.length;i++){
        for(let j=1;j<data[0].length;j++){
            if(kpiIdx.has(j)){
                kpis[kpiIdx.get(j) as any].value += Number(data[i][j])
            }
        }
    }
    return data?.length-1;
}

export const resetKpis = ()=>{
    for(let i=0;i<kpis.length;i++){
        kpis[0].value = 0;
    }
}