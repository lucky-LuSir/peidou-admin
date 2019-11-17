<template>
    <!-- 供货商管理 -->
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="main clearfix">
            <div class="com-search-list">
                <el-autocomplete size="small" class="inline-input" v-model="supplierNameIpt" :fetch-suggestions="querySearch" placeholder="供货商名称/法人手机号/姓名" @select="handleSelect"></el-autocomplete>
                <el-button @click="queryBtn()" class="searchBtn _btn32" size="small">
                    <i class="el-icon-font-sousuo"></i>查询
                </el-button>
            </div>
            <div class="com-addBtn-list">
                <el-button type="primary" @click="addSupplier()" class="_btn32" size="small">
                    <i class="el-icon-plus"></i>添加供货商
                </el-button>
            </div>
            <div class="quoteList">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="supplierID" label="供货商编号" width="180">
                    </el-table-column>
                    <el-table-column prop="companyName" label="供货商名称" width="240">
                    </el-table-column>
                    <el-table-column prop="contractStartTime" label="合作到期时间" width="190">
                        <template slot-scope="scope">
                            <span>{{scope.row.contractStartTime}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="isOpen" label="状态" width="170">
                        <template slot-scope="scope">
                            <span>{{scope.row.isOpen == 1 ? '启用' : '关闭'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="supplierState" label="审核状态" width="170">
                        <template slot-scope="scope">
                            <span @click="toEditSupplierFn(scope.row)" style="color: #ff9900;" v-if="scope.row.supplierState == 1">待审核</span>
                            <span @click="toEditSupplierFn(scope.row)" style="color: #008000;" v-if="scope.row.supplierState == 2">审核通过</span>
                            <span @click="toEditSupplierFn(scope.row)" style="color: #ff5500;" v-if="scope.row.supplierState == 3">审核不通过</span>
                            <span @click="toEditSupplierFn(scope.row)" style="color: #0033ff;" v-if="scope.row.supplierState == 4">待完善</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operatorAccount" label="创建人" width="170">
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="toEditSupplierFn(scope.row)">查看</el-button>
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
            headerInfo: '供应商管理',
            supplierNameIpt: '',
            tableData: [],
            currentPage: 1,
            pageSize: 10,
            totalNum: 0,
            ownPostObj: {
                firstRole: '',
                threeRole: '',
                secondRole: '',
            },
        }
    },
    components: {
        Header,
    },
    created () {
        let havePostList = JSON.parse(window.sessionStorage.getItem("havePostList"));
        for (let i = 0; i < havePostList.length; i++) {
            if (havePostList[i].permissionName == "供应商复核") {
                this.ownPostObj.threeRole = "供应商复核";
            } else if (havePostList[i].permissionName == "供应商初审") {
                this.ownPostObj.secondRole = "供应商初审";
            } else if (havePostList[i].permissionName == "供应商编辑") {
                this.ownPostObj.firstRole = "供应商编辑";
            }
        }
        this.getSupplierListFn();
    },
    methods: {
        async queryBtn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                pageIndex: 1,
                PageSize: this.pageSize,
                ParamData: this.supplierNameIpt
            }
            const res = await this.postData("A1026", paramObj);
            let result = res.res.data;
            this.totalNum = result.count;
            this.currentPage = result.pageIndex;
            this.tableData = res.res.data.date;
        },
        handleCurrentChange (val) {
            this.getSupplierListFn(val);
        },
        // 修改供货商
        toEditSupplierFn (item) {
            console.log(item);

            if (this.ownPostObj.threeRole != '供应商复核' && item.supplierState != '1') {
                this.$message({
                    type: "warning",
                    message: '您没有供应商复核权限哦'
                })
                return;
            } else if (this.ownPostObj.threeRole != '供应商复核' && item.supplierState != '4') {
                this.$message({
                    type: "warning",
                    message: '您没有供应商复核权限哦'
                })
                return;
            } else {
                let supplierInfoTypeObj = {
                    storeInfoType: "编辑",
                    supplierID: item.supplierID,
                    supplierState: item.supplierState
                }
                window.sessionStorage.setItem("supplierInfoTypeObj", JSON.stringify(supplierInfoTypeObj));

                let data = {
                    menuName: '供应商审核',
                    item: 'verifySupplier',
                };

                this.$emit('backParam', data);
            }



        },
        // 添加供货商
        addSupplier () {
            let data = {
                menuName: '添加供应商',
                item: 'addSupplier',
            };
            this.$emit('backParam', data);
        },
        // 获取供应商列表
        async getSupplierListFn (val) {
            let pageindex = val;
            if (!pageindex) {
                pageindex = 1
            }
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                pageIndex: pageindex,
                PageSize: this.pageSize,
            }
            const res = await this.postData("A1026", paramObj);
            let result = res.res.data;
            this.totalNum = result.count;
            this.currentPage = result.pageIndex;
            this.tableData = res.res.data.date;
        },
        querySearch (queryString, cb) {
            var restaurants = [];
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
        handleClick (tab, event) {
            console.log(tab, event);
        }
    },
}
</script>

<style lang="less" scoped>
.main {
    .quoteList {
        padding-left: 20px;
        padding-right: 20px;
        a {
            color: #0000ff;
        }
    }
    .pagination {
        margin-top: 20px;
        margin-bottom: 20px;
    }
}
</style>
