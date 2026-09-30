export type TeachingCase={title:string;value:string;reading:string;difference:string;amount:number}
export type TeachingSet={method:string;visual:'scale'|'glands'|'lipid'|'stain'|'oil';unit?:string;max?:number;threshold?:number;cases:TeachingCase[]}
export const teachingCases:Record<string,TeachingSet>={
 schirmer:{method:'同一方法：5 分钟 Schirmer，使用本页常用 >10 mm 参考。',visual:'scale',unit:'mm / 5 min',max:20,threshold:10,cases:[
 {title:'正常参考',value:'18 mm / 5 min',reading:'高于 10 mm，泪液分泌量在正常参考范围内。',difference:'作为对照，试纸浸湿长度较长。',amount:18},
 {title:'偏低 / 临界',value:'8 mm / 5 min',reading:'落在 >5 至 10 mm 区间，分泌量偏低或临界。',difference:'比正常案例少 10 mm；处于中间区间，并非明显低值。',amount:8},
 {title:'明显偏低',value:'3 mm / 5 min',reading:'低于 5 mm，提示明显的水分供应不足。',difference:'比正常案例少 15 mm，试纸浸湿长度明显缩短。',amount:3}]},
 breakup:{method:'同一指标：首次非侵入性破裂时间；<10 秒为偏短。',visual:'scale',unit:'秒',max:20,threshold:10,cases:[
 {title:'稳定参考',value:'15 秒',reading:'超过 10 秒，泪膜稳定性在正常参考范围内。',difference:'作为对照，眨眼后泪膜保持稳定的时间更长。',amount:15},
 {title:'阈值附近',value:'10 秒',reading:'10 秒处在正常参考范围的下限；小于 10 秒表示泪膜破裂时间偏短。',difference:'比正常案例早 5 秒破裂；“等于 10”与“小于 10”要分清。',amount:10},
 {title:'较早破裂',value:'4 秒',reading:'低于 10 秒，提示泪膜稳定性下降。',difference:'比正常案例早 11 秒破裂；这项比较反映稳定性，不是泪量。',amount:4}]},
 tbut:{method:'三个案例均按少量荧光素法比较，采用 TFOS DEWS III 的 <5 秒阈值。',visual:'scale',unit:'秒',max:15,threshold:5,cases:[
 {title:'稳定参考',value:'12 秒',reading:'高于 5 秒，也达到传统约 10 秒的参考水平。',difference:'作为对照，染色泪膜保持覆盖较久。',amount:12},
 {title:'阈值附近',value:'5 秒',reading:'5 秒处在少量染料法的判断边界；小于 5 秒表示泪膜稳定性异常。',difference:'比对照早 7 秒；本组不把 NIBUT 的 10 秒阈值套过来。',amount:5},
 {title:'较早破裂',value:'3 秒',reading:'低于 5 秒，符合本方法的稳定性异常指标。',difference:'比对照早 9 秒出现破裂。',amount:3}]},
 meniscus:{method:'同一位置和成像方法的下泪河高度；≤0.20 mm 为低储备指标。',visual:'scale',unit:'mm',max:.4,threshold:.2,cases:[
 {title:'储备参考',value:'0.30 mm',reading:'泪河高度为 0.30 mm，泪液储备正常。',difference:'作为对照，下睑缘的泪液带较高。',amount:.3},
 {title:'阈值边界',value:'0.20 mm',reading:'恰好达到 ≤0.20 mm 的低储备阈值。',difference:'比对照低 0.10 mm；这里“等于”也纳入阈值。',amount:.2},
 {title:'储备偏少',value:'0.12 mm',reading:'低于 0.20 mm，提示泪液储备偏少。',difference:'比对照低 0.18 mm，反映存量而非分泌速度。',amount:.12}]},
 meibography:{method:'同一眼睑 Meiboscore；示意条带表达缺失面积，不表示真实腺体数量。',visual:'glands',cases:[
 {title:'无缺失',value:'0% · 0 级',reading:'图像中没有腺体缺失。',difference:'作为形态对照，示意区域完整。',amount:0},
 {title:'少量缺失',value:'20% · 1 级',reading:'缺失小于三分之一，属于 1 级。',difference:'少于三分之一的区域留空；形态改变不直接等于出油量。',amount:20},
 {title:'较多缺失',value:'70% · 3 级',reading:'缺失超过三分之二，属于 3 级。',difference:'大部分示意区域留空。中间的 2 级范围为三分之一至三分之二。',amount:70}]},
 lipid:{method:'定性对照：分布与眨眼分别观察，三个情境不是严重程度分级。',visual:'lipid',cases:[
 {title:'均匀 / 完整眨眼',value:'铺展均匀',reading:'油脂覆盖较均匀，眨眼可以完整闭合。',difference:'作为对照，表面覆盖连续。',amount:0},
 {title:'分布不均',value:'铺展不均匀',reading:'不同区域的脂质铺展表现不同。',difference:'图案不均匀，不自动代表厚度低于某个数值。',amount:1},
 {title:'不完整眨眼',value:'闭合留有间隙',reading:'部分眼表在眨眼过程中没有被充分覆盖。',difference:'重点是眼睑运动；它可以与脂质分布异常同时存在。',amount:2}]},
 staining:{method:'同一角膜荧光素点状染色计数；>5 个为阳性指标。图中点位为教学安排。',visual:'stain',cases:[
 {title:'无明显染色',value:'0 个染色点',reading:'未见点状染色。',difference:'作为对照，角膜示意中没有亮点。',amount:0},
 {title:'少量点状',value:'6 个染色点',reading:'超过 5 个，已达到该阳性指标。',difference:'点数虽少，但已经超过阈值；不是正式的“轻度干眼”分级。',amount:6},
 {title:'较多染色',value:'30 个染色点',reading:'同一计数口径下，染色点明显更多。',difference:'提示更广泛的染色表现，还可比较分布位置和是否融合。',amount:30}]},
 expression:{method:'只比较分泌物质量评分 0–3 分；排出难易和可表达数量另行记录。',visual:'oil',cases:[
 {title:'清澈液态',value:'质量 0 分',reading:'排出的油脂清澈、呈液态，性状正常。',difference:'作为对照，分泌物透明、液态。',amount:0},
 {title:'混浊',value:'质量 1 分',reading:'分泌物混浊，油脂性状已有改变。',difference:'从清澈变为混浊；2 分则为混浊伴颗粒。',amount:1},
 {title:'牙膏样',value:'质量 3 分',reading:'分泌物稠厚，呈牙膏样。',difference:'性状明显异常；是否难以挤出需另看表达记录。',amount:3}]}
}
export const combinedCases=[
 {title:'各项表现正常',story:'模拟人物甲：这次检查中，水分供应、储备与覆盖稳定性均达到本页参考。',schirmer:18,meniscus:.30,nibut:15,oil:'清澈 · 0 分',meaning:'三项数值方向一致：有水分、有储备，泪膜维持时间也较长。',focus:'这是学习对照，不是每个正常人都必须达到的固定数值组合。'},
 {title:'水分供应偏少',story:'模拟人物乙：先从水量方面寻找线索。',schirmer:3,meniscus:.12,nibut:6,oil:'清澈 · 0 分',meaning:'分泌量和泪河高度都低，支持水液不足的线索；同时泪膜较早破裂。油脂性状清澈并不会抵消水量方面的异常。',focus:'看水量时，把分泌试验和泪河放在一起。'},
 {title:'分泌正常，泪膜不稳',story:'模拟人物丙：泪液量正常，但泪膜容易破裂。',schirmer:18,meniscus:.30,nibut:4,oil:'混浊 · 1 分',meaning:'泪液分泌量和储备正常，NIBUT 却只有 4 秒，说明水量和稳定性可以不一致；油脂混浊提供了进一步观察腺体功能的线索。',focus:'这组数据帮助理解：泪液量正常，仍可能感觉干涩。'},
 {title:'水量与覆盖都有异常',story:'模拟人物丁：多个环节同时出现异常指标。',schirmer:3,meniscus:.12,nibut:4,oil:'牙膏样 · 3 分',meaning:'水分供应偏少、储备偏低、泪膜较早破裂，并伴油脂性状异常。学习时应分别找出水量和油脂功能两方面的线索。',focus:'这些是混合因素的教学线索，不由四个数字直接给出病因诊断。'}
]
