<template>
  <ckeditor
    v-model="editor.data"
    :editor="editor.editor"
    :config="editor.config"
  />
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

import MathType from '@wiris/mathtype-ckeditor5';

export default {
  name: 'App',
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editor: {
        editor: ClassicEditor,
        data: '',
        config: {
          plugins: [Essentials, Paragraph, Bold, Italic, MathType],
          toolbar: ['bold', 'italic', 'MathType', 'ChemType'],
        },
      },
    };
  },
  methods: {
    // onNamespaceLoaded(editor) {
    //   editor.plugins.addExternal(
    //     'ckeditor_wiris',
    //     './node_modules/@wiris/mathtype-ckeditor4/plugin.js',
    //   );
    // },
  },
};
</script>
