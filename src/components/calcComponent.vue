<template>
  <div class="calculator">
    <div class="strange-message">
      <template v-if="result < 0">Получилось отрицательное число</template>
      <template v-else-if="result < 100"
        >Получилось число в первой сотне</template
      >
      <template v-else>Получилось слишком большое число</template>
    </div>
    <div class="display">
      <input type="number" v-model.number="operand1" name="operand1" />
      {{ sign }}
      <input type="number" v-model.number="operand2" name="operand2" />
      = {{ result }} // {{ fibRes }}
    </div>

    <div class="keyboard">
      <div class="keyboard-numbers" v-show="isShow">
        <button
          :name="num"
          v-for="(num, idx) in numbers"
          :key="idx"
          @click="operandAddNumber(num)"
        >
          {{ num }}
        </button>
        <button name="delete" @click="deleteMethod()">Press To Delete</button>
      </div>
      <div class="keyboard-operands">
        <button
          v-for="(operand, idx) in operands"
          :key="idx"
          @click="calculate(operand, operand1, operand2)"
          :name="operand"
        >
          {{ operand }}
        </button>
      </div>
    </div>
    <label for="screen-keyboard">
      <input type="checkbox" v-model="isShow" id="screen-keyboard" />Включить
      экранную клавиатуру
    </label>
    <div class="radio">
      <input
        type="radio"
        name="radio"
        id="op1"
        @click="operandChecker(1)"
      /><label for="op1">op1</label>

      <input
        type="radio"
        name="radio"
        id="op2"
        @click="operandChecker(2)"
      /><label for="op2">op2</label>
    </div>

    <div class="logs">
      <div v-for="(log, index) in logs" :key="index">{{ log }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "calculator",
  data() {
    return {
      operand1: 0,
      operand2: 0,
      result: 0,
      fibRes: 0,
      sign: "",
      operand1Check: false,
      operand2Check: false,
      isShow: true,
      operands: ["+", "-", "*", "/", "^", "//"],
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      logs: {},
    };
  },

  computed: {
    fibb1() {
      return this.fib(this.operand1);
    },
    fibb2() {
      return this.fib(this.operand2);
    },
  },

  methods: {
    operandChecker(n) {
      if (n === 1) {
        this.operand1Check = true;
        this.operand2Check = false;
      } else if (n === 2) {
        this.operand1Check = false;
        this.operand2Check = true;
      }
    },

    operandAddNumber(num) {
      if (this.operand1Check) this.operand1 = Number(this.operand1 + `${num}`);
      else if (this.operand2Check)
        this.operand2 = Number(this.operand2 + `${num}`);
    },

    deleteMethod() {
      if (this.operand1Check)
        return (this.operand1 = Number(String(this.operand1).slice(0, -1)));
      else if (this.operand2Check)
        return (this.operand2 = Number(String(this.operand2).slice(0, -1)));
    },

    calculate(operation, op1, op2) {
      switch (operation) {
        case "+":
          this.sum(op1, op2);
          this.fibRes = this.fibb1 + this.fibb2;
          break;
        case "-":
          this.diff(op1, op2);
          this.fibRes = this.fibb1 - this.fibb2;
          break;
        case "*":
          this.multiplication(op1, op2);
          this.fibRes = this.fibb1 * this.fibb2;
          break;
        case "/":
          this.division(op1, op2);
          this.fibRes = this.fibb1 / this.fibb2;
          break;
        case "^":
          this.degree(op1, op2);
          break;
        case "//":
          this.integerDiv(op1, op2);
          break;
      }
      const key = Date.now();
      const value = `${op1}${operation}${op2}=${this.result}`;
      this.$set(this.logs, key, value);
    },

    sum(num1, num2) {
      this.sign = " + ";
      this.result = num1 + num2;
    },

    diff(num1, num2) {
      this.sign = " - ";
      this.result = num1 - num2;
    },

    multiplication(num1, num2) {
      this.sign = " * ";
      this.result = num1 * num2;
    },

    division(num1, num2) {
      this.sign = " / ";
      if (num2 === 0) return (this.result = "На ноль делить нельзя!");
      this.result = num1 / num2;
    },

    degree(num1, num2, i = 0) {
      this.sign = " ^ ";
      if ((num1 === 0) & (num2 === 0)) return (this.result = "Не определено");
      this.result = 1;
      while (i < num2) {
        this.result *= num1;
        i++;
      }
    },

    integerDiv(num1, num2) {
      this.sign = " // ";
      if (num2 === 0) return (this.result = "На ноль делить нельзя!");

      this.result = Math.trunc(num1 / num2);
    },

    fib(n) {
      return n <= 1 ? n : this.fib(n - 1) + this.fib(n - 2);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
.calculator
  display: flex
  flex-direction: column
  align-items: center

.keyboard
  display: flex
  flex-direction: column

.display
  display: flex
</style>
