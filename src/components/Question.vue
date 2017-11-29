<template>
    <div>
        <div v-if="!isEditing">
            <h1 class="title" v-text="title"></h1>
            <p class="body" v-text="body"></p>

            <button id="edit" @click="isEditing = true">Edit</button>
        </div>

        <div v-if="isEditing">
            <input type="text" name="title" v-model="title">
            <textarea name="body" cols="30" rows="10" v-model="body"></textarea>

            <button id="save" @click="save">Save</button>
            <button id="cancel" @click="isEditing = false">Cancel</button>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        props: ['question'],

        data() {
            return {
                title: this.question.title,
                body: this.question.body,
                isEditing: false
            }
        },

        methods: {
            save() {
                axios.post('/question/1', {title: this.title, body: this.body})
                    .then(response => this.isEditing = !this.isEditing)
            }
        }
    }
</script>