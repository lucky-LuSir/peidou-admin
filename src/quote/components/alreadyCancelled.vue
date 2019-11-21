<template>
    <!-- 已取消 -->
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
                        已取消
                    </div>
                </div>
                <div class="parts-content">
                    <el-table :data="tableData">
                        <el-table-column type="index" width="50" label="序号">
                        </el-table-column>
                        <el-table-column prop="partName" label="配件名称" width="180">
                            <template slot-scope="scope">
                                {{scope.row.partName}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="oeCode" label="OE编号" width="180">
                            <template slot-scope="scope">
                                {{scope.row.oeCode}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="quantity" label="数量" width="120">
                            <template slot-scope="scope">
                                {{scope.row.quantity}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="specification" label="品质" width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.specification == 1">原厂件</span>
                                <span v-if="scope.row.specification == 2">品牌件</span>
                                <span v-if="scope.row.specification == 3">拆车件</span>
                                <span v-if="scope.row.specification == 4">其他</span>
                                <span v-if="scope.row.specification == 5">无限制</span>
                                <span v-if="scope.row.specification == 6">再制造</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="price" label="报价" width="240">
                            <template slot-scope="scope">
                                <div class="quoted-price">
                                    <div class="left">
                                        <span>销售价: ¥</span>
                                        {{scope.row.price}}
                                    </div>
                                    <div class="right">
                                        ¥ <i>{{ scope.row.quantity * scope.row.price | ToFixed }}</i>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="servicePrice" label="退货费率" width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.servicePrice == 0.05">5%</span>
                                <span v-if="scope.row.servicePrice == 1">不可退货</span>
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
            </div>
            <div class="carInfo">
                <div class="comInfo-top">
                    <h2>车辆信息</h2>
                </div>
                <div class="comInfo-content clearfix">
                    <div class="_label14">
                        <i>车辆信息：</i>
                        {{quoteForm.maker}}
                    </div>
                    <div style="margin-left: 140px;" class="_label14">
                        <i>VIN：</i>
                        {{quoteForm.vinCode}}
                    </div>
                </div>
            </div>
            <div class="quoteInfo">
                <div class="comInfo-top">
                    <h2>订单信息</h2>
                </div>
                <div class="comInfo-content clearfix">
                    <div class="_width280">
                        <i class="_label14">下单人：</i>
                        {{quoteForm.userName}}
                    </div>
                    <div class="_width280">
                        <i class="_label14">询价门店：</i>
                        {{quoteForm.garagrName}}
                    </div>
                    <div class="quote-radio _width280">
                        <i class="_label14">结算方式：</i>
                        <el-radio v-model="quoteForm.isAccounts" label="1">挂账</el-radio>
                    </div>
                </div>
                <div class="comInfo-content clearfix">
                    <div class="_width280">
                        <i class="_label14">询价时间：</i>
                        {{quoteForm.createDateTime}}
                    </div>
                    <div class="_width280">
                        <i class="_label14">报价时间：</i>
                        {{quoteForm.purchaseOrderDate}}
                    </div>
                    <div class="_width280">
                        <i class="_label14">下单时间：</i>
                        {{quoteForm.purchaseOrderDate}}
                    </div>
                    <div class="_width280">
                        <i class="_label14">最后付款时间：</i>
                        {{quoteForm.expireDatetime}}
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
                console.log(item);

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
        }
    },
    created () {
        let quoteStatusObj = JSON.parse(window.sessionStorage.getItem("quoteStatusObj"));
        this.inquiryID = quoteStatusObj.inquiryID;
        this.getDetailFn();
    },
    methods: {
        async getDetailFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                InquiryID: this.inquiryID
            }
            let res = await this.postData("A1023", paramObj);
            let result = res.res.data;
            console.log(result);

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
    padding-left: 10px;
    padding-bottom: 20px;
    .parts {
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
                color: #666666;
                font-weight: 700;
                font-size: 16px;
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
                line-height: 40px;
                padding-top: 15px;
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
        .comInfo-top {
            margin-top: 20px;
        }
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
    }
    .quoteInfo {
        .quote-radio {
            i {
                margin-right: 20px;
            }
        }
    }
}
</style>
