/*
 * @Author       : zhucaiyun1@xdf.cn
 * @Date         : 2021-10-20 16:32:07
 * @LastEditors  : zhucaiyun1@xdf.cn
 * @LastEditTime : 2021-10-20 16:34:58
 * @Description  : 描述信息
 */
// 引入全局对象
import g from '../../global';
// 引入html模板, 会被作为字符串引入
import template from './index.html';
// 引入css, 会生成<style>块插入到<head>头中
import './style.css';

// 导出类
export default class {
  mount(container) {
    document.title = 'foo';
    container.innerHTML = template;

    container.querySelector('.foo__gobar').addEventListener('click', () => {
      // 调用router.go方法加载 /bar 页面
      g.router.go('/bar');
    });
  }
}