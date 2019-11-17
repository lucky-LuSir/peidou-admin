<template>
    <div class="root">
        <!-- <Header :headerInfo="headerInfo"></Header> -->
        <div class="com-header clearfix">
            <h2>{{headerInfo}}</h2>
        </div>
        <div class="main">
            <div class="shenheBox" v-if="ownState != 1">
                <div class="ideas">
                    审核意见：{{addStoreObj.remark}}
                </div>
                <div class="floorBox">
                    <div v-for="(item, index) in exsObj" class="floors" :key="index">
                        <div v-if="item.ApprovalState == 1" >
                            <span style="margin-right: 15px; width: 100px; display: inline-block;">初审：{{item.UserName}}</span>
                            <span>审核时间：{{item.RDate}}</span>
                        </div>
                        <div v-if="item.ApprovalState == 2">
                            <span style="margin-right: 15px; width: 100px; display: inline-block;">复核：陈元新</span>
                            <span>复核时间：2019-9-26 10:10:10</span>
                        </div>
                    </div>

                </div>
            </div>
            <el-form :inline="true" :model="addStoreObj" :rules="rules" ref="ruleForm">
                <div class="common">
                    <div class="comInfo-top">
                        <h2>门店负责人信息</h2>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="门店负责人姓名：" prop="garageOwnerName">
                                <el-input size="small" placeholder="门店负责人姓名" v-model="addStoreObj.garageOwnerName"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="门店负责人手机号：" prop="garageOwnerPhone">
                                <el-input size="small" placeholder="门店负责人手机号" v-model="addStoreObj.garageOwnerPhone"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div class="common clearfix">
                    <div class="comInfo-top">
                        <h2>法人信息</h2>
                        <p>身份证照片：</p>
                    </div>
                    <div class="card_id_list">
                        <div class="card_id_front">
                            <p>正面：</p>
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
                            <p>反面：</p>
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
                            <el-form-item label="法人姓名：" prop="legalPerson">
                                <el-input style="width: 170px;" size="small" placeholder="营业执照法人姓名" v-model="addStoreObj.legalPerson"></el-input>
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
                            <el-form-item label="法人手机号：" prop="legalPhone">
                                <el-input style="width: 170px;" size="small" placeholder="法人手机号" v-model="addStoreObj.legalPhone"></el-input>
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
                            <el-form-item label="门店名称：" prop="garagrName">
                                <el-input size="small" placeholder="门店名称" v-model="addStoreObj.garagrName"></el-input>
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
                    <div class="comInfo-content" style="margin-left: 8px;">
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
                            <el-form-item label="合同编号：" prop="contractCode">
                                <el-input size="small" placeholder="合同编号" v-model="addStoreObj.contractCode"></el-input>
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
                            <el-form-item label="授信额度：" prop="amount">
                                <el-input size="small" placeholder="授信额度" v-model="addStoreObj.amount"></el-input>
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
                    <el-button v-if="ownState != 3 && ownState != 4 &&  ownState != 2" style="width: 100px;  margin-right: 40px;" type="danger" @click="editReject('ruleForm')" size="small">拒绝</el-button>
                    <el-button v-if="ownState != 3 && ownState != 4 && ownState != 1" style="width: 100px;  margin-right: 40px;" type="danger" @click="reject()" size="small">拒绝</el-button>
                    <el-button v-if="ownState == 1 || ownState == 4 && ownState != 3" type="primary" @click="submit('ruleForm')" size="small">提交并通过审核</el-button>
                    <el-button v-if="ownState == 2 && ownState != 3 && ownState != 4" type="primary" @click="secondFn('ruleForm')" size="small">通过二次审核</el-button>
                    <el-button v-if="ownState == 3" type="primary" @click="backFn('ruleForm')" size="small">返回门店列表</el-button>
                    <el-button style="margin-left: 40px;" @click="editInfoFn('ruleForm')" size="small" type="info" plain>修改资料并提交</el-button>
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
    // components: {
    //     Header,
    // },
    data () {
        return {
            exsObj: [],
            ownState: '', // 1 申请中 2 待复核  3 审核通过  4 审核不通过
            stateObj: {},
            headerInfo: '编辑门店信息',
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            regionList: [],
            imgParam: {
                parentCode: "0"
            },
            headers: {},
            addStoreObj: {
                garageOwnerName: '', // 门店负责人姓名
                garageOwnerPhone: '', // 门店负责人手机号
                legalPerson: '', // 法人姓名
                legalPhone: '', // 法人手机号
                companyName: '', //公司名称
                garagrName: '', // 门店名称
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
                contractCode: '', // 合同编号
                amount: '', // 额度
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
            rules: {
                garageOwnerName: [
                    { required: true, message: '请输入门店负责人姓名', trigger: 'blur' },
                ],
                garageOwnerPhone: [
                    { required: true, message: '请输入门店负责人手机号', trigger: 'blur' },
                    {
                        pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                        message: '手机号格式不对',
                        trigger: 'blur'
                    }
                ],
                legalPerson: [
                    { required: true, message: '请输入法人姓名', trigger: 'blur' },
                ],
                legalPhone: [
                    { required: true, message: '请输入法人手机号', trigger: 'blur' },
                    {
                        pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                        message: '手机号格式不对',
                        trigger: 'blur'
                    }
                ],
                companyName: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                ],
                garagrName: [
                    { required: true, message: '请输入门店名称', trigger: 'blur' },
                ],
                creditCode: [
                    { required: true, message: '请输入信用代码', trigger: 'blur' },
                ],
                receiveAddress: [
                    { required: true, message: '请输入收货地址', trigger: 'blur' },
                ],
                registerAddress: [
                    { required: true, message: '请输入注册地址', trigger: 'blur' },
                ],
                openBankSub: [
                    { required: true, message: '请输入开户行', trigger: 'blur' },
                ],
                // regionValue: [
                //     { required: true, message: '请输入省市区', trigger: 'change' },
                // ],
                openBankNum: [
                    { required: true, message: '请输入开户银行卡号', trigger: 'blur' },
                ],
                openBankName: [
                    { required: true, message: '请输入企业名称', trigger: 'blur' },
                ],
                cooperateTime: [
                    { required: true, message: '请输入合作时限', trigger: 'blur' },
                ],
                contractCode: [
                    { required: true, message: '请输入合同编号', trigger: 'blur' },
                ],
                amount: [
                    { required: true, message: '请输入额度', trigger: 'blur' },
                ],
                idCardsCode: [
                    { required: true, message: '请输入身份证号码', trigger: 'blur' },
                    {
                        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                        message: '证件号码格式有误！',
                        trigger: 'blur'
                    }
                ],
                remark: [
                    { required: true, message: '请输入审核意见', trigger: 'blur' },
                ]
            },
            paramObj: {},
            cityList: [],
            province: [],
            city: [],
            block: [],
            cityCode: "",
            areaCode: "",
            provinceCode: "",
            cityParamObj: [],
            location: "",
            props: {},
            GarageID: '',
            faceIDCardsImgList: [], // 正面照
            backIDCardsImgList: [], // 反面找
            garageImgList: [], // 门头照
            businessImgList: [], // 营业执照
            contractImgList: [], // 协议合同
        }
    },
    created () {

        let token = window.sessionStorage.getItem("gn_request_token");
        let storeInfoTypeObj = JSON.parse(window.sessionStorage.getItem("storeInfoTypeObj"));

        this.GarageID = storeInfoTypeObj.GarageID

        this.stateObj = storeInfoTypeObj.stateObj;
        this.isNotAddStore = true;
        let paramObj = {
            Token: token,
            GarageID: storeInfoTypeObj.GarageID
        }
        this.paramObj = paramObj;
        if (storeInfoTypeObj.stateObj.approvalState == '1' && storeInfoTypeObj.stateObj.reviewState == '0') {
            this.ownState = 1;
            this.headerInfo = "编辑门店信息 (待审核)"
        }
        if (storeInfoTypeObj.stateObj.approvalState == '1' && storeInfoTypeObj.stateObj.reviewState == '1') {
            this.ownState = 2;
            this.headerInfo = "编辑门店信息 (待复核)"
        }
        if (storeInfoTypeObj.stateObj.approvalState == '2') {
            this.ownState = 3;
            this.headerInfo = "编辑门店信息 (申请通过)"
        }
        if (storeInfoTypeObj.stateObj.approvalState == '3') {
            this.ownState = 4;
            this.headerInfo = "编辑门店信息 (申请不通过)"
        }

        this.getDetailData();
        this.getCityListFn();

    },
    methods: {
        // 编辑修改
        async editInfoFn (ruleForm) {
            console.log(this.addStoreObj.regionValue);
            
            this.$refs[ruleForm].validate(async (valid) => {
                if (valid) {

                    if (!this.addStoreObj.regionValue) {
                        this.$message({
                            type: "success",
                            message: '请输入所在区域'
                        })
                        return;
                    }
                    if (!this.addStoreObj.faceIDCardsImg || !this.addStoreObj.backIDCardsImg || !this.addStoreObj.businessImg) {
                        this.$message({
                            type: "error",
                            message: '图片必须上传, 请上传图片!'
                        })
                        return;
                    }
                    let token = window.sessionStorage.getItem("gn_request_token");
                    this.GarageInfo = {
                        GarageOwnerName: this.addStoreObj.garageOwnerName,
                        GarageOwnerPhone: this.addStoreObj.garageOwnerPhone,
                        faceIDCardsImg: this.addStoreObj.faceIDCardsImg,
                        backIDCardsImg: this.addStoreObj.backIDCardsImg,
                        businessImg: this.addStoreObj.businessImg,
                        garageImg: this.addStoreObj.garageImg,
                        approvalState: 1,
                        remark: this.addStoreObj.remark,
                        GarageID: this.GarageID
                    }

                    this.GarageDetail = {
                        legalPerson: this.addStoreObj.legalPerson,
                        legalPhone: this.addStoreObj.legalPhone,
                        companyName: this.addStoreObj.companyName,
                        garagrName: this.addStoreObj.garagrName,
                        creditCode: this.addStoreObj.creditCode,
                        contractStartTime: this.addStoreObj.cooperateTime[0],
                        contractEndTime: this.addStoreObj.cooperateTime[1],
                        contractCode: this.addStoreObj.contractCode,
                        contractImg: this.addStoreObj.contractImg,
                        amount: this.addStoreObj.amount, // 额度
                        idCardsCode: this.addStoreObj.idCardsCode
                    }
                    this.GarageAccount = [
                        {
                            bankType: 1,
                            openingBank: this.addStoreObj.openBankSub,
                            accountCode: this.addStoreObj.openBankNum,
                            accountName: this.addStoreObj.openBankName,
                            AccountID: this.addStoreObj.openIDs
                        },
                        {
                            bankType: 2,
                            accountName: this.addStoreObj.alipayName,
                            accountCode: this.addStoreObj.alipayNum,
                            AccountID: this.addStoreObj.alipayIDs
                        },
                        {
                            bankType: 3,
                            accountName: this.addStoreObj.weChatName,
                            accountCode: this.addStoreObj.weChatNum,
                            AccountID: this.addStoreObj.weChatIDs
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
                            addrType: 1,
                            id: this.addStoreObj.registerID
                        },
                        {
                            provinceCode: this.provinceCode,
                            cityCode: this.cityCode,
                            areaCode: this.areaCode,
                            address: this.addStoreObj.receiveAddress,
                            location: this.location,
                            addrType: 2,
                            id: this.addStoreObj.receiveID
                        }
                    ]
                    let paramObj = {
                        Token: token,
                        GarageAccount: this.GarageAccount,
                        GarageAddress: this.GarageAddress,
                        GarageDetail: this.GarageDetail,
                        GarageInfo: this.GarageInfo,
                    }
                    console.log(paramObj);
                    
                    console.log(paramObj);

                    const res = await this.postData("A1018", paramObj);
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
                }
            })
        },
        // 编辑拒绝
        async editReject (ruleForm) {
            let token = window.sessionStorage.getItem("gn_request_token");
            this.GarageInfo = {
                GarageOwnerName: this.addStoreObj.garageOwnerName,
                GarageOwnerPhone: this.addStoreObj.garageOwnerPhone,
                faceIDCardsImg: this.addStoreObj.faceIDCardsImg,
                backIDCardsImg: this.addStoreObj.backIDCardsImg,
                businessImg: this.addStoreObj.businessImg,
                garageImg: this.addStoreObj.garageImg,
                approvalState: 3,
                remark: this.addStoreObj.remark,
                GarageID: this.GarageID
            }

            this.GarageDetail = {
                legalPerson: this.addStoreObj.legalPerson,
                legalPhone: this.addStoreObj.legalPhone,
                companyName: this.addStoreObj.companyName,
                garagrName: this.addStoreObj.garagrName,
                creditCode: this.addStoreObj.creditCode,
                contractStartTime: this.addStoreObj.cooperateTime[0],
                contractEndTime: this.addStoreObj.cooperateTime[1],
                contractCode: this.addStoreObj.contractCode,
                contractImg: this.addStoreObj.contractImg,
                amount: this.addStoreObj.amount, // 额度
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
                    addrType: 1,
                    id: this.addStoreObj.registerID
                },
                {
                    provinceCode: this.provinceCode,
                    cityCode: this.cityCode,
                    areaCode: this.areaCode,
                    address: this.addStoreObj.receiveAddress,
                    location: this.location,
                    addrType: 2,
                    id: this.addStoreObj.receiveID
                }
            ]
            let paramObj = {
                Token: token,
                GarageAccount: this.GarageAccount,
                GarageAddress: this.GarageAddress,
                GarageDetail: this.GarageDetail,
                GarageInfo: this.GarageInfo,
            }
            console.log(paramObj);

            const res = await this.postData("A1018", paramObj);
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

            console.log(this.addStoreObj);
        },
        clickTable (row, index, e) {
            console.log(1111);

            this.$refs.refTable.toggleRowExpansion(row)
        },
        // 返回门店列表
        backFn () {
            let data = {
                menuName: '门店管理',
                item: 'storeList',
            };
            this.$emit('backParam', data);
        },
        // 二次审核
        async secondFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                GarageInfo: {
                    GarageID: this.GarageID,
                    ApprovalState: 2,
                    Remark: this.addStoreObj.remark,
                }
            }
            const res = await this.postData("A1019", paramObj);
            console.log(res);
            if (res.code == '0') {
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
        },
        // 二次审核拒绝
        async reject () {
            let token = window.sessionStorage.getItem("gn_request_token");
            this.GarageInfo = {
                approvalState: 3,
                GarageID: this.GarageID,
                Remark: this.addStoreObj.remark
            }
            let paramObj = {
                Token: token,
                GarageInfo: this.GarageInfo,
            }
            const res = await this.postData("A1019", paramObj);
            if (res.code == '0') {
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
        },
        // 获取详情信息
        async getDetailData () {

            const res = await this.postData("A1017", this.paramObj);
            console.log(res);

            let result = res.res.data;
            let newObj = {};

            // 地址类
            console.log(result);

            let addressArr = result.garageAddress;

            let addressObj = {
                receiveAddress: addressArr[1] ? addressArr[1].address : '',
                receiveID: addressArr[1] ? addressArr[1].id : '',
                registerID: addressArr[0] ? addressArr[0].id : '',
                registerAddress: addressArr[0] ? addressArr[0].address : ''
            }

            this.provinceCode = addressArr[0] ? addressArr[0].provinceCode : '';
            this.cityCode = addressArr[0] ? addressArr[0].cityCode : '';
            this.areaCode = addressArr[0] ? addressArr[0].areaCode : '';


            let accountArr = result.garageAccount;

            let accountObj = {
                openIDs: accountArr[0] ? accountArr[0].accountID : '',
                openBankSub: accountArr[0] ? accountArr[0].openingBank : '',
                openBankNum: accountArr[0] ? accountArr[0].accountCode : '',
                openBankName: accountArr[0] ? accountArr[0].accountName : '',
                alipayName: accountArr[1] ? accountArr[1].accountName : '',
                alipayIDs: accountArr[1] ? accountArr[1].accountID : '',
                alipayNum: accountArr[1] ? accountArr[1].accountCode : '',
                weChatName: accountArr[2] ? accountArr[2].accountName : '',
                weChatNum: accountArr[2] ? accountArr[2].accountCode : '',
                weChatIDs: accountArr[2] ? accountArr[2].accountID : '',
                cooperateTime: [result.garageDetail.contractStartTime, result.garageDetail.contractEndTime]
            }

            Object.assign(newObj, result.garageDetail, result.garageInfo, addressObj, accountObj);

            this.addStoreObj = newObj;
            console.log(addressArr);
            
            if (addressArr.length > 0) {
                console.log(3);
                this.addStoreObj.regionValue = [String(addressArr[0] ? addressArr[0].provinceCode : ''), String(addressArr[0] ? addressArr[0].cityCode : ''), String(addressArr[0] ? addressArr[0].areaCode : '')]
                this.location = addressArr[0].location;
            } else {
                this.addStoreObj.regionValue = "";
                this.location = "";
            }

            if (this.addStoreObj.faceIDCardsImg) {
                this.faceIDCardsImgList = [
                    {
                        url: this.addStoreObj.faceIDCardsImg,
                        name: "faceIDCardsImg"
                    }
                ]
            }

            if (this.addStoreObj.backIDCardsImg) {
                this.backIDCardsImgList = [
                    {
                        url: this.addStoreObj.backIDCardsImg,
                        name: "backIDCardsImg"
                    }
                ]
            }

            if (this.addStoreObj.garageImg) {
                this.garageImgList = [
                    {
                        url: this.addStoreObj.garageImg,
                        name: "garageImg"
                    }
                ]
            }

            if (this.addStoreObj.businessImg) {
                this.businessImgList = [
                    {
                        url: this.addStoreObj.businessImg,
                        name: "businessImg"
                    }
                ]
            }
            if (this.addStoreObj.contractImg) {
                this.contractImgList = [
                    {
                        url: this.addStoreObj.contractImg,
                        name: "contractImg"
                    }
                ]
            }
            console.log(this.addStoreObj);
            if (this.addStoreObj.reviewLog) {
                this.addStoreObj.reviewLog = JSON.parse(this.addStoreObj.reviewLog);
                console.log(this.addStoreObj.reviewLog);
                // ApprovalState
                this.exsObj = this.addStoreObj.reviewLog
            }

        },
        // 获取城市列表
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
        // 提交
        async submit (ruleForm) {
            this.$refs[ruleForm].validate(async (valid) => {
                if (valid) {
                    if (!this.addStoreObj.regionValue) {
                        this.$message({
                            type: "success",
                            message: '请输入所在区域'
                        })
                        return;
                    }
                    if (!this.addStoreObj.faceIDCardsImg || !this.addStoreObj.backIDCardsImg || !this.addStoreObj.businessImg) {
                        this.$message({
                            type: "error",
                            message: '图片必须上传, 请上传图片!'
                        })
                        return;
                    }
                    let token = window.sessionStorage.getItem("gn_request_token");
                    this.GarageInfo = {
                        GarageOwnerName: this.addStoreObj.garageOwnerName,
                        GarageOwnerPhone: this.addStoreObj.garageOwnerPhone,
                        faceIDCardsImg: this.addStoreObj.faceIDCardsImg,
                        backIDCardsImg: this.addStoreObj.backIDCardsImg,
                        businessImg: this.addStoreObj.businessImg,
                        garageImg: this.addStoreObj.garageImg,
                        approvalState: 1,
                        remark: this.addStoreObj.remark,
                        GarageID: this.GarageID
                    }

                    this.GarageDetail = {
                        legalPerson: this.addStoreObj.legalPerson,
                        legalPhone: this.addStoreObj.legalPhone,
                        companyName: this.addStoreObj.companyName,
                        garagrName: this.addStoreObj.garagrName,
                        creditCode: this.addStoreObj.creditCode,
                        contractStartTime: this.addStoreObj.cooperateTime[0],
                        contractEndTime: this.addStoreObj.cooperateTime[1],
                        contractCode: this.addStoreObj.contractCode,
                        contractImg: this.addStoreObj.contractImg,
                        amount: this.addStoreObj.amount, // 额度
                        idCardsCode: this.addStoreObj.idCardsCode
                    }
                    this.GarageAccount = [
                        {
                            bankType: 1,
                            openingBank: this.addStoreObj.openBankSub,
                            accountCode: this.addStoreObj.openBankNum,
                            accountName: this.addStoreObj.openBankName,
                            AccountID: this.addStoreObj.openIDs
                        },
                        {
                            bankType: 2,
                            accountName: this.addStoreObj.alipayName,
                            accountCode: this.addStoreObj.alipayNum,
                            AccountID: this.addStoreObj.alipayIDs
                        },
                        {
                            bankType: 3,
                            accountName: this.addStoreObj.weChatName,
                            accountCode: this.addStoreObj.weChatNum,
                            AccountID: this.addStoreObj.weChatIDs
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
                            addrType: 1,
                            id: this.addStoreObj.registerID
                        },
                        {
                            provinceCode: this.provinceCode,
                            cityCode: this.cityCode,
                            areaCode: this.areaCode,
                            address: this.addStoreObj.receiveAddress,
                            location: this.location,
                            addrType: 2,
                            id: this.addStoreObj.receiveID
                        }
                    ]
                    let paramObj = {
                        Token: token,
                        GarageAccount: this.GarageAccount,
                        GarageAddress: this.GarageAddress,
                        GarageDetail: this.GarageDetail,
                        GarageInfo: this.GarageInfo,
                    }
                    console.log(paramObj);

                    const res = await this.postData("A1018", paramObj);
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
                }
            })
            console.log(this.addStoreObj);
        },
        // 修改省市区
        handleCascaderChange () {
            this.cityParamObj = getCascaderObj(this.addStoreObj.regionValue, this.cityList);
            if (this.cityParamObj.length > 0) {
                this.provinceCode = this.cityParamObj ? this.cityParamObj[0].value : '';
                this.cityCode = this.cityParamObj ? this.cityParamObj[1].value : '';
                this.areaCode = this.cityParamObj ? this.cityParamObj[2].value : '';

                let province = this.cityParamObj ? this.cityParamObj[0].label : '';
                let city = this.cityParamObj ? this.cityParamObj[1].label : '';
                let block = this.cityParamObj ? this.cityParamObj[2].label : '';
                this.location = province + ' ' + city + ' ' + block;
                console.log(this.location);
            } else {
            }
        },
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
        handleChange () {

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
        handlePictureCardPreview (file) {
            console.log(1234);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
    },
}
</script>

<style scoped lang="less">
.shenheBox {
    display: flex;
    margin-top: 20px;
    .ideas {
        width: 530px;
        text-align: left;
        color: #ff9999;
        font-size: 16px;
    }
    .floors {
        font-size: 14px;
        text-align: left;
    }
}

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
.com-header {
    display: flex;
}
</style>
