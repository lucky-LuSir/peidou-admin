<template>
    <!-- 权限管理 -->
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="main">
            <div class="com-search-list">
                <el-select size="small" v-model="roleValue" clearable placeholder="请选择">
                    <el-option @click.native="selectRoleFn(item)" v-for="item in roleList" :key="item.roleID" :label="item.roleName" :value="item.roleID">
                    </el-option>
                </el-select>
            </div>
            <div class="havePostLists">
                <i>角色拥有权限</i>
                <span style="margin-left: 15px; cursor: pointer;" class="el-icon-delete" @click="delAllPostsFn()"></span>
                <div class="havaPostList">
                    <el-tag :key="tag.id" v-for="tag in havePostList" closable :disable-transitions="false" @close="delPostFn(tag)">
                        {{tag.permissionName}}
                    </el-tag>
                </div>
            </div>
            <div class="postList _ml20">
                <el-table :data="postList" border @selection-change="handlePostelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column prop="permissionName" label="权限名称" width="250">
                    </el-table-column>
                    <el-table-column width="250" label="操作">
                        <template slot-scope="scope">
                            <el-button @click="addPostFn(scope.row)" type="text" size="small">添加权限</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <el-checkbox-group v-model="checkedPostValue[permissionName]" @change="handleCheckedPostsChangeFn">
                    <el-checkbox v-for="item in postList" :label="item.permissionName" :key="item.number">{{item.permissionName}}</el-checkbox>
                </el-checkbox-group> -->
            </div>
        </div>
        <el-dialog title="添加角色" :visible.sync="addRoleDialogVisible" class="roleDialog" width="800px">
            <div class="postDialog clearfix">
                <div class="roleIpt fl">
                    <span>角色名称：</span>
                    <el-input style="width: 210px;" placeholder="角色名称" v-model="addRoleValue"></el-input>
                </div>
                <el-table class="fl" style="width: 350px;" ref="multipleTable" :data="postList" tooltip-effect="dark" row-key="id" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" :reserve-selection="true" width="55">
                    </el-table-column>
                    <el-table-column prop="permissionName" label="权限" width="120">
                    </el-table-column>
                </el-table>
                <div class="btnBox">
                    <el-button style="width: 100px; margin-top: 20px;" type="primary" @click="addRoleFn()" size="small">提交</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Header from "../../components/Header"

export default {
    data () {
        return {
            headerInfo: '权限管理',
            roleList: [],
            addRoleDialogVisible: false,
            postList: [], // 所有权限
            havePostList: [], // 角色拥有的权限
            checkedList: [],
            addRoleValue: '',
            addPostObj: {
                addPostValue: '',
                roleID: '',
            },
            addPostDialogVisible: false,
            roleValue: '',
            selectPostList: [], // 选中的权限
            curRoleName: '',
            curRoleId: '',
            postList: [],
            checkedPostValue: [
                {
                    permissionName: '',
                    id: ''
                }
            ],
            checkAll: false,
            isIndeterminate: true,
            paramValueObj: [],
            curRolePostsObj: {},
        }
    },
    components: {
        Header,
    },
    created () {
        
        this.getRoleListFn();
        this.getPostListFn();
    },
    methods: {
        delAllPostsFn () {
            // if (!this.curRoleId) {
            //     this.$message({
            //         type: 'warning',
            //         message: '请选择角色'
            //     })
            //     return;
            // }

            // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     let newArr = [];
            //     for (let i = 0; i < this.havePostList.length; i++) {
            //         newArr.push({
            //             id: this.havePostList[i].id,
            //             permissionName: this.havePostList[i].permissionName
            //         })
            //     }
            //     console.log(newArr);
            // }).catch(() => {
            //     this.$message({
            //         type: 'info',
            //         message: '已取消删除'
            //     });
            // });

        },
        // 全选
        handleCheckAllChange (val) {
            // let curPostValue = [];
            // for (let i = 0; i < this.postList.length; i++) {
            //     curPostValue.push(this.postList[i].permissionName)
            // }

            // this.checkedPostValue = val ? curPostValue : [];
            // this.isIndeterminate = false;

            // let newArr = [];
            // // console.log(...(this.checkedPostValue));

            // for (let i = 0; i < this.checkedPostValue.length; i++) {
            //     // const element = array[i];
            //     console.log(this.checkedPostValue[i]);

            // }

        },
        // 选择权限
        handleCheckedPostsChangeFn (value) {
            console.log(value);

            // let checkedCount = value.length;
            // console.log(this.postList);

            // this.checkAll = checkedCount === this.postList.length;
            // this.isIndeterminate = checkedCount > 0 && checkedCount < this.postList.length;
        },
        // 选择角色获取角色身上的权限
        async selectRoleFn (item) {
            this.curRolePostsObj = item;
            this.curRoleName = this.curRolePostsObj.roleName;
            this.curRoleId = this.curRolePostsObj.roleID;
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                RoleID: this.curRoleId,
                pageIndex: 1,
                PageSize: 100,
            }
            const res = await this.postData("A1012", paramObj);

            this.havePostList = res.res.data.date;
            console.log(this.havePostList);
        },
        // 获取选中的权限
        handlePostelectionChange (val) {
            console.log(val);
            this.selectPostList = val;
        },
        // 获取权限列表
        async getPostListFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                PageSize: 100,
                pageIndex: 1
            }
            const res = await this.postData("A1005", paramObj);
            console.log(res);
            let arr = res.res.data.date;
            // this.postList
            for (let i = 0; i < arr.length; i++) {
                this.postList.push({
                    permissionName: arr[i].permissionName,
                    id: arr[i].id
                })
            }
        },
        // 添加权限
        addPostFn (item) {
            if (!this.curRoleId) {
                this.$message({
                    type: 'warning',
                    message: '请选择角色'
                })
                return;
            }

            this.$confirm('您将添加选中的权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let arr = [];
                for (let i = 0; i < this.selectPostList.length; i++) {
                    // const element = array[index];
                    arr.push({
                        id: this.selectPostList[i].id,
                        permissionName: this.selectPostList[i].permissionName
                    })
                }

                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    RoleID: this.curRoleId,
                    permissionList: arr
                }
                const res = await this.postData("A1011", paramObj);
                if (res.code == '0') {
                    this.$message({
                        type: 'success',
                        message: res.res.msg
                    })
                    this.getRolePostsListFn();
                }

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消添加'
                });
            });

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
            console.log(res);

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
        // 删除权限
        delPostFn (tag) {
            this.$confirm('您将删除选中的权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let token = window.sessionStorage.getItem("gn_request_token");
                let paramObj = {
                    Token: token,
                    permission: {
                        id: tag.id
                    }
                }
                const res = await this.postData("A1013", paramObj);
                if (res.code == '0') {
                    this.$message({
                        type: 'success',
                        message: res.res.msg
                    })
                    this.getRolePostsListFn();
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        // 添加或删除完调接口
        async getRolePostsListFn () {
            this.curRoleName = this.curRolePostsObj.roleName;
            this.curRoleId = this.curRolePostsObj.roleID;
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                RoleID: this.curRoleId,
                pageIndex: 1,
                PageSize: 100,
            }
            const res = await this.postData("A1012", paramObj);
            this.havePostList = res.res.data.date;
        },
        // 获取选中的值
        handleSelectionChange (val) {
            this.checkedList = val;
        },
        // 切换选择
        // toggleSelection () {
        // },

        // 门店一级审核, storeFirstAudit
    },
}
</script>

<style scoped lang="less">
.com-create {
    padding: 20px;
    padding-bottom: 0;
    text-align: left;
}
.postList {
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
}
.havePostLists {
    margin: 20px 30px;
    text-align: left;
    .havaPostList {
        padding: 20px 20px 15px;
        border: 1px solid #ccc;
        > span {
            margin-right: 5px;
            margin-bottom: 5px;
        }
    }
    > i {
        display: inline-block;
        margin-bottom: 10px;
        font-weight: 700;
    }
}
</style>
