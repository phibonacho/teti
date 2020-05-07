<template>
    <svg class="spinner" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
        <circle class="path" id="my-circle" r="28" cx="32" cy="32" fill="none" style = "stroke-width: 4; stroke-dasharray : 160; stroke-dashoffset:200; stroke-linecap : round" />
    </svg>
</template>

<script>
    module.export = {
        name: "my-spinner"
    };

</script>

<style scoped lang="scss">
    @import "../../scss/base/variables";
    $spinner-empty: $primary;
    $spinner-full: $secondary;
    .path {
        animation: dash 3s ease infinite;
    }

    @keyframes dash {
        0% {
            stroke: $spinner-empty;
            stroke-dashoffset: 160;
        }
        50% {
            stroke-dashoffset: 0;
            stroke: $spinner-full;
        }
        100% {
            stroke: $spinner-empty;
            stroke-dashoffset: -160;

        }
    }

    .spinner {
        height: 100%;
        stroke:$spinner-empty;
        stroke-width: 4;
        stroke-dasharray : 160;
        stroke-dashoffset:200;
        stroke-linecap : round;
        animation: rotating 1.5s linear infinite;
    }


    @keyframes rotating {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>