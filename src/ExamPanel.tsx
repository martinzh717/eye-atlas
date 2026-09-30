import {useRef, useState} from 'react'
import TeachingCases from './TeachingCases'
import {parts} from './data'
import type {PartId} from './data'
import {interpretations} from './examInterpretation'
import type {ClinicalEntry} from './clinicalData'
import {exams,guides} from './examCatalog'
import type {ExamImage} from './examCatalog'

function ReferenceImage({picture}:{picture:ExamImage}){
 const [failed,setFailed]=useState(false)
 const dialog=useRef<HTMLDialogElement>(null)
 const url=`./exam-images/${picture.file}`
 return <figure className="exam-figure"><h4>{picture.title}</h4>{failed?<p>图片暂不可用，请展开资料信息查看来源。</p>:<button className="image-trigger" onClick={()=>dialog.current?.showModal()} aria-label={`放大图片：${picture.title}`}><img src={url} alt={picture.caption} onError={()=>setFailed(true)}/><span className="image-enlarge">放大查看</span></button>}<figcaption><p>{picture.caption}</p></figcaption>
  <dialog className="image-dialog" ref={dialog} aria-label={`大图：${picture.title}`} onClick={e=>{if(e.target===e.currentTarget)dialog.current?.close()}}><div className="image-dialog-content"><div className="image-dialog-header"><h2>{picture.title}</h2><button autoFocus onClick={()=>dialog.current?.close()} aria-label="关闭大图">关闭 ×</button></div><div className="image-dialog-body"><img src={url} alt={picture.caption}/></div><p>{picture.caption}</p></div></dialog>
 </figure>
}
export default function ExamPanel({entry,onEntry,onPart,selected}:{entry:ClinicalEntry;onEntry:(e:ClinicalEntry)=>void;onPart:(id:PartId)=>void;selected:PartId}){
 const guide=guides[entry.id]
 const interpretation=interpretations[entry.id]
 return <section className="clinical exam-catalog" aria-label="干眼检查指南">
  <div className="clinical-menu"><p className="kicker">按检查目的探索</p>{exams.map(e=><button key={e.id} aria-pressed={entry.id===e.id} onClick={()=>onEntry(e)}><small>{e.group}</small><strong>{e.name}</strong></button>)}<p className="exam-menu-note">常见检查选读。医生结合症状和体征选择项目，并非每个人都需要做全部检查。</p></div>
  <article className="clinical-detail"><p className="kicker">认识检查 / {entry.group}</p><div className="clinical-heading"><div><h2>{entry.name}</h2><p>{entry.question}</p></div><span className="record-status">通用知识</span></div>
   <div className="clinical-columns"><div><h3>为什么检查</h3><p>{entry.meaning}</p><h3>检查后得到什么</h3><p>{entry.record}</p></div><div><h3>检查哪个部位</h3><p>{entry.site}</p><div className="target-chips" aria-label="关联眼部结构">{entry.targets.map(id=><button key={id} aria-pressed={selected===id} onClick={()=>onPart(id)}><i style={{background:parts.find(p=>p.id===id)!.color}}/>{parts.find(p=>p.id===id)!.name}<span>定位 ↓</span></button>)}</div><p className="micro">关联部位可在下方 3D 模型中查看。高亮不表示病变。</p></div></div>
   <section className="exam-procedure" aria-label="检查怎么做"><h3>检查怎么做</h3><ol>{guide.steps.map((s,i)=><li key={s}><span>0{i+1}</span><p>{s}</p></li>)}</ol><p className="exam-experience"><strong>检查时的感受</strong> {guide.experience}</p></section>
   {guide.images.length>0&&<section className="exam-gallery" aria-label="检查配图"><div className="exam-gallery-title"><h3>看图认识检查</h3><span>公开资料 · 与下方个人案例无关</span></div><div className="exam-figures">{guide.images.map(p=><ReferenceImage key={p.file} picture={p}/>)}</div></section>}
   <section className="exam-reference" aria-label="参考范围与判读"><h3>正常参考与判读标准</h3><div className="reference-grid"><div><span>正常参考 / 基准表现</span><p>{interpretation.normal}</p></div><div><span>偏离参考意味着什么</span><p>{interpretation.threshold}</p></div></div><p className="micro">{interpretation.method}</p></section>
   <TeachingCases key={entry.id} examId={entry.id}/>
   <details className="exam-case"><summary>真实案例 A · 数值对照与含义</summary><div className="case-comparison"><div><h3>参考标准</h3><p>{interpretation.normal}</p></div><div><h3>本例结果</h3><p className="case-value">{interpretation.value}</p></div><div className="case-meaning"><h3>代表什么意思</h3><p>{interpretation.meaning}</p></div></div></details>
   <details className="reference-details"><summary>资料与图片版权信息</summary><div className="reference-content"><div className="clinical-sources">{[...interpretation.sources,...entry.sources].filter((s,i,list)=>list.findIndex(x=>x.url===s.url)===i).map(s=><a key={s.url} href={s.url} target="_blank" rel="noreferrer">{s.title} ↗</a>)}</div>{guide.images.map(p=><p key={p.file}><strong>{p.title}</strong><br/><a href={p.source} target="_blank" rel="noreferrer">{p.author} · 原始来源</a> · <a href={p.licenseUrl} target="_blank" rel="noreferrer">{p.license}</a> · 原图未修改</p>)}</div></details>
  </article>
 </section>
}
