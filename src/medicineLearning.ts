export type MedicineStory={title:string;subtitle:string;symptom:string;findings:string;problem:string;why:string;benefit:string;next:string;drugs:string[]}
export const medicineStories:MedicineStory[]=[
 {title:'泪液不足',subtitle:'水分供应少',symptom:'模拟人物甲：眼睛干涩、有摩擦感，眨眼时也不舒服。',findings:'Schirmer 3 mm / 5 min；泪河高度 0.12 mm。',problem:'分泌量和泪液储备都偏少，眼表缺少足够的润滑。',why:'医生可以考虑人工泪液，给眼表补充润滑、帮助保持水分。玻璃酸钠和羟糖甘都可以用来理解这类作用。',benefit:'减轻干涩和摩擦感，让角膜、结膜表面保持湿润。',next:'这里补充的是眼表润滑；泪液分泌少的原因仍是另一项需要处理的问题。',drugs:['hyaluronate','tears']},
 {title:'泪液正常，泪膜不稳',subtitle:'有水，但保持不久',symptom:'模拟人物乙：看屏幕时容易干涩，眨眼后能短暂舒服一些。',findings:'Schirmer 18 mm / 5 min；首次 NIBUT 4 秒。',problem:'泪液分泌量正常，但泪膜较快破裂，眼表容易反复暴露。',why:'人工泪液可以帮助润滑眼表、改善润湿。选择还要考虑脂质分布和眨眼情况，而不是只看泪液量。',benefit:'改善眼表的润滑条件，缓解干涩和刺激感。',next:'脂质异常或不完整眨眼需要另外评估；这两种润滑滴眼液的主要作用不是疏通睑板腺。',drugs:['hyaluronate','tears']},
 {title:'需要更持久的润滑',subtitle:'比较滴眼液与凝胶',symptom:'模拟人物丙：用了润滑滴眼液后感觉舒服一些，但维持时间不够理想。',findings:'教学重点是舒适感能维持多久，而不是新增一个检查数值。',problem:'除了补充润滑，还希望药物在眼表停留更久。',why:'医生可能考虑较黏稠的凝胶剂型。它通常比稀薄滴眼液停留更久；维生素 A 棕榈酸酯眼用凝胶是本页用来认识凝胶与角膜保护作用的例子。',benefit:'提供较持久的润滑保护。',next:'凝胶可能短暂让视物变模糊，清晰后再驾驶或操作机器。需要凝胶不等于一定要选含维生素 A 的制剂。',drugs:['vitamina','hyaluronate','tears']},
 {title:'伴有眼表上皮损伤',subtitle:'润滑之外，关注眼表保护',symptom:'模拟人物丁：有干涩、刺痛，医生检查时观察到角膜点状染色。',findings:'角膜荧光素染色 12 个点；首次 NIBUT 4 秒。',problem:'泪膜较快破裂，同时出现眼表上皮受损的表现。',why:'治疗会重视润滑和眼表保护。医生在确认损伤原因后，可能考虑维生素 A 棕榈酸酯眼用凝胶作为角膜保护的辅助治疗。',benefit:'帮助眼表保持润滑，为角膜表面提供保护。',next:'有染色不等于一定要用这个药。这里的凝胶是辅助保护，具体治疗还取决于损伤原因。',drugs:['vitamina','hyaluronate','tears']}
]
export const medicineKnowledge:Record<string,{category:string;ingredient:string;action:string;benefit:string;difference:string}>={
 hyaluronate:{category:'人工泪液 · 保水与润滑',ingredient:'玻璃酸钠',action:'通过结合水分，帮助眼表保水并减少摩擦。',benefit:'缓解干涩，改善角膜和结膜表面的润滑。',difference:'与羟糖甘有共同的润滑作用；具体制剂的浓度、黏度和防腐剂情况会影响选择。'},
 tears:{category:'人工泪液 · 复方润滑',ingredient:'羟丙甲纤维素、右旋糖酐 70、甘油',action:'多种润滑成分共同作用于眼表，帮助缓解干燥引起的刺激。',benefit:'暂时缓解干涩、灼热或摩擦样不适。',difference:'与玻璃酸钠不是分别对应两种固定病因，也不表示每个人都需要同时使用。'},
 vitamina:{category:'眼用凝胶 · 润滑与辅助保护',ingredient:'维生素 A 棕榈酸酯',action:'凝胶提供润滑；该成分的眼用凝胶可用于干眼相关的角膜保护辅助治疗。',benefit:'帮助保护因泪膜保护不足而受到刺激的角结膜表面。',difference:'凝胶是一种剂型，维生素 A 是其中的成分。开具此药不等于存在维生素 A 缺乏。'}
}
export const medicineLearningSources=[
 {title:'NEI · 干眼与人工泪液',url:'https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/dry-eye'},
 {title:'NHS · 眼表润滑剂与剂型',url:'https://www.uhsussex.nhs.uk/resources/dry-eyes/'},
 {title:'NHS · 干眼治疗与短暂视物模糊',url:'https://www.guysandstthomas.nhs.uk/health-information/dry-eye-syndrome/treatment'},
 {title:'药品标签 · 羟丙甲纤维素、右旋糖酐和甘油的润滑作用（同成分参考）',url:'https://dailymed.nlm.nih.gov/dailymed/drugInfo.cfm?setid=a2992597-3490-6a5c-be45-2b6fa15e1547'},
 {title:'厂家资料 · 维生素 A 棕榈酸酯眼用凝胶的适用范围',url:'https://www.sinqi.com/'},
 {title:'厂家说明书 · 玻璃酸钠作用机制（同成分参考）',url:'https://www.huonland.com/upload/attachment/202312/26/023541/%E7%8E%BB%E7%92%83%E9%85%B8%E9%92%A0%E6%BB%B4%E7%9C%BC%E6%B6%B2-%E8%AF%B4%E6%98%8E%E4%B9%A6%20-%202%E5%B9%B4%E6%95%88%E6%9C%9F.pdf'}
]
