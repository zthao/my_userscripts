// ==UserScript==
// @name              北+
// @namespace         https://soulsign.inu1255.cn/scripts/489
// @version           0.0.5
// @author            zthao
// @loginURL          https://bbs.imoutolove.me/plugin.php?H_name-tasks.html
// @updateURL         https://soulsign.inu1255.cn/script/zthao/北+
// @expire            3600000
// @domain            bbs.imoutolove.me
// ==/UserScript==

exports.run = async function(param) {
	var sd = 0
	var sda = ''
	var sw = 0
	var swa = ''
    var ret = await axios.get('https://bbs.imoutolove.me/plugin.php?H_name-tasks.html');
	if (/您没有登录或者您没有权限访问此页面/.test(data)) throw "未登录"
    let verifyhash = /verifyhash = '(.*?)'/.exec(ret.data);//var verifyhash = '41dd93ad'
    //日常
	var { data } = await axios.get('https://bbs.imoutolove.me/plugin.php?H_name=tasks&action=ajax&actions=job&cid=15&verify='+verifyhash[1]);//https://bbs.imoutolove.me/plugin.php?H_name=tasks&action=ajax&actions=job&cid=15&nowtime=1627213535497&verify=41dd93ad
	var  { data } = await axios.get('https://bbs.imoutolove.me/plugin.php?H_name=tasks&action=ajax&actions=job2&cid=15&verify='+verifyhash[1]);//https://bbs.imoutolove.me/plugin.php?H_name=tasks&action=ajax&actions=job2&cid=15&nowtime=1627214162287&verify=41dd93ad
	if (/未申请任务/.test(data)) {sd = 2;}
	else if (/已经完成/.test(data)) {sd = 1;}
	else{sd = 3}
	sda = data
    //周常
	var  { data } = await axios.get('https://bbs.imoutolove.me/plugin.php?H_name=tasks&action=ajax&actions=job&cid=14&verify='+verifyhash[1]);//https://bbs.imoutolove.me/plugin.php?H_name=tasks&action=ajax&actions=job&cid=15&nowtime=1627213535497&verify=41dd93ad
	var  { data } = await axios.get('https://bbs.imoutolove.me/plugin.php?H_name=tasks&action=ajax&actions=job2&cid=14&verify='+verifyhash[1]);//https://bbs.imoutolove.me/plugin.php?H_name=tasks&action=ajax&actions=job2&cid=15&nowtime=1627214162287&verify=41dd93ad
	if (/未申请任务/.test(data)) {sw = 2;}
	else if (/已经完成/.test(data)) {sw = 1;}
	else{sw = 3}
	swa = data
	if (sd == 3 || sw == 3) {
		throw {
			summary: "失败", 
			detail: [
				{
					domain:  "bbs.imoutolove.me", 
					url: "https://bbs.imoutolove.me/plugin.php?H_name-tasks.html", 
					message: "失败", 
					errno: sd*sw,
					log: {
						sda: sda,
						swa: swa,
					}, 
				},
			],
		}
	}
	else {
		return {
			summary: "成功", 
			detail: [
				{
					domain:  "bbs.imoutolove.me", 
					url: "https://bbs.imoutolove.me/plugin.php?H_name-tasks.html", 
					message: "成功", 
					errno: 0,
					log: {
						sda: sda,
						swa: swa,
					}, 
				},
			],
		}
	}
    throw data.error_msg 
};

exports.check = async function(param) {
    var ret = await axios.get('https://bbs.imoutolove.me/plugin.php?H_name-tasks.html');
	if (/您没有登录或者您没有权限访问此页面/.test(ret)) throw "未登录"
    else return "正常"
};

