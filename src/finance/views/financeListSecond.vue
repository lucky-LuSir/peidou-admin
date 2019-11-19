<template>
    <!-- 采购订单 -->
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="com-search-list">
            <el-select style="margin-right: 60px;" size="small" v-model="storeValue" placeholder="付款门店名称">
                <el-option v-for="item in storeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>

            <el-input style="margin-right: 60px; width: 230px;" size="small" v-model="amounts" placeholder="付款金额"></el-input>
            支付时间：
            <el-date-picker size="small" unlink-panels v-model="payDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <el-button size="small">
                <i class="el-icon-font-sousuo"></i>查询</el-button>
        </div>
        <div class="com-addBtn-list clearfix" style="padding: 0 100px 0 30px;">
            <el-button style="background-color: #019794; border: 1px solid #019794; width: 140px;" @click="exportOrderFn()" type="primary" size="small">导出</el-button>
            <el-button style="width: 100px;" class="fr" @click="submitFn()" type="primary" size="small">通过</el-button>
            <el-button style="width: 100px;" class="fr" @click="rejectFn()" type="danger" size="small">拒绝</el-button>
        </div>
        <div class="main clearfix">
            <div class="financeList">
                <el-table @selection-change="handleSelectionChange" :data="tableData" @row-click="clickTable" ref="refTable" style="width: 100%">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.orderDetail" style="width: 100%">
                                <el-table-column label="订单信息" width="185">
                                </el-table-column>
                                <el-table-column prop="inquiryID" label="订单编号/退单编号" width="240">
                                </el-table-column>
                                <el-table-column prop="totalMoney" label="订单/退款金额 (元)" width="190">
                                </el-table-column>
                                <el-table-column prop="payDatetime" label="下单时间/退款时间" width="190">
                                </el-table-column>
                                <el-table-column prop="payImg">
                                    <template slot-scope="scope">
                                        <!-- {{props.row.payImg}} -->
                                        <div>
                                            <viewer>
                                                <img style="width: 80px; height: 60px;" :src="props.row.payImg" alt="">
                                                <!-- <img style="width: 80px; height: 60px;" src="http://img.maocongwang.com//1573809168164.jpeg" alt=""> -->
                                            </viewer>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column>
                                    <template slot-scope="scope">
                                        <span @click="getOldOrderListDialogFn(scope.row)" style="color: #0000ff; font-size: 14px;">操作记录</span>
                                    </template>
                                </el-table-column>
                                <el-table-column>
                                    <template slot-scope="scope">
                                        <span @click="getYuanOrderFn(scope.row)" style="color: #0000ff; font-size: 14px;">查看原订单</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column prop="orderNO" label="支付流水编号" width="180">
                    </el-table-column>
                    <el-table-column prop="garagrName" label="付款门店名称" width="240">
                    </el-table-column>
                    <el-table-column prop="totalMoney" label="付款金额 (元)" width="190">
                        <template slot-scope="scope">
                            <span>{{scope.row.totalMoney}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="payDatetime" sortable label="支付时间" width="190">
                    </el-table-column>
                    <el-table-column 
                        :filters="[{ text: '网银', value: '网银' }, { text: '支付宝', value: '支付宝' }, { text: '微信', value: '微信' }]" :filter-method="filterPayType" filter-placement="bottom-end"
                        prop="payType" label="支付方式">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payType == 1">网银</span>
                            <span v-if="scope.row.payType == 2">支付宝</span>
                            <span v-if="scope.row.payType == 3">微信</span>
                        </template>
                    </el-table-column>
                    <el-table-column 
                        :filters="[{ text: '待支付', value: '待支付' }, { text: '支付成功', value: '支付成功' }, { text: '支付失败', value: '支付失败' }]" :filter-method="filterPayState" filter-placement="bottom-end" 
                        prop="payState" label="支付状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payState == 1">待支付</span>
                            <span v-if="scope.row.payState == 2">支付成功</span>
                            <span v-if="scope.row.payState == 3">支付失败</span>
                        </template>
                    </el-table-column>
                    <el-table-column :filters="[{ text: '申请中', value: '申请中' }, { text: '审核通过', value: '审核通过' }, { text: '审核不通过', value: '审核不通过' }]" :filter-method="filterState" filter-placement="bottom-end" prop="reviewState" label="审核状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.reviewState == 1" style="color: #ff9900;">申请中</span>
                            <span v-if="scope.row.reviewState == 2" style="color: #008000;">审核通过</span>
                            <span v-if="scope.row.reviewState == 3" style="color: #ff0000;">审核不通过</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <span style="color: #0000ff; font-size: 14px;">订单明细</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pricesBox">
                    共计收款
                    <span>{{totalPrice}}</span>
                    <el-tooltip style="margin-left: 10px;" class="item" effect="dark" content="网银支付收款未审批通过前不计入总计" placement="top-start">
                        <i class="el-icon-info"></i>
                    </el-tooltip>
                </div>
                <el-pagination style="margin: 30px 0;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background :total="totalNum">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="操作记录" :visible.sync="dialogVisible" width="400">
            <el-table :data="gridData" class="gridTable">
                <el-table-column property="createDateTime" label="时间" width="200"></el-table-column>
                <el-table-column property="operatorAccount" label="操作人" width="200"></el-table-column>
                <el-table-column property="eventName" label="内容"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <!-- <el-button type="primary" @click="getOldOrderListFn">确 定</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Header from "../../components/Header"

export default {
    data () {
        return {
            headerInfo: '支付流水',
            storeList: [],
            storeValue: '',
            amounts: '',
            payDate: '',
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            totalNum: 0,
            orderNO: '',
            orderArr: [],
            dialogOrderNo: '',
            dialogVisible: false,
            gridData: [],
        }
    },
    components: {
        Header,
    },
    computed: {
        totalPrice () {
            var totalprice = 0;
            this.tableData.forEach((item, index) => {
                if (item.payState == 2 && item.reviewState == 2) {
                    totalprice += +(item.totalMoney)
                }
            });
            return totalprice;
        },
    },
    created () {
        this.getFinanceList();
        // this.dateValue = window.sessionStorage.getItem("PayDatetime");
        // console.log(this.dateValue);
    },
    methods: {
        // 支付方式
        filterPayType (value, row) {
            if (value == '网银') {
                return row.payType == 1
            } else if (value == '支付宝') {
                return row.payType == 2
            } else if (value == '微信') {
                return row.payType == 3
            }
        },
        // 支付状态
        filterPayState (value, row) {
            if (value == '待支付') {
                return row.payState == 1
            } else if (value == '支付成功') {
                return row.payState == 2
            } else if (value == '支付失败') {
                return row.payState == 3
            }
        },
        // 过滤状态
        filterState (value, row) {
            if (value == '申请中') {
                return row.reviewState == 1
            } else if (value == '审核通过') {
                return row.reviewState == 2
            } else if (value == '审核不通过') {
                return row.reviewState == 3
            }
        },
        // 获取原订单
        getYuanOrderFn (item) {
            // oldOrderList
            window.sessionStorage.setItem("financeId", item.inquiryID);
            let data = {
                menuName: '订单详情',
                item: 'oldOrderList',
            };
            this.$emit('backParam', data);
        },
        // 导出订单
        async exportOrderFn () {
            console.log(1);
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
            }
            let res = await this.postData("A1037", paramObj);
            let url = res.res.data.fileUrl;
            window.open(url)
        },
        async getOldOrderListDialogFn (item) {
            this.dialogOrderNo = item.inquiryID;
            console.log(this.dialogOrderNo);
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                OrderNO: this.dialogOrderNo
            }
            const res = await this.postData("A1049", paramObj);
            console.log(res);
            this.gridData = res.res.data;
            this.dialogVisible = true;
        },
        // 拒绝
        async rejectFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                NOList: {
                    orderState: 3,
                    OrderNo: this.orderArr
                }
            }
            const res = await this.postData("A1041", paramObj);
            console.log(res);
            if (res.code == '0') {
                this.$message({
                    type: "success",
                    message: res.res.msg
                })
                this.getFinanceList();
            }
        },
        // 通过
        async submitFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                NOList: {
                    orderState: 2,
                    OrderNo: this.orderArr,
                }
            }
            const res = await this.postData("A1041", paramObj);
            if (res.code == '0') {
                this.$message({
                    type: "success",
                    message: res.res.msg
                })
                this.getFinanceList();
            }
        },
        // 多选表格
        handleSelectionChange (val) {
            let newArr = [];
            for (let i = 0; i < val.length; i++) {
                newArr.push(
                    val[i].orderNO,
                )
            }
            this.orderArr = newArr;
        },
        // 表格展开
        async clickTable (row, index, e) {
            console.log(row);

            this.$refs.refTable.toggleRowExpansion(row)
            this.orderNO = row.orderNO;
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                orderNO: this.orderNO,
            }
            const res = await this.postData("A1040", paramObj);
            console.log(res);

        },
        // 切换分页
        handleCurrentChange (val) {
            this.getFinanceList(val)
        },
        // 获取财务表
        async getFinanceList () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                PageSize: 100,
                pageIndex: 1,
            }
            const res = await this.postData("A1035", paramObj);
            // const res = await this.postData("A1037", paramObj);
            let result = res.res.data;
            console.log(result);
            this.totalNum = result.count;
            this.currentPage = result.pageIndex;
            this.tableData = result.date;
        },
    },
}
</script>

<style lang="less" scoped>
.main {
    .pricesBox {
        text-align: right;
        padding-right: 80px;
        margin-top: 50px;
        margin-bottom: 30px;
        font-size: 20px;
        span {
            color: blue;
            margin-left: 10px;
        }
    }
    .financeList {
        padding: 0 20px;
        /deep/ .el-tabs__nav-wrap.is-top {
            border: 0;
            border-bottom: solid 1px #dddddd !important;
            // padding-left: ;
            padding-left: 30px;
        }
        /deep/ .el-tabs__content {
            padding-left: 20px;
        }
        /deep/ .el-table__header-wrapper {
            margin-top: 5px;
            /deep/ th {
                color: #69373c;
                font-weight: 600;
            }
        }
        .orderStatus {
            .top {
                color: #fcb233;
                padding-top: 20px;
            }
        }
        .operateList {
            .top {
                padding-top: 20px;
                color: #0033cf;
            }
            .foot {
                padding-bottom: 10px;
            }
        }
        .quoteNum {
            img {
                width: 84px;
                height: 75px;
            }
        }
        .quoteName {
            .pic {
                width: 42px;
                height: 37px;
                background-color: #ccc;
                margin-right: 10px;
            }
            img {
                width: 42px;
                height: 37px;
                background-color: #ccc;
            }
        }
    }
    .pagination {
        margin-top: 20px;
        margin-bottom: 20px;
    }
}
</style>

<style>
.el-table__expanded-cell,
.el-table__expanded-cell[class*='cell'] {
    padding: 0;
    padding-left: 100px;
}
.el-table__expanded-cell {
    background-color: #f6f6f6;
}
.el-table__expanded-cell .el-table__header-wrapper {
    margin: 0 !important;
}
.el-table__expanded-cell .el-table__header-wrapper th {
    background-color: #f6f6f6;
}
.el-table__expanded-cell .el-table__body-wrapper .el-table__row {
    background-color: #f6f6f6;
}
.el-table__expanded-cell .hidden-columns {
    background-color: #f6f6f6;
}
.el-table__expanded-cell:hover {
    background-color: #f6f6f6 !important;
}
.gridTable .cell {
    text-align: center;
}
</style>

