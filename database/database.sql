/*
SQLyog Ultimate v11.27 (32 bit)
MySQL - 5.7.14 : Database - mycommonweb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mycommonweb` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `mycommonweb`;

/*Table structure for table `class` */

DROP TABLE IF EXISTS `class`;

CREATE TABLE `class` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `className` varchar(50) NOT NULL COMMENT '菜单名称',
  `orderNumber` int(10) NOT NULL COMMENT '排列序号',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

/*Data for the table `class` */

insert  into `class`(`id`,`className`,`orderNumber`) values (1,'javascript',1),(2,'html',2),(3,'php',3),(4,'mysql',4),(5,'Nodejs',5),(6,'MongoDB',6),(7,'快捷键',7),(8,'vue',8),(9,'其他',9),(10,'react',10),(11,'agularjs',11),(12,'weixin',12),(13,'git',13),(14,'工作常用',14);

/*Table structure for table `web` */

DROP TABLE IF EXISTS `web`;

CREATE TABLE `web` (
  `id` int(6) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `url` varchar(255) NOT NULL COMMENT '网页地址或网站地址',
  `name` varchar(255) NOT NULL COMMENT '网页显示名称',
  `class` varchar(255) NOT NULL DEFAULT '' COMMENT '主类',
  `subclass` varchar(255) NOT NULL DEFAULT '' COMMENT '小类',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=137 DEFAULT CHARSET=utf8;

/*Data for the table `web` */

insert  into `web`(`id`,`url`,`name`,`class`,`subclass`) values (1,'html\\js\\01.html','基本语法','javascript','study'),(2,'html\\js\\02.html','语句','javascript','study'),(3,'html\\js\\03.html','函数','javascript','study'),(4,'html\\js\\04.html','数组','javascript','study'),(5,'html\\js\\05.html','字符串','javascript','study'),(6,'html\\js\\06.html','日期与数学函数','javascript','study'),(7,'html\\js\\07.html','BOM','javascript','study'),(8,'html\\js\\08.html','DOM','javascript','study'),(9,'html\\js\\09.html','Event事件','javascript','study'),(10,'html\\js\\10.html','Cookie','javascript','study'),(11,'html\\js\\11.html','RegExp','javascript','study'),(12,'html\\js\\12.html','ES5','javascript','study'),(13,'html\\js\\13.html','ES6','javascript','study'),(14,'html\\js\\14.html','Animation','javascript','study'),(15,'html\\js\\15.html','面向对象','javascript','study'),(16,'html\\js\\17.html','AJAX','javascript','study'),(17,'html\\js\\18.html','Closure&Inherit','javascript','study'),(18,'html\\js\\19.html','SVN','javascript','study'),(19,'html\\js\\20.html','插件编写','javascript','study'),(20,'html\\js\\21.html','jQuery','javascript','study'),(21,'html\\js\\22.html','模块化开发','javascript','study'),(22,'html\\js\\23.html','Git','javascript','study'),(23,'html\\js\\24.html','Gulp','javascript','study'),(24,'html\\js\\25.html','Sass','javascript','study'),(25,'html\\js\\26.html','gulp常用插件','javascript','study'),(26,'html\\js\\27.html','ES6的编译','javascript','study'),(27,'https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/','Git教程（全）','javascript','collect'),(29,'html\\html\\01.html\r\n','html基础\r\n','html','study'),(30,'html\\html\\02.html\r\n','css基础\r\n','html','study'),(31,'html\\html\\03.html\r\n','css核心属性\r\n','html','study'),(32,'html\\html\\04.html\r\n','盒模型\r\n','html','study'),(49,'html\\php\\php.html','php基础','php','study'),(33,'html\\html\\05.html\r\n','元素类型\r\n','html','study'),(34,'html\\html\\06.html\r\n','定位、锚链接\r\n','html','study'),(35,'html\\html\\07.html','自适应宽高\r\n','html','study'),(36,'html\\html\\08.html\r\n','浏览器兼容\r\n','html','study'),(37,'html\\html\\09.html\r\n','图像整合\r\n','html','study'),(38,'html\\html\\10.html\r\n','高级表单和表格\r\n','html','study'),(39,'html\\html\\11.html\r\n','html5新特性\r\n','html','study'),(40,'html\\html\\12.html\r\n','css3第一部分\r\n','html','study'),(41,'html\\html\\13.html\r\n','css3第二部分\r\n','html','study'),(42,'html\\html\\14.html\r\n','3d转换及动画\r\n','html','study'),(43,'html\\html\\15.html\r\n','flex及多样布局\r\n','html','study'),(44,'html\\html\\16.html\r\n','百分比布局及rem布局\r\n','html','study'),(45,'html\\html\\17.html\r\n','bfc\r\n','html','study'),(46,'html\\html\\18.html\r\n','transition transform animate\r\n','html','study'),(47,'html\\html\\19.html','video\r\n','html','study'),(48,'html\\html\\20.html\r\n','选择器,css3相关属性\r\n','html','study'),(50,'html\\mysql\\mySQL.html','mySQL基础','mysql','study'),(51,'http://www.runoob.com/nodejs/nodejs-tutorial.html','Nodejs教程','Nodejs','collect'),(52,'http://v3.bootcss.com/css/','bootstrap文档','javascript','collect'),(53,'http://www.cnblogs.com/knowledgesea/p/4634464.html','MongoDB高级查询详细','MongoDB','collect'),(54,'http://chenzhou123520.iteye.com/blog/1637629','Mongodb数据更新命令、操作符','MongoDB','collect'),(55,'https://github.com/','GitHub','javascript','collect'),(67,'http://www.cnblogs.com/mr-wid/archive/2013/05/09/3068229.html','MySQL 入门教程','MySql','collect'),(68,'http://www.cnblogs.com/t2xingzhe/p/3555268.html','MongoDB高级查询用法大全','MongoDB','collect'),(69,'http://www.jb51.net/softjc/180873.html','sublime常用快捷键','快捷键','collect'),(70,'https://cn.vuejs.org/','vue官网','vue','collect'),(71,'http://www.runoob.com/vue2/vue-tutorial.html','vue菜鸟教程','vue','collect'),(72,'https://github.com/dk-lan','dk-lan','JavaScript','collect'),(73,'http://es6.ruanyifeng.com/','es6入门','JavaScript','collect'),(74,'http://www.replace5.com/es5/','es5入门','JavaScript','collect'),(75,'http://cnodejs.org/topic/56ef3edd532839c33a99d00e','前端资源教程','JavaScript','collect'),(76,'http://element.eleme.io/#/zh-CN/','element','vue','collect'),(77,'https://www.awesomes.cn/','前端开发资源库','JavaScript','collect'),(78,'http://bonsaiden.github.io/JavaScript-Garden/zh/','JavaScript 秘密花园','JavaScript','collect'),(79,'https://www.zybuluo.com/mdeditor_light','Cmd Markdown','JavaScript','collect'),(80,'http://www.builive.com/demo/edit-grid.php#edit-grid/row-editor.php','可编辑表格','vue','collect'),(81,'https://www.iviewui.com/','iview','vue','collect'),(82,'https://iview.github.io/iview-admin/#/home','talking','vue','collect'),(100,'http://www.imooc.com/learn/148','电商网站后台开发','Php','collect'),(84,'http://www.runoob.com/mysql/mysql-install.html','MySql（菜鸟）','MySql','collect'),(88,'html/mysql/MySql-AND-MongoDB.html','mysql and mongodb','MySql','study'),(89,'http://www.ituring.com.cn/','图灵社区','JavaScript','collect'),(86,'http://blog.csdn.net/qq_35246620/article/details/70823903','数据库 - 维C果糖的博客','MySql','collect'),(90,'http://www.ruanyifeng.com/blog/archives.html','阮一峰日志','JavaScript','collect'),(91,'https://pan.baidu.com','百度网盘','其他','collect'),(92,'https://wx2.qq.com/','微信网页版','其他','collect'),(93,'https://mail.163.com','163邮箱','其他','collect'),(94,'http://www.react-cn.com/','react中国','react','collect'),(95,'https://github.com/yezihaohao/react-admin','ui--react','react','collect'),(96,'http://demodaojia.ecjia.com/index.php?m=admincp&c=index&a=init','ecjia','react','collect'),(97,'http://tmtheme-editor.herokuapp.com/#!/editor/theme/Abdal%20Black%20Hackers','sublime配色','其他','collect'),(98,'http://www.redux.org.cn/','redux中文','react','collect'),(99,'http://design.alipay.com/','antd','react','collect'),(101,'https://ant.design/docs/spec/colors-cn','antd原来','react','collect'),(102,'https://www.sass.hk/guide/','sass','Html','collect'),(103,'http://less.bootcss.com/#','less','Html','collect'),(104,'http://cn.mobx.js.org/','MOBX','react','collect'),(105,'http://web.jobbole.com/','伯乐在线','JavaScript','collect'),(106,'https://angular.cn/docs','angular中文版','agularjs','collect'),(107,'http://jiongks.name/blog/vue-code-review/','Vue.js 源码学习笔记','vue','collect'),(108,'Free Online Logo Maker, Create Custom Logo Designs - DesignEvo','logo制作','其他','collect'),(109,'http://mint-ui.github.io/#!/zh-cn','Mint UI','vue','collect'),(110,'https://www.youzanyun.com/zanui/vant#/zh-CN/component/quickstart','Vant','vue','collect'),(111,'https://vux.li/#/zh-CN/README','vuxUI','vue','collect'),(112,'http://dev.dcloud.net.cn/mui/','MUI','vue','collect'),(113,'http://one-div.com/','One div','Html','collect'),(114,'http://fontawesome.dashgame.com/','Font Awesome','JavaScript','collect'),(115,'http://www.w3school.com.cn/jsref/jsref_obj_regexp.asp','JavaScript RegExp 对象','JavaScript','collect'),(116,'http://cnodejs.org/api','node API','Nodejs','collect'),(117,'http://cnodejs.org/api','cnode','Nodejs','collect'),(118,'https://mp.weixin.qq.com/debug/wxadoc/dev/index.html','小程序文档','weixin','collect'),(119,'https://mp.weixin.qq.com/','公众号平台','weixin','collect'),(120,'html/vue/vue介绍.html','vue介绍','vue','study'),(121,'html/vue/模板语法.html','模板语法','vue','study'),(122,'https://mail.google.com/mail/u/0/#inbox','gmail','其他','collect'),(123,'https://webpack.js.org/concepts/','webpack','vue','collect'),(124,'https://developer.mozilla.org/zh-CN/docs/Web/Events','事件类型一览表 | MDN','JavaScript','study'),(125,'http://www.treejs.cn/v3/demo.php#_101','zTree','JavaScript','collect'),(127,'http://www.cnblogs.com/tylerdonet/p/5543813.html','8年javascript知识点积累','JavaScript','collect'),(128,'http://www.cnblogs.com/tylerdonet/archive/2012/11/04/2754386.html','SQL点滴文章总结','MySql','collect'),(129,'http://www.51job.com/?from=baidupz','前程无忧','其他','collect'),(130,'https://i.zhaopin.com/','智联招聘','其他','collect'),(131,'https://www.lagou.com/resume/myresume.html','拉勾网','其他','collect'),(132,'https://www.zhipin.com/geek/myresume.html','BOSS直聘','其他','collect'),(133,'http://eslint.cn/','eslint','vue','collect'),(134,'https://developer.mozilla.org/zh-CN/docs/Web/JavaScript','MDN','JavaScript','collect'),(135,'https://www.jianshu.com/u/b56b02622381','element组件分析','vue','collect'),(136,'http://fanyi.baidu.com/translate?aldtype=16047&query=&keyfrom=baidu&smartresult=dict&lang=auto2zh#en/zh/loader','在线翻译','其他','study');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
