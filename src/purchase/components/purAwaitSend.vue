<template>
    <!-- 挂账中 -->
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
            <div class="logistics">
                <div class="comInfo-top" style="display: flex;">
                    <h2>物流信息</h2>
                    <div style="margin-left: 215px;" class="status">
                        <span v-if="quoteForm.expressState == 1 && quoteForm.inquiryState == 1">挂账中(待发货)</span>
                        <span v-if="quoteForm.expressState == 2 && quoteForm.inquiryState == 1">挂账中(已发货)</span>
                        <span v-if="quoteForm.inquiryState == 2">已结算</span>
                        <span v-if="quoteForm.inquiryState == 3">已逾期</span>
                    </div>
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
            <div v-if="express_state == 1" class="pinzhengInfo">
                <div class="comInfo-top">
                    <h2>上传物流凭证</h2>
                </div>
                <div class="comInfo-content clearfix">
                    <el-upload :limit="6" action="#" :http-request="faceIDCardsFn" :file-list="faceIDCardsImgList" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <el-button style="width: 100px; height: 40px; margin-left: 20px;" class="uploadBtn" type="primary" @click="updateFn()">上传</el-button>
                </div>
            </div>
            <div v-if="express_state == 2" class="pinzhengInfo">
                <div class="comInfo-top">
                    <h2>物流凭证</h2>
                </div>
                <div class="comInfo-content clearfix">
                    <div>
                        <viewer :images="IMGS">
                            <img style="width: 80px; height: 80px; margin-right: 5px;" v-for="src in IMGS" :src="src" :key="src" width="50">
                        </viewer>
                    </div>
                </div>
            </div>
            <div class="parts">
                <div class="parts-top clearfix">
                    <div class="parts-title fl">
                        <h2>配件信息</h2>
                    </div>
                </div>
                <div class="parts-content">
                    <el-table :data="tableData" @selection-change="handleSelectionChange" ref="multipleTable">
                        <el-table-column type="index" width="50" label="序号">
                        </el-table-column>
                        <el-table-column type="selection" width="55">
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
                                <el-input-number style="width: 90px;" v-model="scope.row.quantity" size="small" controls-position="right" @change="handleChange" :min="1" :max="scope.row.maxNum"></el-input-number>
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
                                        ¥
                                        <i>{{ scope.row.quantity * scope.row.price | ToFixed }}</i>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="servicePrice" label="退货费率" width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.servicePrice == 0.05">5%</span>
                                <span v-if="scope.row.servicePrice == 0">不可退货</span>
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
                <div style="width: 1024px; text-align: center;" class="refundBtn">
                    <el-button @click="applyRefundFn()" type="primary" style="width: 300px; margin: 30px 0;">申请退货</el-button>
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
            <div class="invoice">
                <div class="comInfo-top">
                    <h2>发票信息</h2>
                </div>
                <div class="comInfo-content clearfix">
                    <p v-if="quoteForm.invoiceType == 1">普票</p>
                    <p v-if="quoteForm.invoiceType == 2">专票</p>
                    <p v-if="quoteForm.invoiceType == 3">无票</p>
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
                totalNums += item.quantity
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
            quoteStatus: '',
            IMGS: [],
            express_state: 0,
            dialogImageUrl: '',
            dialogVisible: false,
            faceIDCardsImgList: [],
            multipleSelection: [],
            maxNum: 100,
        }
    },
    created () {
        let purInfoObj = JSON.parse(window.sessionStorage.getItem("purInfoObj"))
        this.inquiryID = purInfoObj.inquiryID;

        this.getDetailFn();
        this.getExpressDetailFn();
    },
    methods: {
        // 申请退货
        applyRefundFn () {
            if (this.multipleSelection.length <= 0) {
                this.$message({
                    type: "warning",
                    message: "请选择要退货商品!"
                })
                return;
            }
            let myObj = [];
            for (let i = 0; i < this.multipleSelection.length; i++) {
                myObj.push({
                    ComponentID: this.multipleSelection[i].componentID,
                    quantity: this.multipleSelection[i].quantity
                })
            }
            this.$confirm('你确定申请退货吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    RefundComponentData: myObj
                }
                let res = await this.postData("A1054", paramObj);
                if (res.code == 0) {
                    this.$message({
                        type: 'success',
                        message: res.res.msg
                    });
                    console.log(999991);
                    let data = {
                        menuName: '退货管理',
                        item: 'refundList',
                    };
                    this.$emit('purBack', data);
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 选择表格
        handleSelectionChange (val) {
            console.log(val);

            this.multipleSelection = val;
        },
        // 计数器
        handleChange (value) {
        },
        // 上传物流凭证
        async updateFn () {
            let IMGobj = [];
            for (let i = 0; i < this.faceIDCardsImgList.length; i++) {
                IMGobj.push(this.faceIDCardsImgList[i].url)
            }
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                ExpressIMG: JSON.stringify(IMGobj),
                inquiryID: this.inquiryID
            }

            let res = await this.postData("A1045", paramObj);
            if (res.code == '0') {
                this.$message({
                    type: "success",
                    message: res.res.msg
                })
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
        handleRemove (file, fileList) {
            this.faceIDCardsImgList = fileList;
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        // 获取物流详情
        async getExpressDetailFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                inquiryID: this.inquiryID,
            }
            let res = await this.postData("A1051", paramObj);
            let imgArr = res.res.data[0].expressIMG;
            imgArr = imgArr ? JSON.parse(imgArr) : [];

            for (let i = 0; i < imgArr.length; i++) {
                this.faceIDCardsImgList.push({
                    url: imgArr[i]
                })
            }

        },
        // 获取订单详情
        async getDetailFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                inquiryID: this.inquiryID
            }
            let res = await this.postData("A1044", paramObj);
            let result = res.res.data;

            this.tableData = result.inquiryComponents;

            for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i].maxNum = this.tableData[i].quantity;
            }

            let newObj = {}
            let userObj = {
                porder: result.porder,
                userName: result.userName,
                isAccounts: "1",
            }
            Object.assign(newObj, result.inquiry, result.inquiryInfo, result.car, result.garage, userObj, result.express, result.addr, result.porder);
            this.quoteForm = newObj;
            if (this.quoteForm.expressIMG) {
                this.IMGS = JSON.parse(this.quoteForm.expressIMG);
            }

            if (this.quoteForm.expressState == 1 && this.quoteForm.inquiryState == 1) {
                this.express_state = 1;
            } else if (this.quoteForm.expressState == 2 && this.quoteForm.inquiryState == 1) {
                this.express_state = 2;
            } else {
                this.express_state = 2;
            }
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
    .status {
        font-weight: 700;
        color: #ff6600;
        font-size: 16px;
    }
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
                color: #008000;
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
            margin-right: 50px;
            text-align: right;
            color: #409eff;
            font-weight: 700;
        }
    }
}
</style>
