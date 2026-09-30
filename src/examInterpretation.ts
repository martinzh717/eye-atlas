type Interpretation={normal:string;threshold:string;method:string;value:string;meaning:string;sources:{title:string;url:string}[]}
const dews3={title:'TFOS DEWS III（2025）· 检查判读标准',url:'https://orca.cardiff.ac.uk/id/eprint/179217/3/1-s2.0-S0002939425002752-main.pdf'}
const dews2={title:'TFOS DEWS II · 泪液分泌试验',url:'https://tfosdewsreport.org/report-diagnostic_methodology/131_36/en/'}
const schirmer={title:'EyeWiki · Schirmer 常用参考值',url:'https://eyewiki.aao.org/Examination_Techniques_for_Lower_Eyelid_Malposition'}
const mgd={title:'MGD 国际工作组 · 腺体缺失分级',url:'https://pmc.ncbi.nlm.nih.gov/articles/PMC3072162/'}
export const interpretations:Record<string,Interpretation>={
 schirmer:{normal:'> 10 mm / 5 min：常用正常参考',threshold:'> 5 且 ≤ 10 mm / 5 min：偏低或临界；≤ 5 mm / 5 min：明显偏低。',method:'5 分钟 Schirmer 常用判读；不同检测方法的界值有所不同。',value:'右眼 13 mm / 5 min；左眼 13 mm / 5 min',meaning:'双眼均为 13 mm / 5 min，在本页采用的正常参考范围内，说明这次测得的泪液分泌量正常。它回答的是“泪液水分够不够”；泪膜能保持多久，则看破裂时间。',sources:[schirmer,dews2]},
 breakup:{normal:'≥ 10 秒：泪膜稳定性在正常参考范围内',threshold:'< 10 秒：提示泪膜稳定性下降。',method:'TFOS DEWS III：非侵入性首次破裂时间，非平均时间。',value:'右眼约 8 秒；左眼约 6 秒（首次破裂时间）',meaning:'两眼都低于 10 秒，说明眨眼后泪膜较快破裂；左眼比右眼更早破裂。这解释了“泪液分泌量正常，仍可能感觉干涩”：水分够，但泪膜容易破裂。',sources:[dews3]},
 tbut:{normal:'传统常用参考：约 ≥ 10 秒',threshold:'TFOS DEWS III：少量荧光素法 < 5 秒为稳定性异常信号。',method:'传统 10 秒参考与少量染料法 5 秒阈值属于不同判读口径，应按实际方法对照。',value:'案例 A 未记录荧光素 TBUT 数值',meaning:'本例约 8 秒和约 6 秒属于非侵入性检查，应放在 NIBUT 项下比较；本项暂没有可比较的实测值。',sources:[dews2,dews3]},
 meniscus:{normal:'常用参考：泪河高度 > 0.20 mm',threshold:'≤ 0.20 mm：提示泪液储备偏少。',method:'测量下眼睑边缘的泪液带；本页用 0.20 mm 区分储备正常与偏少。',value:'右眼约 0.19 mm；左眼约 0.19 mm',meaning:'双眼读数均略低于 0.20 mm，提示下眼睑边缘的泪液储备偏少。它反映检查当时的泪液储备，与 5 分钟分泌试验观察的是不同方面。',sources:[dews3]},
 meibography:{normal:'Meiboscore 0 级：图像未见腺体缺失',threshold:'1 级：缺失 < 1/3；2 级：缺失 1/3–2/3；3 级：缺失 > 2/3。',method:'每个眼睑分别评分；0 级表示无缺失，年龄等因素也会影响形态。',value:'可辨认的勾选：腺体缺失 < 1/3（1 分）',meaning:'勾选对应 1 分，表示被评估眼睑的腺体缺失面积少于三分之一，属于该形态分级中较小的缺失范围；这里描述的是腺体形态，不是整体干眼严重程度。',sources:[mgd]},
 lipid:{normal:'分布观察：脂质铺展较均匀；眨眼能够完整闭合',threshold:'厚度没有跨设备统一正常值；TFOS DEWS III 对 LipiView 列出 < 72 nm 的脂质不足参考阈值。',method:'分布是定性结果，厚度是定量结果，两者分别比较。',value:'双眼脂质分布“不均匀”；没有厚度数值',meaning:'本例记录的是油脂铺展不均，而不是“厚度低于某个数值”。这提示眼表油脂覆盖存在不均匀的表现，可与泪膜较早破裂一起理解。',sources:[dews3]},
 staining:{normal:'理想表现：无明显角膜或结膜染色',threshold:'TFOS DEWS III 阳性指标：角膜点状染色 > 5 个，或结膜点状染色 > 9 个。',method:'分别对应角膜荧光素与结膜丽丝胺绿观察；采用其他评分表时按该表解释。',value:'本例未记录染色点数或评分',meaning:'目前没有数值可判断是否超过上述阈值。有结果后，可用点数、分布和评分说明上皮受损情况；未记录不计为 0。',sources:[dews3]},
 expression:{normal:'分泌物质量 0 分：清澈液态',threshold:'质量评分：1 分混浊；2 分混浊伴颗粒；3 分牙膏样。分数越高，油脂性状越异常。',method:'这里是分泌物质量评分；可表达腺体数量另行记录。',value:'本例未记录表达结果或分泌物评分',meaning:'目前没有数值可与质量评分比较。记录后可说明油脂是清澈、混浊还是稠厚，并结合能排出油脂的腺体数量判断出油情况。',sources:[dews3]}
}
