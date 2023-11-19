// ==UserScript==
// @name              xkitsune.ee
// @namespace         https://soulsign.inu1255.cn/scripts/693
// @version           0.0.1.2.1
// @author            zthao
// @loginURL          https://kitsune.ee/plugin.php?id=zqlj_sign
// @updateURL         https://soulsign.inu1255.cn/script/zthao/xkitsune.ee
// @expire            900000
// @domain            kitsune.ee
// ==/UserScript==

exports.run = async function(param) {
//formhash = await gethash(param);
	var formhash = 0
	var ret = await axios.get('https://kitsune.ee/home.php',
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
		//var { data } = await axios.get('https://kitsune.ee/plugin.php?id=zqlj_sign&sign='+formhash,
		var { data } = await axios.get("https://kitsune.ee/plugin.php?id=k_misign:sign&operation=qiandao&formhash="+formhash+"&format=empty",
			{headers:{'accept-language':'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7'}
		});
		console.log(data)
		if (/参拜成功/.test(data)) return '签到成功';
		if (/您今天已经参拜过了/.test(data)) return '今日已签';
		if (/今日已签/.test(data)) return '今日已签';
		if (/[]/.test(data)) return true;
		if (/没登录不能签到/.test(data)) throw "未登录"
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
	new Promise((resolve)=>setTimeout(resolve,2000));
	console.log(formhash)
	try{
		formhash = formhash[1];
	}catch(e){
		throw "获取formhash出错";
	}
	if (formhash){
		//var { data } = await axios.get('https://kitsune.ee/plugin.php?id=zqlj_sign&sign='+formhash,
		var { data } = await axios.get("https://kitsune.ee/plugin.php?id=k_misign:sign&operation=qiandao&formhash="+formhash+"&format=empty",
			{headers:{'accept-language':'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7'}
		});
		console.log(data)
		if (/参拜成功/.test(data)) return true;
		if (/您今天已经参拜过了/.test(data)) return true;
		if (/今日已签/.test(data)) return '今日已签';
		if (/[]/.test(data)) return true;
		if (/没登录不能签到/.test(data)) throw "未登录"
		if (/系统拒绝/.test(data)) throw "未登录-系统拒绝"
	}else{
		throw "未登录"+formhash;
	}
};
