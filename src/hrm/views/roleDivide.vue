<template>
    <!-- 角色管理 -->
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>

        <div class="main">
            <div class="com-create">
                <el-button @click="addRoleDialogFn()" type="primary" class="createBtn " size="small">
                    新增角色
                </el-button>
            </div>
            <div class="roleList _ml20">
                <el-table :data="roleList" border>
                    <el-table-column prop="roleName" label="角色名称" width="250">
                    </el-table-column>
                    <el-table-column prop="desc" label="角色描述" width="250">
                    </el-table-column>
                    <el-table-column width="250" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="distPostFn(scope.row)" type="text" size="small">分配权限</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="添加角色" :visible.sync="addRoleDialogVisible" class="roleDialog" width="800px">
            <div class="postDialog clearfix">
                <div class="roleIpt fl">
                    <span>角色名称：</span>
                    <el-input style="width: 210px;" placeholder="角色名称" v-model="addRoleValue"></el-input>
                </div>
                <el-table class="fl" style="width: 350px;" ref="multipleTable" :data="postList" tooltip-effect="dark" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="permissionName" label="权限" width="120">
                        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
                    </el-table-column>
                </el-table>
                <div class="btnBox">
                    <el-button style="width: 100px; margin-top: 20px;" type="primary" @click="addRoleFn()" size="small">提交</el-button>
                </div>
            </div>
        </el-dialog>
        <!-- <el-dialog title="添加权限" :visible.sync="addPostDialogVisible" class="roleDialog" width="800px">
            <div class="postDialog clearfix">
                <div class="roleIpt">
                    <span>角色名称：</span>
                    <el-input :disabled="true" style="width: 210px;" placeholder="角色名称" v-model="addPostObj.addPostValue"></el-input>
                </div>
                <el-transfer :titles="['所有权限', '拥有权限']" :props="propse" class="addPostTransfer" v-model="value" :data="data"></el-transfer>
                <div class="btnBox">
                    <el-button style="width: 100px; margin-top: 20px;" type="primary" @click="addPostFn()" size="small">提交</el-button>
                </div>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
import Header from "../../components/Header"

export default {
    data () {
        return {
            headerInfo: '角色管理',
            addRoleDialogVisible: false,
            roleList: [],
            postList: [], // 所有权限
            havePostList: [], // 角色拥有的权限
            checkedList: [],
            addRoleValue: '',
            addPostObj: {
                addPostValue: '',
                roleID: '',
            },
            addPostDialogVisible: false,
        }
    },
    components: {
        Header,
    },
    created () {
        this.getRoleListFn();
    },
    methods: {
        distPostFn () {
            let data = {
                menuName: '权限管理',
                item: 'postDivide',
            };
            this.$emit('backParam', data);
        },
        // 添加权限弹出框
        // async addPostDialogFn (item) {
        //     this.getMenuListFn();
            // let token = window.sessionStorage.getItem("gn_request_token");
        //     this.addPostObj.addPostValue = item.roleName;
        //     this.addPostObj.roleID = item.roleID;

        //     let paramObj = {
        //         Token: token,
        //         RoleID: item.roleID,
        //         pageIndex: 1,
        //         PageSize: 100
        //     }

        //     console.log(paramObj);

        //     var res = await this.postData("A1012", paramObj);
        //     this.havePostList = res.res.data.date;
        //     this.value = this.havePostList;
        //     this.addPostDialogVisible = true;
        // },
        // 创建角色
        async addRoleFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let arr = this.checkedList;
            let newArr = [];
            for (let i = 0; i < arr.length; i++) {
                newArr.push({
                    id: arr[i].id,
                    permissionName: arr[i].permissionName
                })
            }

            let paramObj = {
                Token: token,
                RoleName: this.addRoleValue,
                permissionList: newArr
            }

            var res = await this.postData("A1006", paramObj);
            if (res.code == "0") {
                this.$message({
                    type: 'success',
                    message: res.res.msg
                })
                this.addRoleDialogVisible = false;
                this.getRoleListFn();
            }
        },
        // 打开新建角色弹出框
        addRoleDialogFn () {
            this.getMenuListFn();
            this.addRoleDialogVisible = true;
        },
        // 获取角色列表
        async getRoleListFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                PageSize: 100,
                pageIndex: 1
            }
            var res = await this.postData("A1010", paramObj);

            this.roleList = res.res.data.date;
        },
        // 获取权限列表
        async getMenuListFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                PageIndex: 1,
                PageSize: 20
            }
            const menuListRes = await this.postData("A1005", paramObj);

            this.postList = menuListRes.res.data.date;
        },
        // 获取选中的值
        handleSelectionChange (val) {
            this.checkedList = val;
        },
    },
}
</script>

<style scoped lang="less">
.com-create {
    padding: 20px;
    padding-bottom: 0;
    text-align: left;
}
.roleList {
    margin-top: 30px;
}
.postDialog {
    padding: 0 30px;
    .roleIpt {
        margin-right: 50px;
        margin-top: 15px;
    }
}
.addPostTransfer {
    margin-top: 50px;
    margin-bottom: 30px;
    text-align: left;
    display: inline-block;

    // /deep/ .el-transfer-panel__item .el-checkbox__input {
    //     position: absolute;
    //     top: 8px;
    //     left: 23px;
    // }
}
</style>
