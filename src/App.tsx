import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Eye, EyeOff, RotateCcw, Move, ArrowUpRight, BookOpen, Layers3, Focus, ChevronRight, Play, Pause, Check } from 'lucide-react'
import {parts,views} from './data'
import ClinicalPanel from './ClinicalPanel'
import {medicines} from './clinicalData'
import {exams} from './examCatalog'
import type {ClinicalEntry} from './clinicalData'
import type {PartId,ViewId} from './data'
const Scene=lazy(()=>import('./Scene'))
const initialVisibility=()=>Object.fromEntries(parts.map(p=>[p.id,true])) as Record<PartId,boolean>
export default function App(){
 const [mode,setMode]=useState<'anatomy'|'exams'|'medicines'>('anatomy')
 const [exam,setExam]=useState(exams[0])
 const [medicine,setMedicine]=useState(medicines[0])
 const entry=mode==='exams'?exam:medicine
 const [view,setView]=useState<ViewId>('overview')
 const [selected,setSelected]=useState<PartId>('cornea')
 const [visible,setVisible]=useState(initialVisibility)
 const [labels,setLabels]=useState(true)
 const [ghost,setGhost]=useState(true)
 const [preset,setPreset]=useState<'front'|'angle'|'side'>('front')
 const [reset,setReset]=useState(0)
 const [phase,setPhase]=useState(0)
 const [incomplete,setIncomplete]=useState(false)
 const [playing,setPlaying]=useState(false)
 const [reduced,setReduced]=useState(()=>matchMedia('(prefers-reduced-motion: reduce)').matches)
 const resources=useRef<HTMLDialogElement>(null)
 const part=parts.find(p=>p.id===selected)!
 useEffect(()=>{const m=matchMedia('(prefers-reduced-motion: reduce)');const f=()=>setReduced(m.matches);m.addEventListener('change',f);return()=>m.removeEventListener('change',f)},[])
 useEffect(()=>{if(!playing||reduced||view!=='film')return;const t=window.setInterval(()=>setPhase(x=>Math.min(100,x+1)),100);return()=>clearInterval(t)},[playing,reduced,view])
 useEffect(()=>{if(phase>=100)setPlaying(false)},[phase])
 function select(id:PartId){setSelected(id);setVisible(v=>({...v,[id]:true}));if(view==='glands'&&!['eyelid','meibomian'].includes(id)||view==='film'&&!['tear','eyelid','cornea'].includes(id))setView('overview')}
 function changeView(id:ViewId){setView(id);setPlaying(false);setVisible(initialVisibility());setSelected(id==='glands'?'meibomian':id==='film'?'tear':'cornea');setPreset(id==='film'?'angle':'front');setReset(x=>x+1)}
 function locateEntry(e:ClinicalEntry){if(e.rx)setMedicine(e);else setExam(e);changeView(e.view);setSelected(e.targets[0]);setPhase(0)}
 function changeMode(next:'anatomy'|'exams'|'medicines'){setMode(next);if(next!=='anatomy')locateEntry(next==='exams'?exam:medicine)}
 function resetAll(){setVisible(initialVisibility());setLabels(true);setGhost(true);setPhase(0);setPlaying(false);setIncomplete(false);setPreset(view==='film'?'angle':'front');setReset(x=>x+1)}
 return <>
 <a className="skip" href="#details">跳至结构说明</a>
 <header className="header"><a className="brand" href="./"><Eye size={26}/><span>眼表图谱<small>Eye Atlas</small></span></a><span className="header-note">从构造开始，理解干眼</span><button className="text-button" onClick={()=>resources.current?.showModal()}><BookOpen size={17}/>学习来源</button></header>
 <main>
  <section className="intro"><div><p className="kicker">交互学习 · 眼表保湿系统</p><h1>看见眼睛如何保持湿润</h1><p>从结构到检查、再到药物作用，理解眼表保护的不同环节。</p></div><div className="edition"><span className="status-dot"/>六个结构 · 三种视图</div></section>
  <nav className="journey-tabs" aria-label="学习内容">{([['anatomy','01','认识结构'],['exams','02','干眼检查'],['medicines','03','药物与作用']] as const).map(([id,n,title])=><button key={id} aria-pressed={mode===id} onClick={()=>changeMode(id)}><small>{n}</small>{title}</button>)}</nav>
  {mode!=='anatomy'&&<ClinicalPanel mode={mode} entry={entry} onEntry={locateEntry} onPart={select} selected={selected}/>}
  {mode!=='anatomy'&&<div className="clinical-context"><span>{mode==='exams'?'检查关联':'药物作用区域'} · {entry.name}</span><button className="text-button" onClick={()=>locateEntry(entry)}>重新定位相关视图 ↓</button></div>}
  <nav className="view-tabs" aria-label="学习视图">{views.map((v,i)=><button key={v.id} aria-pressed={view===v.id} onClick={()=>changeView(v.id)}><span className="tab-number">0{i+1}</span><span>{v.title}<small>{v.sub}</small></span><ChevronRight size={17}/></button>)}</nav>
  <div className="workspace">
   <aside className="structure-panel" aria-label="结构列表"><div className="panel-heading"><h2>组成结构</h2><span>06</span></div><p className="micro">选择名称查看说明，眼睛图标控制显隐。</p><div className="parts">{parts.map((p,i)=><div className={`part-row ${selected===p.id?'selected':''} ${!visible[p.id]?'hidden-part':''}`} key={p.id}><button className="part-select" aria-pressed={selected===p.id} onClick={()=>select(p.id)}><span className="part-index">0{i+1}</span><i style={{background:p.color}}/><span>{p.name}<small>{p.en}</small></span></button><button className="visibility" aria-label={`${visible[p.id]?'隐藏':'显示'}${p.name}`} aria-pressed={visible[p.id]} onClick={()=>setVisible(v=>({...v,[p.id]:!v[p.id]}))}>{visible[p.id]?<Eye size={16}/>:<EyeOff size={16}/>}</button></div>)}</div><div className="display-settings"><h3>显示设置</h3><label><input type="checkbox" checked={labels} onChange={e=>setLabels(e.target.checked)}/>结构标签</label><label><input type="checkbox" checked={ghost} onChange={e=>setGhost(e.target.checked)} disabled={view==='film'}/>透视眼睑</label><button className="outline-button" onClick={()=>setVisible(Object.fromEntries(parts.map(p=>[p.id,p.id===selected])) as Record<PartId,boolean>)}><Focus size={16}/>仅显示所选结构</button><button className="text-button restore" onClick={()=>setVisible(initialVisibility())}>显示全部结构</button></div><div className="aside-note"><Layers3 size={19}/><p>颜色用于区分结构。<br/>模型经过简化，非真实比例。</p></div></aside>
   <section className="viewer" aria-label="三维展示区域"><div className="viewer-top"><span>{view==='overview'?'右眼 · 正面为起始视角':view==='glands'?'上下睑板腺 · 展开示意':'泪膜局部 · 分层放大示意'}</span><span className="model-tag">3D 示意</span></div><div className="canvas-wrap"><Suspense fallback={<div className="loading">正在准备三维模型…</div>}><Scene view={view} selected={selected} visible={visible} labels={labels} ghost={ghost} phase={phase} incomplete={incomplete} reset={reset} preset={preset} select={select}/></Suspense></div><div className="viewer-bottom"><span><Move size={15}/>拖动旋转 · 滚轮缩放</span><button onClick={resetAll} aria-label="重置视图"><RotateCcw size={15}/>重置</button></div><div className="camera-presets" aria-label="相机视角">{(['front','angle','side'] as const).map((p,i)=><button key={p} aria-pressed={preset===p} onClick={()=>{setPreset(p);setReset(x=>x+1)}}>{['正面','斜侧','侧面'][i]}</button>)}</div></section>
   <aside className="detail-panel" id="details" aria-label="结构说明"><p className="kicker">当前探索</p><div className="detail-title"><i style={{background:part.color}}/><h2>{part.name}<small>{part.en}</small></h2></div><p className="role">{part.role}</p><dl><dt>它在哪里</dt><dd>{part.location}</dd><dt>它做什么</dt><dd>{part.function}</dd><dt>与干眼的关系</dt><dd>{part.dry}</dd></dl><div className="check-note"><span>对应检查</span><p>{part.check}</p></div><a href={part.source} target="_blank" rel="noreferrer" className="source-link">阅读医学来源<ArrowUpRight size={15}/></a></aside>
  </div>
  {view==='film'?<section className="film-controls" aria-label="泪膜模拟控制"><div><h2>观察两次眨眼之间</h2><p>拖动查看局部变薄示意。进度不对应临床时间或检测数值。</p></div><div className="simulation"><label className="range-label" htmlFor="phase">示意进度 <output>{phase}%</output></label><input id="phase" type="range" min="0" max="100" value={phase} onChange={e=>{setPlaying(false);setPhase(+e.target.value)}}/><div className="simulation-actions"><label><input type="checkbox" checked={incomplete} onChange={e=>setIncomplete(e.target.checked)}/>不完整眨眼情境</label><button className="outline-button" disabled={reduced} onClick={()=>{if(phase===100)setPhase(0);setPlaying(!playing)}}>{playing?<Pause size={15}/>:<Play size={15}/>} {playing?'暂停演示':'播放演示'}</button><button className="primary-button" onClick={()=>{setPlaying(false);setPhase(incomplete?35:0)}}>模拟一次眨眼</button></div>{reduced&&<p className="micro">已遵循系统减少动态效果设置，请拖动进度查看。</p>}</div></section>:<section className="learning-strip"><span className="strip-icon"><Check size={20}/></span><div><h2>{view==='overview'?'先认识位置，再理解功能':'腺体的形态与功能，需要分别观察'}</h2><p>{view==='overview'?'试着选择泪腺与睑板腺：一个主要提供水分，一个提供油脂。':'这张展开示意帮助认识排列与开口；真实成像还需结合出油情况判断。'}</p></div><button className="text-button" onClick={()=>changeView(view==='overview'?'glands':'film')}>继续探索<ChevronRight size={16}/></button></section>}
  <footer><span>教学示意，非个人眼部重建或诊断工具。</span><span>眼表图谱 · 本地学习项目</span></footer>
 </main>
 <dialog ref={resources} className="resources"><div className="dialog-top"><h2>资料与模型说明</h2><button onClick={()=>resources.current?.close()} aria-label="关闭学习来源">关闭</button></div><p>本项目用程序化几何表达结构位置；腺体数量、泪膜厚度与分层、颜色和变化过程经过简化。泪膜动画仅说明概念，不用于预测病情。</p><ul><li><a href="https://www.nei.nih.gov/eye-health-information/healthy-vision/how-eyes-work/how-tears-work" target="_blank" rel="noreferrer">NEI：泪液如何工作 ↗</a></li><li><a href="https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/dry-eye/testing-dry-eye" target="_blank" rel="noreferrer">NEI：干眼检查 ↗</a></li><li><a href="https://eyewiki.aao.org/Meibomian_Gland_Dysfunction_%28MGD%29" target="_blank" rel="noreferrer">EyeWiki：睑板腺功能障碍 ↗</a></li></ul><p className="micro">本地版包含个人检查及处方的人工转录，原始照片未嵌入网页，也未上传。模型不是个人眼部重建。外部医学链接仅在你打开时访问。</p></dialog>
 </>
}
