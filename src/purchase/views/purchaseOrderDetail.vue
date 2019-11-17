<template>
    <!-- 询价订单主页面 -->
    <div class="root">
        <purAlreadySend v-if="quoteStatus == 4"></purAlreadySend>
        <purAwaitSend v-if="quoteStatus == 1"></purAwaitSend>
        <purOverdue v-if="quoteStatus == 3"></purOverdue>
        <purSettlement v-if="quoteStatus == 2"></purSettlement>
    </div>
</template>

<script>
import purAlreadySend from '../components/purAlreadySend'
import purAwaitSend from '../components/purAwaitSend'
import purOverdue from '../components/purOverdue'
import purSettlement from '../components/purSettlement'

export default {
    components: {
        purAlreadySend,
        purAwaitSend,
        purOverdue,
        purSettlement
    },
    data () {
        return {
            quoteStatus: 1,
        }
    },
    created () {
        let purInfoObj = JSON.parse(window.sessionStorage.getItem("purInfoObj"))
        console.log(purInfoObj);
        
        if (purInfoObj) {
            if (purInfoObj.inquiryState == 1 && purInfoObj.expressState == 1) {
                this.quoteStatus = 1; // 挂账中待发货
            } else if (purInfoObj.inquiryState == 1 && purInfoObj.expressState == 1) {
                this.quoteStatus = 4; // 挂账中待发货
            } else if (purInfoObj.inquiryState == 2) {
                this.quoteStatus = 2; // 已结算
            } else if (purInfoObj.inquiryState == 3) {
                this.quoteStatus = 3; // 已逾期
            }
        }
    },
    methods: {
        purBack (val) {
            this.$emit('backParam', val);
        }
    },
}
</script>

<style>
</style>
