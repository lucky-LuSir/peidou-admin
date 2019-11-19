<template>
    <!-- 询价订单主页面 -->
    <div class="root">
        <awaitQuote @quoteBack="quoteBack($event)" v-if="quoteStatus == 1"></awaitQuote>
        <awaitQuoteConfirm v-if="quoteStatus == 2"></awaitQuoteConfirm>
        <alreadyQuoteConfirm v-if="quoteStatus == 3"></alreadyQuoteConfirm>
        <alreadyCancelled v-if="quoteStatus == 4"></alreadyCancelled>
    </div>
</template>

<script>
import awaitQuote from '../components/awaitQuote'
import awaitQuoteConfirm from '../components/awaitQuoteConfirm'
import alreadyQuoteConfirm from '../components/alreadyQuoteConfirm'
import alreadyCancelled from '../components/alreadyCancelled'

export default {
    components: {
        awaitQuote,
        awaitQuoteConfirm,
        alreadyQuoteConfirm,
        alreadyCancelled
    },
    data () {
        return {
            quoteStatus: '1',
        }
    },
    created () {
        let quoteStatusObj = JSON.parse(window.sessionStorage.getItem("quoteStatusObj"))
        if (quoteStatusObj) {
            if (quoteStatusObj.inquiryState == '2') {
                this.quoteStatus = 2;
            } else if (quoteStatusObj.inquiryState == '1') {
                this.quoteStatus = 1;
            } else if (quoteStatusObj.inquiryState == '3') {
                this.quoteStatus = 3;
            } else if (quoteStatusObj.inquiryState == '4') {
                this.quoteStatus = 4;
            }
        }
    },
    methods: {
        quoteBack (val) {
            this.$emit('backParam', val);
        }
    },
}
</script>

<style>
</style>
