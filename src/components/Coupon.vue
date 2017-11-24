<template>
    <div>
        <input type="text" class="coupon-code" v-model="code" @input="validate">
        <div v-show="valid" v-text="message"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            code: '',
            valid: false,
            amount: '',
            coupons: [
                {
                    code: '50OFF',
                    message: '50% OFF',
                    discount: 50
                },
                {
                    code: 'FREE',
                    message: 'Free',
                    discount: 100
                }
            ]
        }
    },

    computed: {
        message() {
            return `Coupon Redeemed ${this.amount}`
        }
    },

    methods: {
        validate() {
            this.coupons.map(coupon => {
                if (coupon.code === this.code)
                    this.accept(coupon)
            })
        },

        accept(coupon) {
            this.amount = coupon.message
            this.valid = true
            this.emmitEvent(coupon)
        },

        emmitEvent(coupon) {
            this.$emit('aplied', coupon.discount)
        }
    }
}
</script>
