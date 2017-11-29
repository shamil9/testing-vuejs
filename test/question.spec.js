import Question from '../src/components/Question.vue';
import { mount } from 'vue-test-utils';
import expect from 'expect';
import moxios from 'moxios';

describe('Question', () => {
    var wrapper;
    beforeEach(() => {
        moxios.install();

        wrapper = mount(Question, {
            propsData: {
                question: {
                    title: 'The title',
                    body: 'The body'
                }
            }
        });
    });

    afterEach('Question', () => {
        moxios.uninstall();
    });

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

    it.only('the values should be updated after editing', done => {
        wrapper.find('#edit').trigger('click');

        wrapper.find('input[name=title]').element.value = 'New title';
        wrapper.find('input[name=title]').trigger('input');

        wrapper.find('textarea[name=body]').element.value = 'New body';
        wrapper.find('textarea[name=body]').trigger('input');

        moxios.stubRequest('/question/1', {
            response: {
                body: 'New body',
                title: 'New title'
            }
        });

        wrapper.find('#save').trigger('click');

        moxios.wait(() => {
            expect(wrapper.html()).toContain('New title');
            expect(wrapper.html()).toContain('New body');

            done();
        });
    });

    it('can exit editing mode', () => {
        expect(wrapper.contains('button#cancel')).toBe(false);

        wrapper.find('#edit').trigger('click');
        wrapper.find('#cancel').trigger('click');

        expect(wrapper.html()).toContain('The title');
        expect(wrapper.html()).toContain('The body');
    });
});
