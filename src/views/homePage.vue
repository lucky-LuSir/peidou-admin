<template>
    <div class="root">
        <!-- <h1>哈哈哈</h1> -->
        <div class="dashboard">
            <el-row :gutter="20">
                <el-col :span="6" :sm="24" :xs="24" :md="24" :lg="8">
                    <div class="grid-content bg-purple">
                        <a @click="toAwaitQuoteFn()" class="first" href="javascript:;">
                            <p>今日待报价订单</p>
                            <h2>
                                <span>{{homePageObj.quoted}}</span>
                            </h2>
                        </a>
                    </div>
                </el-col>
                <el-col :span="6" :sm="24" :xs="24" :md="24" :lg="8">
                    <div class="grid-content bg-purple">
                        <a @click="toAwaitSubFn()" class="two" href="javascript:;">
                            <p>今日待提交订单</p>
                            <h2>
                                <span>{{homePageObj.noconfirm}}</span>
                            </h2>
                        </a>
                    </div>
                </el-col>
                <el-col :span="6" :sm="24" :xs="24" :md="24" :lg="8">
                    <div class="grid-content bg-purple">
                        <a @click="toAlreadyConfirmFn()" class="three" href="javascript:;">
                            <p>今日已确认订单</p>
                            <h2>
                                <span>{{homePageObj.confirmed}}</span>
                            </h2>
                        </a>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="main">
            <el-row :gutter="20">
                <el-col :span="6" :sm="24" :xs="24" :md="24" :lg="8">
                    <div class="grid-content bg-purple first">
                        <h2>待审核</h2>
                        <div class="view-content">
                            <ul>
                                <li>
                                    <span @click="toStoreListFn()">
                                        门店初审
                                    </span>
                                    <i>{{homePageObj.garageFirstTrial}}</i>
                                </li>
                                <li>
                                    <span @click="toStoreListFn()">
                                        门店复核
                                    </span>
                                    <i>{{homePageObj.garageReview}}</i>
                                </li>
                                <li>
                                    <span @click="toSupplierListFn()">
                                        供应商审核
                                    </span>
                                    <i>{{homePageObj.supReview}}</i>
                                </li>
                                <li>
                                    <span @click="toClerkListFn()">
                                        店员审核
                                    </span>
                                    <i>{{homePageObj.userReview}}</i>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" :sm="24" :xs="24" :md="24" :lg="8">
                    <div class="grid-content bg-purple two">
                        <h2>即将到期的修理厂</h2>
                        <div class="view-content">
                            <el-table :data="homePageObj.garageDate" style="width: 100%">
                                <el-table-column prop="name" label="门店名称">
                                </el-table-column>
                                <el-table-column prop="date" label="到期时间">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
                <el-col :span="6" :sm="24" :xs="24" :md="24" :lg="8">
                    <div class="grid-content bg-purple three">
                        <h2>即将到期的供应商</h2>
                        <div class="view-content">
                            <el-table :data="homePageObj.supData" style="width: 100%">
                                <el-table-column prop="name" label="供应商名称">
                                </el-table-column>
                                <el-table-column prop="date" label="到期时间">
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>

    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: [{
                date: '2019-10-15',
                name: '汽修厂1',
            }, {
                date: '2019-10-15',
                name: '汽修厂1',
            }, {
                date: '2019-10-15',
                name: '汽修厂1',
            }, {
                date: '2019-10-15',
                name: '汽修厂1',
            }],
            // garageDateList: [],
            homePageObj: {},
        }
    },
    created () {
        this.getList();
    },
    methods: {
        async getList () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
            }
            const res = await this.postData("A1034", paramObj);
            console.log(res);

            this.homePageObj = res.res.data;
        },
        toStoreListFn () {
            let data = {
                menuName: '门店列表',
                item: 'storeList',
            };
            this.$emit('backParam', data);
        },
        toSupplierListFn () {
            let data = {
                menuName: '供应商列表',
                item: 'supplierList',
            };
            this.$emit('backParam', data);
        },
        toClerkListFn () {
            let data = {
                menuName: '店员列表',
                item: 'clerkList',
            };
            this.$emit('backParam', data);
        },
        // 已确认
        toAlreadyConfirmFn () {
            // window.sessionStorage.setItem("homePageStatus", 3);
            let data = {
                menuName: '询价报价',
                item: 'quoteList',
                param: {
                    status: 3
                }
            };
            this.$emit('backParam', data);
        },
        // 待提交
        toAwaitSubFn () {
            // window.sessionStorage.setItem("homePageStatus", 1);
            let data = {
                menuName: '询价报价',
                item: 'quoteList',
                param: {
                    status: 1
                }
            };
            this.$emit('backParam', data);
        },
        // 待报价
        toAwaitQuoteFn () {
            // window.sessionStorage.setItem("homePageStatus", 2);
            let data = {
                menuName: '询价报价',
                item: 'quoteList',
                param: {
                    status: 2
                }
            };
            this.$emit('backParam', data);
        },
    },
}
</script>

<style scoped lang="less">
.root {
    background-color: #f6f6f6;
}
.dashboard {
    padding: 20px 20px 0;
    background-color: #fff;
    a {
        width: 300px;
        height: 120px;
        border: 0px;
        border-radius: 6px;
        color: #ffffff;
        padding: 16px 0 30px;
        box-sizing: border-box;
        background-position: 0 10px;
        display: inline-block;
    }
    .first {
        background: #ffba48 url(../assets/untreated.png) no-repeat;
        margin-bottom: 20px;
        padding-left: 20px;
    }
    .two {
        background: #17bebb url(../assets/today.png) no-repeat;
        margin-bottom: 20px;
    }
    .three {
        background: #3aa1d5 url(../assets/all.png) no-repeat;
        margin-bottom: 20px;
    }
    p {
        padding-right: 30px;
        font-size: 18px;
        color: #fff;
        font-weight: 700;
        margin: 0 0 10px;
        margin-left: -20px;
    }
    h2 {
        margin-top: 10px;
        font-size: 32px;
    }
}
.main {
    padding: 20px 10px;
    margin: 20px;
    background-color: #fff;
    border-radius: 5px;
    /deep/ .el-col {
        margin-bottom: 30px;
    }
    h2 {
        color: #333;
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 20px;
    }
    .first {
        .view-content {
            border: 1px solid #ccc;
            padding: 0 20px;
            width: 210px;
            margin: 0 auto;
            box-sizing: border-box;
            li {
                display: flex;
                justify-content: space-between;
                padding-right: 45px;
                margin-bottom: 26px;
            }
            li:first-child {
                margin-top: 26px;
            }
            span {
                color: #006699;
            }
            i {
                color: #976666;
            }
        }
    }
    .two,
    .three {
        .view-content {
            width: 320px;
            border: 1px solid #ccc;
            padding: 20px 0;
            margin: 0 auto;
        }
        /deep/ .el-table::before {
            // border: 0;
            height: 0;
        }
        /deep/ .has-gutter th {
            border: 0;
            color: #66667f;
            font-weight: 600;
        }
        /deep/ .el-table__row td {
            border: 0;
        }
    }
    /deep/ .el-table {
        /deep/ th {
            // padding-left: 20px;
            text-align: center;
        }
        /deep/ td {
            text-align: center;
            padding-left: 0;
        }
    }
}
</style>
