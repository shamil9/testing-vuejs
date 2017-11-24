import { mount } from 'vue-test-utils';
import expect from 'expect';
import Coupon from '../src/components/Coupon.vue';

describe('Coupon', () => {
    var wrapper;
    beforeEach(() => (wrapper = mount(Coupon)));

    it('accepts a coupon code', () => {
        expect(wrapper.contains('input.coupon-code')).toBe(true);
    });

    it('validates a user provided coupon code', () => {
        addCouponCode('50OFF');

        expect(wrapper.html()).toContain('Coupon Redeemed 50% OFF');
    });

    it('broadcasts the discount amount when valid code is supplied', () => {
        addCouponCode('50OFF');

        expect(wrapper.emitted().aplied).toBeTruthy();
        expect(wrapper.emitted().aplied[0]).toEqual([50]);
    });

    function addCouponCode(code) {
        var couponInput = wrapper.find('input.coupon-code');
        couponInput.element.value = code;
        couponInput.trigger('input');
    }
});
