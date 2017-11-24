import Counter from '../src/components/Counter.vue';
import { mount } from 'vue-test-utils';
import expect from 'expect';

describe('Counter', () => {
    var wrapper;

    beforeEach(() => (wrapper = mount(Counter)));

    it('defaults to a count of 0', () => {
        expect(wrapper.vm.count).toBe(0);
    });

    it('presents the current count', () => {
        expect(wrapper.find('.count').html()).toContain(0);

        wrapper.find('button').trigger('click');

        expect(wrapper.find('.count').html()).toContain(1);
    });

    it('should increment the count on button press', () => {
        expect(wrapper.vm.count).toBe(0);

        wrapper.find('button').trigger('click');

        expect(wrapper.vm.count).toBe(1);
    });
});
