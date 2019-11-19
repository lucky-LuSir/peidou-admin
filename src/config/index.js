export default {
    //appid
    appid: "DEMO-H5",
    //key
    key: "mcw20190228001",
    //url
    //本地URL
    url: "http://uip.dev.maocongwang.com/api/UIP",
    //线上URL
    // url: "http://uip.maocongwang.com/api/UIP",
    //车牌号验证
    PlateNumberPass: (rule, value, callback) => {
        var myreg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;
        value = value.toUpperCase()
        if (!myreg.test(value)) {
            callback(new Error("请输入正确的车牌号"));
        } else {
            callback();
        }
    },
    VinPass: (rule, value, callback) => {
        value = value.toUpperCase()
        if (value.length != 17) {
            callback(new Error("请输入正确的VIN码"));
        }
        var reg1 = new RegExp(/^[0-9A-Za-z]+$/);
        if (!reg1.test(value)) {
            callback(new Error("请输入正确的VIN码"));
        }
        var reg = new RegExp(/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/);
        if (reg.test(value)) {
            callback();
        } else {
            callback(new Error("请输入正确的VIN码"));
        }
    },
    isPoneAvailable: (rule, value, callback) => {
        var myreg = /^[1][0-9][0-9]{9}$/;
        if (!myreg.test(value)) {
            callback(new Error("请输入正确的手机号码"));
        } else {
            callback();
        }
    },
    numbercheck: (rule, value, callback) => {
        var re = /^\d+(?=\.{0,1}\d+$|$)/
        if (!re.test(value) || value < 0) {
            callback(new Error("请输入正确的数字格式并且不能小于0"));
        } else {
            callback();
        }
    },
    valiWithdrawMoney: (rule, value, callback) => {
        const isMoney = /^[0-9]*(\.[0-9]{1,2})?$/;
        if (!value && !isMoney.test(value)) {
            return callback(new Error('请输入正确格式的提现金额！！'));
        }
        return callback();
    },
    numberchecks: (rule, value, callback) => {
        var re = /^[1-9]\d*$/;
        if (!re.test(value) || value < 0) {
            callback(new Error("请输入正确的数字格式并且是正整数"));
        } else {
            callback();
        }
    }
}
