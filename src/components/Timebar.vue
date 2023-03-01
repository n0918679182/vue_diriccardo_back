<script>
export default {
    data() {
        return {
            now: new Date()
        }
    },
    mounted() {
        setInterval(() => {
            this.now = new Date();
        }, 1000);
    },
}
</script>

<template>
    <h5 class="mt-5 mb-4">{{ now.getMonth() + 1 }} 月 {{ now.getDate() }} 日
        　{{
        　    now.getDay() == 1 ? 'Mon.' :
        　    (now.getDay() == 2 ? 'Tue.' :
        　        (now.getDay() == 3 ? 'Wed.' :
        　            (now.getDay() == 4 ? 'Thu.' :
        　                (now.getDay() == 5 ? 'Fri.' :
        　                    (now.getDay() == 6 ? 'Sat.' : 'Sun.')))))
        　}}　
        {{ now.toTimeString().substring(0, 8).split(':').join(' : ') }}</h5>
</template>