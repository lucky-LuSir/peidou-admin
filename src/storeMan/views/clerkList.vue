<template>
    <!-- 店员信息 -->
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="main">
            <div class="com-search-list">
                <el-input size="small" placeholder="门店名称/店员手机号/店员姓名" v-model="clerkNameIpt"></el-input>
                <el-button @click="queryBtn()" class="searchBtn _btn32" size="small">
                    <i class="el-icon-font-sousuo"></i>查询
                </el-button>
            </div>
            <div class="com-addBtn-list">
                <el-button type="primary" @click="addClerkDialogFn()" class="_btn32" size="small">
                    <i class="el-icon-plus"></i>添加店员
                </el-button>
            </div>
            <div class="clerkList _ml20">
                <el-table :data="tableData" border>
                    <el-table-column prop="garageCode" label="门店编号" width="120">
                    </el-table-column>
                    <el-table-column prop="garagrName" label="门店名称" width="200">
                    </el-table-column>
                    <el-table-column prop="userName" label="店员姓名" width="200">
                    </el-table-column>
                    <el-table-column prop="userPhone" label="店员手机号" width="200">
                    </el-table-column>
                    <el-table-column sortable prop="createDateTime" label="提交时间" width="200">
                    </el-table-column>
                    <el-table-column 
                        :filters="[{ text: '申请中', value: '申请中' }, { text: '通过', value: '通过' }, { text: '不通过', value: '不通过' }]"
                        :filter-method="filterState"
                        filter-placement="bottom-end"
                        class="approvalState" prop="approvalState" label="审核状态" width="120">
                        <template slot-scope="scope">
                            <div @click="examineDrawer(scope.row)" v-if="scope.row.approvalState == '1'" style="color: #ff7e01;">
                                申请中
                            </div>
                            <div @click="examineDrawer(scope.row)" v-if="scope.row.approvalState == '2'" style="color: #008000;">
                                通过
                            </div>
                            <div @click="examineDrawer(scope.row)" v-if="scope.row.approvalState == '3'" style="color: #ff0000;">
                                不通过
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="createPeople12" label="创建人" width="100">
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <div v-if="scope.row.approvalState == '1'" style="color: #ff7e01;">
                                <el-button @click="examineDrawer(scope.row)" type="info" size="small">查看</el-button>
                            </div>
                            <div v-if="scope.row.approvalState == '2'" style="color: #009794;">
                                <el-button @click="examineDrawer(scope.row)" type="info" size="small">查看</el-button>
                            </div>
                            <div v-if="scope.row.approvalState == '3'" style="color: #ff0000;">
                                <el-button @click="examineDrawer(scope.row)" type="info" size="small">查看</el-button>
                            </div>
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
                                <span>{{addClerkForm.regionValue}}</span>
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
        <el-drawer title="审核中" :visible.sync="examineClerkDialogVisible" direction="rtl" custom-class="addClerkDrawer" ref="drawer" size="50%">
            <div class="demo-drawer__content">
                <el-form :model="editClerkForm" :rules="rules" ref="editClerkForm" label-width="120px">
                    <div class="com-info">
                        <div class="comInfo-top">
                            <h2>门店信息</h2>
                        </div>
                        <div class="comInfo-content">
                            <el-form-item label="门店名称：">
                                {{editClerkForm.garagrName}}
                            </el-form-item>
                        </div>
                        <div class="comInfo-content">
                            <el-form-item size="small" label="所在区域：">
                                <span>{{editClerkForm.location}}</span>
                            </el-form-item>
                        </div>
                        <div class="comInfo-content">
                            <el-form-item size="small" label="门店地址：">
                                <span>{{editClerkForm.address}}</span>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="com-info">
                        <div class="comInfo-top">
                            <h2>店员信息</h2>
                        </div>
                        <div class="comInfo-content">
                            <el-form-item size="small" label="店员姓名：">
                                {{editClerkForm.userName}}
                            </el-form-item>
                        </div>
                        <div class="comInfo-content">
                            <el-form-item size="small" label="店员手机号：">
                                {{editClerkForm.userPhone}}
                            </el-form-item>
                        </div>
                        <div class="comInfo-content">
                            <el-form-item size="small" label="审核意见：" prop="idea">
                                <el-input style="width: 320px;" v-model="editClerkForm.idea" type="textarea" :rows="3" placeholder="请输入审核意见">
                                </el-input>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="el-drawer__footer">
                        <el-button style="margin-left: 30px; margin-right: 20px;" size="small" @click="examineRejectFn('editClerkForm')">拒 绝</el-button>
                        <el-button size="small" type="primary" @click="examineSuccessFn('editClerkForm')">通 过</el-button>
                    </div>
                </el-form>
            </div>
        </el-drawer>
        <el-drawer title="审核通过" :visible.sync="examineClerkDoneDialogVisible" direction="rtl" custom-class="addClerkDrawer" ref="drawer" size="50%">
            <div class="demo-drawer__content">
                <div class="com-info">
                    <div class="comInfo-content">
                        <span class="_labelW80">
                            审核意见：
                        </span>
                        <span style="width: 550px;" class="text">
                            {{editClerkForm.remark}}
                        </span>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW80">
                            初审：
                        </span>
                        <span class="text">
                        </span>
                        <span style="margin-left: 35px;" class="_labelW80">
                            审核时间
                        </span>
                        <span class="text">
                            
                        </span>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW80">
                            复核：
                        </span>
                        <span class="text">
                            
                        </span>
                        <span style="margin-left: 35px;" class="_labelW80">
                            复核时间
                        </span>
                        <span class="text">
                        </span>
                    </div>
                </div>
                <div class="com-info">
                    <div class="comInfo-top">
                        <h2>门店信息</h2>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW80">
                            门店名称：
                        </span>
                        <span class="text">
                            {{editClerkForm.garagrName}}
                        </span>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW80">
                            所在区域：
                        </span>
                        <span class="text">
                            {{editClerkForm.location}}
                        </span>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW80">
                            门店地址：
                        </span>
                        <span class="text">
                            {{editClerkForm.address}}
                        </span>
                    </div>
                </div>
                <div class="com-info">
                    <div class="comInfo-top">
                        <h2>店员信息</h2>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW90">
                            店员姓名：
                        </span>
                        <span class="text">
                            {{editClerkForm.userName}}
                        </span>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW90">
                            店员手机号：
                        </span>
                        <span class="text">
                            {{editClerkForm.userPhone}}
                        </span>
                    </div>
                </div>
                <div class="el-drawer__footer">
                    <el-button style="margin-left: 20px;" size="small" type="primary" @click="examineClerkDoneDialogVisible = false">返 回</el-button>
                </div>
            </div>
        </el-drawer>
        <el-drawer title="审核不通过" :visible.sync="examineClerkRejectDialogVisible" direction="rtl" custom-class="addClerkDrawer" ref="drawer" size="50%">
            <div class="demo-drawer__content">
                <div class="com-info">
                    <div class="comInfo-content">
                        <span class="_labelW80">
                            审核意见：
                        </span>
                        <span style="width: 550px;" class="text">
                            {{editClerkForm.remark}}
                        </span>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW80">
                            初审：
                        </span>
                        <span class="text">
                        </span>
                        <span style="margin-left: 35px;" class="_labelW80">
                            审核时间
                        </span>
                        <span class="text">
                        </span>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW80">
                            复核：
                        </span>
                        <span class="text">
                        </span>
                        <span style="margin-left: 35px;" class="_labelW80">
                            复核时间
                        </span>
                        <span class="text">
                        </span>
                    </div>
                </div>
                <div class="com-info">
                    <div class="comInfo-top">
                        <h2>门店信息</h2>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW80">
                            门店名称：
                        </span>
                        <span class="text">
                            {{editClerkForm.garagrName}}
                        </span>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW80">
                            所在区域：
                        </span>
                        <span class="text">
                            {{editClerkForm.location}}
                        </span>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW80">
                            门店地址：
                        </span>
                        <span class="text">
                            {{editClerkForm.address}}
                        </span>
                    </div>
                </div>
                <div class="com-info">
                    <div class="comInfo-top">
                        <h2>店员信息</h2>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW90">
                            店员姓名：
                        </span>
                        <span class="text">
                            {{editClerkForm.userName}}
                        </span>
                    </div>
                    <div class="comInfo-content">
                        <span class="_labelW90">
                            店员手机号：
                        </span>
                        <span class="text">
                            {{editClerkForm.userPhone}}
                        </span>
                    </div>
                </div>
                <div class="el-drawer__footer">
                    <el-button style="margin-left: 20px;" size="small" type="primary" @click="examineClerkRejectDialogVisible = false">返 回</el-button>
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import Header from "../../components/Header"
export default {
    components: {
        Header
    },
    data () {
        return {
            headerInfo: '门店人员信息',
            clerkNameIpt: '',
            tableData: [],
            addClerkDialogVisible: false,
            examineClerkDialogVisible: false,
            examineClerkDoneDialogVisible: false,
            examineClerkRejectDialogVisible: false,
            loading: false,
            form: {
                name: '',
            },
            options: [],
            addClerkForm: {
                storeName: '', // 门店名
                storeAddress: '',  // 门店地址
                clerkName: '', //店员名称
                clerkMobile: '', //店员手机号
                regionValue: '',
            },
            storeList: [],
            textarea: '',
            rules: {
                storeName: [
                    { required: true, message: '请输入门店名称', trigger: 'blur' },
                ],
                clerkName: [
                    { required: true, message: '请输入店员名称', trigger: 'blur' },
                ],
                clerkMobile: [
                    { required: true, message: '请输入店员手机号', trigger: 'blur' },
                    {
                        pattern: /^1[3|4|5|7|8][0-9]\d{8}$/,
                        message: '手机号格式不对',
                        trigger: 'blur'
                    }
                ],
                idea: [
                    { required: true, message: '请输入审核意见', trigger: 'blur' },
                ],
            },
            userID: '',
            editClerkForm: {},
            currentPage: 1,
            pageSize: 10,
            totalNum: 0,
        }
    },
    async created () {
        this.getClerkListFn();
    },
    methods: {
        // 过滤状态
        filterState(value, row) {
            console.log(value);
            console.log(row);
            if (value == '申请中') {
                return row.approvalState == '1'
            } else if (value == '通过') {
                return row.approvalState == '2'
            } else if (value == '不通过') {
                return row.approvalState == '3'
            }
        },
        // 查询
        async queryBtn () {
            console.log(this.clerkNameIpt);
 
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                pageIndex: 1,
                PageSize: this.pageSize,
                ParamData: this.clerkNameIpt
            }

            const res = await this.postData("A1042", paramObj);
            let result = res.res.data;
            this.totalNum = result.count;
            this.currentPage = result.pageIndex;
            this.tableData = res.res.data.date;
        },
        // 分页
        handleCurrentChange (val) {
            this.getClerkListFn(val);
        },
        // 审核通过弹出框

        // 审核不通过
        examineRejectFn (editClerkForm) {
            this.$refs[editClerkForm].validate(async (valid) => {
                if (valid) {
                    let token = window.sessionStorage.getItem("gn_request_token");
                    let paramObj = {
                        Token: token,
                        GarageUser: {
                            Remark: this.editClerkForm.idea,
                            ApprovalState: 3,
                            UserID: this.userID
                        }
                    }
                    const res = await this.postData("A1021", paramObj);
                    if (res.code == '0') {
                        this.$message({
                            type: 'success',
                            message: res.res.msg
                        })
                        this.examineClerkDialogVisible = false;
                        this.$refs[editClerkForm].resetFields();
                        this.getClerkListFn();
                    }
                } else {
                    return false;
                }
            });
        },
        // 审核店员通过
        examineSuccessFn (editClerkForm) {
            this.$refs[editClerkForm].validate(async (valid) => {
                if (valid) {
                    let token = window.sessionStorage.getItem("gn_request_token");
                    let paramObj = {
                        Token: token,
                        GarageUser: {
                            Remark: this.editClerkForm.idea,
                            ApprovalState: 2,
                            UserID: this.userID
                        }
                    }
                    const res = await this.postData("A1021", paramObj);
                    if (res.code == '0') {
                        this.$message({
                            type: 'success',
                            message: res.res.msg
                        })
                        this.examineClerkDialogVisible = false;
                        this.$refs[editClerkForm].resetFields();
                        this.getClerkListFn();
                    }
                } else {
                    return false;
                }
            });
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
                        this.getClerkListFn();
                    }
                } else {
                    return false;
                }
            });
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
        // 获取门店列表
        async getStoreListFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                PageIndex: 1,
                PageSize: 1000,
            }
            const res = await this.postData("A1039", paramObj);

            let storeList = res.res.data;

            for (let i = 0; i < storeList.length; i++) {
                this.storeList.push({
                    garagrName: storeList[i].garagrName,
                    garageID: storeList[i].garageID
                })
            }

        },
        // 获取店员列表
        async getClerkListFn (val) {
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

            const res = await this.postData("A1042", paramObj);
            let result = res.res.data;
            this.totalNum = result.count;
            this.currentPage = result.pageIndex;
            this.tableData = res.res.data.date;
        },
        // 审核抽屉
        async examineDrawer (item) {
            this.userID = item.userID;
            if (item.approvalState == 1) {
                // 审核中
                this.examineClerkDialogVisible = true;
            }
            if (item.approvalState == 2) {
                // 审核通过
                this.examineClerkDoneDialogVisible = true;
            }
            if (item.approvalState == 3) {
                // 审核不通过
                this.examineClerkRejectDialogVisible = true;
            }

            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                UserID: this.userID
            }
            const res = await this.postData("A1043", paramObj);
            let result = res.res.data;
            console.log(result);
            
            let addressObj = result.garageAddress ? result.garageAddress[0] : '';
            let newObj = {
                idea: '',
            };
            Object.assign(newObj, result.garageAccount, result.garageDetail, result.user, addressObj);

            this.editClerkForm = newObj;
            console.log(this.editClerkForm);

            // this.editClerkForm.storeName = result.garageDetail.garagrName;
            // this.editClerkForm.storeAddress = result.garageAddress ? result.garageAddress[1].address : '';
            // this.editClerkForm.clerkName = result.user.userName;
            // this.editClerkForm.clerkMobile = result.user.userPhone;
            // this.editClerkForm.regionValue = result.garageAddress ? result.garageAddress[1].location : '';
        },
        // 添加店员抽屉
        addClerkDialogFn () {
            this.addClerkDialogVisible = true;
            this.getStoreListFn();
        },
    },
}
</script>

<style scoped lang="less">
.com-search-list {
    /deep/.el-input {
        width: 260px;
    }
}

.clerkList {
    margin-top: 20px;
}
.addClerkDrawer {
    .comInfo-content {
        padding-top: 20px;
    }
    .text {
        margin-left: 6px;
    }
}
</style>
