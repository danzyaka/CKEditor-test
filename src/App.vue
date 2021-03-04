<template>
  <div>
    <ckeditor
      v-model="editor.data"
      :editor="editor.editor"
      :config="editor.config"
      @ready="onEditorReady"
    />

    <el-select
      v-model="selectedFormula"
      :style="selectStyles"
      placeholder="Выбрать формулу"
      @change="handleChangeVariable"
    >
      <el-option
        v-for="(variable, index) in variables"
        :key="index"
        :label="variable.name"
        :value="variable.formula"
      />
    </el-select>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';

import MathType from '@wiris/mathtype-ckeditor5';

const copyStringToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

let mathTypeDialog;

export default {
  name: 'App',
  components: {
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      editorInstance: null,
      editor: {
        editor: ClassicEditor,
        data: '',
        config: {
          plugins: [Essentials, Paragraph, Bold, Italic, MathType], // MathType
          toolbar: ['bold', 'italic', 'MathType', 'ChemType'], //'MathType', 'ChemType'
        },
      },
      selectedFormula: null,
      selectStyles: {
        display: 'none',
        position: 'absolute',
        top: 0,
      },
      variables: [
        {
          id: 1,
          name: 'Формула',
          formula:
            '<math xmlns="http://www.w3.org/1998/Math/MathML"><mi>a</mi><mo>+</mo><mi>b</mi></math>',
        },
      ],
    };
  },
  methods: {
    onEditorReady() {
      const body = document.querySelector('body');
      const mutationObserever = new MutationObserver(this.checkCreateMathType);
      mutationObserever.observe(body, { childList: true });
    },

    checkCreateMathType(mutationRecords) {
      console.log(mutationRecords);
      const addedNodes = mutationRecords.reduce(
        (accum, mutationRecord) => [...accum, ...mutationRecord.addedNodes],
        []
      );
      mathTypeDialog =
        addedNodes.find((node) => /wrs_modal_dialogContainer/.test(node.id)) ||
        mathTypeDialog;
      if (!mathTypeDialog) return;
      const mutationObserever = new MutationObserver(
        this.checkPositionMathType
      );
      mutationObserever.observe(mathTypeDialog, { attributes: true });
      this.centerMathTypeDialog();
      this.attachSelectTo();
    },

    checkPositionMathType(mutationRecords) {
      this.attachSelectTo();
    },

    centerMathTypeDialog() {
      const position = mathTypeDialog.getBoundingClientRect();
      const browserWindow = document.documentElement;
      // console.log(object);
      mathTypeDialog.style.top = browserWindow.clientHeight / 2 - position.height / 2 + 'px';
      mathTypeDialog.style.left = browserWindow.clientWidth / 2 - position.width / 2 + 'px';
    },

    attachSelectTo() {
      const elementPosition = mathTypeDialog.getBoundingClientRect();
      const closed = mathTypeDialog.classList.contains('wrs_closed');
      this.selectStyles.display = closed ? 'none' : 'block';
      this.selectStyles.top =
        elementPosition.y + elementPosition.height + 5 + 'px';
      this.selectStyles.left = elementPosition.x + 'px';
    },

    handleChangeVariable(formula) {
      copyStringToClipboard(formula);
      this.$message('Формула скопирована в буфер обмена');
    },
  },
};
</script>
