<template>
    <!-- 权限管理 -->
    <div class="root">
        <div class="com-header clearfix">
            <h2>权限管理</h2>
        </div>
        <div class="main">
            <div class="postsList">
                <span class="label">
                    选择权限组
                </span>
                <el-checkbox-group v-model="checkList">
                    <el-checkbox label="财务"></el-checkbox>
                    <el-checkbox label="客服"></el-checkbox>
                </el-checkbox-group>
                <span @click="addPost()" class="createBtn">添加权限组</span>
            </div>
            <div class="postsDivide">
                <!-- <div class="postsItem" v-for="(item, index) in postsObj" :key="index">
                         <el-checkbox :indeterminate="isIndeterminate" v-model="item.postAllChecked" @change="handleCheckAllChange(item.postAllChecked, item.postList)">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedPostList" @change="handleCheckedCitiesChange">
                    <el-checkbox v-for="city in item.postList" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
                </div> -->

                <el-tree :data="treeList" show-checkbox default-expand-all @check="treeClick" node-key="id" ref="tree" highlight-current :props="defaultProps">
                </el-tree>
                <!-- <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="date" label="" width="180">
                        <template slot-scope="scope">
                            <el-checkbox :indeterminate="isIndeterminate1" v-model="postAll1" @change="handleCheckAllChange1">{{scope.row.permissionName}}</el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="" width="180">
                        <template slot-scope="scope">
                            <el-checkbox-group v-for="item in scope.row.children" v-model="checkedPostList1" @change="handleCheckedCitiesChange1" :key="item.id">
                                <el-checkbox :label="item.permissionName" :value="item.id">{{item.permissionName}}</el-checkbox>
                            </el-checkbox-group>
                        </template>
                    </el-table-column>
                </el-table> -->

                <!-- <table border="1" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td class="first">
                                <el-checkbox :indeterminate="isIndeterminate1" v-model="postAll1" @change="handleCheckAllChange1">门店管理</el-checkbox>
                            </td>
                            <td class="second">
                                <el-checkbox-group v-model="checkedPostList1" @change="handleCheckedCitiesChange1">
                                    <el-checkbox v-for="item in postList1" :label="item" :key="item">{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </td>
                        </tr>
                        <tr>
                            <td class="first">
                                <el-checkbox :indeterminate="isIndeterminate2" v-model="postAll2" @change="handleCheckAllChange2">询价采购</el-checkbox>
                            </td>
                            <td class="second">
                                <el-checkbox-group v-model="checkedPostList2" @change="handleCheckedCitiesChange2">
                                    <el-checkbox v-for="item in postList2" :label="item" :key="item">{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </td>
                        </tr>
                        <tr>
                            <td class="first">
                                <el-checkbox :indeterminate="isIndeterminate3" v-model="postAll3" @change="handleCheckAllChange3">供应商管理</el-checkbox>
                            </td>
                            <td class="second">
                                <el-checkbox-group v-model="checkedPostList3" @change="handleCheckedCitiesChange3">
                                    <el-checkbox v-for="item in postList3" :label="item" :key="item">{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </td>
                        </tr>
                    </tbody>
                </table> -->
                <div class="subBtn">
                    <el-button type="primary" @click="preserve()">保存权限</el-button>
                </div>
            </div>
        </div>
        <el-dialog class="addPostDialog" title="添加权限" :visible.sync="postDialogVisible" width="900px">
            <div class="postUser">
                <span class="label">权限组名称：</span>
                <el-input v-model="postValue" size="small" placeholder="权限组名称"></el-input>
            </div>
            <div class="postDialogTable">
                <table border="1" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td class="first">
                                <el-checkbox :indeterminate="isIndeterminate11" v-model="postAll11" @change="handleCheckAllChange11">门店管理</el-checkbox>
                            </td>
                            <td class="second">
                                <el-checkbox-group v-model="checkedPostList11" @change="handleCheckedCitiesChange11">
                                    <el-checkbox v-for="item in postList1" :label="item" :key="item">{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </td>
                        </tr>
                        <tr>
                            <td class="first">
                                <el-checkbox :indeterminate="isIndeterminate12" v-model="postAll12" @change="handleCheckAllChange12">询价采购</el-checkbox>
                            </td>
                            <td class="second">
                                <el-checkbox-group v-model="checkedPostList12" @change="handleCheckedCitiesChange12">
                                    <el-checkbox v-for="item in postList2" :label="item" :key="item">{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </td>
                        </tr>
                        <tr>
                            <td class="first">
                                <el-checkbox :indeterminate="isIndeterminate13" v-model="postAll13" @change="handleCheckAllChange13">供应商管理</el-checkbox>
                            </td>
                            <td class="second">
                                <el-checkbox-group v-model="checkedPostList13" @change="handleCheckedCitiesChange13">
                                    <el-checkbox v-for="item in postList3" :label="item" :key="item">{{item}}</el-checkbox>
                                </el-checkbox-group>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            treeList: [],
            defaultProps: {
                children: "children",
                label: "permissionName"
            },
            tableData: [],
            checkedPostList11: [],
            checkedPostList12: [],
            checkedPostList13: [],
            postAll11: false,
            postAll12: false,
            postAll13: false,

            checkList: ['财务'],
            isIndeterminate1: true,
            isIndeterminate2: true,
            isIndeterminate3: true,
            isIndeterminate11: true,
            isIndeterminate12: true,
            isIndeterminate13: true,
            checkedPostList1: [],
            postAll1: false,
            postList1: ["添加门店", "查看门店", "门店初审", "门店复核", "添加店员", "查看店员", "店员初审"],
            checkedPostList2: [],
            postAll2: false,
            postList2: ["创建询价单", "查看订单", "报价"],
            checkedPostList3: [],
            postAll3: false,
            postList3: ["添加供应商", "查看供应商", "供应商审核"],
            // postsObj: [
            //     {
            //         postAll: "门店管理",
            //         postAllChecked: false,
            //         postList: ["添加门店", "查看门店", "添加成员"]
            //     },
            //     {
            //         postAll: "询价采购",
            //         postAllChecked: false,
            //         postList: ["创建寻单价", "查看订单", "报价"]
            //     },
            // ],
            postDialogVisible: false,
            postValue: '',
        }
    },
    created () {
        let token = window.sessionStorage.getItem("gn_request_token");
        let menuObj = JSON.parse(window.sessionStorage.getItem("menuTreeList"));

        this.treeList = menuObj;
    },
    methods: {
        treeClick () {


        },
        // 保存权限
        async preserve () {
            let token = window.sessionStorage.getItem("gn_request_token");

            let paramObj = this.$refs.tree.getCheckedNodes();
            let newObj = {
                id: '',
                permissionName: ''
            }
            newObj = paramObj;
            // console.log(newObj);
            let newParam = [];
            for (let i = 0; i < newObj.length; i++) {
                newParam.push({
                    id: newObj[i].id,
                    permissionName: newObj[i].permissionName,
                })
            }
            console.log(newParam);
            let params = {
                Token: token,
                RoleName: '超级管理员1',
                permissionList: newParam,
            }

            var res = await this.postData("A1009", params);
            console.log(res);

            // console.log(999);
        },
        // 获取角色列表
        async getRole () {
            // console.log(this.checkedPostList1);


            // let paramObj = {
            //     Token: token,
            //     PageSize: 100,
            //     pageIndex: 1
            // }
            // const menuRes = await this.postData("A1005", paramObj);
            // console.log(menuRes);

            // let paramObj = {
            //     Token: token,
            //     PageSize: 100,
            //     pageIndex: 1
            // }
            // const roleRes = await this.postData("A1010", paramObj);
            // console.log(roleRes);
        },
        addPost () {
            this.postDialogVisible = true;
        },
        // handleCheckAllChange (checked, postList) {
        //     this.checkedPostList = checked ? postList : [];
        //     console.log(this.checkedPostList);
        //     this.isIndeterminate = false;
        // },
        // handleCheckedCitiesChange (value) {
        //     let checkedCount = value.length;
        //     this.checkAll = checkedCount === this.postList.length;
        //     this.isIndeterminate = checkedCount > 0 && checkedCount < this.postList.length;
        // }
        handleCheckAllChange1 (val) {
            this.checkedPostList1 = val ? this.postList1 : [];
            this.isIndeterminate1 = false;
        },
        handleCheckedCitiesChange1 (id, permissionName) {
            console.log(id);
            console.log(permissionName);
            console.log(this.checkedPostList1);

            // console.log(value);

            // let checkedCount = value.length;
            // this.postAll1 = checkedCount === this.postList1.length;
            // this.isIndeterminate1 = checkedCount > 0 && checkedCount < this.postList1.length;
        },
        handleCheckAllChange2 (val) {
            this.checkedPostList2 = val ? this.postList2 : [];
            this.isIndeterminate2 = false;
        },
        handleCheckedCitiesChange2 (value) {
            let checkedCount = value.length;
            this.postAll2 = checkedCount === this.postList2.length;
            this.isIndeterminate2 = checkedCount > 0 && checkedCount < this.postList2.length;
        },
        handleCheckAllChange3 (val) {
            this.checkedPostList3 = val ? this.postList3 : [];
            this.isIndeterminate3 = false;
        },
        handleCheckedCitiesChange3 (value) {
            let checkedCount = value.length;
            this.postAll3 = checkedCount === this.postList3.length;
            this.isIndeterminate3 = checkedCount > 0 && checkedCount < this.postList3.length;
        },
        handleCheckAllChange11 (val) {
            this.checkedPostList11 = val ? this.postList1 : [];
            this.isIndeterminate11 = false;
        },
        handleCheckedCitiesChange11 (value) {
            let checkedCount = value.length;
            this.postAll11 = checkedCount === this.postList1.length;
            this.isIndeterminate11 = checkedCount > 0 && checkedCount < this.postList1.length;
        },
        handleCheckAllChange12 (val) {
            this.checkedPostList12 = val ? this.postList2 : [];
            this.isIndeterminate12 = false;
        },
        handleCheckedCitiesChange12 (value) {
            let checkedCount = value.length;
            this.postAll12 = checkedCount === this.postList2.length;
            this.isIndeterminate12 = checkedCount > 0 && checkedCount < this.postList2.length;
        },
        handleCheckAllChange13 (val) {
            this.checkedPostList13 = val ? this.postList3 : [];
            this.isIndeterminate13 = false;
        },
        handleCheckedCitiesChange13 (value) {
            let checkedCount = value.length;
            this.postAll13 = checkedCount === this.postList3.length;
            this.isIndeterminate13 = checkedCount > 0 && checkedCount < this.postList3.length;
        }
    },
}
</script>

<style scoped lang="less">
.main {
    padding-left: 20px;
}
.postsList {
    text-align: left;
    padding-top: 30px;
    padding-left: 10px;
    .label {
        margin-right: 30px;
        font-weight: normal;
    }
    /deep/ .el-checkbox-group {
        display: inline-block;
    }
    .createBtn {
        margin-left: 40px;
        color: #3366ff;
        cursor: pointer;
    }
}

.postsDivide {
    margin-top: 50px;
    padding-left: 10px;
}

table {
    border-color: #ccc;
}
.first {
    width: 160px;
    height: 130px;
}
.second {
    width: 700px;
    height: 130px;
    text-align: left;
    padding-left: 20px;
    padding-right: 200px;
    box-sizing: border-box;
}
.el-checkbox {
    margin-bottom: 10px;
}

.addPostDialog {
    .postUser {
        padding-left: 30px;
        text-align: left;
        margin-bottom: 50px;
        /deep/ .el-input {
            width: 150px;
            margin-left: 20px;
        }
    }
}

.subBtn {
    width: 862px;
    text-align: center;
    margin-top: 80px;
    padding-bottom: 50px;
}
</style>
