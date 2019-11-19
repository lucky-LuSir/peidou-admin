<template>
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="main">
            <el-form :inline="true" :model="addSupplierObj" :rules="rules" ref="ruleForm">
                <div class="common">
                    <div class="comInfo-top">
                        <h2>法人信息</h2>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="法人姓名：" prop="legalPerson">
                                <el-input size="small" placeholder="请输入法人姓名" v-model="addSupplierObj.legalPerson"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="法人手机号：" prop="legalPhone">
                                <el-input size="small" placeholder="请输入法人手机号" v-model="addSupplierObj.legalPhone"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div class="common clearfix">
                    <div class="comInfo-top">
                        <h2 style="margin-bottom: 15px;">法人身份证照片</h2>
                    </div>
                    <div class="card_id_list">
                        <div class="card_id_front">
                            <p>正面：</p>
                            <el-upload action="#" :limit="2" list-type="picture-card" :auto-upload="true" :file-list="faceIDCardsImgList" :http-request="faceIDCardsFn">
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
                </div>
                <div class="common clearfix">
                    <div class="comInfo-top">
                        <h2 style="margin-bottom: 25px;">供应商信息</h2>
                    </div>
                    <div class="card_id_list">
                        <div class="card_id_front">
                            <p>店面照片：</p>
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
                                <el-input size="small" placeholder="营业执照法人姓名" v-model="addSupplierObj.companyName"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="供应商名称：" prop="garagrName">
                                <el-input size="small" placeholder="供应商名称" v-model="addSupplierObj.garagrName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="统一社会信用代码：" prop="creditCode">
                                <el-input size="small" placeholder="营业执照注册号" v-model="addSupplierObj.creditCode"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="状态：" prop="isOpen">
                                <el-radio-group v-model="addSupplierObj.isOpen">
                                    <el-radio :label="1">启用</el-radio>
                                    <el-radio :label="0">关闭</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <el-form-item label="所在区域：" prop="regionValue">
                            <el-cascader separator=" " clearable class="cascaderRef" v-model="addSupplierObj.regionValue" :options="cityList" @change="handleCascaderChange" size="small" style="width: 740px;"></el-cascader>
                        </el-form-item>
                    </div>
                    <div class="comInfo-content">
                        <el-form-item label="注册地址：" prop="registerAddress">
                            <el-input style="width: 740px;" size="small" placeholder="详细地址" v-model="addSupplierObj.registerAddress"></el-input>
                        </el-form-item>
                    </div>
                    <div class="comInfo-content" style="display: block;">
                        <el-form-item label="主营品牌：" prop="BrandName">
                            <!-- <el-select @change="handleBrandSelect(addSupplierObj.BrandName)" size="small" multiple v-model="addSupplierObj.BrandName" filterable placeholder="请选择">
                                <el-option v-for="item in BrandNameList" :key="item.brandID" :label="item.brandName" :value="item.brandID">
                                </el-option>
                            </el-select> -->
                            <el-select size="small" v-model="addSupplierObj.BrandName" filterable placeholder="请选择">
                                <el-option v-for="item in BrandNameList" :key="item.brandID" :label="item.brandName" :value="item.brandID">
                                </el-option>
                            </el-select>
                            <el-button @click="addBrandFn()" style="margin-left: 5px;" size="small" type="success">添加</el-button>
                        </el-form-item>
                        <div class="tagBox" style="margin-left: 91px;">
                            <el-tag style="margin-right:5px;" :disable-transitions="false" @close="handleTagsClose(tag)" v-for="tag in tags" :key="tag" closable>
                                {{tag}}
                            </el-tag>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="年销售额 (元) (选填)：" prop="amount">
                                <el-input size="small" placeholder="供应商年销售额" v-model="addSupplierObj.amount"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="库存规模 (元) (选填)：" prop="inventoryPool">
                                <el-input size="small" placeholder="供应商库存量" v-model="addSupplierObj.inventoryPool"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="经营年限 (选填)：" prop="businessDate">
                                <el-input size="small" placeholder="供应商经营年限" v-model="addSupplierObj.businessDate"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div class="common">
                    <div class="comInfo-top">
                        <h2>收款账号</h2>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="开户行：" prop="openBankSub">
                                <el-input size="small" placeholder="开户银行支行" v-model="addSupplierObj.openBankSub"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="账号：" prop="openBankNum">
                                <el-input size="small" placeholder="开户银行卡号" v-model="addSupplierObj.openBankNum"></el-input>
                            </el-form-item>
                        </div>

                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="企业名称：" prop="openBankName">
                                <el-input size="small" placeholder="企业名称" v-model="addSupplierObj.openBankName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="支付宝账号 (选填)：" prop="alipayNum">
                                <el-input size="small" placeholder="支付宝账号" v-model="addSupplierObj.alipayNum"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="支付宝账号姓名 (选填)：" prop="alipayName">
                                <el-input size="small" placeholder="支付宝账号姓名" v-model="addSupplierObj.alipayName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="微信账号 (选填)：" prop="weChatNum">
                                <el-input size="small" placeholder="微信账号" v-model="addSupplierObj.weChatNum"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="微信账号姓名 (选填)：" prop="weChatName">
                                <el-input size="small" placeholder="微信账号姓名" v-model="addSupplierObj.weChatName"></el-input>
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
                                <el-date-picker v-model="addSupplierObj.cooperateTime" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="合同编号：" prop="contractCode">
                                <el-input size="small" placeholder="合同编号" v-model="addSupplierObj.contractCode"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="card_id_list">
                        <div class="card_id_front">
                            <p style="margin-top: 25px;">协议合同：</p>
                            <el-upload action="#" :limit="1" list-type="picture-card" :auto-upload="true" :file-list="contractImgList" :http-request="contractFn">
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
                <div class="comInfo-content _noMargin">
                    <div class="inline" style="width: auto;">
                        <el-form-item label="审核意见：" prop="remark">
                            <el-input style="width: 500px;" type="textarea" :rows="3" placeholder="审核意见" v-model="addSupplierObj.remark">
                            </el-input>
                        </el-form-item>
                    </div>
                </div>
                <div class="footer" style="width: 1000px;">
                    <el-button v-if="ownState != 2 && ownState != 3" style="width: 100px;  margin-right: 40px;" type="danger" @click="reject()" size="small">拒绝</el-button>
                    <el-button v-if="ownState != 2 && ownState != 3" type="primary" @click="submitFn('ruleForm')" size="small">通过审核</el-button>
                    <el-button v-if="ownState == 2 || ownState == 3" type="success" @click="backFn('ruleForm')" plain size="small">返回门店列表</el-button>
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
    components: {
        Header,
    },
    data () {
        return {
            headerInfo: '修改供应商信息',
            addSupplierObj: {
                legalPerson: '',
                legalPhone: '',
                companyName: '',
                garagrName: '',
                creditCode: '',
                isOpen: '',
                regionValue: '',
                registerAddress: '',
                amount: '',
                inventoryPool: '',
                businessDate: '',
                openBankSub: '',
                openBankNum: '',
                openBankName: '',
                alipayNum: '',
                alipayName: '',
                weChatNum: '',
                weChatName: '',
                cooperateTime: '',
                contractCode: '',
                brandName: '',
                faceIDCardsImg: '', // 正面照
                backIDCardsImg: '', // 反面找
                garageImg: '', // 门头照
                businessImg: '', // 营业执照
                contractImg: '', // 协议合同
                remark: '', // 审核意见
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            cityList: [], // 省市区列表
            province: [], // 省份列表
            city: [], // 城市列表
            block: [], // 区域列表
            cityCode: "",
            areaCode: "",
            provinceCode: "",
            cityParamObj: [],
            location: "",
            props: {},
            rules: {
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
                    { required: true, message: '请输入供应商名称', trigger: 'blur' },
                ],
                creditCode: [
                    { required: true, message: '请输入信用代码', trigger: 'blur' },
                ],
                isOpen: [
                    { required: true, message: '请选择状态', trigger: 'blur' },
                ],
                regionValue: [
                    { required: true, message: '请选择所在区域', trigger: 'blur' },
                ],
                registerAddress: [
                    { required: true, message: '请输入注册地址', trigger: 'blur' },
                ],
                openBankSub: [
                    { required: true, message: '请输入开户行', trigger: 'blur' },
                ],
                openBankNum: [
                    { required: true, message: '请输入开户账号', trigger: 'blur' },
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
                brandName: [
                    { required: true, message: '请输入主营品牌', trigger: 'blur' },
                ],
                remark: [
                    { required: true, message: '请输入审核意见', trigger: 'blur' },
                ],
            },
            BrandNameList: [],
            supplierState: '',
            paramObj: {},
            supplierID: '',
            ownState: '',
            faceIDCardsImgList: [], // 正面照
            backIDCardsImgList: [], // 反面找
            garageImgList: [], // 门头照
            businessImgList: [], // 营业执照
            contractImgList: [], // 协议合同
            haveBrandNameList: [],
            tags: [],
            server: [],
        }
    },
    created () {
        let token = window.sessionStorage.getItem("gn_request_token");
        let supplierInfoTypeObj = JSON.parse(window.sessionStorage.getItem("supplierInfoTypeObj"));
        this.supplierID = supplierInfoTypeObj.supplierID
        this.supplierState = supplierInfoTypeObj.supplierState;
        this.paramObj = {
            Token: token,
            supplierID: this.supplierID
        }
        this.getBrandNameList();
        this.getDetailData();
        if (this.supplierState == '1') {
            this.ownState = 1;
            this.headerInfo = "编辑供应商信息 (待审核)"
        }
        if (this.supplierState == '2') {
            this.ownState = 2;
            this.headerInfo = "编辑供应商信息 (审核通过)"
        }
        if (this.supplierState == '3') {
            this.ownState = 3;
            this.headerInfo = "编辑供应商信息 (审核不通过)"
        }
        if (this.supplierState == '4') {
            this.ownState = 4;
            this.headerInfo = "编辑供应商信息 (待完善)"
        }
        this.getCityListFn();
    },
    methods: {
        // 添加品牌
        addBrandFn () {
            let curBrandName;
            for (let i = 0; i < this.BrandNameList.length; i++) {
                if (this.BrandNameList[i].brandID == this.addSupplierObj.BrandName) {
                    curBrandName = this.BrandNameList[i].brandName
                }
            }
            console.log(curBrandName);
            for (let i = 0; i < this.tags.length; i++) {
                if (this.tags[i] == curBrandName) {
                    this.$message({
                        type: "error",
                        message: "该品牌已存在"
                    })
                    return;
                }
            }
            this.tags.push(curBrandName);
            console.log(this.tags);
        },
        // 删除品牌
        async handleTagsClose (tag) {
            let brandInfoId;
            for (let i = 0; i < this.server.length; i++) {
                if (tag == this.server[i].brandName) {
                    brandInfoId = this.server[i].id
                }
            }
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                info: {
                    SupplierID: this.addSupplierObj.supplierID,
                    ID: brandInfoId
                }
            }
            const res = await this.postData("A1033", paramObj);
            if (res.code == '0') {
                this.$message({
                    type: "success",
                    message: "删除主营品牌成功"
                })
                this.tags.splice(this.tags.indexOf(tag), 1);
            }
        },
        // 返回门店列表
        backFn () {
            let data = {
                menuName: '供应商管理',
                item: 'supplierList',
            };
            this.$emit('backParam', data);
        },
        // 修改资料
        editInfoFn (ruleForm) {
            this.$refs[ruleForm].validate(async (valid) => {
                if (valid) {
                    console.log(this.addSupplierObj.faceIDCardsImg);
                    console.log(this.addSupplierObj.backIDCardsImg);
                    console.log(this.addSupplierObj.garageImg);
                    console.log(this.addSupplierObj.businessImg);
                    console.log(this.addSupplierObj.contractImg);
                    
                    if (!this.addSupplierObj.faceIDCardsImg || !this.addSupplierObj.backIDCardsImg || !this.addSupplierObj.garageImg || !this.addSupplierObj.businessImg || !this.addSupplierObj.contractImg) {
                        this.$message({
                            type: "error",
                            message: '图片必须上传, 请上传图片!'
                        })
                        return;
                    }
                    let token = window.sessionStorage.getItem("gn_request_token");

                    let brandNewArr = [];
                    for (let i = 0; i < this.BrandNameList.length; i++) {
                        for (let j = 0; j < this.tags.length; j++) {
                            if (this.BrandNameList[i].brandName == this.tags[j]) {
                                brandNewArr.push({
                                    brandName: this.BrandNameList[i].brandName,
                                    brandID: this.BrandNameList[i].brandID
                                })
                            }
                        }
                    }
                    let detail = {
                        LegalPerson: this.addSupplierObj.legalPerson, // 法人
                        LegalPhone: this.addSupplierObj.legalPhone, // 法人手机号
                        CompanyName: this.addSupplierObj.companyName, //公司名
                        GaragrName: this.addSupplierObj.garagrName, // 供应商名称
                        CreditCode: this.addSupplierObj.creditCode, // 信用代码
                        ContractStartTime: this.addSupplierObj.cooperateTime[0], // 合同开始时间
                        ContractEndTime: this.addSupplierObj.cooperateTime[1], // 合同结束时间
                        contractCode: this.addSupplierObj.contractCode, // 合同编号
                        contractImg: this.addSupplierObj.contractImg, // 协议合同
                        Amount: this.addSupplierObj.amount, // 年销售额
                        inventoryPool: this.addSupplierObj.inventoryPool, // 库存量
                        BusinessDate: this.addSupplierObj.businessDate, // 经营时间
                    }
                    let info = {
                        OwnerPhone: this.addSupplierObj.ownerPhone, // 门店负责人手机号
                        OwnerName: this.addSupplierObj.ownerName, // 门店负责人
                        businessImg: this.addSupplierObj.businessImg, // 营业执照
                        backIDCardsImg: this.addSupplierObj.backIDCardsImg, // 身份证反面
                        faceIDCardsImg: this.addSupplierObj.faceIDCardsImg, // 身份证正面
                        garageImg: this.addSupplierObj.garageImg, // 店面图片
                        isOpen: this.addSupplierObj.isOpen, // 启用状态
                        SupplierID: this.addSupplierObj.supplierID,
                        SupplierState: 1,
                    }
                    let Address = {
                        provinceCode: this.provinceCode,
                        cityCode: this.cityCode,
                        areaCode: this.areaCode,
                        address: this.addSupplierObj.registerAddress,
                        location: this.location,
                        addrType: 1
                    }
                    let Server = brandNewArr;
                    let SupAccount = [
                        {
                            AccountID: this.addSupplierObj.bankId,
                            bankType: 1,
                            openingBank: this.addSupplierObj.openBankSub,
                            accountCode: this.addSupplierObj.openBankNum,
                            accountName: this.addSupplierObj.openBankName
                        },
                        {
                            AccountID: this.addSupplierObj.aliPayId,
                            bankType: 2,
                            accountName: this.addSupplierObj.alipayName,
                            accountCode: this.addSupplierObj.alipayNum,
                        },
                        {
                            AccountID: this.addSupplierObj.weChatId,
                            bankType: 3,
                            accountName: this.addSupplierObj.weChatName,
                            accountCode: this.addSupplierObj.weChatNum,
                        },
                    ]
                    let paramObj = {
                        Token: token,
                        detail: detail,
                        info: info,
                        Address: Address,
                        Server: Server,
                        SupAccount: SupAccount
                    }
                    const res = await this.postData("A1031", paramObj);
                    if (res.code == '0') {
                        this.$message({
                            type: 'success',
                            message: res.res.msg
                        })
                        let data = {
                            menuName: '供应商管理',
                            item: 'supplierList',
                        };
                        this.$emit('backParam', data);
                    }

                } else {
                }
            })
        },
        // 拒绝
        async reject () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                info: {
                    SupplierID: this.addSupplierObj.supplierID,
                    SupplierState: 3,
                    Remark: this.addSupplierObj.remark,
                }
            }
            const res = await this.postData("A1027", paramObj);

            if (res.code == '0') {
                this.$message({
                    type: 'success',
                    message: res.res.msg
                })
                let data = {
                    menuName: '供应商管理',
                    item: 'supplierList',
                };
                this.$emit('backParam', data);
            }
        },
        // 通过
        async submitFn (ruleForm) {

            this.$refs[ruleForm].validate(async (valid) => {
                if (valid) {

                    let token = window.sessionStorage.getItem("gn_request_token");
                    let paramObj = {
                        Token: token,
                        info: {
                            SupplierID: this.addSupplierObj.supplierID,
                            SupplierState: 2,
                            Remark: this.addSupplierObj.remark,
                        }
                    }
                    const res = await this.postData("A1027", paramObj);
                    if (res.code == '0') {
                        this.$message({
                            type: 'success',
                            message: res.res.msg
                        })
                        let data = {
                            menuName: '供应商管理',
                            item: 'supplierList',
                        };
                        this.$emit('backParam', data);
                    }
                }
            })
        },
        // 查询品牌
        async getBrandNameList () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
            }
            const res = await this.postData("A1028", paramObj);
            this.BrandNameList = res.res.data.date;
        },
        // 获取详情信息
        async getDetailData () {
            const res = await this.postData("A1032", this.paramObj);
            let result = res.res.data;
            console.log(result);

            let newObj = {};

            // 地址类
            let addressArr = result.address;

            let addressObj = {
                registerAddress: addressArr.address,
                addressId: addressArr.id
            }

            let server = result.server;

            for (let i = 0; i < server.length; i++) {
                this.tags.push(server[i].brandName)
            }
            this.server = server;
            // let brandValue = [];
            // for (let i = 0; i < this.BrandNameList.length; i++) {
            //     for (let j = 0; j < this.tags.length; j++) {
            //         if (this.tags[j] == this.BrandNameList[i].brandName) {
            //             brandValue.push(this.BrandNameList[i].brandID)
            //         }
            //     }
            // }

            this.provinceCode = addressArr.provinceCode;
            this.cityCode = addressArr.cityCode;
            this.areaCode = addressArr.areaCode;
            this.location = addressArr.location;

            let supAccount = result.supAccount;

            let accountObj = {
                openBankSub: supAccount[0] ? supAccount[0].openingBank : '',
                bankId: supAccount[0] ? supAccount[0].accountID : '',
                openBankNum: supAccount[0] ? supAccount[0].accountCode : '',
                openBankName: supAccount[0] ? supAccount[0].accountName : '',
                alipayName: supAccount[1] ? supAccount[1].accountName : '',
                aliPayId: supAccount[1] ? supAccount[1].accountID : '',
                alipayNum: supAccount[1] ? supAccount[1].accountCode : '',
                weChatName: supAccount[2] ? supAccount[2].accountName : '',
                weChatNum: supAccount[2] ? supAccount[2].accountCode : '',
                weChatId: supAccount[2] ? supAccount[2].accountID : '',
                cooperateTime: [result.detail.contractStartTime, result.detail.contractEndTime],
            }

            Object.assign(newObj, result.detail, result.info, addressObj, accountObj, result.address);

            this.addSupplierObj = newObj;

            this.addSupplierObj.regionValue = [String(this.provinceCode), String(this.cityCode), String(this.areaCode)];

            // this.addSupplierObj.faceIDCardsImg
            console.log(this.addSupplierObj.faceIDCardsImg);


            if (this.addSupplierObj.faceIDCardsImg) {
                this.faceIDCardsImgList = [
                    {
                        url: this.addSupplierObj.faceIDCardsImg,
                        name: "faceIDCardsImg"
                    }
                ]
            }

            if (this.addSupplierObj.backIDCardsImg) {
                this.backIDCardsImgList = [
                    {
                        url: this.addSupplierObj.backIDCardsImg,
                        name: "backIDCardsImg"
                    }
                ]
            }

            if (this.addSupplierObj.garageImg) {
                this.garageImgList = [
                    {
                        url: this.addSupplierObj.garageImg,
                        name: "garageImg"
                    }
                ]
            }

            if (this.addSupplierObj.businessImg) {
                this.businessImgList = [
                    {
                        url: this.addSupplierObj.businessImg,
                        name: "businessImg"
                    }
                ]
            }
            if (this.addSupplierObj.contractImg) {
                this.contractImgList = [
                    {
                        url: this.addSupplierObj.contractImg,
                        name: "contractImg"
                    }
                ]
            }

            // this.addSupplierObj.BrandName = brandValue;

            console.log(this.addSupplierObj);

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
        handleCascaderChange () {
            this.cityParamObj = getCascaderObj(this.addSupplierObj.regionValue, this.cityList);
            if (!this.cityParamObj) {
                this.provinceCode = this.cityParamObj[0].value
                this.cityCode = this.cityParamObj[1].value
                this.areaCode = this.cityParamObj[2].value

                let province = this.cityParamObj[0].label
                let city = this.cityParamObj[1].label
                let block = this.cityParamObj[2].label
                this.location = province + ' ' + city + ' ' + block;
            }
        },
        // 身份证正面上传
        async faceIDCardsFn (file) {
            this.ajaxFile("1002", { caller: "Garage" }, file.file, (res) => {
                console.log(res);
                if (res.code == 0) {
                    this.addSupplierObj.faceIDCardsImg = res.res.data[0].imageUrl;
                } else {
                    this.$message.error(res.res.msg);
                }
                // console.log(this.addSupplierObj.faceIDCardsImg);
            })
        },
        async backIDCardsFn (file) {
            this.ajaxFile("1002", { caller: "Garage" }, file.file, (res) => {
                if (res.code == 0) {
                    this.addSupplierObj.backIDCardsImg = res.res.data[0].imageUrl;
                } else {
                    this.$message.error(res.res.msg);
                }
            })
        },
        async garageFn (file) {
            this.ajaxFile("1002", { caller: "Garage" }, file.file, (res) => {
                if (res.code == 0) {
                    this.addSupplierObj.garageImg = res.res.data[0].imageUrl;
                } else {
                    this.$message.error(res.res.msg);
                }
            })
        },
        async businessFn (file) {
            this.ajaxFile("1002", { caller: "Garage" }, file.file, (res) => {
                if (res.code == 0) {
                    this.addSupplierObj.businessImg = res.res.data[0].imageUrl;
                } else {
                    this.$message.error(res.res.msg);
                }
            })
        },
        async contractFn (file) {
            this.ajaxFile("1002", { caller: "Garage" }, file.file, (res) => {
                if (res.code == 0) {
                    this.addSupplierObj.contractImg = res.res.data[0].imageUrl;
                } else {
                    this.$message.error(res.res.msg);
                }
            })
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
        handleDownload (file) {
        },
        // faceIDCardsImgList: [], // 正面照
        // backIDCardsImgList: [], // 反面找
        // garageImgList: [], // 门头照
        // businessImgList: [], // 营业执照
        // contractImgList: [], // 协议合同
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

.tagList {
    border: 1px solid #ccc;
    padding: 5px;
}
</style>
