<template>
    <!-- 采购订单 -->
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="com-search-list">
            <el-autocomplete style="margin-right: 45px;" size="small" class="inline-input" v-model="inquiryName" :fetch-suggestions="querySearch" placeholder="请输入门店名称/询价编号" @select="handleSelect"></el-autocomplete>
            下单时间:
            <el-date-picker unlink-panels style="margin-right: 22px;" size="small" v-model="inquiryDate" type="monthrange" range-separator="至" start-placeholder="开始月份" end-placeholder="结束月份">
            </el-date-picker>
            <el-button @click="queryBtn()" size="small">
                <i class="el-icon-font-sousuo"></i>查询</el-button>
        </div>
        <div class="com-addBtn-list">
            <el-button style="background-color: #019794; border: 1px solid #019794; width: 140px;" @click="exportOrderFn()" type="primary" size="small">导出订单</el-button>
        </div>
        <div class="main clearfix">
            <div class="quoteList">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="topObj.allCount" name="first" lazy>
                        <el-table :data="tableData" style="width: 100%" border @row-click="clickTable">
                            <el-table-column width="35" type="selection">
                            </el-table-column>
                            <el-table-column prop="inquiryID" label="询价编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.inquiryID}}</i>
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
                            <el-table-column prop="handleMan" label="处理人" width="180">
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
                            <el-table-column prop="createDateTime" label="下单时间" width="180">
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
                            <el-table-column prop="inquiryState" sortable label="订单状态" width="130">
                                <template slot-scope="scope">
                                    <div class="con orderStatus">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" @click="toEditPurchase(scope.row)" v-if="scope.row.inquiryState == 1">挂账中</i>
                                            <i style="color: #ff7e01;" @click="toEditPurchase(scope.row)" v-if="scope.row.inquiryState == 2">已结算</i>
                                            <i style="color: #008000;" @click="toEditPurchase(scope.row)" v-if="scope.row.inquiryState == 3">已逾期</i>
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
                                    <div class="con operateList">
                                        <div class="top">
                                            <i style="cursor: pointer;" @click="toEditPurchase(scope.row)">查看详情</i>
                                        </div>
                                        <div class="foot">
                                            <el-button @click="expressIMGFn(scope.row)" size="mini">上传物流凭证</el-button>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination style="margin: 30px 0;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background :total="totalNum">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane :label="topObj.saymentNO" name="second" lazy>
                        <el-table :data="tableData" style="width: 100%" border>
                            <el-table-column width="35" type="selection">
                            </el-table-column>
                            <el-table-column prop="inquiryID" label="询价编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.inquiryID}}</i>
                                        </div>
                                        <div class="foot">
                                            <img :src="scope.row.picObj.pics" alt="">
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
                            <el-table-column prop="handleMan" label="处理人" width="180">
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
                            <el-table-column prop="createDateTime" label="下单时间" width="180">
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
                            <el-table-column prop="inquiryState" label="订单状态" width="130">
                                <template slot-scope="scope">
                                    <div class="con orderStatus">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" @click="toEditPurchase(scope.row)" v-if="scope.row.inquiryState == 1">挂账中</i>
                                            <i style="color: #ff7e01;" @click="toEditPurchase(scope.row)" v-if="scope.row.inquiryState == 2">已结算</i>
                                            <i style="color: #008000;" @click="toEditPurchase(scope.row)" v-if="scope.row.inquiryState == 3">已逾期</i>
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
                                    <div class="con operateList">
                                        <div class="top">
                                            <i style="cursor: pointer;" @click="toEditPurchase(scope.row)">查看详情</i>
                                        </div>
                                        <div class="foot">
                                            <el-button @click="expressIMGFn(scope.row)" size="mini">上传物流凭证</el-button>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination style="margin: 30px 0;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background :total="totalNum">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane :label="topObj.settlementOK" name="third" lazy>
                        <el-table :data="tableData" style="width: 100%" border>
                            <el-table-column width="35" type="selection">
                            </el-table-column>
                            <el-table-column prop="inquiryID" label="询价编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.inquiryID}}</i>
                                        </div>
                                        <div class="foot">
                                            <img :src="scope.row.picObj.pics" alt="">
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
                            <el-table-column prop="handleMan" label="处理人" width="180">
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
                            <el-table-column prop="createDateTime" label="下单时间" width="180">
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
                            <el-table-column prop="inquiryState" label="订单状态" width="130">
                                <template slot-scope="scope">
                                    <div class="con orderStatus">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" @click="toEditPurchase(scope.row)" v-if="scope.row.inquiryState == 1">挂账中</i>
                                            <i style="color: #ff7e01;" @click="toEditPurchase(scope.row)" v-if="scope.row.inquiryState == 2">已结算</i>
                                            <i style="color: #008000;" @click="toEditPurchase(scope.row)" v-if="scope.row.inquiryState == 3">已逾期</i>
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
                                    <div class="con operateList">
                                        <div class="top">
                                            <i style="cursor: pointer;" @click="toEditPurchase(scope.row)">查看详情</i>
                                        </div>
                                        <div class="foot">
                                            <el-button @click="expressIMGFn(scope.row)" size="mini">上传物流凭证</el-button>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                        <el-pagination style="margin: 30px 0;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background :total="totalNum">
                        </el-pagination>
                    </el-tab-pane>
                    <el-tab-pane :label="topObj.overdue" name="fourth" lazy>
                        <el-table :data="tableData" style="width: 100%" border>
                            <el-table-column width="35" type="selection">
                            </el-table-column>
                            <el-table-column prop="inquiryID" label="询价编号" width="180">
                                <template slot-scope="scope">
                                    <div class="con quoteNum">
                                        <div class="top">
                                            <i>{{scope.row.inquiryID}}</i>
                                        </div>
                                        <div class="foot">
                                            <img :src="scope.row.picObj.pics" alt="">
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
                            <el-table-column prop="handleMan" label="处理人" width="180">
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
                            <el-table-column prop="createDateTime" label="下单时间" width="180">
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
                            <el-table-column prop="inquiryState" label="订单状态" width="130">
                                <template slot-scope="scope">
                                    <div class="con orderStatus">
                                        <div class="top" style="margin-bottom: 30px;">
                                            <i style="color: #ff0000;" @click="toEditPurchase(scope.row)" v-if="scope.row.inquiryState == 1">挂账中</i>
                                            <i style="color: #ff7e01;" @click="toEditPurchase(scope.row)" v-if="scope.row.inquiryState == 2">已结算</i>
                                            <i style="color: #008000;" @click="toEditPurchase(scope.row)" v-if="scope.row.inquiryState == 3">已逾期</i>
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
                                    <div class="con operateList">
                                        <div class="top">
                                            <i style="cursor: pointer;" @click="toEditPurchase(scope.row)">查看详情</i>
                                        </div>
                                        <div class="foot">
                                            <el-button @click="expressIMGFn(scope.row)" size="mini">上传物流凭证</el-button>
                                        </div>
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
        <el-drawer title="物流凭证" :before-close="handleUploadClose" :visible.sync="examineClerkDoneDialogVisible" direction="rtl" custom-class="addClerkDrawer" ref="drawer" size="50%">
            <div class="demo-drawer__content">
                <el-upload :limit="3" action="#" list-type="picture-card" :file-list="faceIDCardsImgList" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :http-request="faceIDCardsFn">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <el-button class="uploadBtn" type="primary" @click="updateFn()">上传</el-button>
                <!-- <div class="el-drawer__footer">
                    <el-button style="margin-left: 20px;" size="small"  @click="examineClerkDoneDialogVisible = false">返 回</el-button>
                </div> -->
            </div>
        </el-drawer>
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
            fileList: [],
            currentPage: 1,
            pageSize: 10,
            totalNum: 0,
            inquiryID: '',
            expressIMG: '', // 物流凭证
            topObj: {
                allCount: '全部状态(0)',
                settlementOK: '已结算(0)',
                saymentNO: '挂账中(0)',
                overdue: '已逾期(0)',
            },
            inquiryState: '',
            dialogVisible: false,
            addrIMGS: "",
            faceIDCardsImgList: [],
            dialogImageUrl: '',
            examineClerkDoneDialogVisible: false,
            disabled: false,
            faceIDCardsImg: '',
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    components: {
        Header,
    },
    created () {
        this.getPurchaseOrderList();
    },
    methods: {
        handleRemove (file, fileList) {
            console.log(file);
            console.log(fileList);

            this.faceIDCardsImgList = fileList;
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 上传
        async updateFn () {
            let IMGobj = [];
            for (let i = 0; i < this.faceIDCardsImgList.length; i++) {
                IMGobj.push(this.faceIDCardsImgList[i].url)
            }

            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                ExpressIMG: JSON.stringify(IMGobj),
                InquiryID: this.inquiryID
            }
            console.log(paramObj);

            let res = await this.postData("A1045", paramObj);
            if (res.code == '0') {
                this.$message({
                    type: "success",
                    message: res.res.msg
                })
                this.examineClerkDoneDialogVisible = false;
            }
        },
        // 图片上传
        faceIDCardsFn (file) {
            this.ajaxFile("1002", { caller: "Garage" }, file.file, async (res) => {
                if (res.code == 0) {
                    this.faceIDCardsImg = res.res.data[0].imageUrl;
                    this.faceIDCardsImgList.push({
                        url: this.faceIDCardsImg
                    })
                } else {
                    this.$message.error(res.res.msg);
                }
            })
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        faceIDCardsImgListRemove (file, fileList) {
            console.log(file);
            console.log(fileList);
            file.name = "";
            this.faceIDCardsImgList = [];
        },
        clickTable (row, index, e) {
            this.inquiryID = row.inquiryID;
        },
        async queryBtn () {
            console.log(this.inquiryName);

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
        // 打开抽屉
        async expressIMGFn (item) {
            this.faceIDCardsImgList = [];
            this.InquiryID = item.inquiryID;
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                InquiryID: this.InquiryID,
            }
            let res = await this.postData("A1051", paramObj);
            let imgArr = res.res.data[0].expressIMG;
            imgArr = imgArr ? JSON.parse(imgArr) : [];
            console.log(imgArr);

            for (let i = 0; i < imgArr.length; i++) {
                this.faceIDCardsImgList.push({
                    url: imgArr[i]
                })
            }
            console.log(this.faceIDCardsImgList);

            this.examineClerkDoneDialogVisible = true;
        },
        // 切换分页
        handleCurrentChange (val) {
            this.getPurchaseOrderList({
                val: val,
                ParamData: '',
                InquiryState: '',
            })
        },
        // 获取订单列表
        async getPurchaseOrderList (listObj) {
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
                inquiryState: this.inquiryState ? this.inquiryState : ''
            }

            let res = await this.postData("A1046", paramObj);
            console.log(res);

            if (res.res.data) {
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
                console.log("没有数据");
            }

        },
        // 上传物流凭证改变
        handleChange (file, fileList) {
            this.fileList = fileList.slice(-3);
        },
        // 查看详情
        toEditPurchase (item) {
            this.inquiryID = item.inquiryID;
            let purInfoObj = {
                inquiryID: item.inquiryID,
                inquiryState: item.inquiryState,
                expressState: item.expressState,
            }
            window.sessionStorage.setItem("purInfoObj", JSON.stringify(purInfoObj));

            let data = {
                menuName: '采购订单详情',
                item: 'purchaseOrderDetail',
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
            let res = await this.postData("A1050", paramObj);
            let url = res.res.data.fileUrl;
            window.open(url)
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
            console.log(item);
        },
        // 关闭抽屉
        handleUploadClose () {
            this.faceIDCardsImgList = [];
            this.examineClerkDoneDialogVisible = false;
        },
        async handleClick (tab, event) {
            if (this.activeName == 'first') {
                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    pageIndex: 1,
                    PageSize: this.pageSize,
                }
                let res = await this.postData("A1046", paramObj);
                let result = res.res.data;
                if (JSON.stringify(result) != "{}") {

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
                    this.tableData = [];
                    console.log("没有数据");
                }

            } else if (this.activeName == 'second') {
                this.inquiryState = '1';
                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    pageIndex: 1,
                    PageSize: this.pageSize,
                    InquiryState: this.inquiryState
                }
                let res = await this.postData("A1046", paramObj);
                console.log(res);
                let result = res.res.data;
                if (JSON.stringify(result) != "{}") {
                    this.currentPage = result.pageIndex;
                    let tableData = result.date;
                    for (let i = 0; i < tableData.length; i++) {
                        tableData[i].picObj = {
                            pics: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : ''
                        }
                    }
                    this.tableData = tableData;
                } else {
                    this.tableData = [];
                    console.log("没有数据");
                }

            } else if (this.activeName == 'third') {
                this.inquiryState = '2';
                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    pageIndex: 1,
                    PageSize: this.pageSize,
                    InquiryState: this.inquiryState
                }
                let res = await this.postData("A1046", paramObj);
                console.log(res);
                let result = res.res.data;

                if (JSON.stringify(result) != "{}") {
                    this.currentPage = result.pageIndex;
                    let tableData = result.date;
                    for (let i = 0; i < tableData.length; i++) {
                        tableData[i].picObj = {
                            pics: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : ''
                        }
                    }
                    this.tableData = tableData;
                } else {
                    this.tableData = [];
                    console.log("没有数据");
                }

            } else if (this.activeName == 'fourth') {
                this.inquiryState = '3'
                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    pageIndex: 1,
                    PageSize: this.pageSize,
                    InquiryState: this.inquiryState
                }
                let res = await this.postData("A1046", paramObj);
                let result = res.res.data;
                if (JSON.stringify(result) != "{}") {
                    this.currentPage = result.pageIndex;
                    let tableData = result.date;
                    for (let i = 0; i < tableData.length; i++) {
                        tableData[i].picObj = {
                            pics: tableData[i].pictures ? JSON.parse(tableData[i].pictures)[0] : ''
                        }
                    }
                    this.tableData = tableData;
                } else {
                    this.tableData = [];
                    console.log("没有数据");
                }
            }
        }
    },
}
</script>

<style lang="less" scoped>
// .batchEditBtn {
//     text-align: right;
//     margin: 35px 80px 10px;
//     padding-left: 20px;
//     .el-button {
//         background-color: #019794;
//         color: #fff;
//         border-radius: 5px;
//     }
// }

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
