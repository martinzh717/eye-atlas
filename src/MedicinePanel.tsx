import {useState} from 'react'
import {parts} from './data'
import type {PartId} from './data'
import {medicines} from './clinicalData'
import type {ClinicalEntry} from './clinicalData'
import {medicineStories,medicineKnowledge,medicineLearningSources} from './medicineLearning'
export default function MedicinePanel({entry,onEntry,onPart,selected}:{entry:ClinicalEntry;onEntry:(e:ClinicalEntry)=>void;onPart:(id:PartId)=>void;selected:PartId}){
 const [scenario,setScenario]=useState(0)
 const story=medicineStories[scenario],knowledge=medicineKnowledge[entry.id]
 function chooseScenario(index:number){setScenario(index);onEntry(medicines.find(m=>m.id===medicineStories[index].drugs[0])!)}
 return <section className="clinical medicine-learning" aria-label="药物作用学习">
 <div className="clinical-menu"><p className="kicker">从眼表问题认识药物</p>{medicineStories.map((c,i)=><button key={c.title} aria-pressed={scenario===i} onClick={()=>chooseScenario(i)}><small>案例 0{i+1} · {c.subtitle}</small><strong>{c.title}</strong></button>)}<p className="exam-menu-note">四个模拟案例，说明用药思路。个人处方单独放在下方。</p></div>
 <article className="clinical-detail"><div className="clinical-heading"><div><p className="kicker">药物与作用 / 案例 0{scenario+1}</p><h2>{story.title}</h2></div><span className="record-status">模拟教学案例</span></div>
 <div className="medicine-case-evidence"><h3>症状与检查</h3><p>{story.symptom}</p><strong>{story.findings}</strong></div>
 <div className="medicine-reasoning"><div><span>01</span><h3>问题在哪里</h3><p>{story.problem}</p></div><div><span>02</span><h3>为什么考虑这类药</h3><p>{story.why}</p></div><div><span>03</span><h3>希望改善什么</h3><p>{story.benefit}</p></div></div>
 <p className="medicine-case-note">{story.next}</p>
 <section className="medicine-options" aria-label="通用名药物对照"><h3>结合这个案例，认识药物</h3><p className="micro">点击通用名查看作用与部位。此处介绍作用方向，不表示这些药需要一起使用。</p><div className="medicine-card-grid">{medicines.map(m=><button key={m.id} className="medicine-card" aria-pressed={entry.id===m.id} onClick={()=>onEntry(m)}><small>{medicineKnowledge[m.id].category}</small><strong>{m.name}</strong><span>{story.drugs.includes(m.id)?'本案例相关':'可对照了解'}</span></button>)}</div></section>
 <section className="medicine-focus" aria-label="当前药物说明"><div className="clinical-heading"><div><p className="kicker">{knowledge.category}</p><h2>{entry.name}</h2></div></div><div className="clinical-columns"><div><h3>主要成分</h3><p>{knowledge.ingredient}</p><h3>它怎么起作用</h3><p>{knowledge.action}</p><h3>能改善什么</h3><p>{knowledge.benefit}</p></div><div><h3>作用在眼睛哪里</h3><p>滴入结膜囊后，随眨眼分布到泪膜和角结膜表面，在眼表发挥润滑或保护作用。</p><div className="target-chips" aria-label="药物关联部位">{entry.targets.map(id=><button key={id} aria-pressed={selected===id} onClick={()=>onPart(id)}><i style={{background:parts.find(p=>p.id===id)!.color}}/>{parts.find(p=>p.id===id)!.name}<span>定位 ↓</span></button>)}</div><p className="micro">点击部位，查看下方 3D 模型。</p></div></div><div className="teaching-difference"><strong>与其他药物怎样区分</strong><p>{knowledge.difference}</p></div></section>
 <details className="dosage-form"><summary>滴眼液和凝胶，有什么区别？</summary><div className="reference-grid"><div><h3>滴眼液</h3><p>通常更容易铺展，适合需要滴入润滑液的情境。不同配方的黏度和停留时间也会不同。</p></div><div><h3>眼用凝胶</h3><p>通常更黏稠、停留更久，但可能短暂使视物模糊。剂型更黏稠不等于药效一定更强。</p></div></div></details>
 <details className="personal-prescription"><summary>真实处方案例 · 三种药如何理解</summary><div><h3>已知的眼表表现</h3><p>泪液分泌量双眼均为 13 mm / 5 min；首次 NIBUT 右眼约 8 秒、左眼约 6 秒。这个组合说明分泌量正常，但泪膜容易破裂。</p><h3>从作用方向理解处方</h3><p>两种滴眼液都参与眼表润滑；凝胶提供润滑与角膜保护的辅助作用。这里只解释药物能做什么，开方医生的具体安排以就诊说明为准。</p><div className="prescription-records">{medicines.map(m=><div key={m.id}><h4>{m.name}{m.id==='hyaluronate'?'（本例 0.3%）':''}</h4><p>{m.rx}</p></div>)}</div><p className="micro">以上次数和疗程仅为该处方记录，不用于模拟案例。凝胶记录为“共 1 天”；实际疗程以及两种人工泪液如何配合，按医生或药师说明执行。</p></div></details>
 <details className="reference-details"><summary>资料来源</summary><div className="reference-content clinical-sources">{medicineLearningSources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a>)}</div></details>
 </article></section>
}
