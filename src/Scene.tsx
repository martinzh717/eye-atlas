import { Component, createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode, ComponentProps, RefObject } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { Html as DreiHtml, Line, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { parts } from './data'
import type { PartId, ViewId } from './data'

type Props = {view:ViewId; selected:PartId; visible:Record<PartId,boolean>; labels:boolean; ghost:boolean; phase:number; incomplete:boolean; reset:number; preset:'front'|'angle'|'side'; select:(id:PartId)=>void}
const colors = Object.fromEntries(parts.map(p=>[p.id,p.color]))
const AnnotationPortal = createContext<RefObject<HTMLElement>|undefined>(undefined)
function Html(props:ComponentProps<typeof DreiHtml>){
 const portal=useContext(AnnotationPortal)
 return <DreiHtml {...props} portal={portal}/>
}

function Pick({id, children, p}: {id:PartId; children:ReactNode; p:Props}) {
 const [hover, setHover] = useState(false)
 useEffect(()=>()=>{document.body.style.cursor=''},[])
 if (!p.visible[id]) return null
 return <group name={id} onClick={e=>{e.stopPropagation();p.select(id)}} onPointerOver={e=>{e.stopPropagation();setHover(true);document.body.style.cursor='pointer'}} onPointerOut={()=>{setHover(false);document.body.style.cursor=''}}>
  {children}
  {hover && p.labels && <Html position={[0,1.85,0]} center className="hover-tag">{parts.find(x=>x.id===id)?.name}</Html>}
 </group>
}
function Material({id,p,opacity=1}: {id:PartId;p:Props;opacity?:number}) {
 return <meshStandardMaterial color={colors[id]} roughness={.46} metalness={.06} transparent={opacity<1} opacity={opacity} side={THREE.DoubleSide} depthWrite={opacity===1} emissive={colors[id]} emissiveIntensity={p.selected===id?.26:.015}/>
}
function Label({id,position,p}: {id:PartId;position:[number,number,number];p:Props}) {
 if(!p.labels || !p.visible[id]) return null
 return <Html position={position} center zIndexRange={[20,0]}><button className={`model-label ${p.selected===id?'active':''}`} onClick={()=>p.select(id)}><i style={{background:colors[id]}}/>{parts.find(x=>x.id===id)?.name}</button></Html>
}
function tube(points:THREE.Vector3[],r:number) {return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),32,r,8,false)}
function Gland({x,upper,p,detail=false}:{x:number;upper:boolean;p:Props;detail?:boolean}) {
 const s=upper?1:-1
 const y=detail?.18:.23 + .39*(1-(x/1.05)**2)
 const length=detail?.79:.34
 const g=useMemo(()=>tube([new THREE.Vector3(x,s*y,1.18),new THREE.Vector3(x+.022,s*(y+length*.55),1.11),new THREE.Vector3(x-.024,s*(y+length),.98)],detail?.022:.014),[x,s,y,length,detail])
 useEffect(()=>()=>g.dispose(),[g])
 return <group><mesh geometry={g}><Material id="meibomian" p={p}/></mesh>{Array.from({length:detail?6:4},(_,i)=>{
 const t=(i+1)/(detail?7:5)
 return <group key={i} position={[x,s*(y+length*t),1.16-.18*t]}>{[-1,1].map(k=><mesh key={k} position={[k*(detail?.046:.025),0,0]} scale={detail?[.049,.063,.04]:[.032,.047,.025]}><sphereGeometry args={[1,12,10]}/><Material id="meibomian" p={p}/></mesh>)}</group>
 })}<mesh position={[x,s*y,1.185]}><sphereGeometry args={[detail?.027:.019,12,12]}/><meshStandardMaterial color="#75451e"/></mesh></group>
}
function Lid({upper,p,detail=false}:{upper:boolean;p:Props;detail?:boolean}) {
 const s=upper?1:-1
 const geometry=useMemo(()=>{
 const shape=new THREE.Shape()
 if(detail){shape.moveTo(-1.37,s*.16);shape.quadraticCurveTo(0,s*.08,1.37,s*.16);shape.lineTo(1.37,s*1.2);shape.quadraticCurveTo(0,s*1.39,-1.37,s*1.2);shape.closePath()}
 else{shape.moveTo(-1.13,0);shape.quadraticCurveTo(0,s*1.18,1.13,0);shape.quadraticCurveTo(.86,s*.80,0,s*1.04);shape.quadraticCurveTo(-.86,s*.80,-1.13,0)}
 return new THREE.ExtrudeGeometry(shape,{depth:.10,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.03,bevelThickness:.03,curveSegments:40})
 },[detail,s])
 useEffect(()=>()=>geometry.dispose(),[geometry])
 return <mesh geometry={geometry} position={[0,0,.91]}><Material id="eyelid" p={p} opacity={p.ghost?.24:.88}/></mesh>
}
function Eye(p:Props) {
 return <group rotation={[0,-.10,0]}>
  <mesh rotation={[Math.PI/2,0,0]}><sphereGeometry args={[1.12,64,48,0,Math.PI*2,.54,Math.PI-.54]}/><meshStandardMaterial color="#e2e5e2" roughness={.52}/></mesh>
  <mesh position={[0,0,1.0]}><circleGeometry args={[.57,64]}/><meshStandardMaterial color="#3b736e" roughness={.8}/></mesh>
  {Array.from({length:64},(_,i)=>{const a=i*Math.PI*2/64;return <Line key={i} points={[[Math.cos(a)*.23,Math.sin(a)*.23,1.008],[Math.cos(a+.017)*.53,Math.sin(a+.017)*.53,1.008]]} color={i%3?'#8bb09c':'#305151'} lineWidth={i%3?1:2}/>})}
  <mesh position={[0,0,1.014]}><circleGeometry args={[.235,48]}/><meshStandardMaterial color="#0b171c" roughness={.6}/></mesh>
  <Pick id="conjunctiva" p={p}><mesh rotation={[Math.PI/2,0,0]}><sphereGeometry args={[1.135,64,36,0,Math.PI*2,.59,.69]}/><Material id="conjunctiva" p={p} opacity={.25}/></mesh></Pick>
  <Pick id="cornea" p={p}><mesh position={[0,0,.41]} rotation={[Math.PI/2,0,0]}><sphereGeometry args={[.82,64,32,0,Math.PI*2,0,.83]}/><Material id="cornea" p={p} opacity={.24}/></mesh></Pick>
  <Pick id="tear" p={p}><mesh position={[0,0,.41]} rotation={[Math.PI/2,0,0]}><sphereGeometry args={[.832,48,24,0,Math.PI*2,0,.83]}/><Material id="tear" p={p} opacity={.10}/></mesh></Pick>
  <Pick id="eyelid" p={p}><Lid upper p={p}/><Lid upper={false} p={p}/></Pick>
  <Pick id="meibomian" p={p}>{Array.from({length:13},(_,i)=>[-1,1].map(s=><Gland key={`${i}-${s}`} x={(i-6)*.135} upper={s===1} p={p}/>))}</Pick>
  <Pick id="lacrimal" p={p}><group position={[-.90,.96,.49]} rotation={[0,0,-.5]}>{Array.from({length:8},(_,i)=><mesh key={i} position={[(i%4)*.12,Math.floor(i/4)*.16,Math.sin(i)*.055]} scale={[.17,.16,.13]}><sphereGeometry args={[1,20,16]}/><Material id="lacrimal" p={p}/></mesh>)}{[0,1,2].map(i=><Line key={i} points={[[i*.10,-.04,0],[.17+i*.13,-.27,.16]]} color={colors.lacrimal} lineWidth={2}/>)}</group></Pick>
  <Label id="lacrimal" position={[-1.30,1.40,.4]} p={p}/><Label id="cornea" position={[.08,-.12,1.38]} p={p}/><Label id="conjunctiva" position={[1.35,.43,.7]} p={p}/><Label id="meibomian" position={[1.05,1.12,.94]} p={p}/><Label id="eyelid" position={[-1.12,-1.08,.94]} p={p}/><Label id="tear" position={[.74,-.93,1.10]} p={p}/>
 </group>
}
function Glands(p:Props) {
 return <group>
  <Pick id="eyelid" p={p}><Lid upper p={p} detail/><Lid upper={false} p={p} detail/></Pick>
  <Pick id="meibomian" p={p}>{Array.from({length:11},(_,i)=>[-1,1].map(s=><Gland key={`${i}-${s}`} x={(i-5)*.23} upper={s===1} p={p} detail/>))}</Pick>
  <Line points={[[-1.35,.17,1.2],[0,.13,1.2],[1.35,.17,1.2]]} color="#f2c4b3" lineWidth={3}/>
  <Line points={[[-1.35,-.17,1.2],[0,-.13,1.2],[1.35,-.17,1.2]]} color="#f2c4b3" lineWidth={3}/>
  <Label id="meibomian" position={[0,.68,1.45]} p={p}/><Label id="eyelid" position={[1.55,-.55,1]} p={p}/>
  {p.labels&&<Html position={[-1.0,0,1.25]} center><span className="plain-label">睑缘开口</span></Html>}
 </group>
}
function Film(p:Props) {
 const dry=(p.phase/100)*(p.incomplete?1:.65)
 return <group rotation={[.36,-.30,0]}>
  <Pick id="cornea" p={p}><mesh position={[0,-.64,0]}><boxGeometry args={[3,.22,1.65]}/><Material id="cornea" p={p}/></mesh></Pick>
  <Pick id="tear" p={p}>
   <mesh position={[0,-.40,0]}><boxGeometry args={[3,.10,1.65]}/><meshStandardMaterial color="#bb99c8" roughness={.5}/></mesh>
   <mesh position={[0,-.12,0]} scale={[1,1-dry*.5,1]}><boxGeometry args={[3,.34,1.65]}/><meshStandardMaterial color="#68b4c8" transparent opacity={.63} roughness={.24}/></mesh>
   <mesh position={[0,.27,0]}><boxGeometry args={[3,.055,1.65]}/><meshStandardMaterial color="#edba68" transparent opacity={.78} roughness={.4}/></mesh>
   {dry>.08 && Array.from({length:8},(_,i)=><mesh key={i} position={[-1.13+(i%4)*.69,.305,-.42+Math.floor(i/4)*.8]} rotation={[-Math.PI/2,0,0]} scale={[dry*(i%2?.55:.40),dry*.34,1]}><circleGeometry args={[1,32]}/><meshBasicMaterial color="#9d3e45" transparent opacity={dry*.85} depthWrite={false}/></mesh>)}
  </Pick>
  <Pick id="eyelid" p={p}><mesh position={[-1.69,.10+Math.sin(p.phase/100*Math.PI)*.06,0]}><boxGeometry args={[.14,1.12,1.9]}/><Material id="eyelid" p={p}/></mesh></Pick>
  {p.labels&&<>{[['脂质成分',.34],['水液与黏蛋白',-.1],['眼表润湿界面',-.42],['角膜表面',-.66]].map(([title,y])=><Html key={title} position={[1.88,Number(y),0]} center><span className="plain-label">{title}</span></Html>)}</>}
 </group>
}
function Camera({p}:{p:Props}) {
 const {camera,invalidate} = useThree()
 const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null)
 useEffect(()=>{
  const pos=p.preset==='side'?[5.2,1.0,.9]:p.preset==='angle'?[3.3,1.8,4.8]:[0,.15,5.8]
  camera.position.set(pos[0],pos[1],pos[2]);camera.lookAt(0,0,.3)
  controls.current?.target.set(0,0,.3);controls.current?.update();invalidate()
 },[camera,invalidate,p.view,p.reset,p.preset])
 return <OrbitControls ref={controls} makeDefault enablePan={false} minDistance={3.7} maxDistance={8} minPolarAngle={.35} maxPolarAngle={2.75}/>
}
class RenderBoundary extends Component<{children:ReactNode},{failed:boolean}> {
 state={failed:false}
 static getDerivedStateFromError(){return {failed:true}}
 render(){return this.state.failed?<div className="fallback"><h3>3D 视图暂时无法显示</h3><p>请使用支持 WebGL 的浏览器，或开启硬件加速后刷新。你仍可使用左侧列表阅读全部结构说明。</p><button onClick={()=>window.location.reload()}>重新加载页面</button></div>:this.props.children}
}
export default function Scene(p:Props) {
 const [portal,setPortal]=useState<HTMLDivElement|null>(null)
 const portalRef=useMemo(()=>portal?{current:portal}:undefined,[portal])
 return <div className="scene-shell"><div className="annotation-layer" ref={setPortal}/><RenderBoundary>{portalRef&&<Canvas aria-label="可旋转的眼表三维教学模型" frameloop="demand" dpr={[1,1.75]} camera={{position:[0,.15,5.8],fov:43}} gl={{antialias:true,alpha:true}} fallback={<div className="fallback">浏览器不支持 WebGL，请使用结构列表阅读说明。</div>}><AnnotationPortal.Provider value={portalRef}>
  <ambientLight intensity={1.15}/><directionalLight position={[3,5,6]} intensity={2.2}/><directionalLight position={[-4,0,3]} intensity={1.3} color="#b6c9ef"/><pointLight position={[0,-3,3]} intensity={8}/>
  {p.view==='overview'?<Eye {...p}/>:p.view==='glands'?<Glands {...p}/>:<Film {...p}/>}
  <Camera p={p}/>
 </AnnotationPortal.Provider></Canvas>}</RenderBoundary></div>
}
