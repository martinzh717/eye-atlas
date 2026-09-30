import type {ClinicalEntry} from './clinicalData'
export type ExamImage={file:string;title:string;caption:string;author:string;source:string;license:string;licenseUrl:string}
const commons="https://commons.wikimedia.org/wiki/File:"
const han='https://pmc.ncbi.nlm.nih.gov/articles/PMC7396031/'
const wu='https://www.frontiersin.org/journals/medicine/articles/10.3389/fmed.2021.826530/full'
const cc='https://creativecommons.org/licenses/by/4.0/'
const figures:Record<string,ExamImage>={
 schirmer:{file:'schirmer.svg',title:'操作示意 · 试纸放在哪里',caption:'观察试纸弯折的一端：它置于下眼睑内侧，外端垂下供读取浸湿长度。由医护人员操作。',author:'Jmarchn',source:commons+"Schirmer%27s_test.svg",license:'CC BY-SA 3.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/3.0/'},
 nibut:{file:'nibut.jpg',title:'结果示例 · 泪膜破裂分布图',caption:'看圆形区域里的色块如何变化：仪器将检测到的破裂位置和时间可视化。此图来自文献，不是本页案例数据。',author:'Sang Beom Han et al. (2020), Fig. 1',source:han,license:'CC BY（原文许可声明）',licenseUrl:han},
 meibography:{file:'meibography.jpg',title:'结果示例 · 红外睑板腺影像',caption:'亮色条索对应腺体区域。原文左图为相对正常形态，右图示部分萎缩；不能只凭亮暗自行分级。',author:'Sang Beom Han et al. (2020), Fig. 4',source:han,license:'CC BY（原文许可声明）',licenseUrl:han},
 meniscus:{file:'meniscus.webp',title:'结果示例 · 放大下眼睑边缘的泪液带',caption:'蓝线标出下泪河边界，短竖线测量高度。图内数值和参考范围属于原文设备示例，不是统一诊断标准。',author:'Yaying Wu et al. (2022), Fig. 1',source:wu,license:'CC BY 4.0',licenseUrl:cc},
 lipid:{file:'lipid.webp',title:'结果示例 · 脂质干涉与眨眼记录',caption:'反光图像、曲线与眨眼截图一起展示油脂层和眨眼状态。图中的厚度是特定仪器输出，不代表所有检查都测厚度。',author:'Yaying Wu et al. (2022), Fig. 4',source:wu,license:'CC BY 4.0',licenseUrl:cc},
 devices:{file:'devices.webp',title:'设备实物 · 常见眼表分析仪',caption:'可看到下巴托和额头支架。不同设备可承担不同检查，图中 A–D 不是四项必须依次完成的检查，也不构成品牌推荐。',author:'Yaying Wu et al. (2022), Fig. 7',source:wu,license:'CC BY 4.0',licenseUrl:cc},
 fluorescein:{file:'fluorescein.jpg',title:'检查用品 · 荧光素试纸',caption:'这是承载染料的试纸，用于给泪液着色；与测量泪液浸湿长度的 Schirmer 试纸用途不同。',author:'Ai269',source:commons+'Sodium_fluorescein_(NaFl)_ophthalmic_strip.jpg',license:'CC BY 4.0',licenseUrl:cc}
}
export type ExamGuide={steps:string[];experience:string;images:ExamImage[]}
const sources=[{title:'NEI · 干眼检查',url:'https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/dry-eye/testing-dry-eye'},{title:'EyeWiki · 干眼检查方法',url:'https://eyewiki.aao.org/Diagnostic_Testing_for_Dry_Eye'},{title:'Wu 等 · 干眼检查技术综述（开放获取）',url:wu}]
const make=(e:Omit<ClinicalEntry,'file'|'sources'|'status'>):ClinicalEntry=>({...e,file:'',sources,status:'通用检查知识'})
export const exams:ClinicalEntry[]=[
 make({id:'schirmer',group:'泪液量 · 分泌',name:'Schirmer 泪液分泌试验',question:'一定时间内能分泌多少泪液？',targets:['tear','lacrimal','eyelid'],view:'overview',record:'通常记录 5 分钟内试纸的浸湿长度，单位为 mm；左右眼分别记录。',site:'试纸接触下眼睑内侧的结膜囊。泪腺是相关供水结构，检查并不直接拍摄泪腺。',meaning:'帮助评估泪液水分供应，尤其是水液缺乏的可能性。',limit:'有麻醉和无麻醉等不同方法，刺激和反射性流泪会影响结果。不能凭单次数字排除干眼或判断睑板腺正常。'}),
 make({id:'breakup',group:'泪膜 · 稳定性',name:'非侵入性泪膜破裂时间（NIBUT）',question:'眨眼后泪膜能保持完整多久？',targets:['tear','cornea'],view:'film',record:'首次或平均破裂时间（秒），部分设备同时给出破裂位置图。',site:'观察角膜前方泪膜上的反射图案，不接触泪腺。',meaning:'评估泪膜稳定性；较早破裂提示覆盖不稳定，需要继续寻找原因。',limit:'不同设备的算法与判定标准不同。不能与荧光素 TBUT 完全互换；下方动画不对应临床秒数。'}),
 make({id:'tbut',group:'泪膜 · 稳定性',name:'荧光素泪膜破裂时间（TBUT）',question:'染色后的泪膜何时出现第一处破裂？',targets:['tear','cornea'],view:'film',record:'从最后一次眨眼到首次出现暗斑的时间，单位为秒。',site:'角膜表面的泪膜，在裂隙灯蓝光下观察。',meaning:'用染料让泪膜更容易观察，判断其保持连续覆盖的能力。',limit:'染料用量和操作方式会影响结果。泪膜出现暗斑与上皮染色不是同一个指标；同次染色可服务不同观察目的。'}),
 make({id:'meniscus',group:'泪液量 · 储备',name:'泪河高度',question:'下眼睑边缘积存了多少泪液？',targets:['tear','eyelid'],view:'overview',record:'泪河高度（mm）；部分方法也测截面积等参数。',site:'下眼睑边缘与眼球交界处的泪液带，称为下泪河。',meaning:'提供泪液储备量的线索，补充泪液分泌试验。',limit:'高度不等于分泌速度，会随眨眼和测量时机改变。图中的示例值不能当作每个人的标准。'}),
 make({id:'meibography',group:'睑板腺 · 形态',name:'睑板腺成像',question:'提供油脂的腺体形态是否完整？',targets:['meibomian','eyelid'],view:'glands',record:'上下眼睑的腺体影像，可能附缺失面积比例或形态评分。',site:'上下眼睑内部的睑板腺，检查时需要暴露眼睑内面。',meaning:'观察腺体排列、弯曲、缩短或缺失等形态变化。',limit:'成像看形态，不能单独判断出油能力；还要结合睑缘、表达检查和症状。模型没有模拟任何个案的缺失。'}),
 make({id:'lipid',group:'泪膜 · 油脂',name:'泪膜脂质干涉与眨眼观察',question:'油脂铺展得怎样，眨眼完整吗？',targets:['tear','meibomian','eyelid'],view:'film',record:'脂质干涉图样或分布；部分设备输出厚度及完整/不完整眨眼记录。',site:'泪膜外侧脂质成分及眼睑运动；油脂主要来自睑板腺。',meaning:'观察脂质层和眨眼如何参与眼表覆盖，帮助理解蒸发相关因素。',limit:'干涉外观、厚度和腺体功能不是一一对应关系。单项异常不能直接证明腺体堵塞。'}),
 make({id:'staining',group:'眼表 · 上皮状态',name:'角结膜染色',question:'眼表上皮是否有受损的迹象？',targets:['cornea','conjunctiva'],view:'overview',record:'染色的位置、范围和程度；使用的染料和评分方法应一并记录。',site:'角膜和结膜的表面上皮。荧光素常用于角膜评估，丽丝胺绿可用于结膜等观察。',meaning:'帮助发现上皮屏障异常，评估眼表受损的分布。',limit:'染色不是干眼独有的表现，其他眼表疾病也可染色。需要结合症状、病史及裂隙灯检查。'}),
 make({id:'expression',group:'睑板腺 · 功能',name:'睑缘与睑板腺表达检查',question:'油脂能否排出，排出的油脂是什么样？',targets:['meibomian','eyelid'],view:'glands',record:'开口及睑缘表现、可表达腺体情况、分泌物性状等。',site:'睑缘的腺体开口，以及眼睑内的睑板腺。',meaning:'检查油脂排出情况，弥补单看腺体照片无法了解功能的不足。',limit:'需由专业人员控制检查压力并结合其他结果判断。检查性按压不等同于治疗性按摩，不建议照图自行挤压。'})
]
export const guides:Record<string,ExamGuide>={
 schirmer:{steps:['医护人员根据检查方法决定是否使用表面麻醉。','将专用试纸弯折端置于下睑内侧，按要求轻闭眼等待。','通常 5 分钟后取下，读取左右眼浸湿的长度。'],experience:'纸条可能带来异物感；检查过程中按医护人员要求保持眼部状态。',images:[figures.schirmer]},
 breakup:{steps:['下巴和额头靠稳仪器支架，注视前方目标。','按指令眨眼后暂时睁眼，仪器记录泪膜反射图案。','软件寻找反射图案失稳的位置，生成时间或分布图。'],experience:'通常无需染料、无需接触眼球；保持睁眼可能短暂感到干涩。',images:[figures.devices,figures.nibut]},
 tbut:{steps:['医护人员将少量荧光素引入泪液。','眨眼使染料分布后，按指令暂时保持睁眼。','医生在裂隙灯蓝光下计时，观察第一处暗斑。'],experience:'会看到较亮的光；使用染料后的检查过程与非侵入性方法不同。',images:[figures.fluorescein]},
 meniscus:{steps:['下巴与额头固定，按要求自然眨眼后注视目标。','仪器拍摄下睑缘的泪液带，或用前节 OCT 取得截面。','在图像上标记泪河边界并读取高度。'],experience:'常用成像方式无需触碰眼球。',images:[figures.meniscus,figures.devices]},
 meibography:{steps:['医护人员轻轻翻转或牵开眼睑，暴露内面。','用红外成像设备拍摄上睑与下睑。','医生结合图像查看腺体形态和缺失区域。'],experience:'翻眼睑可能短暂不适；红外照片中的亮色条索帮助显示腺体。',images:[figures.meibography,figures.devices]},
 lipid:{steps:['在仪器前靠稳，注视指定目标。','按要求自然眨眼，仪器录像观察眼表反光变化。','分析脂质铺展以及眨眼是否完整。'],experience:'一般是非接触拍摄；具体仪器能提供的参数不同。',images:[figures.lipid,figures.devices]},
 staining:{steps:['医生根据观察目的选择染料，用滴液或试纸引入少量染料。','轻眨眼让染料分布，等待适当的观察时间。','在裂隙灯及合适光线下观察染色区域并记录。'],experience:'这是观察眼表的方法，染色阳性不自动等于某一种疾病。',images:[figures.fluorescein]},
 expression:{steps:['医生在裂隙灯下查看睑缘和腺体开口。','使用合适工具，以受控压力轻压指定的眼睑区域。','观察是否出油及其清澈、混浊或稠厚等性状。'],experience:'可能有压迫感；请交由专业人员操作。',images:[]}
}
