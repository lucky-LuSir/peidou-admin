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
                            <el-form-item label="法人姓名：" prop="LegalPerson">
                                <el-input size="small" placeholder="请输入法人姓名" v-model="addSupplierObj.LegalPerson"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="法人手机号：" prop="LegalPhone">
                                <el-input size="small" placeholder="请输入法人手机号" v-model="addSupplierObj.LegalPhone"></el-input>
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
                            <el-form-item label="公司名称：" prop="CompanyName">
                                <el-input size="small" placeholder="营业执照法人姓名" v-model="addSupplierObj.CompanyName"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="供应商名称：" prop="GaragrName">
                                <el-input size="small" placeholder="供应商名称" v-model="addSupplierObj.GaragrName"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="统一社会信用代码：" prop="CreditCode">
                                <el-input size="small" placeholder="营业执照注册号" v-model="addSupplierObj.CreditCode"></el-input>
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
                            <el-select @change="handleBrandSelect(addSupplierObj.BrandName)" size="small" multiple v-model="addSupplierObj.BrandName" filterable placeholder="请选择">
                                <el-option v-for="item in BrandNameList" :key="item.brandID" :label="item.brandName" :value="item.brandID">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <div class="tagBox" style="margin-left: 91px;">
                            <el-tag style="margin-right:5px;" :disable-transitions="false" @close="handleTagsClose(tag)" v-for="tag in tags" :key="tag">
                                {{tag}}
                            </el-tag>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="年销售额 (元) (选填)：" prop="Amount">
                                <el-input size="small" placeholder="供应商年销售额" v-model="addSupplierObj.Amount"></el-input>
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
                            <el-form-item label="经营年限 (选填)：" prop="BusinessDate">
                                <el-input size="small" placeholder="供应商经营年限" v-model="addSupplierObj.BusinessDate"></el-input>
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
                                <el-date-picker unlink-panels v-model="addSupplierObj.cooperateTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" size="small">
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
                <div class="footer">
                    <el-button type="primary" @click="submitFn('ruleForm')" size="small">提交</el-button>
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
            headerInfo: '添加供应商',
            addSupplierObj: {
                LegalPerson: '',
                LegalPhone: '',
                CompanyName: '',
                GaragrName: '',
                CreditCode: '',
                isOpen: '',
                regionValue: '',
                registerAddress: '',
                Amount: '',
                inventoryPool: '',
                BusinessDate: '',
                openBankSub: '',
                openBankNum: '',
                openBankName: '',
                alipayNum: '',
                alipayName: '',
                weChatNum: '',
                weChatName: '',
                cooperateTime: '',
                contractCode: '',
                BrandName: '',
                faceIDCardsImg: '', // 正面照
                backIDCardsImg: '', // 反面找
                garageImg: '', // 门头照
                businessImg: '', // 营业执照
                contractImg: '', // 协议合同
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
                LegalPerson: [
                    { required: true, message: '请输入法人姓名', trigger: 'blur' },
                ],
                LegalPhone: [
                    { required: true, message: '请输入法人手机号', trigger: 'blur' },
                    {
                        pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                        message: '手机号格式不对',
                        trigger: 'blur'
                    }
                ],
                CompanyName: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                ],
                GaragrName: [
                    { required: true, message: '请输入供应商名称', trigger: 'blur' },
                ],
                CreditCode: [
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
                // Amount: [
                //     { required: true, message: '请输入年销售额', trigger: 'blur' },
                // ],
                // inventoryPool: [
                //     { required: true, message: '请输入库存规模', trigger: 'blur' },
                // ],
                // BusinessDate: [
                //     { required: true, message: '请输入经营年限', trigger: 'blur' },
                // ],
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
                BrandName: [
                    { required: true, message: '请输入主营品牌', trigger: 'blur' },
                ]
            },
            BrandNameList: [],
            faceIDCardsImgList: [], // 正面照
            backIDCardsImgList: [], // 反面找
            garageImgList: [], // 门头照
            businessImgList: [], // 营业执照
            contractImgList: [], // 协议合同
            haveBrandNameList: [],
            tags: [],
        }
    },
    created () {
        this.getCityListFn();
        this.getBrandNameList();
    },
    methods: {
        handleBrandSelect (val) {
            let curList = val;
            let BrandNameList = this.BrandNameList;
            let newArr = [];
            for (let i = 0; i < BrandNameList.length; i++) {
                for (let j = 0; j < BrandNameList.length; j++) {
                    if (curList[j] == BrandNameList[i].brandID) {
                        newArr.push(
                            BrandNameList[i].brandName
                        )
                    }
                }
            }
            console.log(newArr);
            this.tags = newArr;
        },
        handleTagsClose (tag) {
            // this.tags.splice(this.tags.indexOf(tag), 1);
        },
        // 提交
        submitFn (ruleForm) {
            this.$refs[ruleForm].validate(async (valid) => {
                if (valid) {
                    if (!this.addSupplierObj.faceIDCardsImg || !this.addSupplierObj.backIDCardsImg || !this.addSupplierObj.garageImg || !this.addSupplierObj.businessImg || !this.addSupplierObj.contractImg) {
                        this.$message({
                            type: "error",
                            message: '图片必须上传, 请上传图片!'
                        })
                        return;
                    }
                    let token = window.sessionStorage.getItem("gn_request_token");

                    let curBrandArr = this.BrandNameList.filter((item, index) => item.brandID == this.addSupplierObj.BrandName)
                    let BrandArr = [];
                    let arr = this.addSupplierObj.BrandName;
                    for (let i = 0; i < arr.length; i++) {
                        let curBrandArr = this.BrandNameList.filter((item, index) => item.brandID == arr[i])
                        BrandArr.push(curBrandArr[0])
                    }

                    let detail = {
                        LegalPerson: this.addSupplierObj.LegalPerson, // 法人
                        LegalPhone: this.addSupplierObj.LegalPhone, // 法人手机号
                        CompanyName: this.addSupplierObj.CompanyName, //公司名
                        GaragrName: this.addSupplierObj.GaragrName, // 供应商名称
                        CreditCode: this.addSupplierObj.CreditCode, // 信用代码
                        ContractStartTime: this.addSupplierObj.cooperateTime[0], // 合同开始时间
                        ContractEndTime: this.addSupplierObj.cooperateTime[1], // 合同结束时间
                        contractCode: this.addSupplierObj.contractCode, // 合同编号
                        contractImg: this.addSupplierObj.contractImg, // 协议合同
                        Amount: this.addSupplierObj.Amount, // 年销售额
                        inventoryPool: this.addSupplierObj.inventoryPool, // 库存量
                        BusinessDate: this.addSupplierObj.BusinessDate, // 经营时间
                    }
                    let info = {
                        OwnerPhone: this.addSupplierObj.OwnerPhone, // 门店负责人手机号
                        OwnerName: this.addSupplierObj.OwnerName, // 门店负责人
                        businessImg: this.addSupplierObj.businessImg, // 营业执照
                        backIDCardsImg: this.addSupplierObj.backIDCardsImg, // 身份证反面
                        faceIDCardsImg: this.addSupplierObj.faceIDCardsImg, // 身份证正面
                        garageImg: this.addSupplierObj.garageImg, // 店面图片
                        isOpen: this.addSupplierObj.isOpen, // 启用状态
                    }
                    let Address = {
                        provinceCode: this.provinceCode,
                        cityCode: this.cityCode,
                        areaCode: this.areaCode,
                        address: this.addSupplierObj.registerAddress,
                        location: this.location,
                        addrType: 1
                    }
                    let Server = BrandArr
                    let SupAccount = [
                        {
                            bankType: 1,
                            openingBank: this.addSupplierObj.openBankSub,
                            accountCode: this.addSupplierObj.openBankNum,
                            accountName: this.addSupplierObj.openBankName
                        },
                        {
                            bankType: 2,
                            accountName: this.addSupplierObj.alipayName,
                            accountCode: this.addSupplierObj.alipayNum,
                        },
                        {
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
                    console.log(paramObj);
                    const res = await this.postData("A1025", paramObj);
                    console.log(res);
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
                    this.$message({
                        type: "error",
                        message: "请完善好信息!"
                    })
                    return;
                }
            })

        },
        // 获取品牌列表
        async getBrandNameList () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
            }

            const res = await this.postData("A1028", paramObj);
            console.log(res);
              
            this.BrandNameList = res.res.data.date;

        },
        // 获取详情信息
        async getDetailData () {

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
            this.provinceCode = this.cityParamObj[0].value
            this.cityCode = this.cityParamObj[1].value
            this.areaCode = this.cityParamObj[2].value

            let province = this.cityParamObj[0].label
            let city = this.cityParamObj[1].label
            let block = this.cityParamObj[2].label
            this.location = province + ' ' + city + ' ' + block;
        },
        async faceIDCardsFn (file) {
            this.ajaxFile("1002", { caller: "Garage" }, file.file, (res) => {
                if (res.code == 0) {
                    this.addSupplierObj.faceIDCardsImg = res.res.data[0].imageUrl;
                } else {
                    this.$message.error(res.res.msg);
                }
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

            let token = window.sessionStorage.getItem("gn_request_token");

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
        handleRemove (file) {
            console.log(5267);
        },
        handlePictureCardPreview (file) {
            console.log(1234);
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleDownload (file) {
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


