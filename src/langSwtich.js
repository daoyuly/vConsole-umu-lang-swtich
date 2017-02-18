/**
 * vConsole Plugin 语言切换
 *
 * @author UMU FE
 */

import './style.less';
import tplTabbox from './tabbox.html';
import tplList from './list.html';

const $ = vConsole.$;
const tool = vConsole.tool;

class VConsoleUMULangSwitchTab extends vConsole.VConsolePlugin {

  constructor(...args) {
    super(...args);

    this.$tabbox = $.render(tplTabbox, {});
    this.currentType = ''; 
    this.typeNameMap = {
    	'zh-cn': {system:'CN',lang: 'zh-cn'},
    	'zh-tw': {system:'TW',lang: 'zh-tw'},
			'en-us': {system:'EN',lang: 'en-us'},
			'ja-jp': {system:'JP',lang: 'ja-jp'}
    }

  }

  onRenderTab(callback) {
    callback(this.$tabbox);
  }

  onAddTool(callback) {
		/*
    let that = this;
    let toolList = [{
      name: 'Refresh',
      global: false,
      onClick: function(e) {
        that.renderResources();
      }
    }, {
      name: 'Clear',
      global: false,
      onClick: function(e) {
        that.clearLog();
      }
    }];
    callback(toolList);
		*/
  }

  onReady() {
  	let that = this;

    $.delegate($.one('.vc-sub-tabbar', that.$tabbox), 'click', '.vc-subtab', function(e) {
    	$.removeClass($.all('.vc-subtab', that.$tabbox), 'vc-actived');
    	$.addClass(this, 'vc-actived');

    	that.currentType = this.dataset.type;
    	that.setLang();
			that.refresh();
    });

  }

  setLang() {
		 var langItem = this.typeNameMap[this.currentType];
		 document.cookie = "_SYSTEM=" + langItem.system + ";path=/";
     document.cookie = "_lang=" + langItem.lang + ";path=/";
	}

	refresh() {
		location.reload();
	}

}

let tab = new VConsoleUMULangSwitchTab('umuLangSwitch', 'umuLangSwitch');
vConsole.addPlugin(tab);