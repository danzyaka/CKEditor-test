<template>
  <ckeditor v-model="editor.data" :config="editor.config" />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      editor: {
        data: '',
        config: {
          extraPlugins: 'mathjax',
          mathJaxLib:
            'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-AMS_HTML',
          height: 320,
        },
      },
    };
  },
};
</script>
