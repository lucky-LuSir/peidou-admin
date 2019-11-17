<template>
    <div class="root">
        <div class="com-header clearfix">
            <h2>门店管理</h2>
        </div>
        <div class="main">
            <div class="com-search-list">
                <el-autocomplete size="small" class="inline-input" v-model="storeNameIpt" :fetch-suggestions="querySearch" placeholder="门店名称/法人手机号/姓名" @select="handleSelect"></el-autocomplete>
                <el-button @click="queryBtn()" class="searchBtn _btn32" size="small">
                    <i class="el-icon-font-sousuo"></i>查询
                </el-button>
            </div>
            <div class="com-addBtn-list">
                <el-button type="primary" @click="addStoreInfo()" class="_btn32" size="small">
                    <i class="el-icon-plus"></i>添加门店
                </el-button>
            </div>
            <div class="storeList _ml20">
                <el-table :data="tableData" border>
                    <el-table-column prop="garageCode" label="门店编号" width="120">
                    </el-table-column>
                    <el-table-column prop="garagrName" label="门店名称" width="120">
                    </el-table-column>
                    <el-table-column prop="address" label="门店地址" width="300">
                    </el-table-column>
                    <el-table-column prop="legalPerson" label="姓名" width="100">
                    </el-table-column>
                    <el-table-column prop="legalPhone" label="手机号" width="120">
                    </el-table-column>
                    <el-table-column sortable prop="createDateTime" label="提交时间" width="170">
                    </el-table-column>
                    <el-table-column prop="stateObj" label="审核状态" width="120">
                        <template slot-scope="scope">
                            <div @click="getDetail(scope.row)" v-if="scope.row.stateObj.approvalState == '1' && scope.row.stateObj.reviewState == '0'" style="color: #ff7e01;">
                                申请中
                            </div>
                            <div @click="getDetail(scope.row)" v-if="scope.row.stateObj.approvalState == '1' && scope.row.stateObj.reviewState == '1'" style="color: #ff3300;">
                                待复核
                            </div>
                            <div @click="getDetail(scope.row)" v-if="scope.row.stateObj.approvalState == '2'" style="color: #008000;">
                                申请通过
                            </div>
                            <div @click="getDetail(scope.row)" v-if="scope.row.stateObj.approvalState == '3'" style="color: #ff0000;">
                                申请不通过
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="operatorAccount" label="创建人" width="100">
                    </el-table-column>
                    <el-table-column label="操作" width="180">
                        <template slot-scope="scope">
                            <el-button size="mini" type="info" @click="getDetail(scope.row)">查看</el-button>
                            <el-button size="mini" type="primary" @click="addClerkDialogFn(scope.row)">添加店员</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination style="margin: 30px 0;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background :total="totalNum">
                </el-pagination>
            </div>
        </div>
        <el-drawer title="添加店员" :visible.sync="addClerkDialogVisible" direction="rtl" custom-class="addClerkDrawer" ref="drawer" size="50%">
            <div class="demo-drawer__content">
                <el-form :model="addClerkForm" :rules="rules" ref="addClerkForm" label-width="120px">
                    <div class="com-info">
                        <div class="comInfo-top">
                            <h2>门店信息</h2>
                        </div>
                        <div class="comInfo-content">
                            <el-form-item label="门店名称：" prop="storeName">
                                <el-select size="small" v-model="addClerkForm.storeName" filterable placeholder="请选择门店名称">
                                    <el-option @click.native="getStoreDetailFn()" v-for="item in storeList" :key="item.garageID" :label="item.garagrName" :value="item.garageID">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="comInfo-content">
                            <el-form-item size="small" label="所在区域：" prop="address">
                                {{addClerkForm.regionValue}}
                            </el-form-item>
                        </div>
                        <div class="comInfo-content">
                            <el-form-item size="small" label="门店地址：" prop="address">
                                {{addClerkForm.storeAddress}}
                            </el-form-item>
                        </div>
                    </div>
                    <div class="com-info">
                        <div class="comInfo-top">
                            <h2>店员信息</h2>
                        </div>
                        <div class="comInfo-content">
                            <el-form-item size="small" label="店员姓名：" prop="clerkName">
                                <el-input v-model="addClerkForm.clerkName" placeholder="请输入店员姓名"></el-input>
                            </el-form-item>
                        </div>
                        <div class="comInfo-content">
                            <el-form-item size="small" label="店员手机号：" prop="clerkMobile">
                                <el-input v-model="addClerkForm.clerkMobile" placeholder="请输入店员手机号"></el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="el-drawer__footer">
                        <el-button style="margin-left: 30px;" size="small" type="primary" @click="addClerkFn('addClerkForm')">添加</el-button>
                    </div>
                </el-form>
            </div>
        </el-drawer>
    </div>
</template>

<script>
export default {
    data () {
        return {
            storeNameIpt: '',
            storeList: [],
            tableData: [],
            addClerkDialogVisible: false,
            loading: false,
            options: [],
            rules: {
                storeName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                clerkName: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                clerkMobile: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
                idea: [
                    { required: true, message: '请输入活动名称', trigger: 'blur' },
                ],
            },
            storeList: [],
            addClerkForm: {
                storeName: '', // 门店名
                storeAddress: '',  // 门店地址
                clerkName: '', //店员名称
                clerkMobile: '', //店员手机号
                regionValue: '',
            },
            currentPage: 1,
            pageSize: 10,
            totalNum: 0,
            ownPostObj: {
                threeRole: '',
                secondRole: '',
                firstRole: '',
            },
            curClerk: '',
        }
    },
    props: ["paramsObj"],
    created () {
        let havePostList = JSON.parse(window.sessionStorage.getItem("havePostList"));
        for (let i = 0; i < havePostList.length; i++) {
            if (havePostList[i].permissionName == "门店复核") {
                this.ownPostObj.threeRole = "门店复核";
            } else if (havePostList[i].permissionName == "门店初审") {
                this.ownPostObj.secondRole = "门店初审";
            } else if (havePostList[i].permissionName == "门店编辑") {
                this.ownPostObj.firstRole = "门店编辑";
            }
        }
        this.getStoreList();
        this.getMenuListFn();
    },
    methods: {
        async queryBtn () {
            console.log(this.storeNameIpt);
 
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                pageIndex: 1,
                PageSize: this.pageSize,
                ParamData: this.storeNameIpt
            }
            let res = await this.postData("A1016", paramObj);
            let result = res.res.data;
            this.totalNum = result.count;
            this.currentPage = result.pageIndex;
            let tableData = res.res.data.date;
            for (let i = 0; i < tableData.length; i++) {
                tableData[i].stateObj = {
                    approvalState: tableData[i].approvalState,
                    reviewState: tableData[i].reviewState
                }
            }
            this.tableData = tableData;
        },
        handleCurrentChange (val) {
            this.getStoreList(val);
        },
        // 添加店员
        addClerkFn (addClerkForm) {
            this.$refs[addClerkForm].validate(async (valid) => {
                if (valid) {
                    let token = window.sessionStorage.getItem("gn_request_token");
                    let paramObj = {
                        Token: token,
                        GarageUser: {
                            GarageID: this.addClerkForm.storeName,
                            UserPhone: this.addClerkForm.clerkMobile,
                            UserName: this.addClerkForm.clerkName,
                        }
                    }
                    const res = await this.postData("A1020", paramObj);
                    if (res.code == '0') {
                        this.$message({
                            type: 'success',
                            message: res.res.msg
                        })
                        this.addClerkDialogVisible = false;
                        this.$refs[addClerkForm].resetFields();
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 添加店员抽屉
        addClerkDialogFn (item) {
            console.log(item);
            this.curClerk = item.garageID
            this.addClerkDialogVisible = true;
            this.getStoreListFn();
        },
        // 打开抽屉时获取门店列表
        async getStoreListFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
            }
            const res = await this.postData("A1053", paramObj);
            let storeList = res.res.data.date;
            this.storeList = storeList;
            this.addClerkForm.storeName = this.storeList[0].garageID;
            // this.addClerkForm.storeName = this.curClerk;
        },
        // 获取门店相关数据
        async getStoreDetailFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                garageID: this.addClerkForm.storeName
            }
            const res = await this.postData("A1017", paramObj);
            let result = res.res.data;
            let receAddress = result.garageAddress[1];
            this.addClerkForm.storeAddress = receAddress.address;
            this.addClerkForm.regionValue = receAddress.location;
        },
        async getMenuListFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                PageIndex: 1,
                PageSize: 20
            }
            const menuListRes = await this.postData("A1005", paramObj);
        },
        // 获取门店
        async getStoreList (val) {
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
            let res = await this.postData("A1016", paramObj);
            let result = res.res.data;
            this.totalNum = result.count;
            this.currentPage = result.pageIndex;
            let tableData = res.res.data.date;
            for (let i = 0; i < tableData.length; i++) {
                tableData[i].stateObj = {
                    approvalState: tableData[i].approvalState,
                    reviewState: tableData[i].reviewState
                }
            }
            this.tableData = tableData;
        },
        // 添加门店
        addStoreInfo () {
            // GarageID
            let storeInfoTypeObj = {
                storeInfoType: "添加",
                GarageID: null
            }
            window.sessionStorage.setItem("storeInfoTypeObj", JSON.stringify(storeInfoTypeObj));
            let data = {
                menuName: '添加门店',
                item: 'addStoreInfo',
            };
            this.$emit('backParam', data);
        },
        // 查看
        getDetail (item) {
            // this.ownPostObj.threeRole = "门店复核";
            if (this.ownPostObj.threeRole != "门店复核" && item.stateObj.approvalState == '1' && item.stateObj.reviewState == '1') {
                this.$message({
                    type: "warning",
                    message: '您没有门店复核权限哦'
                })
                return;
            }
            let storeInfoTypeObj = {
                storeInfoType: "编辑",
                GarageID: item.garageID,
                stateObj: item.stateObj
            }
            window.sessionStorage.setItem("storeInfoTypeObj", JSON.stringify(storeInfoTypeObj));
            let data = {
                menuName: '编辑门店信息',
                item: 'editStoreInfo',
            };
            this.$emit('backParam', data);
        },
        querySearch (queryString, cb) {
            var restaurants = this.storeList;
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
    },
}
</script>

<style lang="less" scoped>
.com-search-list {
    /deep/.el-input {
        width: 260px;
    }
}

.storeList {
    margin-top: 20px;
}
</style>
