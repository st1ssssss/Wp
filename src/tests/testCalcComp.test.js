import { shallowMount } from '@vue/test-utils'
import calcComponent from '../components/calcComponent.vue'

describe('test calcComponent', () => {
    it('test operand1 input', () => {
        const wrapper = shallowMount(calcComponent)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue("1")
        expect(wrapper.vm.operand1).toBe(1)
    })
    it('test operand2 input', () => {
        const wrapper = shallowMount(calcComponent)
        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue("1")
        expect(wrapper.vm.operand2).toBe(1)
    })
    it('test sum operation', () => {
        const wrapper = shallowMount(calcComponent)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue("1")
        expect(wrapper.vm.operand1).toBe(1)

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue("3")
        expect(wrapper.vm.operand2).toBe(3)

        const btnSum = wrapper.find('button[name="+"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(4)
    })
    it('test diff operation', () => {
        const wrapper = shallowMount(calcComponent)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue("3")
        expect(wrapper.vm.operand1).toBe(3)

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue("1")
        expect(wrapper.vm.operand2).toBe(1)

        const btnDiff = wrapper.find('button[name="-"]')
        btnDiff.trigger('click')

        expect(wrapper.vm.result).toBe(2)
    })
    it('test multiplication operation', () => {
        const wrapper = shallowMount(calcComponent)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue("2")
        expect(wrapper.vm.operand1).toBe(2)

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue("3")
        expect(wrapper.vm.operand2).toBe(3)

        const btnMult = wrapper.find('button[name="*"]')
        btnMult.trigger('click')

        expect(wrapper.vm.result).toBe(6)
    })
    it('test division operation', () => {
        const wrapper = shallowMount(calcComponent)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue("4")
        expect(wrapper.vm.operand1).toBe(4)

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue("2")
        expect(wrapper.vm.operand2).toBe(2)

        const btnDiv = wrapper.find('button[name="-"]')
        btnDiv.trigger('click')

        expect(wrapper.vm.result).toBe(2)
    })
    it('test digree operation', () => {
        const wrapper = shallowMount(calcComponent)
        const operand1Input = wrapper.find('input[name=operand1]')
        operand1Input.setValue("2")
        expect(wrapper.vm.operand1).toBe(2)

        const operand2Input = wrapper.find('input[name=operand2]')
        operand2Input.setValue("3")
        expect(wrapper.vm.operand2).toBe(3)

        const btnDig = wrapper.find('button[name="^"]')
        btnDig.trigger('click')

        expect(wrapper.vm.result).toBe(8)
    })
    it('test screen-keyboard operand1', () => {
        const wrapper = shallowMount(calcComponent)
        const btnAdd = wrapper.find('button[name="9"]')
        const radioBtn = wrapper.find('input[id="op1"]')

        radioBtn.trigger('click')
        btnAdd.trigger('click')

        expect(wrapper.vm.operand1).toBe(9)
    })
    it('test screen-keyboard operand2', () => {
        const wrapper = shallowMount(calcComponent)
        const btnAdd = wrapper.find('button[name="4"]')
        const radioBtn = wrapper.find('input[id="op2"]')

        radioBtn.trigger('click')
        btnAdd.trigger('click')

        expect(wrapper.vm.operand2).toBe(4)
    })
    it('test screen-keyboard deleteBtn', () => {
        const wrapper = shallowMount(calcComponent)
        const operand1Input = wrapper.find('input[name=operand1]')
        const deleteBtn = wrapper.find('button[name="delete"]')
        const radioBtn = wrapper.find('input[id="op1"]')

        operand1Input.setValue("12")
        radioBtn.trigger('click')
        deleteBtn.trigger('click')

        expect(wrapper.vm.operand1).toBe(1)
    })
})