// ==UserScript==
// @name              多点
// @namespace         https://soulsign.inu1255.cn/scripts/373
// @version           1.0.1.1.1.1.2
// @author            zthao
// @loginURL          https://i.dmall.com/#usercenter/view/mine/mine
// @updateURL         https://soulsign.inu1255.cn/script/zthao/多点
// @expire            3600000
// @domain            appapis.dmall.com
// @domain            appsign-in.dmall.com
// @domain            sign-in.dmall.com
// @domain            i.dmall.com
// @grant            cookie
// ==/UserScript==

exports.run = async function(param) {
var { data } = await axios.post('https://sign-in.dmall.com/checkIn',"tenantId=1&platform=ANDROID&vendorId=1");
    if (/成功/.test(data.msg)) return '签到成功';
    else if (/今日已签到/.test(data.msg)) return '已签到';
    else return {
		summary: "出错了", 
		detail: [
			{
				domain:  "sign-in.dmall.com", 
				url: "https://sign-in.dmall.com/checkIn", 
				message: "未知错误", 
				errno: 1,
				log: {
					data: data,
				}, 
			},
		],
	}
};

exports.check = async function(param) {
var { data } = await axios.post('https://sign-in.dmall.com/checkIn',"tenantId=1&platform=ANDROID&vendorId=1");
    if (/成功/.test(data.msg)) return true;
    else if (/今日已签到/.test(data.msg)) return true;
    else if (/用户未登录/.test(data.errMsg)) return false;
else if (/991106/.test(data.errCode)) return false;
    else return {
		summary: "出错了", 
		detail: [
			{
				domain:  "sign-in.dmall.com", 
				url: "https://sign-in.dmall.com/checkIn", 
				message: "未知错误", 
				errno: 1,
				log: {
					data: data,
				}, 
			},
		],
	}
};
