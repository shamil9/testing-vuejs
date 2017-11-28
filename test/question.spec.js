import Question from '../src/components/Question.vue';
import { mount } from 'vue-test-utils';
import expect from 'expect';

describe('Question', () => {
    var wrapper;
    beforeEach(
        () =>
            (wrapper = mount(Question, {
                propsData: {
                    question: {
                        title: 'The title',
                        body: 'The body'
                    }
                }
            }))
    );

    it('contains the body and the title', () => {
        expect(wrapper.html()).toContain('The title');
        expect(wrapper.html()).toContain('The body');
    });

    it('can be edited', () => {
        expect(wrapper.contains('input[name=title]')).toBe(false);

        wrapper.find('#edit').trigger('click');

        expect(wrapper.contains('h1.title')).toBe(false);
        expect(wrapper.contains('p.body')).toBe(false);

        expect(wrapper.find('input[name=title]').element.value).toBe(
            'The title'
        );
        expect(wrapper.find('textarea[name=body]').element.value).toBe(
            'The body'
        );

        expect(wrapper.contains('button#edit')).toBe(false);
    });

    it('the values should be updated after editing', () => {
        wrapper.find('#edit').trigger('click');

        wrapper.find('input[name=title]').element.value = 'New title';
        wrapper.find('input[name=title]').trigger('input');

        wrapper.find('textarea[name=body]').element.value = 'New body';
        wrapper.find('textarea[name=body]').trigger('input');

        wrapper.find('#save').trigger('click');

        expect(wrapper.html()).toContain('New title');
        expect(wrapper.html()).toContain('New body');
    });

    it('can exit editing mode', () => {
        expect(wrapper.contains('button#cancel')).toBe(false);

        wrapper.find('#edit').trigger('click');
        wrapper.find('#cancel').trigger('click');

        expect(wrapper.html()).toContain('The title');
        expect(wrapper.html()).toContain('The body');
    });
});
