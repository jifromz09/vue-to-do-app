<template>
    <thead>
        <tr>
            <th v-for="(header, index) in headers" :key="index">{{ header}}</th>
        </tr>
    </thead>
</template>

<script>
export default {
    name: "table-header'",
    props: {
        headers: []
    }
}
</script>