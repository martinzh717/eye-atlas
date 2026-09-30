# 眼表图谱 · Eye Atlas

独立的中文眼部构造交互学习网页。React + TypeScript + Vite + React Three Fiber + Drei。

## 启动

需要 Node.js 22.12+（本地实现验证使用 Node.js 24）。

```sh
npm ci
npm run dev -- --port 5173
```

打开 http://127.0.0.1:5173 。

```sh
npm run build
npm run preview -- --port 4173
npm test
```

测试首次运行需要 `npx playwright install chromium`。构建结果在 `dist/`；当前版本含个人检查和处方转录，公开部署前应先移除个人数据。`preview` 仅供本地检查。

## 功能

- 旋转、缩放，以及正面、斜侧、侧面预设。
- 角膜、结膜、泪腺、睑板腺、眼睑、泪膜的选择、高亮、显隐、仅显示所选结构。
- 整体构造、睑板腺展开、泪膜放大三个视图。
- 中文结构标签和侧边说明，附英文术语、医学来源、相关检查。
- 泪膜示意进度、完整/不完整眨眼情境、手动刷新覆盖状态。
- 手机布局、键盘列表操作、减少动态效果、WebGL 失败提示。
- 干眼检查：8 项常见检查的目的、部位、操作步骤和结果形式，关联 3D 部位；个人数据默认折叠为案例 A。
- 药物与作用：四个模拟案例解释用药思路，三种通用名药物对照，点击定位眼表部位；个人处方独立折叠。
- 7 张本地教学配图，点击图片在页内弹框放大，支持关闭按钮、Esc 和遮罩关闭；作者与许可集中在默认折叠的资料区。详见 [IMAGE-CREDITS.md](IMAGE-CREDITS.md)。

- 24 个单项模拟案例：每项 3 个，用共同参考线或示意图对照；点击查看差别。
- 4 个综合模拟案例：按相同口径比较分泌量、泪河、首次 NIBUT 和分泌物质量。真实案例独立展示。

## 模型范围

当前使用本地程序化几何，不依赖外部模型下载，也不需要账号或后端。没有使用 Blender 或导入 GLB。角膜、结膜仅作局部教学表达；上下睑板腺数量简化，泪膜厚度和分层放大。虹膜与眼白提供方位背景，不属于六类可选结构。整体视图为右眼，初始正面时画面左为颞侧。

泪膜视图是分层、变薄与覆盖变化的概念演示，不是流体求解或临床时间预测。按钮“模拟一次眨眼”恢复示意覆盖状态，没有实现真实眼睑骨骼动画。若需要写实效果，后续替换为经医学审校、各组织独立命名的 GLB，并保留 `PartId` 映射。

包含独立的个人检查案例及处方人工转录，未嵌入或上传个人原始照片；科普内容不构成个体诊断。后续规划见 [CLINICAL-PLAN.md](CLINICAL-PLAN.md)。

## 文件

- `src/data.ts`：结构定义、中文说明与来源。
- `src/clinicalData.ts`：个人案例与处方转录。
- `src/medicineLearning.ts`：四个药物教学案例、通用名成分与作用资料。
- `src/MedicinePanel.tsx`：案例选择、药物对照、剂型说明和独立处方记录。
- `src/examCatalog.ts`：通用检查知识、步骤、图片元数据。
- `src/examInterpretation.ts`：参考标准、案例数值、结果含义与判读来源。
- `src/teachingCaseData.ts`：24 个单项及 4 个综合模拟案例数据。
- `src/TeachingCases.tsx`：案例卡、数值刻度、原创教学示意和综合表格。
- `src/ExamPanel.tsx`：检查科普、配图与默认折叠的案例区。
- `src/ClinicalPanel.tsx`：检查和用药条目、证据卡与结构定位。
- `src/Scene.tsx`：可点击程序化模型、标签、相机、渲染失败处理。
- `src/App.tsx`：视图、选择、显隐、学习面板与模拟状态。
- `src/styles.css`：响应式界面及设计变量。
- `tests/atlas.spec.ts`：行为和布局回归测试。

## 医学参考

- [NEI：泪液如何工作](https://www.nei.nih.gov/eye-health-information/healthy-vision/how-eyes-work/how-tears-work)
- [NEI：干眼](https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/dry-eye)
- [NEI：干眼检查](https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/dry-eye/testing-dry-eye)
- [NEI：干眼原因](https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/dry-eye/causes-dry-eye)
- [EyeWiki：睑板腺功能障碍](https://eyewiki.aao.org/Meibomian_Gland_Dysfunction_%28MGD%29)

内容与模型需进一步医学审校后再用于正式患者教育。
