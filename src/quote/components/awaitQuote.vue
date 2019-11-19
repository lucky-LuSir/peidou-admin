<template>
    <!-- 待报价 -->
    <div class="root">
        <div class="header clearfix">
            <h2>询价信息
                <i class="status">待报价</i>
            </h2>
            <div class="parts-title">
                <span>配件清单</span>
            </div>
        </div>
        <el-form :model="quoteForm" :rules="rules" ref="ruleForm" label-width="100px" class="main clearfix">
            <div class="main-left">
                <div class="slide-wrapper">
                    <el-carousel :interval="5000" arrow="always">
                        <el-carousel-item v-for="(item, index) in picArrList" :key="index">
                            <h3>
                                <div style="border: 1px solid #dee1e6;">
                                    <viewer>
                                        <!-- <img :src="scope.row.firstObj.pictures" alt=""> -->
                                        <img :src="item" alt="">
                                    </viewer>
                                </div>
                            </h3>
                        </el-carousel-item>
                    </el-carousel>
                        <!-- this. -->
                </div>
                <div class="left-content">
                    <el-row style="margin-bottom: 16px;">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            询价编号: {{quoteForm.inquiryID}}
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            申请时间: {{quoteForm.createDateTime}}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item style="text-align: left; margin-left: -55px;" label="车型:" prop="maker">
                                <el-input class="VINCLASS" size="small" v-model="quoteForm.maker" placeholder="请输入车型"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <el-form-item style="text-align: left; margin-left: -55px;" label="VIN：" prop="vinCode">
                                <el-input class="VINCLASS VINCODES" size="small" v-model="quoteForm.vinCode" placeholder="请输入VIN"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 16px;">
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            询价门店: {{quoteForm.garagrName}}
                        </el-col>
                        <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                            <div class="quote-radio _width280">
                                <i class="_label14">结算方式：</i>
                                <el-radio v-model="quoteForm.isAccounts" label="1">挂账</el-radio>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="maxLh" :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
                            <el-form-item label="最后付款日期：" prop="expireDatetime">
                                <el-date-picker size="small" v-model="quoteForm.expireDatetime" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="maxLh" :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
                            <el-form-item label="物流名称：" prop="expressName">
                                <el-input v-model="quoteForm.expressName" size="small" placeholder="请输入物流名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col class="maxLh" :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
                            <el-form-item label="物流地址：" prop="addValue">
                                <!-- <el-autocomplete size="small" v-model="addValue" :fetch-suggestions="querySearch" placeholder="请输入收货地址" clearable></el-autocomplete> -->
                                <el-select size="small" filterable v-model="quoteForm.addValue" placeholder="请选择收货地址">
                                    <el-option v-for="item in addressList" :key="item.id" :label="item.address" :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-button @click="addAddrFn()" style="margin-left: 5px;" size="small" type="primary">新增地址</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row class="invoice">
                        <el-col style="padding-left: 20px;" class="maxLh" :xs="24" :sm="24" :md="12" :lg="24" :xl="24">
                            <el-form-item label="发票:" prop="invoiceType">
                                <el-radio-group v-model="quoteForm.invoiceType">
                                    <el-radio :label="1">无票</el-radio>
                                    <el-radio :label="2">普票</el-radio>
                                    <el-radio :label="3">专票</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <div class="main-right">
                <div class="supplier-select">
                    <!-- <span class="supplier-label"></span> -->
                    <el-form-item label="供应商：" prop="supplierID">
                        <el-select v-model="quoteForm.supplierID" size="small" filterable placeholder="请选择">
                            <el-option v-for="item in supplierList" :key="item.supplierID" :label="item.supplierName" :value="item.supplierID">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="supplier-list">
                    <el-table :data="tableData" @current-change="handleCurrentChange">
                        <el-table-column type="index" width="50" label="序号" prop="componentID">
                        </el-table-column>
                        <el-table-column prop="partName" label="配件名称" width="180">
                            <template slot-scope="scope">
                                <el-input size="small" v-model="scope.row.partName" placeholder="请输入内容"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="oeCode" label="OE编号" width="180">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.oeCode" placeholder="请输入配件编号" size="small"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="quantity" label="数量" width="120">
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.quantity" size="small" controls-position="right" @change="handleChange" :min="1" :max="100"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column prop="specification" label="品质" width="120">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.specification" size="small" placeholder="请选择">
                                    <el-option v-for="item in specificationList" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="报价" width="240">
                            <template slot-scope="scope">
                                <div class="quoted-price">
                                    <div class="left">
                                        <span>单价: ¥</span>
                                        <el-input v-model="scope.row.price" size="small"></el-input>
                                    </div>
                                    <div class="right">
                                        <i>¥ {{ scope.row.quantity * scope.row.price }}</i>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="servicePrice" label="退货费率" width="120">
                            <template slot-scope="scope">
                                <el-select v-model="scope.row.servicePrice" size="small" placeholder="退货费率">
                                    <el-option v-for="item in servicePriceList" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="deleteRow(scope.$index, tableData)" type="text" size="small">
                                    移除
                                </el-button>
                                <el-button @click.native.prevent="addRow(scope.$index, tableData)" type="text" size="small">
                                    添加
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="table-summary">
                        <div class="summary-num">
                            共 {{totalNums}} 件
                        </div>
                        <div class="summary-price">
                            合计: {{ totalPrice }}
                        </div>
                    </div>
                </div>
                <el-form-item>
                    <div class="btn-list">
                        <el-button @click="cancelFn()" plain size="small">取消询价</el-button>
                        <el-button type="primary" size="small" @click="storageFn()">暂存配件清单</el-button>
                        <el-button @click="submitFn('ruleForm')" type="primary" size="small">发布报价</el-button>
                    </div>
                </el-form-item>
            </div>
        </el-form>
        <el-dialog title="新增收货地址" width="500px" :visible.sync="dialogFormVisible">
            <el-form :inline="true" :model="addAddressObj" :rules="rules" ref="addAddressObj" class="addAddressObj">
                <el-form-item label="收货地址：" prop="name">
                    <el-input size="small" v-model="addAddressObj.addName"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="addAddressFn()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            supplierList: [],
            quoteForm: {
                maker: '', // 车型
                vinCode: '', // VIN
                expireDatetime: '', //最后付款日期
                supplierID: '',
                invoiceType: 1, // 发票类型
                AddrID: '', // 物流ID
                expressName: '',
                addValue: '',
            },
            addAddressObj: {
                addName: "",
            },
            dialogFormVisible: false,
            rules: {
                maker: [
                    { required: true, message: '请输入车型', trigger: 'change' },
                ],
                vinCode: [
                    { required: true, message: '请输入VIN码', trigger: 'change' },
                    {
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{17}$/,
                        message: 'VIN码必须17位字母和数字',
                        trigger: 'change'
                    }
                ],
                expireDatetime: [
                    { required: true, message: '请输入最后付款日期', trigger: 'change' },
                ],
                expressName: [
                    { required: true, message: '请输入物流名称', trigger: 'change' },
                ],
                supplierID: [
                    { required: true, message: '请输入供应商', trigger: 'change' },
                ],
                addValue: [
                    { required: true, message: '请输入物流地址', trigger: 'blur' },
                ],
                invoiceType: [
                    { required: true, message: '请选择发票类型', trigger: 'change' },
                ],
            },
            tableData: [
                {
                    componentID: '',
                    partName: '',
                    quantity: 1,
                    oeCode: '',
                    specification: '',
                    price: '',
                    servicePrice: 0.05,
                },
            ],
            editPartsList: [],
            specificationList: [
                {
                    value: 2,
                    label: '品牌件'
                },
                {
                    value: 1,
                    label: '原厂件'
                },
                {
                    value: 3,
                    label: '拆车件'
                },
                {
                    value: 6,
                    label: '再制造'
                },
                {
                    value: 5,
                    label: '无限制'
                },
                {
                    value: 4,
                    label: '其他'
                },
            ],
            servicePriceList: [
                {
                    value: 0.05,
                    label: '5%'
                },
                {
                    value: 1,
                    label: '不可退货'
                }
            ],
            pickerOptions: {
                disabledDate (time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick (picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick (picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick (picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            },
            radio: '1',
            selected: "",
            // addValue: '',
            addressList: [],
            garageID: '',
            picArrList: [], // 轮播图
            restaurants: [],
            addsID: ''
        }
    },
    computed: {
        totalPrice () {
            var totalprice = 0;
            this.tableData.forEach((item, index) => {
                totalprice += item.quantity * item.price;
            });
            return totalprice;
        },
        totalNums () {
            var totalNums = 0;
            this.tableData.forEach((item, index) => {
                totalNums += item.quantity
            });
            return totalNums;
        }
    },
    created () {
        var date1 = new Date();
        var date2 = new Date(date1);
        let date3 = date2.setDate(date1.getDate() + 30);
        this.quoteForm.lastDate = new Date(date3);

        this.quoteForm.expireDatetime = new Date();

        let quoteStatusObj = JSON.parse(window.sessionStorage.getItem("quoteStatusObj"));
        this.inquiryID = quoteStatusObj.inquiryID;
        this.getDetailFn();
        this.getSupplierListFn();
    },
    methods: {
        async addAddressFn () {
            for (let i = 0; i < this.addressList.length; i++) {
                console.log(this.addressList[i]);

                if (this.addressList[i].address == this.addAddressObj.addName) {
                    // this.addsID = this.addressList[i].id
                    this.$message({
                        type: "error",
                        message: "当前有这个地址, 请不要重复添加哦!"
                    })
                    return;
                }
            }
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                Address: {
                    address: this.addAddressObj.addName,
                    GarageID: this.garageID,
                    addrType: 2
                }
            }
            const res = await this.postData("A1047", paramObj);
            if (res.code == '0') {
                this.$message({
                    type: "success",
                    message: "添加成功"
                })
                this.getAddressList();
                this.dialogFormVisible = false;
            }
        },
        // 取消报价
        async cancelFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                InquiryState: 4,
            }
            const res = await this.postData("A1030", paramObj);
        },
        // 提交
        async submitFn (ruleForm) {
            console.log(this.quoteForm.addValue);

            this.$refs[ruleForm].validate(async (valid) => {
                if (valid) {
                    for (let i = 0; i < this.addressList.length; i++) {
                        if (this.addressList[i].address == this.quoteForm.addValue) {
                            this.addsID = this.addressList[i].id
                        }
                    }
                    let token = window.sessionStorage.getItem("gn_request_token");
                    let Components = this.tableData;
                    let paramObj = {
                        Token: token,
                        InquiryID: this.inquiryID,
                        VinCode: this.quoteForm.vinCode,
                        SupplierID: this.quoteForm.supplierID,
                        Mark: this.quoteForm.maker,
                        ExpireDatetime: this.quoteForm.expireDatetime,
                        ExpressName: this.quoteForm.expressName,
                        // AddrID: this.addsID,
                        AddrID: this.quoteForm.addValue,
                        InquiryState: 2,
                        Components: Components,
                        invoiceType: this.quoteForm.invoiceType
                    }
                    console.log(paramObj);


                    const res = await this.postData("A1030", paramObj);
                    if (res.code == '0') {
                        this.$message({
                            type: 'success',
                            message: res.res.msg
                        })
                        let data = {
                            menuName: '询价报价',
                            item: 'quoteList',
                        };
                        this.$emit('quoteBack', data);
                    }
                } else {
                    return false;
                }
            });
        },
        // 获取地址列表
        async getAddressList () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                GarageID: this.garageID
            }
            const res = await this.postData("A1036", paramObj);

            this.addressList = res.res.data;
            if (this.addressList.length > 0) {
                this.quoteForm.addValue = this.addressList[this.addressList.length - 1].id
            }
        },
        // 获取供应商
        async getSupplierListFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
            }
            const res = await this.postData("A1029", paramObj);
            if (res.res.data) {
                let supplierList = res.res.data.date;
                for (let i = 0; i < supplierList.length; i++) {
                    this.supplierList.push({
                        supplierName: supplierList[i].companyName,
                        supplierID: supplierList[i].supplierID
                    })
                }
            }
        },
        // 获取详情
        async getDetailFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                InquiryID: this.inquiryID
            }
            const res = await this.postData("A1023", paramObj);
            let result = res.res.data;
            this.garageID = result.inquiry.garageID;
            this.tableData = result.inquiryComponents;
            console.log(result);
            
            if (this.tableData.length == 0) {
                this.tableData.push({
                    componentID: '',
                    partName: "",
                    specification: "",
                    price: "",
                    servicePrice: 0.05,
                    quantity: 1
                })
            }

            let newObj = {}
            let userObj = {
                porder: result.porder,
                userName: result.userName,
                isAccounts: "1",
            }
            Object.assign(newObj, result.inquiry, result.inquiryInfo, result.car, result.garage, userObj, result.express, result.addr);
            this.quoteForm = newObj;
            if (this.quoteForm.invoiceType == 0) {
                this.quoteForm.invoiceType = 1;
            }
            this.picArrList = this.quoteForm.pictures ? JSON.parse(this.quoteForm.pictures) : [];
            if (this.quoteForm.componentIMG) {
                this.picArrList.push(this.quoteForm.componentIMG);
            }
            if (this.quoteForm.expressIMG) {
                this.picArrList.push(this.quoteForm.expressIMG);
            }
            this.getAddressList();
            console.log(this.quoteForm);
            
        },
        // 暂存
        async storageFn () {
            let token = window.sessionStorage.getItem("gn_request_token");

            for (let i = 0; i < this.addressList.length; i++) {
                if (this.addressList[i].address == this.quoteForm.addValue) {
                    this.addsID = this.addressList[i].id
                }
            }
            let Components = this.tableData;
            let paramObj = {
                Token: token,
                InquiryID: this.inquiryID,
                VinCode: this.quoteForm.vinCode,
                SupplierID: this.quoteForm.supplierID,
                Mark: this.quoteForm.maker,
                ExpireDatetime: this.quoteForm.expireDatetime,
                ExpressName: this.quoteForm.expressName,
                AddrID: this.quoteForm.addValue,
                InquiryState: 5,
                Components: Components,
                invoiceType: this.quoteForm.invoiceType
            }
            console.log(paramObj);

            const res = await this.postData("A1030", paramObj);
            if (res.code == '0') {
                this.$message({
                    type: 'success',
                    message: "暂存成功!"
                })
                let data = {
                    menuName: '询价报价',
                    item: 'quoteList',
                };
                this.$emit('quoteBack', data);
            }
        },
        handleCurrentChange (val) {
        },
        // 删除行
        async deleteRow (index, rows) {
            let componentID = rows[index].componentID;
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                ComponentID: componentID
            }
            const res = await this.postData("A1048", paramObj);
            if (res.code == '0') {
                this.$message({
                    type: "success",
                    message: "删除成功"
                })
                rows.splice(index, 1);
            }
        },
        addRow (index, rows) {
            rows.push({
                partName: "",
                specification: "",
                price: "",
                servicePrice: 0.05,
                quantity: 1
            })
        },
        // 添加收货地址
        async addAddrFn () {
            this.dialogFormVisible = true;
        },
        // 计数器
        handleChange (value) {
        },
        querySearch (queryString, cb) {
            for (let i = 0; i < this.addressList.length; i++) {
                this.addressList[i].value = this.addressList[i].address;
            }
            this.restaurants = this.addressList;
            var restaurants = this.restaurants;
            var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter (queryString) {
            return (restaurant) => {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
    },
}
</script>

<style lang="less" scoped>
.header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #ccc;
    padding-left: 20px;
    h2 {
        color: #000;
        font-size: 20px;
        font-weight: 600;
        width: 500px;
        float: left;
        text-align: left;
        padding-left: 10px;
        box-sizing: border-box;
        .status {
            color: #ff7d72;
            font-size: 20px;
            margin-left: 30px;
        }
    }

    .parts-title {
        color: #000;
        font-size: 20px;
        font-weight: 600;
        float: left;
    }
}

.main {
    padding: 20px;
    // min-width: 1030px;
    white-space: nowrap;
    display: flex;
    overflow-x: auto;
    .main-left {
        float: left;
        width: 457px;
        .slide-wrapper {
            text-align: left;
            img {
                width: 450px;
                height: 270px;
                // width: 523px;
                // height: 275px;
            }
        }
        .left-content {
            width: 457px;
            .el-col {
                text-align: left;
                line-height: 40px;
            }
            /deep/ .el-input {
                width: 294px;
                margin-left: 20px;
            }
            .maxLh {
                line-height: 60px;
            }
            .invoice {
                .el-radio {
                    margin-left: 40px;
                }
            }
            .VINCLASS {
                padding-left: 0;
                margin-left: 0;
                width: 153px;
            }
            .VINCODES {
                width: 180px;
            }
        }
    }

    .main-right {
        margin-left: 20px;
        float: left;
        .supplier-select {
            text-align: left;
            .supplier-label {
                margin-right: 50px;
            }
        }
        .supplier-list {
            position: relative;
            /deep/ .el-input-number {
                width: 85px;
                /deep/ .el-input__inner {
                    padding-left: 10px;
                }
            }
            .quoted-price {
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    span {
                        margin-right: 8px;
                    }
                    .el-input {
                        width: 85px;
                    }
                }
                .right {
                    margin-right: 15px;
                    text-align: right;
                    color: #409eff;
                    font-weight: 700;
                }
            }
            .table-summary {
                position: absolute;
                bottom: -65px;
                left: 0;
                width: 100%;
                height: 65px;
                .summary-num {
                    position: absolute;
                    left: 430px;
                    top: 35%;
                    transform: translateY(-50%);
                }
                .summary-price {
                    position: absolute;
                    left: 600px;
                    top: 35%;
                    transform: translateY(-50%);
                }
            }
        }

        .btn-list {
            margin-top: 60px;
            .el-button {
                margin: 0 35px;
            }
        }
    }
}
</style>
