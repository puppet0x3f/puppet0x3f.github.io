# 黄康杰 · 个人学术主页

基于 HTML、CSS 和 JavaScript 的静态网站，可直接部署到 GitHub Pages，无需构建。

设计参考北京大学[李戈](https://ligechina.github.io/)、[万小军](https://wanxiaojun.github.io/)，以及清华大学[朱军](https://ml.cs.tsinghua.edu.cn/~jun/index.shtml)、[唐杰](https://keg.cs.tsinghua.edu.cn/persons/jietang/)的个人学术主页。

采用白底、蓝色链接和连续的正文布局；桌面端个人资料栏随页面保留，手机端切换为紧凑的横向个人介绍。论文按年份展示并前移，研究项目分层展示。参考网站仅用于布局与视觉设计。

## 本地预览

在项目目录运行：

~~~sh
python3 -m http.server 8000
~~~

打开 http://localhost:8000。请通过 HTTP 预览，直接双击 HTML 文件时，浏览器会限制 Markdown 内容的加载。

## 中英文内容

导航右侧的「中文 / EN」按钮切换整站语言，浏览器会记住选择。首次访问时根据浏览器语言展示中文或英文。

语言按钮旁的月亮／太阳按钮切换浅色和深色背景。首次访问跟随系统外观，手动切换后记住选择；两种语言共用主题偏好。论文缩略图和放大图保留原色与白色底板，避免深色模式影响图中文字和配色。

- 英文：首页文字在 contents/config.yml，正文在 contents/*.md。
- 中文：首页文字在 contents/zh/config.yml，正文在 contents/zh/*.md。
- 论文标题和期刊名称保留正式英文名称。
- 更新经历或项目时，请同步修改两种语言的内容。

个人照片位于 static/assets/img/kangjie-huang.jpg。首页通过 CSS 显示圆形头像，点击头像可查看完整原图。

如需展示简历，把 PDF 放入 static/assets/CV.pdf，并在两份 config.yml 中加入：

~~~yaml
cv_url: static/assets/CV.pdf
~~~

## 发布

将本目录中的文件上传至 puppet0x3f.github.io 仓库的 GitHub Pages 发布分支即可。保持 index.html、contents 和 static 的相对位置不变。

## 致谢与许可

基于 [Sen Li 的学术主页模板](https://github.com/senli1073/senli1073.github.io) 与 Start Bootstrap New Age 修改，保留原项目 [MIT 许可](LICENSE)。

Bootstrap Icons 的许可保存在 static/assets/icons/LICENSE.md。页面使用本地 Lato 字体，中文使用系统字体；字体及其 OFL 许可位于 static/assets/fonts。脚本、字体、图标和照片均保存在本地资源目录中。
