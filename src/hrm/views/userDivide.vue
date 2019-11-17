<template>
    <div class="root">
        <Header :headerInfo="headerInfo"></Header>
        <div class="main">
            <div class="com-search-list">
                <span class="label">用户：</span>
                <el-autocomplete size="small" class="inline-input" v-model="userName" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect"></el-autocomplete>
                <el-button class="searchBtn _btn32" size="small">
                    <i class="el-icon-font-sousuo"></i>查询
                </el-button>
                <el-button @click="addUserDialogFn()" class="createBtn _btn32" size="small">
                    <i class="el-icon-plus"></i>&nbsp;用户
                </el-button>
                <el-button @click="addMenuDialogFn()" class="createBtn _btn32" size="small">
                    <i class="el-icon-plus"></i>&nbsp;菜单
                </el-button>
            </div>
            <div class="userList _ml20">
                <el-table :data="getUserData" border>
                    <el-table-column prop="username" label="员工名称" width="180">
                    </el-table-column>
                    <el-table-column prop="roleName" label="职位" width="180">
                    </el-table-column>
                    <el-table-column prop="state" label="状态" width="180">
                        <template slot-scope="scope">
                            <span>{{scope.row.state == 0 ? '在职' : '离职'}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100">
                        <template slot-scope="scope">
                            <el-button @click="editUserDialogFn(scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="delUserFn(scope.row)" type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <el-dialog title="用户新增" :visible.sync="addUserDialogVisible" class="userDialog" width="800px">
            <el-form :rules="rules" ref="userForm" :model="userForm" class="demo-form-inline" :inline="true">
                <el-form-item label="员工姓名" prop="username">
                    <el-input v-model="userForm.username" placeholder="员工姓名" size="small"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" prop="password">
                    <el-input v-model="userForm.password" placeholder="登录密码" size="small"></el-input>
                </el-form-item>
                <el-form-item label="员工岗位" prop="roleID">
                    <el-select v-model="userForm.roleID" placeholder="员工岗位" size="small">
                        <el-option v-for="item in roleList" :key="item.roleID" :label="item.roleName" :value="item.roleID"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号">
                    <el-input :disabled="true" placeholder="账号" size="small"></el-input>
                </el-form-item>
                <!-- <el-form-item class="whole" label="权限">
                    <el-tag size="small" :key="index" v-for="(item, index) in postTags" closable :disable-transitions="false" @close="handleClose(item)">
                        {{item.name}}
                    </el-tag>
                </el-form-item> -->
                <el-form-item style="display: block; width: 100%;">
                    <div class="com-floor-btns">
                        <el-button style="width: 100px;" type="primary" @click="addUserFn('userForm')">提交</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="用户修改" :visible.sync="editUserDialogVisible" class="userDialog" width="800px">
            <el-form :model="editUserForm" class="demo-form-inline" :inline="true">
                <el-form-item label="员工姓名" prop="username">
                    <el-input v-model="editUserForm.username" placeholder="员工姓名" size="small"></el-input>
                </el-form-item>
                <!-- <el-form-item label="登录密码">
                    <el-input v-model="userForm.password" placeholder="登录密码" size="small"></el-input>
                </el-form-item> -->
                <el-form-item label="员工岗位" prop="roleID">
                    <el-select v-model="editUserForm.RoleID" placeholder="员工岗位" size="small">
                        <el-option v-for="item in roleList" :key="item.roleID" :label="item.roleName" :value="item.roleID"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="账号">
                    <el-input :disabled="true" placeholder="账号" size="small"></el-input>
                </el-form-item> -->
                <el-form-item style="display: block; width: 100%;">
                    <div class="com-floor-btns">
                        <el-button style="width: 100px;" type="primary" @click="editUserFn()">提交</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="添加菜单" :visible.sync="addMenuDialogVisible" class="addMenuDialog" width="800px">
            <el-form :model="menuForm" class="demo-form-inline" :inline="true">
                <el-form-item label="菜单名称">
                    <el-input size="small" v-model="menuForm.PermissionName" placeholder="菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标">
                    <el-input size="small" v-model="menuForm.NavigateIconClass" placeholder="菜单图标"></el-input>
                </el-form-item>
                <el-form-item label="菜单组件">
                    <el-input size="small" v-model="menuForm.Url" placeholder="菜单组件"></el-input>
                </el-form-item>
                <el-form-item label="父级ID">
                    <el-select style="width: 213px;" size="small" v-model="menuForm.ParentNumber" placeholder="请选择父级ID">
                        <el-option
                        v-for="item in parentList"
                        :key="item.number"
                        :label="item.permissionName"
                        :value="item.number">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单类型">
                    <el-select style="width: 213px;" size="small" v-model="menuForm.menuType" placeholder="请选择菜单类型">
                        <el-option
                        v-for="item in menuTypeList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单层级">
                    <el-select style="width: 213px;" size="small" v-model="menuForm.level" placeholder="请选择菜单层级">
                        <el-option
                        v-for="item in levelList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单顺序">
                    <el-input size="small" v-model="menuForm.sortID" placeholder="菜单顺序"></el-input>
                </el-form-item>
                <el-form-item label="未知功能">
                    <el-input :disabled="true" size="small" placeholder="未知功能"></el-input>
                </el-form-item>
                <el-form-item class="com-btn-block">
                    <el-button type="primary" @click="addMenuFn()">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>

</template>

<script>
import Header from "../../components/Header"

export default {
    data () {
        return {
            headerInfo: '用户管理',
            userName: '',
            getUserData: [],
            addUserDialogVisible: false,
            editUserDialogVisible: false,
            addMenuDialogVisible: false,
            userForm: {
                username: '',
                roleID: '',
                // account: '',
                password: ''
            },
            editUserForm: {
                username: '',
                RoleID: ''
            },
            menuForm: {
                PermissionName: '',
                NavigateIconClass: '',
                Url: '',
                ParentNumber: '',
                menuType: '',
                level: '',
                sortID: '', // 排序
            },
            roleList: [],
            rules: {
                username: [
                    { required: true, message: '请输入员工姓名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入登录密码', trigger: 'blur' }
                ],
                roleID: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            },
            parentList: [],
            levelList: [
                {
                    value: '0',
                    label: '一级菜单'
                },
                {
                    value: '1',
                    label: '二级菜单'
                }
            ],
            menuTypeList: [
                {
                    value: '1',
                    label: '显示菜单'
                },
                {
                    value: '2',
                    label: '非显示菜单'
                }
            ]
        }
    },
    components: {
        Header,
    },
    created () {
        this.getUserFn();
    },
    methods: {
        // 修改员工ajax
        async editUserFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            
            let paramObj = {
                Token: token,
                ID: this.editUserForm.id,
                RoleID: this.editUserForm.RoleID
            }
            console.log(paramObj);
            
            const res = await this.postData("A1014", paramObj);
            console.log(res);
            if (res.code == '0') {
                this.$message({
                    type: "success",
                    message: res.res.msg
                })
                this.getUserFn();
                this.editUserDialogVisible = false;
            }
            
        },
        // 修改员工信息弹框
        async editUserDialogFn (item) {
            console.log(item);
            
            let token = window.sessionStorage.getItem("gn_request_token");
            let roleParamObj = {
                Token: token,
                PageIndex: 1,
                PageSize: 20
            }
            var roleRes = await this.postData("A1010", roleParamObj);
            this.roleList = roleRes.res.data.date;
            console.log(this.roleList);
            
            this.editUserForm = item;
            this.editUserDialogVisible = true;
        },
        // 添加菜单ajax
        async addMenuFn () {
            let token = window.sessionStorage.getItem("gn_request_token");

            let permission = {
                PermissionName: this.menuForm.PermissionName,
                NavigateIconClass: this.menuForm.NavigateIconClass,
                Url: this.menuForm.Url,
                ParentNumber: this.menuForm.ParentNumber,
                level: parseInt(this.menuForm.level),
                menuType: this.menuForm.menuType
            }
            let paramObj = {
                Token: token,
                permission: permission
            }
            console.log(paramObj);
            
            const res = await this.postData("A1003", paramObj);
            if (res.code == "0") {
                this.$message({
                    type: 'success',
                    message: res.res.msg
                })
                this.addMenuDialogVisible = false;
            }
        },
        // 添加菜单弹出框
        async addMenuDialogFn () {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
            }
            var res = await this.postData("A1004", paramObj);
            this.parentList = res.res.data;
            console.log(this.parentList);
            
            this.parentList.unshift({
                permissionName: '超级奶爸',
                number: '0'
            })

            this.addMenuDialogVisible = true;
        },
        // handleClose (tag) {
        //     this.postTags.splice(this.postTags.indexOf(tag), 1);
        // },
        // 添加员工ajax
        addUserFn (userForm) {
            this.$refs[userForm].validate(async (volid) => {
                if (volid) {
                    let token = window.sessionStorage.getItem("gn_request_token");
                    let paramObj = {
                        Token: token,
                        user: {
                            Username: this.userForm.username,
                            PASSWORD: this.userForm.password,
                            RoleID: this.userForm.roleID
                        }
                    }
                    var res = await this.postData("A1007", paramObj);
                    this.$refs[userForm].resetFields();
                    this.getUserFn();
                    this.addUserDialogVisible = false;
                }
            })
        },
        // 添加员工弹出框框
        async addUserDialogFn () {
            this.addUserDialogVisible = true;
            let token = window.sessionStorage.getItem("gn_request_token");
            let roleParamObj = {
                Token: token,
                PageIndex: 1,
                PageSize: 20
            }

            var roleRes = await this.postData("A1010", roleParamObj);

            this.roleList = roleRes.res.data.date;
        },
        // 获取员工列表ajax
        async getUserFn () {
            let token = window.sessionStorage.getItem("gn_request_token");

            let userParamObj = {
                Token: token,
                PageIndex: 1,
                PageSize: 20
            }

            const userRes = await this.postData("A1009", userParamObj);
            this.getUserData = userRes.res.data.date;
            
        },
        querySearch (queryString, cb) {
            let newArr = [];
            for (let index = 0; index < this.getUserData.length; index++) {
                newArr.push({
                    value: this.getUserData[index].username
                })
            }
            var restaurants = newArr;
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
        // 删除用户
        delUserFn () {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    },
}
</script>

<style lang="less" scoped>
.com-search-list {
    /deep/ .createBtn {
        background-color: #909399;
    }
}

.userList {
    margin-top: 30px;
}
.userDialog {
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
    .el-tag {
        margin-right: 5px;
    }
}
.addMenuDialog {
    /deep/ .el-form-item__label {
        width: 80px;
        text-align: right;
    }
    .com-btn-block {
        display: block;
        margin-top: 35px;
    }
}
</style>
