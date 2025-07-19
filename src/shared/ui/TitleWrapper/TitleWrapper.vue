<template>
  <h2 class="title-wrapper table relative w-auto my-6 mx-auto text-2xl font-bold"><slot /></h2>
</template>

<style lang="scss" scoped>
.title-wrapper {
  letter-spacing: 2px;
  color: #adff2f;

  &::before {
    content: '';
    position: absolute;
    width: 30px;
    height: 20px;
    top: -50%;
    left: -25px;
    border-top: 2px solid #fed57b;
    border-left: 2px solid #fed57b;
  }

  &::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 20px;
    bottom: -50%;
    right: -25px;
    border-bottom: 2px solid #fed57b;
    border-right: 2px solid #fed57b;
  }
}
</style>
