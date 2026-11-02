# 黄康杰 · 个人学术主页

基于 HTML、CSS 和 JavaScript 的静态网站，可直接部署到 GitHub Pages，无需构建。

布局参考 [Zongqing Lu 的学术主页](https://z0ngqing.github.io/)：圆形头像与身份信息居左，个人介绍居右；后续栏目使用左标题、右内容的布局。白色与浅灰色背景交替，链接使用蓝色。

## 本地预览

在项目目录运行：

~~~sh
python3 -m http.server 8000
~~~

打开 http://localhost:8000。请通过 HTTP 预览，直接双击 HTML 文件时，浏览器会限制 Markdown 内容的加载。

## 中英文内容

导航右侧的「中文 / EN」按钮切换整站语言，浏览器会记住选择。首次访问时根据浏览器语言展示中文或英文。

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

Bootstrap Icons 的许可保存在 static/assets/icons/LICENSE.md。Lato 与 Merriweather 字体及其 OFL 许可位于 static/assets/fonts，中文使用系统字体。脚本、字体、图标和照片均保存在本地资源目录中。
