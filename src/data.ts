export type PartId = 'cornea' | 'conjunctiva' | 'lacrimal' | 'meibomian' | 'eyelid' | 'tear'
export type ViewId = 'overview' | 'glands' | 'film'
export type Part = { id: PartId; name: string; en: string; color: string; role: string; location: string; function: string; dry: string; check: string; source: string }
const nei = 'https://www.nei.nih.gov/eye-health-information/healthy-vision/how-eyes-work/how-tears-work'
export const parts: Part[] = [
 {id:'cornea',name:'角膜',en:'Cornea',color:'#8ac8df',role:'透明的前窗',location:'位于眼球最前方，覆盖虹膜和瞳孔的透明组织。',function:'让光线进入眼睛并参与聚焦。表面的泪膜让这扇“窗”保持湿润、平滑。',dry:'泪膜不稳定时，角膜表面可能受到刺激，出现异物感、刺痛或视物波动。',check:'眼表染色：帮助医生观察表面上皮是否受损。',source:'https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/dry-eye'},
 {id:'conjunctiva',name:'结膜',en:'Conjunctiva',color:'#e99caa',role:'覆盖与润湿',location:'覆盖眼白前部和眼皮内面；不覆盖角膜。本模型只显示球结膜的局部示意。',function:'保护眼表，其中的杯状细胞参与分泌黏蛋白，帮助泪液润湿眼表。',dry:'结膜及其润湿功能也是眼表系统的一部分，需要与泪膜和角膜一起评估。',check:'裂隙灯检查与眼表染色：观察结膜和眼表状态。',source:'https://www.nei.nih.gov/sites/default/files/health-pdfs/factsaboutdryeye.pdf'},
 {id:'lacrimal',name:'泪腺',en:'Lacrimal gland',color:'#c596db',role:'提供水分',location:'位于眼眶外上方。图中显示右眼正面，画面左侧为颞侧、右侧为鼻侧。',function:'提供泪液的主要水液成分，参与眼表的湿润与保护。',dry:'泪液分泌不足是干眼的一种机制；泪液量需要结合稳定性等检查一起看。',check:'泪液分泌试验（Schirmer）：评估泪液分泌情况。',source:nei},
 {id:'meibomian',name:'睑板腺',en:'Meibomian glands',color:'#edba68',role:'提供油脂',location:'排列在上下眼皮的睑板内，开口位于睑缘。图中的腺体数量与大小经过简化。',function:'分泌睑脂，参与形成泪膜外侧脂质层，帮助维持泪膜稳定。',dry:'腺体开口、分泌物性状和出油情况异常，都可能影响泪膜。形态与功能不是同一件事。',check:'睑板腺成像看形态；睑缘检查与分泌物评估看功能。',source:'https://eyewiki.aao.org/Meibomian_Gland_Dysfunction_%28MGD%29'},
 {id:'eyelid',name:'眼睑',en:'Eyelids',color:'#d18b7f',role:'铺展泪膜',location:'上下眼皮覆盖并保护眼球，闭合时共同遮盖眼表。',function:'完整眨眼帮助泪膜重新铺展。眼睑与腺体、泪液共同工作。',dry:'长时间看屏幕时眨眼可能减少；不完整眨眼也会影响眼表覆盖。',check:'观察眨眼频率、闭合程度及睑缘状态。',source:'https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/dry-eye/causes-dry-eye'},
 {id:'tear',name:'泪膜',en:'Tear film',color:'#78b6b0',role:'维持湿润',location:'覆盖在暴露的眼表。它非常薄，页面中的厚度、间距和分层均为放大示意。',function:'泪液的水液、脂质与黏蛋白成分共同保持眼表湿润、平滑。',dry:'即使有泪液分泌，泪膜仍可能不稳定。出现干眼并不一定只是“水少”。',check:'泪膜破裂时间：观察眨眼后泪膜能维持多久。',source:nei},
]
export const views: {id:ViewId; title:string; sub:string}[] = [
 {id:'overview',title:'整体构造',sub:'认识眼表的六个组成部分'},
 {id:'glands',title:'睑板腺放大',sub:'看清眼皮内的油脂腺体'},
 {id:'film',title:'泪膜与眨眼',sub:'理解覆盖、铺展与局部变薄'},
]
