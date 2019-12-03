<template>
    <!-- 退货管理 -->
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="com-search-list">
            <el-autocomplete style="margin-right: 45px;" size="small" class="inline-input" v-model="inquiryName" :fetch-suggestions="querySearch" placeholder="退单编号/门店名称" @select="handleSelect"></el-autocomplete>
            退货申请时间：
            <el-date-picker unlink-panels style="margin-right: 22px;" size="small" v-model="inquiryDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
            </el-date-picker>
            <el-button @click="queryBtn()" size="small">
                <i class="el-icon-font-sousuo"></i>查询</el-button>
        </div>
        <div class="com-addBtn-list clearfix">
            <el-button style="width: 100px; margin-right: 40px;" class="fr" @click="submitFn()" type="primary" size="small">通过</el-button>
            <el-button style="width: 100px; margin-right: 40px;" class="fr" @click="rejectFn()" type="danger" size="small">拒绝</el-button>
        </div>
        <div class="main clearfix">
            <div class="quoteList">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="topObj.allCount" name="first" lazy>
                        <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
                            <el-table-column width="35" type="selection">
                            </el-table-column>
                            <el-table-column prop="refundID" label="退单编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.refundID}}</i>
                                        </div>
                                        <div class="foot">
                                            <div>
                                                <viewer style="width: 84px;height: 75px;border: 1px solid #dee1e6;">
                                                    <img :src="scope.row.picObj.pics" alt="">
                                                </viewer>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="门店名称" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteName">
                                        <div class="top">
                                            <i>{{scope.row.garagrName}}</i>
                                        </div>
                                        <div class="foot">
                                            <div class="text">
                                                {{scope.row.maker}}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="handleMan" label="申请人" width="180">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="top">
                                            <i>{{scope.row.username}}</i>
                                        </div>
                                        <div class="foot">
                                            <p>VIN：{{scope.row.vinCode}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="createDateTime" label="退货申请时间" width="180">
                            </el-table-column>
                            <el-table-column prop="invoiceType" label="是否开票">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.invoiceType == 1">普票</p>
                                            <p v-if="scope.row.invoiceType == 2">专票</p>
                                            <p v-if="scope.row.invoiceType == 3">无票</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="expressState" label="物流状态">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.expressState == 1">待发货</p>
                                            <p v-if="scope.row.expressState == 2">已发货</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="inquiryState" label="退货状态" width="130">
                                <template slot-scope="scope">
                                    <div class="con orderStatus">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 1">待审核</i>
                                            <i style="color: #ff7e01;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 2">待抵扣</i>
                                            <i style="color: #008000;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 3">审核不通过</i>
                                            <i style="color: #008000;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 4">已抵扣</i>
                                        </div>
                                        <div style="color: #333;" class="foot">
                                            <p style="line-height: 20px;">共{{scope.row.tCount}}件</p>
                                            <p style="line-height: 20px;">合计：¥
                                                <i style="font-weight: 600;">{{scope.row.totalMoney ? scope.row.totalMoney : 0}}</i>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="190">
                                <template slot-scope="scope">
                                    <div class="center opera">
                                        <a href="javascript:;" @click="toRefundDetailFn(scope.row)">查看详情</a>
                                        <a href="javascript:;" @click="toOlderOrderFn(scope.row)">查看原订单</a>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination style="margin: 30px 0;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background :total="totalNum">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane :label="topObj.saymentNO" name="second" lazy>
                        <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
                            <el-table-column width="35" type="selection">
                            </el-table-column>
                            <el-table-column prop="refundID" label="退单编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.refundID}}</i>
                                        </div>
                                        <div class="foot">
                                            <div>
                                                <viewer style="width: 84px;height: 75px;border: 1px solid #dee1e6;">
                                                    <img :src="scope.row.picObj.pics" alt="">
                                                </viewer>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="门店名称" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteName">
                                        <div class="top">
                                            <i>{{scope.row.garagrName}}</i>
                                        </div>
                                        <div class="foot">
                                            <div class="text">
                                                {{scope.row.maker}}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="handleMan" label="申请人" width="180">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="top">
                                            <i>{{scope.row.username}}</i>
                                        </div>
                                        <div class="foot">
                                            <p>VIN：{{scope.row.vinCode}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="createDateTime" label="退货申请时间" width="180">
                            </el-table-column>
                            <el-table-column prop="invoiceType" label="是否开票">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.invoiceType == 1">普票</p>
                                            <p v-if="scope.row.invoiceType == 2">专票</p>
                                            <p v-if="scope.row.invoiceType == 3">无票</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="expressState" label="物流状态">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.expressState == 1">待发货</p>
                                            <p v-if="scope.row.expressState == 2">已发货</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="inquiryState" label="退货状态" width="130">
                                <template slot-scope="scope">
                                    <div class="con orderStatus">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 1">待审核</i>
                                            <i style="color: #ff7e01;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 2">待抵扣</i>
                                            <i style="color: #008000;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 3">审核不通过</i>
                                            <i style="color: #008000;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 4">已抵扣</i>
                                        </div>
                                        <div style="color: #333;" class="foot">
                                            <p style="line-height: 20px;">共{{scope.row.tCount}}件</p>
                                            <p style="line-height: 20px;">合计：¥
                                                <i style="font-weight: 600;">{{scope.row.totalMoney ? scope.row.totalMoney : 0}}</i>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="190">
                                <template slot-scope="scope">
                                    <div class="center opera">
                                        <a href="javascript:;" @click="toRefundDetailFn(scope.row)">查看详情</a>
                                        <a href="javascript:;" @click="toOlderOrderFn(scope.row)">查看原订单</a>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination style="margin: 30px 0;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background :total="totalNum">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane :label="topObj.settlementOK" name="third" lazy>
                        <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
                            <el-table-column width="35" type="selection">
                            </el-table-column>
                            <el-table-column prop="refundID" label="退单编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.refundID}}</i>
                                        </div>
                                        <div class="foot">
                                            <div>
                                                <viewer style="width: 84px;height: 75px;border: 1px solid #dee1e6;">
                                                    <img :src="scope.row.picObj.pics" alt="">
                                                </viewer>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="门店名称" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteName">
                                        <div class="top">
                                            <i>{{scope.row.garagrName}}</i>
                                        </div>
                                        <div class="foot">
                                            <div class="text">
                                                {{scope.row.maker}}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="handleMan" label="申请人" width="180">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="top">
                                            <i>{{scope.row.username}}</i>
                                        </div>
                                        <div class="foot">
                                            <p>VIN：{{scope.row.vinCode}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="createDateTime" label="退货申请时间" width="180">
                            </el-table-column>
                            <el-table-column prop="invoiceType" label="是否开票">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.invoiceType == 1">普票</p>
                                            <p v-if="scope.row.invoiceType == 2">专票</p>
                                            <p v-if="scope.row.invoiceType == 3">无票</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="expressState" label="物流状态">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.expressState == 1">待发货</p>
                                            <p v-if="scope.row.expressState == 2">已发货</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="inquiryState" label="退货状态" width="130">
                                <template slot-scope="scope">
                                    <div class="con orderStatus">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 1">待审核</i>
                                            <i style="color: #ff7e01;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 2">待抵扣</i>
                                            <i style="color: #008000;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 3">审核不通过</i>
                                            <i style="color: #008000;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 4">已抵扣</i>
                                        </div>
                                        <div style="color: #333;" class="foot">
                                            <p style="line-height: 20px;">共{{scope.row.tCount}}件</p>
                                            <p style="line-height: 20px;">合计：¥
                                                <i style="font-weight: 600;">{{scope.row.totalMoney ? scope.row.totalMoney : 0}}</i>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="190">
                                <template slot-scope="scope">
                                    <div class="center opera">
                                        <a href="javascript:;" @click="toRefundDetailFn(scope.row)">查看详情</a>
                                        <a href="javascript:;" @click="toOlderOrderFn(scope.row)">查看原订单</a>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination style="margin: 30px 0;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background :total="totalNum">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane :label="topObj.overdue" name="fourth" lazy>
                        <el-table :data="tableData" style="width: 100%" border @selection-change="handleSelectionChange">
                            <el-table-column width="35" type="selection">
                            </el-table-column>
                            <el-table-column prop="refundID" label="退单编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.refundID}}</i>
                                        </div>
                                        <div class="foot">
                                            <div>
                                                <viewer style="width: 84px;height: 75px;border: 1px solid #dee1e6;">
                                                    <img :src="scope.row.picObj.pics" alt="">
                                                </viewer>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="name" label="门店名称" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteName">
                                        <div class="top">
                                            <i>{{scope.row.garagrName}}</i>
                                        </div>
                                        <div class="foot">
                                            <div class="text">
                                                {{scope.row.maker}}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="handleMan" label="申请人" width="180">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="top">
                                            <i>{{scope.row.username}}</i>
                                        </div>
                                        <div class="foot">
                                            <p>VIN：{{scope.row.vinCode}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="createDateTime" label="退货申请时间" width="180">
                            </el-table-column>
                            <el-table-column prop="invoiceType" label="是否开票">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.invoiceType == 1">普票</p>
                                            <p v-if="scope.row.invoiceType == 2">专票</p>
                                            <p v-if="scope.row.invoiceType == 3">无票</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="expressState" label="物流状态">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.expressState == 1">待发货</p>
                                            <p v-if="scope.row.expressState == 2">已发货</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="inquiryState" label="退货状态" width="130">
                                <template slot-scope="scope">
                                    <div class="con orderStatus">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 1">待审核</i>
                                            <i style="color: #ff7e01;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 2">待抵扣</i>
                                            <i style="color: #008000;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 3">审核不通过</i>
                                            <i style="color: #008000;" @click="toRefundDetailFn(scope.row)" v-if="scope.row.inquiryState == 4">已抵扣</i>
                                        </div>
                                        <div style="color: #333;" class="foot">
                                            <p style="line-height: 20px;">共{{scope.row.tCount}}件</p>
                                            <p style="line-height: 20px;">合计：¥
                                                <i style="font-weight: 600;">{{scope.row.totalMoney ? scope.row.totalMoney : 0}}</i>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="190">
                                <template slot-scope="scope">
                                    <div class="center opera">
                                        <a href="javascript:;" @click="toRefundDetailFn(scope.row)">查看详情</a>
                                        <a href="javascript:;" @click="toOlderOrderFn(scope.row)">查看原订单</a>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination style="margin: 30px 0;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background :total="totalNum">
                        </el-pagination>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>

<script>
import Header from "../../components/Header"

export default {
    data () {
        return {
            headerInfo: '退货管理',
            inquiryName: '',
            inquiryDate: '',
            restaurants: [],
            activeName: 'first',
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            totalNum: 0,
            refundID: '',
            topObj: {
                allCount: '全部状态(0)',
                saymentNO: '挂账中(0)',
                settlementOK: '已结算(0)',
                overdue: '已逾期(0)'
            },
            inquiryState: '',
            multipleSelection: [],
        }
    },
    components: {
        Header,
    },
    created () {
        this.getRefundListFn();
    },
    methods: {
        // 回原订单
        toOlderOrderFn (item) {
            window.sessionStorage.setItem("refundID", item.inquiryID);
            let data = {
                menuName: '采购订单详情',
                item: 'refundOlder',
            };
            this.$emit('backParam', data);
        },
        // 拒绝
        rejectFn () {

        },
        // 通过
        submitFn () {
            // let token = window.sessionStorage.getItem("gn_request_token");
            // let paramObj = {
            //     Token: token,
            //     pageIndex: pageindex,
            //     PageSize: this.pageSize,
            // }
            // console.log(paramObj);

            // let res = await this.postData("A1057", paramObj);
        },
        handleSelectionChange (val) {
            console.log(val);
            this.multipleSelection = val;
        },
        // 查询
        async queryBtn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                pageIndex: 1,
                PageSize: this.pageSize,
                ParamData: this.inquiryName
            }
            let res = await this.postData("A1046", paramObj);
            let result = res.res.data;

            this.topObj = {
                allCount: '全部状态(' + result.top.allCount + ')',
                settlementOK: '已结算(' + result.top.settlementOK + ')',
                saymentNO: '挂账中(' + result.top.saymentNO + ')',
                overdue: '已逾期(' + result.top.overdue + ')',
            }

            if (this.activeName == 'first') {
                this.totalNum = result.top.allCount || 0;
            } else if (this.activeName == 'second') {
                this.totalNum = result.top.saymentNO || 0;
            } else if (this.activeName == 'third') {
                this.totalNum = result.top.settlementOK || 0;
            } else if (this.activeName == 'fourth') {
                this.totalNum = result.top.overdue || 0;
            }
            this.currentPage = result.pageIndex;
            let tableData = result.date;
            for (let i = 0; i < tableData.length; i++) {
                tableData[i].picObj = {
                    pics: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : ''
                }
            }
            this.tableData = tableData;
        },
        // 切换分页
        handleCurrentChange (val) {
            this.getRefundListFn({
                val: val,
                ParamData: '',
                InquiryState: '',
            })
        },
        // 获取订单列表
        async getRefundListFn (listObj) {
            console.log(listObj);

            let pageindex
            if (listObj) {
                pageindex = listObj.val ? listObj.val : 1;
            } else {
                pageindex = 1
            }
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                pageIndex: pageindex,
                PageSize: this.pageSize,
            }

            let res = await this.postData("A1055", paramObj);
            console.log(res);

            if (JSON.stringify(res.res.data) != "{}") {
                let result = res.res.data;

                if (result) {
                    this.topObj = {
                        allCount: '全部状态(' + result.top.allCount + ')',
                        settlementOK: '已结算(' + result.top.settlementOK + ')',
                        saymentNO: '挂账中(' + result.top.saymentNO + ')',
                        overdue: '已逾期(' + result.top.overdue + ')',
                    }
                }

                if (this.activeName == 'first') {
                    this.totalNum = result.top.allCount || 0;
                } else if (this.activeName == 'second') {
                    this.totalNum = result.top.saymentNO || 0;
                } else if (this.activeName == 'third') {
                    this.totalNum = result.top.settlementOK || 0;
                } else if (this.activeName == 'fourth') {
                    this.totalNum = result.top.overdue || 0;
                }
                this.currentPage = result.pageIndex;
                let tableData = result.date;
                for (let i = 0; i < tableData.length; i++) {
                    tableData[i].picObj = {
                        pics: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : ''
                    }
                }
                this.tableData = tableData;
            } else {
            }

        },
        // 查看详情
        toRefundDetailFn (item) {
            this.refundID = item.refundID;
            let RefundObj = {
                inquiryState: item.inquiryState,
                RefundID: item.refundID
            }
            window.sessionStorage.setItem("RefundObj", JSON.stringify(RefundObj));
            let data = {
                menuName: '退货详情',
                item: 'refundListDetail',
            };
            this.$emit('backParam', data);
        },
        querySearch (queryString, cb) {
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
        handleSelect (item) {
        },
        async handleClick (tab, event) {

            if (this.activeName == 'first') {
                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    pageIndex: 1,
                    PageSize: this.pageSize,
                    TopState: 1
                }

                let res = await this.postData("A1055", paramObj);
                console.log(res);

                if (JSON.stringify(res.res.data) != "{}") {
                    let result = res.res.data;

                    this.currentPage = result.pageIndex;
                    let tableData = result.date;
                    for (let i = 0; i < tableData.length; i++) {
                        tableData[i].picObj = {
                            pics: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : ''
                        }
                    }
                    this.tableData = tableData;
                } else {
                    this.$message({
                        type: "error",
                        message: "没有数据"
                    })
                    this.tableData = [];
                }
            } else if (this.activeName == 'second') {
                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    pageIndex: 1,
                    PageSize: this.pageSize,
                    TopState: 2
                }

                let res = await this.postData("A1055", paramObj);
                console.log(res);

                if (JSON.stringify(res.res.data) != "{}") {
                    let result = res.res.data;

                    this.currentPage = result.pageIndex;
                    let tableData = result.date;
                    for (let i = 0; i < tableData.length; i++) {
                        tableData[i].picObj = {
                            pics: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : ''
                        }
                    }
                    this.tableData = tableData;
                } else {
                    this.$message({
                        type: "error",
                        message: "没有数据"
                    })
                    this.tableData = [];
                }
            } else if (this.activeName == 'third') {
                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    pageIndex: 1,
                    PageSize: this.pageSize,
                    TopState: 2
                }

                let res = await this.postData("A1055", paramObj);

                if (JSON.stringify(res.res.data) != "{}") {
                    let result = res.res.data;

                    this.currentPage = result.pageIndex;
                    let tableData = result.date;
                    for (let i = 0; i < tableData.length; i++) {
                        tableData[i].picObj = {
                            pics: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : ''
                        }
                    }
                    this.tableData = tableData;
                } else {
                    this.$message({
                        type: "error",
                        message: "没有数据"
                    })
                    this.tableData = [];
                }
            } else if (this.activeName == 'fourth') {
                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    pageIndex: 1,
                    PageSize: this.pageSize,
                    TopState: 2
                }

                let res = await this.postData("A1055", paramObj);
                console.log(res);

                if (JSON.stringify(res.res.data) != "{}") {
                    let result = res.res.data;

                    this.currentPage = result.pageIndex;
                    let tableData = result.date;
                    for (let i = 0; i < tableData.length; i++) {
                        tableData[i].picObj = {
                            pics: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : ''
                        }
                    }
                    this.tableData = tableData;
                    console.log(this.tableData);

                } else {
                    this.$message({
                        type: "error",
                        message: "没有数据"
                    })
                    this.tableData = [];
                }
            }
        }
    },
}
</script>

<style lang="less" scoped>
.main {
    .quoteList {
        /deep/ .el-tabs__nav-wrap.is-top {
            border: 0;
            border-bottom: solid 1px #dddddd !important;
            // padding-left: ;
            padding-left: 30px;
        }
        /deep/ .el-tabs__content {
            padding-left: 20px;
            padding: 20px;
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
        .opera {
            justify-content: space-between;
            a {
                color: #409eff;
            }
        }
    }
    .pagination {
        margin-top: 20px;
        margin-bottom: 20px;
    }
}
.demo-drawer__content {
    padding-top: 20px;
    .uploadBtn {
        margin-top: 20px;
    }
}
</style>
