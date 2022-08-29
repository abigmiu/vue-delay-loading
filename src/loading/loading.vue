<template>
    <div class="loading-mask">
        <div class="loading-text">
            加载中
        </div>
    </div>
</template>
<style>
.loading-mask {
    position: absolute;
    inset: 0;
    background-color: hsla(0,0%,100%,.9);
}
.loading-text {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;
}
</style>
