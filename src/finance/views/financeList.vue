<template>
    <!-- 采购订单 -->
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="com-search-list">
            <!-- <el-select style="margin-right: 60px;" size="small" v-model="storeValue" placeholder="付款门店名称">
                <el-option v-for="item in storeList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select> -->
            <el-input style="margin-right: 60px;width: 230px;" size="small" v-model="storeValue" placeholder="付款门店名称"></el-input>

            <el-input style="margin-right: 60px; width: 230px;" size="small" v-model="amounts" placeholder="付款金额"></el-input>
            支付时间：
            <el-date-picker size="small" unlink-panels v-model="payDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <el-button @click="queryBtn()" size="small">
                <i class="el-icon-font-sousuo"></i>查询</el-button>
        </div>
        <div class="com-addBtn-list clearfix" style="padding: 0 100px 0 30px;">
            <el-button style="background-color: #019794; border: 1px solid #019794; width: 140px;" @click="exportOrderFn()" type="primary" size="small">导出</el-button>
            <!-- <el-button style="width: 100px;" class="fr" @click="submitFn()" type="primary" size="small" >通过</el-button>
            <el-button style="width: 100px;" class="fr" @click="rejectFn()" type="danger" size="small">拒绝</el-button> -->
        </div>
        <div class="main clearfix">
            <div class="financeList">
                <el-table @selection-change="handleSelectionChange" :data="tableData" @row-click="clickTable" ref="refTable" style="width: 100%">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-table :data="props.row.orderDetail" style="width: 100%">
                                <el-table-column label="订单信息" width="190">
                                </el-table-column>
                                <el-table-column prop="inquiryID" label="订单编号/退单编号" width="170">
                                </el-table-column>
                                <el-table-column prop="totalMoney" label="订单/退款金额 (元)" width="170">
                                </el-table-column>
                                <el-table-column prop="createDatetime" label="下单时间/退款时间">
                                </el-table-column>
                                <el-table-column>
                                    <template slot-scope="scope">
                                        <!-- <span @click="getOldOrderListDialogFn(scope.row)" style="display: inline-block; color: #0000ff; font-size: 14px;">操作记录</span> -->
                                        <a href="javascript:;" v-if="props.row.payType == 1" @click="confirmDialogFn(props.row)" style="display: inline-block; color: #0000ff; font-size: 14px;maigin-left: 10px;">确认收款</a>
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
                    <!-- <el-table-column prop="reviewState" label="审核状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.reviewState == 1">申请中</span>
                            <span v-if="scope.row.reviewState == 2">审核通过</span>
                            <span v-if="scope.row.reviewState == 3">审核不通过</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <span style="color: #0000ff; font-size: 14px;">订单明细</span>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pricesBox" style="margin-right: 60px;">
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
        <el-dialog title="操作记录" :visible.sync="dialogVisible" width="800px">
            <el-table :data="gridData">
                <el-table-column property="date" label="时间" width="150"></el-table-column>
                <el-table-column property="name" label="操作人" width="200"></el-table-column>
                <el-table-column property="address" label="内容"></el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
        </el-dialog>
        <el-dialog title="是否确认已收到该笔款项" :visible.sync="dateDialogVisible" width="400px">
            <!-- <span>这是一段信息</span> -->
            支付时间：
            <el-date-picker v-model="dateValue" type="date" placeholder="选择日期">
            </el-date-picker>
            <!-- <span>{{}}</span> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dateDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmFn()">确 定</el-button>
            </span>
        </el-dialog>

        <!--  -->
    </div>
</template>

<script>
import Header from "../../components/Header"

export default {
    data () {
        return {
            dateValue: '',
            dateDialogVisible: false,
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
            itemObj: {},
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
        this.dateValue = new Date();
        this.getFinanceList();
    },
    methods: {
        async queryBtn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                PageSize: this.pageSize,
                pageIndex: 1,
                // totalMoney: this.amounts,
                // garagrName: this.storeValue,
            }
            const res = await this.postData("A1035", paramObj);
            console.log(res);
        },
        async confirmFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                orderNO: this.itemObj.orderNO
            }
            let res = await this.postData("A1052", paramObj);
            console.log(res);

            this.$message({
                type: 'success',
                message: '操作成功!'
            });
            this.dateDialogVisible = false;
            
        },
        confirmDialogFn (item) {
            this.itemObj = item;
            this.dateDialogVisible = true;
            // this.$confirm('您将要确认收款吗?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(async () => {

            // }).catch(() => {
            //     this.$message({
            //         type: 'info',
            //         message: '已取消'
            //     });
            // });
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
            this.dialogOrderNo = item.orderNO;
            console.log(this.dialogOrderNo);
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                OrderNO: this.dialogOrderNo
            }
            const res = await this.postData("A1049", paramObj);
            console.log(res);
            this.dialogVisible = true;
        },
        // 拒绝
        // async rejectFn () {
        //     let token = window.sessionStorage.getItem("gn_request_token");
        //     let paramObj = {
        //         Token: token,
        //         NOList: {
        //             orderState: 3,
        //             OrderNo: this.orderArr
        //         }
        //     }
        //     const res = await this.postData("A1041", paramObj);
        //     console.log(res);
        //     if (res.code == '0') {
        //         this.$message({
        //             type: "success",
        //             message: res.res.msg
        //         })
        //         this.getFinanceList();
        //     }
        // },
        // // 通过
        // async submitFn () {
        //     let token = window.sessionStorage.getItem("gn_request_token");
        //     let paramObj = {
        //         Token: token,
        //         NOList: {
        //             orderState: 2,
        //             OrderNo: this.orderArr
        //         }
        //     }
        //     const res = await this.postData("A1041", paramObj);
        //     console.log(res);
        //     if (res.code == '0') {
        //         this.$message({
        //             type: "success",
        //             message: res.res.msg
        //         })
        //         this.getFinanceList();
        //     }
        // },
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
                PageSize: this.pageSize,
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
        padding-right: 100px;
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
</style>

