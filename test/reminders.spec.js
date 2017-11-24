import { mount } from "vue-test-utils";
import expect from "expect";
import Reminders from "../src/components/Reminders.vue";

describe("Reminders", () => {
  var wrapper;
  beforeEach(() => (wrapper = mount(Reminders)));

  it("hides the reminders list if there is none", () => {
    expect(wrapper.contains("ul")).toBe(false);
  });

  it("can add reminders", () => {
    addReminder("Go to the store");

    expect(wrapper.find("ul").text()).toContain("Go to the store");
  });

  it("can remove reminders", () => {
    addReminder("Go to the store");
    addReminder("Go back");

    var removeButton = wrapper.find("ul > li:first-child .remove");
    removeButton.trigger("click");

    expect(wrapper.find("ul").text()).not.toContain("Go to the store");
  });

  function addReminder(body) {
    var newReminder = wrapper.find(".new-reminder");

    newReminder.element.value = body;
    newReminder.trigger("input");

    wrapper.find("button").trigger("click");
  }
});
