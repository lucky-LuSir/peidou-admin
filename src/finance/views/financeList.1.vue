<template>
    <!-- 采购订单 -->
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="com-search-list">
            <el-select style="margin-right: 60px;" size="small" v-model="storeValue" placeholder="请选择">
                <el-option v-for="item in storeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>

            <el-input style="margin-right: 60px; width: 230px;" size="small" v-model="amounts" placeholder="请输入内容"></el-input>
            支付时间：
            <el-date-picker size="small" unlink-panels v-model="payDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <el-button size="small">
                <i class="el-icon-font-sousuo"></i>查询</el-button>
        </div>
        <div class="com-addBtn-list">
            <el-button style="background-color: #019794; border: 1px solid #019794; width: 140px;" @click="exportOrderFn()" type="primary" size="small">导出</el-button>
        </div>
        <div class="main clearfix">
            <div class="financeList">
                <el-table ref="refTable" :data="tableData" stripe style="width: 100%"  @row-click.native="clickTable">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.orderDetail" style="width: 100%">
                                <el-table-column label="订单信息" width="190">
                                </el-table-column>
                                <el-table-column prop="orderNO" label="订单编号/退单编号" width="170">
                                </el-table-column>
                                <el-table-column prop="totalMoney" label="订单/退款金额 (元)" width="170">
                                </el-table-column>
                                <el-table-column prop="createDatetime" label="下单时间/退款时间">
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
                    <el-table-column prop="payDatetime" label="支付时间" width="190">
                    </el-table-column>
                    <el-table-column prop="payType" label="支付方式">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payType == 1">网银</span>
                            <span v-if="scope.row.payType == 2">支付宝</span>
                            <span v-if="scope.row.payType == 3">微信</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="payState" label="支付状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.payState == 1">待支付</span>
                            <span v-if="scope.row.payState == 2">支付成功</span>
                            <span v-if="scope.row.payState == 3">支付失败</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <span style="color: #0000ff; font-size: 14px;">订单明细</span>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination style="margin: 30px 0;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background :total="totalNum">
                </el-pagination>
            </div>
        </div>
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
        }
    },
    components: {
        Header,
    },
    created () {
        this.getFinanceList();
    },
    methods: {
        expandGetData (item) {
            console.log(item);
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
