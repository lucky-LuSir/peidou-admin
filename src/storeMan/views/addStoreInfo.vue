<template>
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="main">
            <el-form :inline="true" :model="addStoreObj" :rules="rules" ref="ruleForm">
                <div class="common">
                    <div style="margin-top: 25px;" class="comInfo-top">
                        <h2>门店负责人信息</h2>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="门店负责人姓名：" prop="dutyName">
                                <el-input size="small" placeholder="门店负责人姓名" v-model="addStoreObj.dutyName"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="门店负责人手机号：" prop="dutyMobile">
                                <el-input size="small" placeholder="门店负责人手机号" v-model="addStoreObj.dutyMobile"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div class="common clearfix">
                    <div class="comInfo-top">
                        <h2 style="margin-bottom: 20px;">法人信息</h2>
                        <!-- <p>身份证照片：</p> -->
                    </div>
                    <div class="card_id_list">
                        <div class="card_id_front">
                            <p>身份证照片正面：</p>
                            <el-upload action="#" :limit="1" list-type="picture-card" :auto-upload="true" :file-list="faceIDCardsImgList" :http-request="faceIDCardsFn">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                            <i class="el-icon-zoom-in"></i>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="faceIDCardsImgListRemove(file)">
                                            <i class="el-icon-delete"></i>
                                        </span>
                                    </span>
                                </div>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                        <div class="card_id_back">
                            <p>身份证照片反面：</p>
                            <el-upload action="#" :limit="1" list-type="picture-card" :auto-upload="true" :file-list="backIDCardsImgList" :http-request="backIDCardsFn">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                            <i class="el-icon-zoom-in"></i>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="backIDCardsImgListRemove(file)">
                                            <i class="el-icon-delete"></i>
                                        </span>
                                    </span>
                                </div>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>
                    <div class="moreFloor fl _noMargin">
                        <div class="floor">
                            <el-form-item label="法人姓名：" prop="legalManName">
                                <el-input style="width: 170px;" size="small" placeholder="营业执照法人姓名" v-model="addStoreObj.legalManName"></el-input>
                            </el-form-item>
                        </div>
                        <div class="floor">
                            <el-form-item label="身份证号码：" prop="idCardsCode">
                                <el-input style="width: 355px;" size="small" placeholder="身份证号码" v-model="addStoreObj.idCardsCode"></el-input>
                            </el-form-item>
                        </div>

                    </div>
                    <div class="moreFloor fl _noMargin _second">
                        <div class="floor">
                            <el-form-item label="法人手机号：" prop="legalManMobile">
                                <el-input style="width: 170px;" size="small" placeholder="法人手机号" v-model="addStoreObj.legalManMobile"></el-input>
                            </el-form-item>
                            <el-button @click="getValidCode()" :disabled="disabled" style="margin-left: 10px;" type="primary" size="small">{{message}}</el-button>
                        </div>
                        <div class="floor" style="padding-left: 28px;">
                            <el-form-item label="验证码：" prop="verificationCode">
                                <el-input style="width: 170px;" size="small" placeholder="验证码" v-model="addStoreObj.verificationCode"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div class="common clearfix">
                    <div class="comInfo-top">
                        <h2 style="margin-bottom: 25px;">门店信息</h2>
                    </div>
                    <div class="card_id_list">
                        <div class="card_id_front">
                            <p>门头照：</p>
                            <el-upload action="#" :limit="1" list-type="picture-card" :auto-upload="true" :file-list="garageImgList" :http-request="garageFn">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                            <i class="el-icon-zoom-in"></i>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="garageImgListRemove(file)">
                                            <i class="el-icon-delete"></i>
                                        </span>
                                    </span>
                                </div>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                        <div class="card_id_back">
                            <p>营业执照：</p>
                            <el-upload action="#" :limit="1" list-type="picture-card" :auto-upload="true" :file-list="businessImgList" :http-request="businessFn">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                            <i class="el-icon-zoom-in"></i>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="businessImgListRemove(file)">
                                            <i class="el-icon-delete"></i>
                                        </span>
                                    </span>
                                </div>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="公司名称：" prop="companyName">
                                <el-input size="small" placeholder="营业执照法人姓名" v-model="addStoreObj.companyName"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="门店名称：" prop="storeName">
                                <el-input size="small" placeholder="门店名称" v-model="addStoreObj.storeName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="统一社会信用代码：" prop="creditCode">
                                <el-input size="small" placeholder="营业执照注册号" v-model="addStoreObj.creditCode"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <el-form-item label="所在区域：" prop="regionValue">
                            <el-cascader separator=" " clearable class="cascaderRef" v-model="addStoreObj.regionValue" :options="cityList" @change="handleCascaderChange" size="small" style="width: 740px;"></el-cascader>
                        </el-form-item>
                    </div>
                    <div class="comInfo-content">
                        <el-form-item label="收货地址：" prop="receiveAddress">
                            <el-input style="width: 740px;" size="small" placeholder="详细地址" v-model="addStoreObj.receiveAddress"></el-input>
                        </el-form-item>
                    </div>
                    <div class="comInfo-content">
                        <el-form-item label="注册地址：" prop="registerAddress">
                            <el-input style="width: 740px;" size="small" placeholder="详细地址" v-model="addStoreObj.registerAddress"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="common">
                    <div class="comInfo-top">
                        <h2>收账账号</h2>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="开户行：" prop="openBankSub">
                                <el-input size="small" placeholder="开户银行支行" v-model="addStoreObj.openBankSub"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="账号：" prop="openBankNum">
                                <el-input size="small" placeholder="开户银行卡号" v-model="addStoreObj.openBankNum"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="企业名称：" prop="openBankName">
                                <el-input size="small" placeholder="企业名称" v-model="addStoreObj.openBankName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="支付宝账号 (选填)：" prop="alipayNum">
                                <el-input size="small" placeholder="支付宝账号" v-model="addStoreObj.alipayNum"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="支付宝账号姓名 (选填)：" prop="alipayName">
                                <el-input size="small" placeholder="支付宝账号姓名" v-model="addStoreObj.alipayName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="微信账号 (选填)：" prop="weChatNum">
                                <el-input size="small" placeholder="微信账号" v-model="addStoreObj.weChatNum"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="微信账号姓名 (选填)：" prop="weChatName">
                                <el-input size="small" placeholder="微信账号姓名" v-model="addStoreObj.weChatName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div class="common clearfix">
                    <div class="comInfo-top">
                        <h2>合作信息</h2>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="合作时限：" prop="cooperateTime">
                                <el-date-picker unlink-panels v-model="addStoreObj.cooperateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="合同编号：" prop="contractNum">
                                <el-input size="small" placeholder="合同编号" v-model="addStoreObj.contractNum"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="card_id_list">
                        <div class="card_id_front">
                            <p style="margin-top: 25px;">协议合同：</p>
                            <el-upload action="#" :file-list="contractImgList" :limit="1" list-type="picture-card" :auto-upload="true" :http-request="contractFn">
                                <i slot="default" class="el-icon-plus"></i>
                                <div slot="file" slot-scope="{file}">
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                            <i class="el-icon-zoom-in"></i>
                                        </span>
                                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="contractImgListRemove(file)">
                                            <i class="el-icon-delete"></i>
                                        </span>
                                    </span>
                                </div>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                                <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                    </div>
                </div>
                <div class="common">
                    <div class="comInfo-top">
                        <h2>授信额度</h2>
                    </div>
                    <div class="comInfo-content _noMargin">
                        <div class="inline">
                            <el-form-item label="授信额度：" prop="quota">
                                <el-input size="small" placeholder="授信额度" v-model="addStoreObj.quota"></el-input>
                            </el-form-item>元
                        </div>
                    </div>
                    <div v-if="isNotAddStore" class="comInfo-content _noMargin">
                        <div class="inline" style="width: auto;">
                            <el-form-item label="审核意见：" prop="remark">
                                <el-input style="width: 500px;" type="textarea" :rows="3" placeholder="审核意见" v-model="addStoreObj.remark">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <el-button type="primary" @click="submit('ruleForm')" size="small">提交</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import Header from "../../components/Header"
import cityList from "../../common/json/data.json"
function getCascaderObj (val, opt) {
    return val.map(function (value, index, array) {
        for (var itm of opt) {
            if (itm.value == value) { opt = itm.children; return itm; }
        }
        return null;
    });
}
export default {
    props: ["paramsObj"],
    components: {
        Header,
    },
    data () {
        return {
            headerInfo: '添加门店',
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            cityList: [],
            addStoreObj: {
                dutyName: '', // 门店负责人姓名
                dutyMobile: '', // 门店负责人手机号
                legalManName: '', // 法人姓名
                legalManMobile: '', // 法人手机号
                verificationCode: '', // 验证码
                companyName: '', //公司名称
                storeName: '', // 门店名称
                creditCode: '', // 信用代码
                receiveAddress: '',  // 收货地址
                registerAddress: '', // 注册地址
                openBankSub: '', // 开户行
                regionValue: "", // 省市区
                openBankNum: '', // 开户银行卡号
                openBankName: '', //企业名称
                alipayNum: '', //支付宝账号
                alipayName: '', // 支付宝姓名
                weChatNum: '', // 微信账号
                weChatName: '', //微信姓名
                cooperateTime: '', // 合作时限
                contractNum: '', // 合同编号
                quota: '', // 额度
                faceIDCardsImg: '', // 正面照
                backIDCardsImg: '', // 反面找
                garageImg: '', // 门头照
                businessImg: '', // 营业执照
                contractImg: '', // 协议合同
                idCardsCode: '', // 身份证号
                remark: '', // 审核意见
            },
            message: "获取验证码",
            disabled: false,
            isNotAddStore: false,
            time: 60,
            GarageAccount: {},
            GarageAddress: {},
            GarageDetail: [],
            GarageInfo: [],
            province: [],
            city: [],
            block: [],
            cityCode: "",
            areaCode: "",
            provinceCode: "",
            cityParamObj: [],
            location: "",
            rules: {
                dutyName: [
                    { required: true, message: '请输入门店负责人姓名', trigger: 'change' },
                ],
                dutyMobile: [
                    { required: true, message: '请输入门店负责人手机号', trigger: 'change' },
                    {
                        pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                        message: '手机号格式不对',
                        trigger: 'change'
                    }
                ],
                legalManName: [
                    { required: true, message: '请输入法人姓名', trigger: 'change' },
                ],
                legalManMobile: [
                    { required: true, message: '请输入法人手机号', trigger: 'change' },
                    {
                        pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                        message: '手机号格式不对',
                        trigger: 'change'
                    }
                ],
                verificationCode: [
                    { required: true, message: '请输入验证码', trigger: 'change' },
                ],
                companyName: [
                    { required: true, message: '请输入公司名称', trigger: 'change' },
                ],
                storeName: [
                    { required: true, message: '请输入门店名称', trigger: 'change' },
                ],
                creditCode: [
                    { required: true, message: '请输入信用代码', trigger: 'change' },
                ],
                receiveAddress: [
                    { required: true, message: '请输入收货地址', trigger: 'change' },
                ],
                registerAddress: [
                    { required: true, message: '请输入注册地址', trigger: 'change' },
                ],
                openBankSub: [
                    { required: true, message: '请输入开户行', trigger: 'change' },
                ],
                openBankName: [
                    { required: true, message: '请输入企业名称', trigger: 'change' },
                ],
                regionValue: [
                    { required: true, message: '请输入省市区', trigger: 'change' },
                ],
                openBankNum: [
                    { required: true, message: '请输入开户银行卡号', trigger: 'change' },
                ],
                cooperateTime: [
                    { required: true, message: '请输入合作时限', trigger: 'change' },
                ],
                contractNum: [
                    { required: true, message: '请输入合同编号', trigger: 'change' },
                ],
                quota: [
                    { required: true, message: '请输入额度', trigger: 'change' },
                ],
                idCardsCode: [
                    { required: true, message: '请输入身份证号码', trigger: 'change' },
                    {
                        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                        message: '证件号码格式有误！',
                        trigger: 'change'
                    }
                ],
                remark: [
                    { required: true, message: '请输入审核意见', trigger: 'change' },
                ]
            },
            faceIDCardsImgList: [], // 正面照
            backIDCardsImgList: [], // 反面找
            garageImgList: [], // 门头照
            businessImgList: [], // 营业执照
            contractImgList: [], // 协议合同
        }
    },
    async created () {

        this.getCityListFn();
        let token = window.sessionStorage.getItem("gn_request_token");

        let storeInfoTypeObj = JSON.parse(window.sessionStorage.getItem("storeInfoTypeObj"));
        if (storeInfoTypeObj.storeInfoType == "修改") {
            let paramObj = {
                Token: token,
                GarageID: storeInfoTypeObj.GarageID
            }
            const res = await this.postData("A1017", paramObj);
            this.isNotAddStore = true;
        }
    },
    methods: {
        // 提交
        submit (ruleForm) {
            this.$refs[ruleForm].validate(async (valid) => {
                if (valid) {
                    if (!this.addStoreObj.faceIDCardsImg || !this.addStoreObj.backIDCardsImg || !this.addStoreObj.businessImg) {
                        this.$message({
                            type: "error",
                            message: '图片必须上传, 请上传图片!'
                        })
                        return;
                    }
                    let token = window.sessionStorage.getItem("gn_request_token");
                    this.GarageInfo = {
                        GarageOwnerName: this.addStoreObj.dutyName,
                        GarageOwnerPhone: this.addStoreObj.dutyMobile,
                        faceIDCardsImg: this.addStoreObj.faceIDCardsImg,
                        backIDCardsImg: this.addStoreObj.backIDCardsImg,
                        businessImg: this.addStoreObj.businessImg,
                        garageImg: this.addStoreObj.garageImg,
                        approvalState: 1,
                    }
                    this.GarageDetail = {
                        legalPerson: this.addStoreObj.legalManName, // 法人
                        legalPhone: this.addStoreObj.legalManMobile, // 法人手机号
                        companyName: this.addStoreObj.companyName, // 公司名
                        garagrName: this.addStoreObj.storeName, // 门店名称
                        creditCode: this.addStoreObj.creditCode, // 信用代码
                        contractStartTime: this.addStoreObj.cooperateTime[0], // 合同开始时间
                        contractEndTime: this.addStoreObj.cooperateTime[1], // 合同结束时间
                        contractCode: this.addStoreObj.contractNum, // 合同编号
                        contractImg: this.addStoreObj.contractImg, // 合同图片
                        amount: this.addStoreObj.quota, // 额度
                        idCardsCode: this.addStoreObj.idCardsCode
                    }
                    this.GarageAccount = [
                        {
                            bankType: 1,
                            openingBank: this.addStoreObj.openBankSub,
                            accountCode: this.addStoreObj.openBankNum,
                            accountName: this.addStoreObj.openBankName
                        },
                        {
                            bankType: 2,
                            accountName: this.addStoreObj.alipayName,
                            accountCode: this.addStoreObj.alipayNum,
                        },
                        {
                            bankType: 3,
                            accountName: this.addStoreObj.weChatName,
                            accountCode: this.addStoreObj.weChatNum,
                        },
                    ]
                    this.GarageAddress = [
                        // 1 注册地址  2 收货地址
                        {
                            provinceCode: this.provinceCode,
                            cityCode: this.cityCode,
                            areaCode: this.areaCode,
                            address: this.addStoreObj.registerAddress,
                            location: this.location,
                            addrType: 1
                        },
                        {
                            provinceCode: this.provinceCode,
                            cityCode: this.cityCode,
                            areaCode: this.areaCode,
                            address: this.addStoreObj.receiveAddress,
                            location: this.location,
                            addrType: 2
                        }
                    ]
                    let paramObj = {
                        Token: token,
                        GarageAccount: this.GarageAccount,
                        GarageAddress: this.GarageAddress,
                        GarageDetail: this.GarageDetail,
                        GarageInfo: this.GarageInfo,
                        ValidCode: this.addStoreObj.verificationCode
                    }
                    console.log(paramObj);

                    const res = await this.postData("A1008", paramObj);
                    if (res.code == "0") {
                        this.$message({
                            type: "success",
                            message: res.res.msg
                        })
                        let data = {
                            menuName: '门店管理',
                            item: 'storeList',
                        };
                        this.$emit('backParam', data);
                    }
                } else {
                    this.$message({
                        type: "error",
                        message: "请完善好信息"
                    })
                    return;
                }
            });
        },
        // 获取验证码
        getValidCode () {
            var vm = this;
            if (vm.addStoreObj.legalManMobile == "") {
                vm.$message({
                    message: "手机号不能为空",
                    type: "warning"
                });
                return;
            }
            if (vm.time === 60) {
                var requestData = { Phone: vm.addStoreObj.legalManMobile };
                vm.postData("1001", requestData, "subLogin").then(data => {
                    if (data.code == "0") {
                        vm.$message({
                            message: "获取验证码成功",
                            type: "success"
                        });
                        var interval = setInterval(() => {
                            if (vm.time === 0) {
                                vm.time = 60;
                                vm.disabled = false;
                                vm.message = "获取验证码";
                                clearInterval(interval);
                                return;
                            } else {
                                vm.disabled = true;
                                vm.time--;
                                vm.message = vm.time;
                            }
                        }, 1000);
                    }
                });
            }
        },
        // 获取城市
        getCityListFn () {
            let data = cityList;
            for (var item in data) {
                if (item.match(/0000$/)) {//省
                    this.province.push({ value: item, label: data[item], children: [] })
                } else if (item.match(/00$/)) {//市
                    this.city.push({ value: item, label: data[item], children: [] })
                } else {//区
                    this.block.push({ value: item, label: data[item] })
                }
            }
            for (var index in this.province) {
                for (var index1 in this.city) {
                    if (this.province[index].value.slice(0, 2) === this.city[index1].value.slice(0, 2)) {
                        this.province[index].children.push(this.city[index1])
                    }
                }
            }
            for (var item1 in this.city) {
                for (var item2 in this.block) {
                    if (this.block[item2].value.slice(0, 4) === this.city[item1].value.slice(0, 4)) {
                        this.city[item1].children.push(this.block[item2])
                    }
                }
            }
            this.cityList = this.province;
        },
        // 身份证正面
        async faceIDCardsFn (file) {
            this.ajaxFile("1002", { caller: "Garage" }, file.file, (res) => {
                if (res.code == 0) {
                    this.addStoreObj.faceIDCardsImg = res.res.data[0].imageUrl;
                } else {
                    this.$message.error(res.res.msg);
                }
            })
        },
        async backIDCardsFn (file) {
            this.ajaxFile("1002", { caller: "Garage" }, file.file, (res) => {
                if (res.code == 0) {
                    this.addStoreObj.backIDCardsImg = res.res.data[0].imageUrl;
                } else {
                    this.$message.error(res.res.msg);
                }
            })
        },
        async garageFn (file) {
            this.ajaxFile("1002", { caller: "Garage" }, file.file, (res) => {
                if (res.code == 0) {
                    this.addStoreObj.garageImg = res.res.data[0].imageUrl;
                } else {
                    this.$message.error(res.res.msg);
                }
            })
        },
        async businessFn (file) {
            this.ajaxFile("1002", { caller: "Garage" }, file.file, (res) => {
                if (res.code == 0) {
                    this.addStoreObj.businessImg = res.res.data[0].imageUrl;
                } else {
                    this.$message.error(res.res.msg);
                }
            })
        },
        async contractFn (file) {
            this.ajaxFile("1002", { caller: "Garage" }, file.file, (res) => {
                if (res.code == 0) {
                    this.addStoreObj.contractImg = res.res.data[0].imageUrl;
                } else {
                    this.$message.error(res.res.msg);
                }
            })
        },
        // 省市区
        handleCascaderChange () {
            this.cityParamObj = getCascaderObj(this.addStoreObj.regionValue, this.cityList);
            this.provinceCode = this.cityParamObj[0] ? this.cityParamObj[0].value : '';
            this.cityCode = this.cityParamObj[1] ? this.cityParamObj[1].value : '';
            this.areaCode = this.cityParamObj[2] ? this.cityParamObj[2].value : '';

            let province = this.cityParamObj[0] ? this.cityParamObj[0].label : '';
            let city = this.cityParamObj[1] ? this.cityParamObj[1].label : '';
            let block = this.cityParamObj[2] ? this.cityParamObj[2].label : '';
            this.location = province + ' ' + city + ' ' + block;
        },
        faceIDCardsImgListRemove (file) {
            this.faceIDCardsImgList = [];
        },
        backIDCardsImgListRemove () {
            this.backIDCardsImgList = [];
        },
        garageImgListRemove () {
            this.garageImgList = [];
        },
        businessImgListRemove () {
            this.businessImgList = [];
        },
        contractImgListRemove () {
            this.contractImgList = [];
        },
        // 图片放大
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
    },
}
</script>

<style scoped lang="less">
.main {
    padding-left: 20px;
    padding-bottom: 200px;
}
.comInfo-top {
    p {
        text-align: left;
        margin-top: 25px;
        margin-bottom: 20px;
    }
}
.card_id_list {
    display: flex;
    .card_id_front {
        width: 520px;
        text-align: left;
        p {
            margin-bottom: 10px;
        }
    }
    .card_id_back {
        text-align: left;
        width: 520px;
        p {
            margin-bottom: 10px;
        }
    }
    /deep/ .el-upload {
        width: 100px;
        height: 100px;
        line-height: 100px;
    }
}

.moreFloor {
    // margin-left: 55px;
    margin-top: 20px;
}
._second {
    padding-left: 50px;
}
.floor {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    .label {
        width: 90px;
        text-align: right;
    }
}
.inline {
    width: 520px;
}
.footer {
    width: 1040px;
    padding-top: 120px;
    /deep/ .el-button {
        width: 200px;
        font-size: 16px;
    }
}
._noMargin {
    /deep/ .el-form-item {
        margin-bottom: 0;
    }
}
</style>
