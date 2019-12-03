<template>
    <!-- 待确认 -->
    <div class="root">
        <div class="header">
            <div class="info clearfix">
                <div class="quoteNum fl">
                    <i>询价编号：</i>{{quoteForm.inquiryID}}
                </div>
                <div class="handleMan fl">
                    <i>处理人：</i>{{quoteForm.operatorAccount}}
                </div>
            </div>
        </div>
        <div class="main">
            <div class="parts">
                <div class="parts-top clearfix">
                    <div class="parts-title fl">
                        <h2>配件信息</h2>
                    </div>
                    <div class="parts-status fl">
                        待确认
                    </div>
                </div>
                <div class="parts-content">
                    <el-table :data="tableData">
                        <el-table-column type="index" width="50" label="序号">
                        </el-table-column>
                        <el-table-column prop="partName" label="配件名称" width="180">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.partName" size="small" placeholder="请输入配件名称"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="oeCode" label="OE编号" width="180">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.oeCode" size="small" placeholder="请输入OE编号"></el-input>
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
                        <el-table-column prop="price" label="报价" width="280">
                            <template slot-scope="scope">
                                <div class="quoted-price">
                                    <div class="left">
                                        <span>销售价: ¥</span>
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
                                <!-- <span v-if="scope.row.servicePrice == 0.05">5%</span> -->
                                <!-- <span v-if="scope.row.servicePrice == 1">不可退货</span> -->
                                <el-select v-model="scope.row.servicePrice" size="small" placeholder="退货费率">
                                    <el-option v-for="item in servicePriceList" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="table-summary">
                        <div class="summary-num">
                            共{{totalNums}}件
                        </div>
                        <div class="summary-price">
                            合计: {{ totalprice | ToFixed }}
                        </div>
                    </div>
                </div>
                <div class="editParts">
                    <el-button @click="editPartsFn()">修改配件信息</el-button>
                </div>
            </div>
            <div class="carInfo">
                <div class="comInfo-top">
                    <h2>车辆信息</h2>
                </div>
                <div class="car-content clearfix">
                    <div class="car-msg">
                        <i>车辆信息：</i>
                        {{quoteForm.maker}}
                    </div>
                    <div class="car-vin">
                        <i>VIN：</i>
                        {{quoteForm.vinCode}}
                    </div>
                </div>
            </div>
            <div class="logistics">
                <div class="comInfo-top">
                    <h2>物流信息</h2>
                </div>
                <div class="comInfo-content clearfix">
                    <div class="_width280">
                        <i class="_label14">物流名称：</i>
                        {{quoteForm.expressName}}
                    </div>
                    <div class="_width280">
                        <i class="_label14">地址：</i>
                        {{quoteForm.address}}
                    </div>
                </div>
            </div>
            <div class="quoteInfo">
                <div class="comInfo-top">
                    <h2>询价信息</h2>
                </div>
                <div class="quote-content clearfix">
                    <div class="quote-name">
                        <i class="_label14">询价人：</i>
                        {{quoteForm.userName}}
                    </div>
                    <div class="quote-store">
                        <i class="_label14">询价门店：</i>
                        {{quoteForm.garagrName}}
                    </div>
                    <div class="quote-radio">
                        <i class="_label14">结算方式：</i>
                        <el-radio style="margin-left: 20px;" v-model="quoteForm.isAccounts" label="1">挂账</el-radio>
                    </div>
                </div>
                <div class="quote-content clearfix">
                    <div class="quote-time">
                        <i class="_label14">询价时间：</i>
                        {{quoteForm.createDateTime}}
                    </div>
                    <div class="offer-time">
                        <i class="_label14">报价时间：</i>
                        {{quoteForm.purchaseOrderDate}}
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        totalprice () {
            var totalprice = 0;
            this.tableData.forEach((item, index) => {
                totalprice += item.quantity * item.price;
            });
            return totalprice;
        },
        totalNums () {
            var totalNums = 0;
            this.tableData.forEach((item, index) => {
                totalNums +=item.quantity
            });
            return totalNums;
        }
    },
    data () {
        return {
            tableData: [],
            inquiryID: '',
            quoteForm: {
                isAccounts: "1"
            },
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
        }
    },
    created () {
        let quoteStatusObj = JSON.parse(window.sessionStorage.getItem("quoteStatusObj"));
        this.inquiryID = quoteStatusObj.inquiryID;
        this.getDetailFn();
    },
    methods: {
        // 修改配件信息
        async editPartsFn () {
            console.log(this.quoteForm);
            let Components = this.tableData;
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                VinCode: this.quoteForm.vinCode,
                SupplierID: this.quoteForm.supplierID,
                Mark: this.quoteForm.maker,
                ExpireDatetime: this.quoteForm.expireDatetime,
                ExpressName: this.quoteForm.expressName,
                AddrID: this.quoteForm.addrID,
                InquiryState: 2,
                Components: Components,
                InvoiceType: this.quoteForm.invoiceType,
                garageID: this.quoteForm.garageID
            }
            console.log(paramObj);

            const res = await this.postData("A1038", paramObj);
            console.log(res);
            
        },
        // 计数器
        handleChange (value) {
        },
        async getDetailFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                InquiryID: this.inquiryID
            }
            let res = await this.postData("A1023", paramObj);
            let result = res.res.data;
            this.tableData = result.inquiryComponents;
            let newObj = {}
            let userObj = {
                porder: result.porder,
                userName: result.userName,
                isAccounts: "1",
            }
            Object.assign(newObj, result.inquiry, result.inquiryInfo, result.car, result.garage, userObj, result.express, result.addr);
            this.quoteForm = newObj;
            console.log(this.quoteForm);
        },
    },
}
</script>

<style scoped lang="less">
.header {
    .info {
        padding: 10px;
        i {
            font-weight: 600;
            font-size: 14px;
        }
    }
    .quoteNum {
        margin-right: 60px;
    }
}
.main {
    .parts {
        padding-left: 10px;
        margin-top: 30px;
        .parts-top {
            margin-bottom: 10px;
            h2 {
                color: #333;
                font-weight: 700;
                font-size: 16px;
                margin-right: 155px;
            }
            .parts-status {
                color: #ff9900;
                font-weight: 700;
                font-size: 16px;
            }
        }

        /deep/ .el-input-number {
            width: 85px;
            /deep/ .el-input__inner {
                padding-left: 10px;
            }
        }

        .parts-content {
            .partsNameBox {
                i {
                    margin-left: 20px;
                }
            }
            .priceBox {
                i {
                    margin-right: 60px;
                }
            }

            .table-summary {
                position: relative;
                height: 40px;
                padding-top: 15px;
                padding-bottom: 15px;
                color: #333;
                font-weight: 600;
                font-size: 16px;
                .summary-num {
                    position: absolute;
                    left: 430px;
                    top: 50%;
                    transform: translateY(-50%);
                }
                .summary-price {
                    position: absolute;
                    left: 550px;
                    top: 50%;
                    transform: translateY(-50%);
                }
            }
        }
    }
    .carInfo {
        padding-left: 10px;

        .car-content {
            text-align: left;
            margin-top: 30px;
            display: flex;
            align-items: center;
            .car-msg {
                margin-right: 120px;
                display: flex;
                align-items: center;
                .pic {
                    width: 34px;
                    height: 34px;
                    background-color: #ccc;
                    margin-right: 10px;
                }
            }
            .car-vin {
                font-size: 14px;
                i {
                    font-weight: 600;
                }
            }
        }
    }
    .quoteInfo {
        padding: 50px 10px 30px;
        .quote-content {
            text-align: left;
            padding-top: 30px;
            display: flex;
            .quote-name {
                width: 280px;
            }
            .quote-store {
                width: 280px;
            }
            .quote-time {
                width: 280px;
            }
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
}
</style>
