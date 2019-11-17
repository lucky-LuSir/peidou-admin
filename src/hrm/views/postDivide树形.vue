<template>
    <!-- 权限管理 -->
    <div class="root">
        <div class="com-header clearfix">
            <h2>权限管理</h2>
            <div class="roleBtns">
                <el-button @click="addRoleDialogFn()" type="primary" size="small">
                    <!-- <i class="el-icon-plus"></i>&nbsp;角色 -->
                    新增角色
                </el-button>
                <el-button style="margin-left: 20px;" @click="preserveFn()" type="primary" size="small">
                    <!-- <i class="el-icon-plus"></i>&nbsp;角色 -->
                    保存
                </el-button>
            </div>
        </div>
        <el-container>
            <!--子菜单-->
            <el-aside width="201px" class="aside">
                <el-menu :collapse="false" default-active="1" :default-openeds="activityArr" active-text-color="#ffd04b" class="el-menu-vertical" @open="handleOpen" @close="handleClose">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-bell"></i>
                            <span>角色列表</span>
                        </template>
                        <div v-for="item in roleList" @click="handleClickARole(item)" :key="item.roleID">
                            <el-menu-item :index="item.roleID">
                                <i class="el-icon-star-off"></i>
                                <span slot="title" :title="item.roleName">{{item.roleName}}</span>
                            </el-menu-item>
                        </div>
                    </el-submenu>
                </el-menu>

            </el-aside>
            <!--主要内容-->
            <el-main>
                <!--岗位权限-->
                <div class="post_resource">
                    <el-tree :data="treeMenuList" style="line-height: 50px;" show-checkbox="" :default-expand-all="false" :expand-on-click-node="true" node-key="id" ref="tree" highlight-current :props="defaultProps">
                    </el-tree>
                </div>
            </el-main>
        </el-container>
        <el-dialog title="新增角色" :visible.sync="addRoleDialogVisible" class="roleDialog" width="800px">
            <el-form :rules="rules" ref="roleForm" :model="roleForm" class="demo-form-inline" :inline="true">
                <el-form-item label="角色名称" prop="rolename">
                    <el-input v-model="roleForm.rolename" placeholder="角色名称" size="small"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                    <el-input :disabled="true" placeholder="角色描述" size="small"></el-input>
                </el-form-item>
                <el-form-item style="display: block; width: 100%;">
                    <div class="com-floor-btns">
                        <el-button style="width: 100px;" type="primary" @click="addRoleFn('roleForm')" size="small">提交</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data () {
        return {
            activityArr: ["1"],
            roleList: [],
            treeMenuList: [],
            defaultProps: {
                children: 'children',
                label: 'permissionName'
            },
            roleForm: {
                rolename: '',
                permissionList: [],
            },
            addRoleDialogVisible: false,
            rules: {
                rolename: [
                    { required: true, message: '请输入角色名称', trigger: 'blur' },
                ]
            },
            roleID: '',
        }
    },
    created () {
        this.getRoleListFn();
        this.getMenuListFn();
    },
    methods: {
        // 保存
        async preserveFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let treeList = this.$refs.tree.getCheckedNodes();
            // console.log(treeList);
            // console.log(this.roleID);
            if (this.roleID) {
                let paramObj = {
                    Token: token,
                    RoleID: this.roleID,
                    permissionList: treeList
                }
                const res = await this.postData("A1011", paramObj);
                if (res.code == "0") {
                    this.$message({
                        type: "success",
                        message: res.res.msg
                    })
                }
            } else {
                this.$message({
                    type: 'info',
                    message: '请选择角色!'
                })
            }
        },
        // 添加角色ajax
        addRoleFn (roleForm) {
            this.$refs[roleForm].validate(async (volid) => {
                if (volid) {
                    let token = window.sessionStorage.getItem("gn_request_token");
                    
                    let treeList = this.$refs.tree.getCheckedNodes();

                    let paramObj = {
                        Token: token,
                        RoleName: this.roleForm.rolename,
                        permissionList: treeList
                    }
                    var res = await this.postData("A1006", paramObj);
                    if (res.code == "0") {
                        this.$message({
                            type: "success",
                            message: res.res.msg
                        })
                        this.getRoleListFn();
                        this.addRoleDialogVisible = false;
                        this.$refs[roleForm].resetFields();
                    }
                    // console.log(aaa);


                    // this.roleList = res.res.data.date;
                }
            })
        },
        // 添加角色弹出框
        addRoleDialogFn () {
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
        // 获取菜单
        async getMenuListFn () {
            let _mainObj = JSON.parse(window.sessionStorage.getItem("_mainObj"));
            this.treeMenuList = _mainObj.menuTreeList;
        },
        // 点击菜单
        async handleClickARole (item) {
            this.roleID = item.roleID;
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                RoleID: item.roleID,
                PageSize: 100,
                pageIndex: 1
            }
            const res = await this.postData("A1012", paramObj);
            let result = res.res.data.date;
            this.$refs.tree.setCheckedNodes(result);

            // this.roleList = res.res.data.date;
        },
        handleOpen (key, keyPath) {

        },
        handleClose (key, keyPath) {

        },
    },
}
</script>

<style scoped lang="less">
.com-header {
    h2 {
        width: 210px;
    }
    // height: 200px;
}
.el-aside {
    // padding-top: 20px;
    /deep/ .el-menu-item,
    .el-submenu .el-menu-item,
    .el-submenu__title {
        height: 40px;
        line-height: 40px;
    }
}
.el-main {
    padding: 20px;
    .roleBtns {
        text-align: left;
        margin-left: 20px;
        margin-bottom: 30px;
    }
}

.roleDialog {
    .el-form-item {
        width: 48%;
        margin-top: 10px;
    }
    .whole {
        width: 100%;
        text-align: left;
        padding-left: 42px;
    }
    /deep/ .el-select {
        width: 211px;
    }
    .el-button {
        margin-top: 35px;
    }
    /deep/ .el-form-item__label {
        width: 80px;
        text-align: right;
    }
}
.el-menu {
    height: calc(100vh - 200px);
    text-align: left;
    /deep/ .el-icon-bell {
        margin-right: 10px;
    }
}
</style>
