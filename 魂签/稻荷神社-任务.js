// ==UserScript==
// @name              稻荷神社
// @namespace         https://soulsign.inu1255.cn/scripts/726
// @version           0.0.2
// @author            zthao
// @loginURL          https://kitsune.ee/home.php?mod=task
// @updateURL         https://soulsign.inu1255.cn/script/zthao/稻荷神社
// @expire            3600000
// @domain            kitsune.ee
// ==/UserScript==

exports.run = async function(param) {
//formhash = await gethash(param);
	var formhash = 0
	var ret = await axios.get('https://kitsune.ee/home.php?mod=task',
		{headers:{'accept-language':'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7'}
	});
	formhash = /formhash=(.*?)"/.exec(ret.data);
	if (/登录/.test(ret.data)) throw "未登录";
	new Promise((resolve)=>setTimeout(resolve,2000));
	console.log(formhash)
	try{
		formhash = formhash[1];
	}catch(e){
		throw "获取formhash出错";
	}
	if (formhash){
		var { data } = await axios.get('https://kitsune.ee/home.php?mod=task&do=apply&id=2',
			{headers:{'accept-language':'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7'}
		});
		console.log(data)
		if (/完成/.test(data)) return '签到成功';
		if (/本期您已申请过此任务/.test(data)) return '今日已签';
		if (/[]/.test(data)) return true;
		if (/登录/.test(data)) throw "未登录"
		if (/系统拒绝/.test(data)) throw "未登录-系统拒绝"
	}else{
		throw "未登录"+formhash;
	}
};

exports.check = async function(param) {
//formhash = await gethash(param);
	var formhash = 0
	var ret = await axios.get('https://kitsune.ee/home.php',
		{headers:{'accept-language':'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7'}
	});
	formhash = /formhash=(.*?)"/.exec(ret.data);
	if (/登录/.test(ret.data)) throw "未登录";
	else return "正常"
};
