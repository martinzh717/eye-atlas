import type {PartId} from './data'
import ExamPanel from './ExamPanel'
import MedicinePanel from './MedicinePanel'
import type {ClinicalEntry} from './clinicalData'
export default function ClinicalPanel({mode,entry,onEntry,onPart,selected}:{mode:'exams'|'medicines';entry:ClinicalEntry;onEntry:(e:ClinicalEntry)=>void;onPart:(id:PartId)=>void;selected:PartId}){
 if(mode==='exams')return <ExamPanel key={entry.id} entry={entry} onEntry={onEntry} onPart={onPart} selected={selected}/>
 return <MedicinePanel entry={entry} onEntry={onEntry} onPart={onPart} selected={selected}/>
}
