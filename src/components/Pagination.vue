<template>
    <div class="page-list">
        <el-pagination style="margin: 30px 0;" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize" layout="total, prev, pager, next" background :total="totalNum">
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: ["totalNums"],
    data () {
        return {
            currentPage: 1,
            pageSize: 10,
            totalNum: 0,
        }
    },
    created() {
        console.log(this.totalNums);
    },
    methods: {
        async handleCurrentChange (val) {
            let token = window.sessionStorage.getItem("gn_request_token");
            let paramObj = {
                Token: token,
                PageSize: this.pageSize,
                pageIndex: val
            }
            let res = await this.postData("A1016", paramObj);
            let result = res.res.data;
            this.totalNum = result.count;
            let tableData = res.res.data.date;
            for (let i = 0; i < tableData.length; i++) {
                tableData[i].stateObj = {
                    approvalState: tableData[i].approvalState,
                    reviewState: tableData[i].reviewState
                }
            }
            this.tableData = tableData;
        },
    },
}
</script>

<style>
</style>
