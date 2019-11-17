<template>
    <!-- 询价报价 -->
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="com-search-list">
            <el-autocomplete style="margin-right: 45px;" size="small" class="inline-input" v-model="inquiryName" :fetch-suggestions="querySearch" placeholder="询价编号/门店名称" @select="handleSelect"></el-autocomplete>
            询价时间：
            <el-date-picker unlink-panels style="margin-right: 22px;" size="small" v-model="inquiryDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
            </el-date-picker>
            <el-button @click="queryBtn()" size="small">
                <i class="el-icon-font-sousuo"></i>查询</el-button>
        </div>
        <div class="com-addBtn-list">
            <el-button @click="addQuoteList()" type="primary" size="small">创建询单价</el-button>
        </div>
        <div class="main clearfix">
            <div class="quoteList">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="topObj.allCount" name="first">
                        <el-table :data="tableData" style="width: 100%" border>
                            <el-table-column prop="firstObj" label="询价编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.firstObj.inquiryID}}</i>
                                        </div>
                                        <div class="foot">
                                            <div>
                                                <viewer style="width: 84px;height: 75px;border: 1px solid #dee1e6;">
                                                    <img style="border: 1px solid #dee1e6;" :src="scope.row.firstObj.pictures" alt="">
                                                </viewer>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="secondObj" label="门店名称" width="240">
                                <template slot-scope="scope">
                                    <div class="con quoteName">
                                        <div class="top">
                                            <i>{{scope.row.secondObj.garagrName}}</i>
                                        </div>
                                        <div class="foot">
                                            <div class="text">
                                                {{scope.row.secondObj.maker}}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column sortable prop="threeObj" label="询价时间" width="190">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="top">
                                            <i>{{scope.row.threeObj.createDateTime}}</i>
                                        </div>
                                        <div class="foot">
                                            <p>VIN：{{scope.row.threeObj.vinCode}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceType" label="是否开票">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.invoiceType == 1">无票</p>
                                            <p v-if="scope.row.invoiceType == 2">普票</p>
                                            <p v-if="scope.row.invoiceType == 3">专票</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="fiveObj" label="订单状态">
                                <template slot-scope="scope">
                                    <div class="con orderStatus" @click="toRobList(scope.row)">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" v-if="scope.row.fiveObj.inquiryState == 1">待报价</i>
                                            <i style="color: #ff7e01;" v-if="scope.row.fiveObj.inquiryState == 2">待确认</i>
                                            <i style="color: #008000;" v-if="scope.row.fiveObj.inquiryState == 3">已确认</i>
                                            <i style="color: #666666;" v-if="scope.row.fiveObj.inquiryState == 4">已取消</i>
                                            <i style="color: #0033ff;" v-if="scope.row.fiveObj.inquiryState == 5">待完善</i>
                                        </div>
                                        <div style="color: #333;" class="foot">
                                            <p style="line-height: 20px;">共{{scope.row.fiveObj.tCount}}件</p>
                                            <p style="line-height: 20px;">合计：¥
                                                <i style="font-weight: 600;">{{scope.row.fiveObj.totalMoney ? scope.row.fiveObj.totalMoney : 0}}</i>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" label="处理人">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p>{{scope.row.username}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="inquiryState" label="操作">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <el-button @click="grabSheet(scope.row)" v-if="scope.row.inquiryState == 1" type="primary">抢单</el-button>
                                            <el-button size="mini" @click="toRobList(scope.row)" v-if="scope.row.inquiryState != 1">查看详情</el-button>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination style="margin: 30px 0;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background :total="totalNum">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane :label="topObj.stage" name="second">
                        <el-table :data="tableData" style="width: 100%" border>
                            <el-table-column prop="firstObj" label="询价编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.firstObj.inquiryID}}</i>
                                        </div>
                                        <div class="foot">
                                            <img :src="scope.row.firstObj.pictures" alt="">
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="secondObj" label="门店名称" width="240">
                                <template slot-scope="scope">
                                    <div class="con quoteName">
                                        <div class="top">
                                            <i>{{scope.row.secondObj.garagrName}}</i>
                                        </div>
                                        <div class="foot">
                                            <div class="text">
                                                {{scope.row.secondObj.maker}}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column sortable prop="threeObj" label="询价时间" width="190">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="top">
                                            <i>{{scope.row.threeObj.createDateTime}}</i>
                                        </div>
                                        <div class="foot">
                                            <p>VIN：{{scope.row.threeObj.vinCode}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceType" label="是否开票">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.invoiceType == 1">无票</p>
                                            <p v-if="scope.row.invoiceType == 2">普票</p>
                                            <p v-if="scope.row.invoiceType == 3">专票</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="fiveObj" label="订单状态">
                                <template slot-scope="scope">
                                    <div class="con orderStatus" @click="toRobList(scope.row)">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" v-if="scope.row.fiveObj.inquiryState == 1">待报价</i>
                                            <i style="color: #ff7e01;" v-if="scope.row.fiveObj.inquiryState == 2">待确认</i>
                                            <i style="color: #008000;" v-if="scope.row.fiveObj.inquiryState == 3">已确认</i>
                                            <i style="color: #666666;" v-if="scope.row.fiveObj.inquiryState == 4">已取消</i>
                                            <i style="color: #0033ff;" v-if="scope.row.fiveObj.inquiryState == 5">待完善</i>
                                        </div>
                                        <div style="color: #333;" class="foot">
                                            <p style="line-height: 20px;">共{{scope.row.fiveObj.tCount}}件</p>
                                            <p style="line-height: 20px;">合计：¥
                                                <i style="font-weight: 600;">{{scope.row.fiveObj.totalMoney ? scope.row.fiveObj.totalMoney : 0}}</i>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" label="处理人">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p>{{scope.row.username}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="inquiryState" label="操作">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <el-button @click="grabSheet(scope.row)" v-if="scope.row.inquiryState == 1" type="primary">抢单</el-button>
                                            <el-button size="mini" @click="toRobList(scope.row)" v-if="scope.row.inquiryState != 1">查看详情</el-button>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane :label="topObj.noquote" name="third">
                        <el-table :data="tableData" style="width: 100%" border>
                            <el-table-column prop="firstObj" label="询价编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.firstObj.inquiryID}}</i>
                                        </div>
                                        <div class="foot">
                                            <img :src="scope.row.firstObj.pictures" alt="">
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="secondObj" label="门店名称" width="240">
                                <template slot-scope="scope">
                                    <div class="con quoteName">
                                        <div class="top">
                                            <i>{{scope.row.secondObj.garagrName}}</i>
                                        </div>
                                        <div class="foot">
                                            <div class="text">
                                                {{scope.row.secondObj.maker}}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column sortable prop="threeObj" label="询价时间" width="190">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="top">
                                            <i>{{scope.row.threeObj.createDateTime}}</i>
                                        </div>
                                        <div class="foot">
                                            <p>VIN：{{scope.row.threeObj.vinCode}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceType" label="是否开票">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.invoiceType == 1">无票</p>
                                            <p v-if="scope.row.invoiceType == 2">普票</p>
                                            <p v-if="scope.row.invoiceType == 3">专票</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="fiveObj" label="订单状态">
                                <template slot-scope="scope">
                                    <div class="con orderStatus" @click="toRobList(scope.row)">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" v-if="scope.row.fiveObj.inquiryState == 1">待报价</i>
                                            <i style="color: #ff7e01;" v-if="scope.row.fiveObj.inquiryState == 2">待确认</i>
                                            <i style="color: #008000;" v-if="scope.row.fiveObj.inquiryState == 3">已确认</i>
                                            <i style="color: #666666;" v-if="scope.row.fiveObj.inquiryState == 4">已取消</i>
                                            <i style="color: #0033ff;" v-if="scope.row.fiveObj.inquiryState == 5">待完善</i>
                                        </div>
                                        <div style="color: #333;" class="foot">
                                            <p style="line-height: 20px;">共{{scope.row.fiveObj.tCount}}件</p>
                                            <p style="line-height: 20px;">合计：¥
                                                <i style="font-weight: 600;">{{scope.row.fiveObj.totalMoney ? scope.row.fiveObj.totalMoney : 0}}</i>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" label="处理人">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p>{{scope.row.username}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="inquiryState" label="操作">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <el-button @click="grabSheet(scope.row)" v-if="scope.row.inquiryState == 1" type="primary">抢单</el-button>
                                            <el-button size="mini" @click="toRobList(scope.row)" v-if="scope.row.inquiryState != 1">查看详情</el-button>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane :label="topObj.noconfirm" name="fourth">
                        <el-table :data="tableData" style="width: 100%" border>
                            <el-table-column prop="firstObj" label="询价编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.firstObj.inquiryID}}</i>
                                        </div>
                                        <div class="foot">
                                            <img :src="scope.row.firstObj.pictures" alt="">
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="secondObj" label="门店名称" width="240">
                                <template slot-scope="scope">
                                    <div class="con quoteName">
                                        <div class="top">
                                            <i>{{scope.row.secondObj.garagrName}}</i>
                                        </div>
                                        <div class="foot">
                                            <div class="text">
                                                {{scope.row.secondObj.maker}}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column sortable prop="threeObj" label="询价时间" width="190">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="top">
                                            <i>{{scope.row.threeObj.createDateTime}}</i>
                                        </div>
                                        <div class="foot">
                                            <p>VIN：{{scope.row.threeObj.vinCode}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceType" label="是否开票">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.invoiceType == 1">无票</p>
                                            <p v-if="scope.row.invoiceType == 2">普票</p>
                                            <p v-if="scope.row.invoiceType == 3">专票</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="fiveObj" label="订单状态">
                                <template slot-scope="scope">
                                    <div class="con orderStatus" @click="toRobList(scope.row)">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" v-if="scope.row.fiveObj.inquiryState == 1">待报价</i>
                                            <i style="color: #ff7e01;" v-if="scope.row.fiveObj.inquiryState == 2">待确认</i>
                                            <i style="color: #008000;" v-if="scope.row.fiveObj.inquiryState == 3">已确认</i>
                                            <i style="color: #666666;" v-if="scope.row.fiveObj.inquiryState == 4">已取消</i>
                                            <i style="color: #0033ff;" v-if="scope.row.fiveObj.inquiryState == 5">待完善</i>
                                        </div>
                                        <div style="color: #333;" class="foot">
                                            <p style="line-height: 20px;">共{{scope.row.fiveObj.tCount}}件</p>
                                            <p style="line-height: 20px;">合计：¥
                                                <i style="font-weight: 600;">{{scope.row.fiveObj.totalMoney ? scope.row.fiveObj.totalMoney : 0}}</i>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" label="处理人">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p>{{scope.row.username}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="inquiryState" label="操作">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <el-button @click="grabSheet(scope.row)" v-if="scope.row.inquiryState == 1" type="primary">抢单</el-button>
                                            <el-button size="mini" @click="toRobList(scope.row)" v-if="scope.row.inquiryState != 1">查看详情</el-button>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane :label="topObj.okconfirm" name="five">
                        <el-table :data="tableData" style="width: 100%" border>
                            <el-table-column prop="firstObj" label="询价编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.firstObj.inquiryID}}</i>
                                        </div>
                                        <div class="foot">
                                            <img :src="scope.row.firstObj.pictures" alt="">
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="secondObj" label="门店名称" width="240">
                                <template slot-scope="scope">
                                    <div class="con quoteName">
                                        <div class="top">
                                            <i>{{scope.row.secondObj.garagrName}}</i>
                                        </div>
                                        <div class="foot">
                                            <div class="text">
                                                {{scope.row.secondObj.maker}}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column sortable prop="threeObj" label="询价时间" width="190">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="top">
                                            <i>{{scope.row.threeObj.createDateTime}}</i>
                                        </div>
                                        <div class="foot">
                                            <p>VIN：{{scope.row.threeObj.vinCode}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceType" label="是否开票">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.invoiceType == 1">无票</p>
                                            <p v-if="scope.row.invoiceType == 2">普票</p>
                                            <p v-if="scope.row.invoiceType == 3">专票</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="fiveObj" label="订单状态">
                                <template slot-scope="scope">
                                    <div class="con orderStatus" @click="toRobList(scope.row)">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" v-if="scope.row.fiveObj.inquiryState == 1">待报价</i>
                                            <i style="color: #ff7e01;" v-if="scope.row.fiveObj.inquiryState == 2">待确认</i>
                                            <i style="color: #008000;" v-if="scope.row.fiveObj.inquiryState == 3">已确认</i>
                                            <i style="color: #666666;" v-if="scope.row.fiveObj.inquiryState == 4">已取消</i>
                                            <i style="color: #0033ff;" v-if="scope.row.fiveObj.inquiryState == 5">待完善</i>
                                        </div>
                                        <div style="color: #333;" class="foot">
                                            <p style="line-height: 20px;">共{{scope.row.fiveObj.tCount}}件</p>
                                            <p style="line-height: 20px;">合计：¥
                                                <i style="font-weight: 600;">{{scope.row.fiveObj.totalMoney ? scope.row.fiveObj.totalMoney : 0}}</i>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" label="处理人">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p>{{scope.row.username}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="inquiryState" label="操作">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <el-button @click="grabSheet(scope.row)" v-if="scope.row.inquiryState == 1" type="primary">抢单</el-button>
                                            <el-button size="mini" @click="toRobList(scope.row)" v-if="scope.row.inquiryState != 1">查看详情</el-button>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane :label="topObj.cancel" name="six">
                        <el-table :data="tableData" style="width: 100%" border>
                            <el-table-column prop="firstObj" label="询价编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.firstObj.inquiryID}}</i>
                                        </div>
                                        <div class="foot">
                                            <img :src="scope.row.firstObj.pictures" alt="">
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="secondObj" label="门店名称" width="240">
                                <template slot-scope="scope">
                                    <div class="con quoteName">
                                        <div class="top">
                                            <i>{{scope.row.secondObj.garagrName}}</i>
                                        </div>
                                        <div class="foot">
                                            <div class="text">
                                                {{scope.row.secondObj.maker}}
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column sortable prop="threeObj" label="询价时间" width="190">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="top">
                                            <i>{{scope.row.threeObj.createDateTime}}</i>
                                        </div>
                                        <div class="foot">
                                            <p>VIN：{{scope.row.threeObj.vinCode}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="invoiceType" label="是否开票">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p v-if="scope.row.invoiceType == 1">无票</p>
                                            <p v-if="scope.row.invoiceType == 2">普票</p>
                                            <p v-if="scope.row.invoiceType == 3">专票</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="fiveObj" label="订单状态">
                                <template slot-scope="scope">
                                    <div class="con orderStatus" @click="toRobList(scope.row)">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" v-if="scope.row.fiveObj.inquiryState == 1">待报价</i>
                                            <i style="color: #ff7e01;" v-if="scope.row.fiveObj.inquiryState == 2">待确认</i>
                                            <i style="color: #008000;" v-if="scope.row.fiveObj.inquiryState == 3">已确认</i>
                                            <i style="color: #666666;" v-if="scope.row.fiveObj.inquiryState == 4">已取消</i>
                                            <i style="color: #0033ff;" v-if="scope.row.fiveObj.inquiryState == 5">待完善</i>
                                        </div>
                                        <div style="color: #333;" class="foot">
                                            <p style="line-height: 20px;">共{{scope.row.fiveObj.tCount}}件</p>
                                            <p style="line-height: 20px;">合计：¥
                                                <i style="font-weight: 600;">{{scope.row.fiveObj.totalMoney ? scope.row.fiveObj.totalMoney : 0}}</i>
                                            </p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="username" label="处理人">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <p>{{scope.row.username}}</p>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column prop="inquiryState" label="操作">
                                <template slot-scope="scope">
                                    <div class="con">
                                        <div class="center">
                                            <el-button @click="grabSheet(scope.row)" v-if="scope.row.inquiryState == 1" type="primary">抢单</el-button>
                                            <el-button size="mini" @click="toRobList(scope.row)" v-if="scope.row.inquiryState != 1">查看详情</el-button>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
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
            headerInfo: '询价报价',
            inquiryName: '',
            inquiryDate: '',
            restaurants: [],
            activeName: 'first',
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            totalNum: 0,
            topObj: {
                allCount: '全部状态(0)',
                stage: '待完善(0)',
                noquote: '待报价(0)',
                noconfirm: '待确认(0)',
                okconfirm: '已确认(0)',
                cancel: '已取消(0)',
            },
        }
    },
    components: {
        Header,
    },
    props: ["homeStatus"],
    created () {
        console.log(this.homeStatus);

        if (this.homeStatus == 1) {
            this.activeName = "second"
        } else if (this.homeStatus == 2) {
            this.activeName = "third"
        } else if (this.homeStatus) {
            this.activeName = "five"
        }
        this.getQuoteListFn();
    },
    methods: {
        async queryBtn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                pageIndex: 1,
                PageSize: this.pageSize,
                ParamData: this.inquiryName
            }
            const res = await this.postData("A1022", paramObj);
            let result = res.res.data;
            this.totalNum = result.top.allCount;
            this.currentPage = result.pageIndex;

            let tableData = res.res.data.date;
            for (let i = 0; i < tableData.length; i++) {

                tableData[i].firstObj = {
                    inquiryID: tableData[i] ? tableData[i].inquiryID : '',
                    pictures: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : '',
                }
                tableData[i].secondObj = {
                    garagrName: tableData[i] ? tableData[i].garagrName : '',
                    maker: tableData[i] ? tableData[i].maker : '',
                }
                tableData[i].threeObj = {
                    createDateTime: tableData[i] ? tableData[i].createDateTime : '',
                    vinCode: tableData[i] ? tableData[i].vinCode : ''
                }
                tableData[i].fiveObj = {
                    inquiryState: tableData[i] ? tableData[i].inquiryState : '',
                    totalMoney: tableData[i] ? tableData[i].totalMoney : '',
                    tCount: tableData[i] ? tableData[i].tCount : '',
                }
            }
            this.tableData = tableData;
        },
        handleCurrentChange (val) {
            this.getQuoteListFn(val);
        },
        // 抢单
        async grabSheet (item) {
            let token = window.sessionStorage.getItem("gn_request_token");

            let paramObj = {
                Token: token,
                InquiryInfo: {
                    InquiryID: item.inquiryID
                }
            }

            const res = await this.postData("A1024", paramObj);
            console.log(res);

            if (res.code == '0') {
                this.$message({
                    type: "success",
                    message: "抢单成功"
                })

                window.sessionStorage.setItem('quoteStatusObj', JSON.stringify(item));

                let data = {
                    menuName: '询价订单',
                    item: 'quoteOrderList',
                };
                this.$emit('backParam', data);
            }
        },
        // 走详情
        async toRobList (item) {
            console.log(item);

            let token = window.sessionStorage.getItem("gn_request_token");

            let paramObj = {
                Token: token,
                InquiryID: item.inquiryID
            }
            const res = await this.postData("A1023", paramObj);

            if (res.code == '0') {
                console.log(res);
                if (res.res.msg == '您不是该订单的处理人，无法查看详情') {
                    this.$message({
                        type: "success",
                        message: res.res.msg
                    })
                    return;
                }
                this.$message({
                    type: "success",
                    message: res.res.msg
                })

                window.sessionStorage.setItem('quoteStatusObj', JSON.stringify(item));
                let data = {
                    menuName: '询价订单',
                    item: 'quoteOrderList',
                };
                this.$emit('backParam', data);

            }
        },
        // 创建询单价
        addQuoteList () {
            let data = {
                menuName: '创建询单价',
                item: 'addQuoteList',
            };
            this.$emit('backParam', data);
        },
        // 获取询价列表
        async getQuoteListFn (val) {
            let pageindex = val;
            if (!pageindex) {
                pageindex = 1
            }
            let token = window.sessionStorage.getItem("gn_request_token");

            let paramObj = {
                Token: token,
                PageSize: this.pageSize,
                pageIndex: pageindex,
            }
            const res = await this.postData("A1022", paramObj);
            let result = res.res.data;
            console.log(result);

            this.totalNum = result.top.allCount;
            this.currentPage = result.pageIndex;

            let tableData = res.res.data.date;
            for (let i = 0; i < tableData.length; i++) {

                tableData[i].firstObj = {
                    inquiryID: tableData[i] ? tableData[i].inquiryID : '',
                    pictures: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : '',
                }
                tableData[i].secondObj = {
                    garagrName: tableData[i] ? tableData[i].garagrName : '',
                    maker: tableData[i] ? tableData[i].maker : '',
                }
                tableData[i].threeObj = {
                    createDateTime: tableData[i] ? tableData[i].createDateTime : '',
                    vinCode: tableData[i] ? tableData[i].vinCode : ''
                }
                tableData[i].fiveObj = {
                    inquiryState: tableData[i] ? tableData[i].inquiryState : '',
                    totalMoney: tableData[i] ? tableData[i].totalMoney : '',
                    tCount: tableData[i] ? tableData[i].tCount : '',
                }
            }
            console.log(result);

            if (res.res.data) {
                let result = res.res.data;
                console.log(result);

                if (result) {
                    this.topObj = {
                        allCount: '全部(' + result.top.allCount + ')',
                        stage: '待完善(' + result.top.stage + ')',
                        noquote: '待报价(' + result.top.noquote + ')',
                        noconfirm: '待确认(' + result.top.noconfirm + ')',
                        okconfirm: '已确认(' + result.top.okconfirm + ')',
                        cancel: '已取消(' + result.top.cancel + ')',
                    }
                }

                if (this.activeName == 'first') {
                    this.totalNum = result.top.allCount || 0;
                } else if (this.activeName == 'second') {
                    this.totalNum = result.top.stage || 0;
                } else if (this.activeName == 'third') {
                    this.totalNum = result.top.noquote || 0;
                } else if (this.activeName == 'fourth') {
                    this.totalNum = result.top.noconfirm || 0;
                } else if (this.activeName == 'fourth') {
                    this.totalNum = result.top.okconfirm || 0;
                } else if (this.activeName == 'fourth') {
                    this.totalNum = result.top.cancel || 0;
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
                console.log("没有数据");
                this.tableData = [];
            }
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
                    PageSize: this.pageSize,
                    pageIndex: 1,
                }
                const res = await this.postData("A1022", paramObj);
                let result = res.res.data;
                if (JSON.stringify(result) != "{}") {
                    this.totalNum = result.top.allCount;
                    this.currentPage = result.pageIndex;

                    let tableData = res.res.data.date;
                    for (let i = 0; i < tableData.length; i++) {

                        tableData[i].firstObj = {
                            inquiryID: tableData[i] ? tableData[i].inquiryID : '',
                            pictures: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : '',
                        }
                        tableData[i].secondObj = {
                            garagrName: tableData[i] ? tableData[i].garagrName : '',
                            maker: tableData[i] ? tableData[i].maker : '',
                        }
                        tableData[i].threeObj = {
                            createDateTime: tableData[i] ? tableData[i].createDateTime : '',
                            vinCode: tableData[i] ? tableData[i].vinCode : ''
                        }
                        tableData[i].fiveObj = {
                            inquiryState: tableData[i] ? tableData[i].inquiryState : '',
                            totalMoney: tableData[i] ? tableData[i].totalMoney : '',
                            tCount: tableData[i] ? tableData[i].tCount : '',
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
                    PageSize: this.pageSize,
                    pageIndex: 1,
                    TopState: 5
                }
                const res = await this.postData("A1022", paramObj);
                let result = res.res.data;
                console.log(result);
                if (JSON.stringify(result) != "{}") {
                    this.totalNum = result.top.allCount;
                    this.currentPage = result.pageIndex;

                    let tableData = res.res.data.date;
                    for (let i = 0; i < tableData.length; i++) {

                        tableData[i].firstObj = {
                            inquiryID: tableData[i] ? tableData[i].inquiryID : '',
                            pictures: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : '',
                        }
                        tableData[i].secondObj = {
                            garagrName: tableData[i] ? tableData[i].garagrName : '',
                            maker: tableData[i] ? tableData[i].maker : '',
                        }
                        tableData[i].threeObj = {
                            createDateTime: tableData[i] ? tableData[i].createDateTime : '',
                            vinCode: tableData[i] ? tableData[i].vinCode : ''
                        }
                        tableData[i].fiveObj = {
                            inquiryState: tableData[i] ? tableData[i].inquiryState : '',
                            totalMoney: tableData[i] ? tableData[i].totalMoney : '',
                            tCount: tableData[i] ? tableData[i].tCount : '',
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
                    PageSize: this.pageSize,
                    pageIndex: 1,
                    TopState: 1
                }
                const res = await this.postData("A1022", paramObj);
                let result = res.res.data;
                console.log(result);
                if (JSON.stringify(result) != "{}") {
                    this.totalNum = result.top.allCount;
                    this.currentPage = result.pageIndex;

                    let tableData = res.res.data.date;
                    for (let i = 0; i < tableData.length; i++) {

                        tableData[i].firstObj = {
                            inquiryID: tableData[i] ? tableData[i].inquiryID : '',
                            pictures: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : '',
                        }
                        tableData[i].secondObj = {
                            garagrName: tableData[i] ? tableData[i].garagrName : '',
                            maker: tableData[i] ? tableData[i].maker : '',
                        }
                        tableData[i].threeObj = {
                            createDateTime: tableData[i] ? tableData[i].createDateTime : '',
                            vinCode: tableData[i] ? tableData[i].vinCode : ''
                        }
                        tableData[i].fiveObj = {
                            inquiryState: tableData[i] ? tableData[i].inquiryState : '',
                            totalMoney: tableData[i] ? tableData[i].totalMoney : '',
                            tCount: tableData[i] ? tableData[i].tCount : '',
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
                    PageSize: this.pageSize,
                    pageIndex: 1,
                    TopState: 2
                }
                const res = await this.postData("A1022", paramObj);
                let result = res.res.data;
                console.log(result);
                if (JSON.stringify(result) != "{}") {
                    this.totalNum = result.top.allCount;
                    this.currentPage = result.pageIndex;

                    let tableData = res.res.data.date;
                    for (let i = 0; i < tableData.length; i++) {

                        tableData[i].firstObj = {
                            inquiryID: tableData[i] ? tableData[i].inquiryID : '',
                            pictures: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : '',
                        }
                        tableData[i].secondObj = {
                            garagrName: tableData[i] ? tableData[i].garagrName : '',
                            maker: tableData[i] ? tableData[i].maker : '',
                        }
                        tableData[i].threeObj = {
                            createDateTime: tableData[i] ? tableData[i].createDateTime : '',
                            vinCode: tableData[i] ? tableData[i].vinCode : ''
                        }
                        tableData[i].fiveObj = {
                            inquiryState: tableData[i] ? tableData[i].inquiryState : '',
                            totalMoney: tableData[i] ? tableData[i].totalMoney : '',
                            tCount: tableData[i] ? tableData[i].tCount : '',
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
            } else if (this.activeName == 'five') {
                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    PageSize: this.pageSize,
                    pageIndex: 1,
                    TopState: 3
                }
                const res = await this.postData("A1022", paramObj);
                let result = res.res.data;
                console.log(result);
                if (JSON.stringify(result) != "{}") {
                    this.totalNum = result.top.allCount;
                    this.currentPage = result.pageIndex;

                    let tableData = res.res.data.date;
                    for (let i = 0; i < tableData.length; i++) {

                        tableData[i].firstObj = {
                            inquiryID: tableData[i] ? tableData[i].inquiryID : '',
                            pictures: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : '',
                        }
                        tableData[i].secondObj = {
                            garagrName: tableData[i] ? tableData[i].garagrName : '',
                            maker: tableData[i] ? tableData[i].maker : '',
                        }
                        tableData[i].threeObj = {
                            createDateTime: tableData[i] ? tableData[i].createDateTime : '',
                            vinCode: tableData[i] ? tableData[i].vinCode : ''
                        }
                        tableData[i].fiveObj = {
                            inquiryState: tableData[i] ? tableData[i].inquiryState : '',
                            totalMoney: tableData[i] ? tableData[i].totalMoney : '',
                            tCount: tableData[i] ? tableData[i].tCount : '',
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

            } else if (this.activeName == 'six') {
                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    PageSize: this.pageSize,
                    pageIndex: 1,
                    TopState: 4
                }
                const res = await this.postData("A1022", paramObj);
                let result = res.res.data;
                console.log(result);
                if (JSON.stringify(result) != "{}") {
                    this.totalNum = result.top.allCount;
                    this.currentPage = result.pageIndex;

                    let tableData = res.res.data.date;
                    for (let i = 0; i < tableData.length; i++) {

                        tableData[i].firstObj = {
                            inquiryID: tableData[i] ? tableData[i].inquiryID : '',
                            pictures: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : '',
                        }
                        tableData[i].secondObj = {
                            garagrName: tableData[i] ? tableData[i].garagrName : '',
                            maker: tableData[i] ? tableData[i].maker : '',
                        }
                        tableData[i].threeObj = {
                            createDateTime: tableData[i] ? tableData[i].createDateTime : '',
                            vinCode: tableData[i] ? tableData[i].vinCode : ''
                        }
                        tableData[i].fiveObj = {
                            inquiryState: tableData[i] ? tableData[i].inquiryState : '',
                            totalMoney: tableData[i] ? tableData[i].totalMoney : '',
                            tCount: tableData[i] ? tableData[i].tCount : '',
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
            padding-right: 20px;
        }
        /deep/ .el-table__header-wrapper {
            margin-top: 5px;
            /deep/ th {
                color: #69373c;
                font-weight: 600;
            }
        }

        .orderStatus {
            color: #fcb233;
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
