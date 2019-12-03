<template>
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="main">
            <el-form :inline="true" :model="addQuoteForm" :rules="rules" ref="ruleForm">
                <div class="common">
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="VIN码：" prop="VIN">
                                <el-input v-model="addQuoteForm.VIN" size="small" placeholder="请输入VIN码"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-form-item label="车型：" prop="vehicleType">
                                <el-input v-model="addQuoteForm.vehicleType" size="small" placeholder="请输入车型"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="询价门店：" prop="quoteStore">
                                <el-select filterable size="small" v-model="addQuoteForm.quoteStore" placeholder="请选择">
                                    <el-option @click.native="handClickGetAddress(item)" v-for="item in storeList" :key="item.garageID" :label="item.garagrName" :value="item.garageID">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <el-radio-group v-model="addQuoteForm.isHangAccout">
                                <el-radio :label="1">挂账</el-radio>
                                <!-- <el-radio :label="2">不挂账</el-radio> -->
                            </el-radio-group>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="物流名称：" prop="logName">
                                <el-input v-model="addQuoteForm.logName" size="small" placeholder="请输入物流名称"></el-input>
                            </el-form-item>
                        </div>
                        <div class="inline">
                            <!-- <el-form-item label="物流地址：" prop="logAddress">
                                <el-autocomplete size="small" v-model="addValue" :fetch-suggestions="querySearch" placeholder="请输入收货地址" @focus="msgsFn" clearable></el-autocomplete>
                                <el-button @click="addAddrFn()" style="margin-left: 5px;" size="small" type="primary">新增收货地址</el-button>
                            </el-form-item> -->
                            <el-form-item label="物流地址：" prop="addValue">
                                <!-- <el-autocomplete size="small" v-model="addValue" :fetch-suggestions="querySearch" placeholder="请输入收货地址" clearable></el-autocomplete> -->
                                <el-select @click.native="msgsFn()" size="small" filterable v-model="addQuoteForm.addValue" placeholder="请选择收货地址">
                                    <el-option v-for="item in addressList" :key="item.id" :label="item.address" :value="item.id">
                                    </el-option>
                                </el-select>
                                <el-button @click="addAddrFn()" style="margin-left: 5px;" size="small" type="primary">新增收货地址</el-button>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="发票：" prop="InvoiceType">
                                <el-radio-group v-model="addQuoteForm.InvoiceType">
                                    <el-radio :label="1">无票</el-radio>
                                    <el-radio :label="2">普票</el-radio>
                                    <el-radio :label="3">专票</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <!-- <el-radio-group v-model="addQuoteForm.InvoiceType">
                                <el-radio :label="1">无票</el-radio>
                                <el-radio :label="2">普票</el-radio>
                                <el-radio :label="3">专票</el-radio>
                            </el-radio-group> -->
                        </div>
                        <div class="inline">
                            <el-form-item label="供应商：" prop="supplierIDValue">
                                <el-select v-model="addQuoteForm.supplierIDValue" size="small" filterable placeholder="请选择">
                                    <el-option v-for="item in supplierList" :key="item.supplierID" :label="item.supplierName" :value="item.supplierID">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="comInfo-content">
                        <div class="inline">
                            <el-form-item label="最后付款日期：" prop="lastDate">
                                <el-date-picker size="small" v-model="addQuoteForm.lastDate" type="date" placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                    </div>
                </div>
                <div class="common">
                    <div class="comInfo-top">
                        <h2>配件清单</h2>
                    </div>
                    <div class="supplier-list">
                        <el-table :data="tableData" @current-change="handleCurrentChange">
                            <el-table-column type="index" width="50" label="序号">
                            </el-table-column>
                            <el-table-column prop="partName" label="配件名称" width="180">
                                <template slot-scope="scope">
                                    <el-input size="small" v-model="scope.row.partName" placeholder="请输入内容"></el-input>

                                </template>
                            </el-table-column>
                            <el-table-column prop="oECode" label="OE编号" width="180">
                                <template slot-scope="scope">
                                    <el-input v-model="scope.row.oECode" placeholder="请输入配件编号" size="small"></el-input>
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
                                            <i>¥ {{ scope.row.quantity * scope.row.price | ToFixed }}</i>
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
                                合计: {{ totalPrice | ToFixed }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="footer">
                    <el-button type="primary" @click="cancelFn('ruleForm')" size="small">取消询价</el-button>
                    <el-button type="primary" @click="temStorageFn('ruleForm')" size="small">暂存</el-button>
                    <el-button type="primary" @click="submitFn('ruleForm')" size="small">发布报价</el-button>
                </div>
            </el-form>
        </div>
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
import Header from "../../components/Header"
export default {
    data () {
        return {
            headerInfo: '询价信息',
            addQuoteForm: {
                VIN: '', // VIN码
                vehicleType: "", // 车型
                quoteStore: '', // 询价门店
                logName: '', // 物流名称
                addValue: '', // 物流地址
                isHangAccout: 1, // 是否挂账
                InvoiceType: '', // 发票类型
                supplierName: '', // 供应商
                lastDate: '', // 最后付款
                supplierIDValue: '',
            },
            dialogFormVisible: false,
            addAddressObj: {
                addName: "",
            },
            // addValue: '',
            rules: {
                quoteStore: [
                    { required: true, message: '请输入车型', trigger: 'change' },
                ],
                vehicleType: [
                    { required: true, message: '请输入车型', trigger: 'change' },
                ],
                VIN: [
                    { required: true, message: '请输入VIN码', trigger: 'change' },
                    {
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{17}$/,
                        message: 'VIN码必须17位字母和数字',
                        trigger: 'change'
                    }
                ],
                lastDate: [
                    { required: true, message: '请输入最后付款日期', trigger: 'change' },
                ],
                logName: [
                    { required: true, message: '请输入物流名称', trigger: 'change' },
                ],
                supplierIDValue: [
                    { required: true, message: '请输入供应商', trigger: 'change' },
                ],
                addValue: [
                    { required: true, message: '请输入物流地址', trigger: 'change' },
                ],
                InvoiceType: [
                    { required: true, message: '请选择发票类型', trigger: 'change' },
                ],
            },
            storeList: [],
            state1: '',
            addsID: '',
            tableData: [
                {
                    partName: '',
                    quantity: 1,
                    oECode: '',
                    specification: '',
                    price: '',
                    servicePrice: 0.05,
                },
            ],
            supplierList: [],
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
                    value: 1,
                    label: '不可退货'
                },
                {
                    value: 0.05,
                    label: '5%'
                }
            ],
            addressList: [],
            garageID: '',
        }
    },
    components: {
        Header,
    },
    created () {
        var date1 = new Date();
        var date2 = new Date(date1);
        let date3 = date2.setDate(date1.getDate() + 30);
        this.addQuoteForm.lastDate = new Date(date3);
        
        this.getStoreListFn();
        this.getsupplierListFn();
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
    methods: {
        async addAddressFn () {
            for (let i = 0; i < this.addressList.length; i++) {
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
        // 添加收货地址
        async addAddrFn () {
            this.dialogFormVisible = true;
            //     for (let i = 0; i < this.addressList.length; i++) {
            //         if (this.addressList[i].address == this.addValue) {
            //             // this.addsID = this.addressList[i].id
            //             this.$message({
            //                 type: "error",
            //                 message: "当前有这个地址, 请不要重复添加哦!"
            //             })
            //             return;
            //         }
            //     }
            //     let token = window.sessionStorage.getItem("gn_request_token");
            //     let paramObj = {
            //         Token: token,
            //         Address: {
            //             address: this.addValue,
            //             GarageID: this.garageID,
            //             addrType: 2
            //         }
            //     }
            //     const res = await this.postData("A1047", paramObj);
            //     if (res.code == '0') {
            //         this.$message({
            //             type: "success",
            //             message: "添加成功"
            //         })
            //         this.getAddressList();
            //     }
        },
        // 提示要门店
        msgsFn () {
            if (!this.addQuoteForm.quoteStore) {
                this.$message({
                    type: 'warning',
                    message: '请先选择询价门店!'
                })
            }
        },
        // 点击门店得到地址
        handClickGetAddress (item) {
            this.garageID = item.garageID;
            this.getAddressList();
        },
        async getAddressList () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                GarageID: this.garageID
            }
            const res = await this.postData("A1036", paramObj);

            this.addressList = res.res.data;
            console.log(this.addressList);

            if (this.addressList.length > 0) {
                this.addQuoteForm.addValue = this.addressList[this.addressList.length - 1].id
            }
        },
        // 取消
        cancelFn () {

        },
        // 发布
        async submitFn (ruleForm) {
            for (let i = 0; i < this.addressList.length; i++) {
                if (this.addressList[i].address == this.addQuoteForm.addValue) {
                    this.addQuoteForm.addsID = this.addressList[i].id
                }
            }
            this.$refs[ruleForm].validate(async (valid) => {
                if (valid) {
                    let Components = this.tableData;
                    let token = window.sessionStorage.getItem("gn_request_token");
                    let paramObj = {
                        Token: token,
                        VinCode: this.addQuoteForm.VIN,
                        SupplierID: this.addQuoteForm.supplierIDValue,
                        Mark: this.addQuoteForm.vehicleType,
                        ExpireDatetime: this.addQuoteForm.lastDate,
                        ExpressName: this.addQuoteForm.logName,
                        AddrID: this.addQuoteForm.addValue,
                        InquiryState: 2,
                        Components: Components,
                        InvoiceType: this.addQuoteForm.InvoiceType,
                        garageID: this.garageID
                    }
                    console.log(paramObj);

                    const res = await this.postData("A1038", paramObj);
                    if (res.code == '0') {
                        this.$message({
                            type: 'success',
                            message: res.res.msg
                        })
                        let data = {
                            menuName: '询价报价',
                            item: 'quoteList',
                        };
                        this.$emit('backParam', data);
                    }
                } else {
                    return false;
                }
            });
        },
        // 暂存
        async temStorageFn (ruleForm) {
            console.log(this.addQuoteForm.addValue);

            for (let i = 0; i < this.addressList.length; i++) {
                if (this.addressList[i].address == this.addQuoteForm.addValue) {
                    this.addsID = this.addressList[i].id
                    console.log(this.addressList[i]);

                }
            }

            this.$refs[ruleForm].validate(async (valid) => {
                if (valid) {
                    let Components = this.tableData;
                    let token = window.sessionStorage.getItem("gn_request_token");
                    let paramObj = {
                        Token: token,
                        VinCode: this.addQuoteForm.VIN,
                        SupplierID: this.addQuoteForm.supplierIDValue,
                        Mark: this.addQuoteForm.vehicleType,
                        ExpireDatetime: this.addQuoteForm.lastDate,
                        ExpressName: this.addQuoteForm.logName,
                        AddrID: this.addQuoteForm.addValue,
                        InquiryState: 5,
                        Components: Components,
                        InvoiceType: this.addQuoteForm.InvoiceType,
                        garageID: this.garageID
                    }

                    const res = await this.postData("A1038", paramObj);
                    if (res.code == '0') {
                        this.$message({
                            type: 'success',
                            message: res.res.msg
                        })
                        let data = {
                            menuName: '询价报价',
                            item: 'quoteList',
                        };
                        this.$emit('backParam', data);
                    }
                } else {
                    return false;
                }
            });
        },
        // 获取供应商
        async getsupplierListFn () {
            let token = window.sessionStorage.getItem("gn_request_token");

            let paramObj = {
                Token: token,
            }

            const res = await this.postData("A1029", paramObj);

            let supplierList = res.res.data.date;

            for (let i = 0; i < supplierList.length; i++) {
                this.supplierList.push({
                    supplierName: supplierList[i].companyName,
                    supplierID: supplierList[i].supplierID
                })
            }
        },
        // 获取门店
        async getStoreListFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
            }
            const res = await this.postData("A1053", paramObj);
            let storeList = res.res.data.date;

            for (let i = 0; i < storeList.length; i++) {
                this.storeList.push({
                    garagrName: storeList[i].garagrName,
                    garageID: storeList[i].garageID
                })
            }
        },
        // 删除一条
        deleteRow (index, rows) {
            rows.splice(index, 1);
        },
        // 添加一条
        addRow (index, rows) {
            rows.push({
                partName: '',
                quantity: 1,
                oECode: '',
                specification: '',
                price: '',
                servicePrice: 0.05,
            })
        },
        handleCurrentChange (val) {
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

<style scoped lang="less">
.main {
    padding-left: 30px;
    .inline {
        width: 560px;
    }
    /deep/ .el-form-item__label {
        font-weight: 600;
        // width: 90px;
    }
    /deep/ .el-form-item {
        margin-bottom: 0;
    }
    .supplier-list {
        margin-left: -10px;
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
    .comInfo-top {
        margin-top: 40px;
        margin-bottom: 20px;
    }
    .footer {
        width: 1200px;
        margin-top: 100px;
        padding-bottom: 80px;
        /deep/ .el-button {
            margin: 0 20px;
            width: 100px;
        }
    }
}
</style>
