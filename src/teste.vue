<template>
  <div key="email-form" class="email-form">
    <p class="_textsmall">
      <i>
        {{ $t("Olá! Preencha o formulário e retornaremos seu e-mail!") }}
      </i>
    </p>

    <transition name="bounce">
      <v-alert v-if="errors.count() > 0" layout="danger">
        {{ $t("Ocorreu algum erro no envio de seu e-mail.") }}
        <br />
        {{
          $t(
            "Por favor, verifique se existe algum erro nos campos abaixo e tente novamente!"
          )
        }}
      </v-alert>
    </transition>

    <v-alert v-if="error" layout="danger">
      {{ $t(error) }}
    </v-alert>

    <form class="form" @submit.prevent="submit">
      <v-field-container>
        <v-label>{{ $t("Nome") }}*</v-label>

        <v-input
          id="name"
          v-validate="'required|min:3'"
          name="name"
          :placeholder="$t('Digite seu Nome')"
          :value="form.name"
          @input="updateFormField('name', $event.target.value)"
        ></v-input>

        <v-field-error v-if="errors.has('name')">{{
          errors.first("name")
        }}</v-field-error>
      </v-field-container>

      <v-field-container>
        <v-label>{{ $t("E-mail") }}*</v-label>

        <v-input
          id="email"
          v-validate="'required|email'"
          name="email"
          type="email"
          :placeholder="$t('Digite seu E-mail')"
          :value="form.email"
          @input="updateFormField('email', $event.target.value)"
        ></v-input>

        <v-field-error v-if="errors.has('email')">{{
          errors.first("email")
        }}</v-field-error>
      </v-field-container>

      <v-field-container>
        <v-label>{{ $t("Telefone") }}*</v-label>

        <v-input
          id="FieldA"
          v-mask="['(##) ####-####', '(##) #####-####']"
          v-validate="'required|phone'"
          name="FieldA"
          :placeholder="$t('Digite seu Telefone')"
          :value="form.FieldA"
          @input="updateFormField('FieldA', $event.target.value)"
        ></v-input>

        <v-field-error v-if="errors.has('FieldA')">{{
          errors.first("FieldA")
        }}</v-field-error>
      </v-field-container>

      <v-field-container>
        <v-label>{{ $t("Pessoa Física ou Pessoa Jurídica?") }}*</v-label>
        <v-radio-list
          ref="ProtocoloFieldC"
          :options="tipoPessoa"
          name="ProtocoloFieldC"
          :checked="form.ProtocoloFieldC"
          validate="required"
          @input="updateRadioField('ProtocoloFieldC', $event, tipoPessoa)"
        />
        <v-field-error v-if="errors.has('ProtocoloFieldC')">{{
          errors.first("ProtocoloFieldC")
        }}</v-field-error>
      </v-field-container>

      <v-field-container>
        <v-label>{{ $t("CPF/CNPJ") }}*</v-label>

        <v-input
          id="FieldU"
          v-mask="['###.###.###-##', '##.###.###/####-##']"
          v-validate="'required|cpfcnpj'"
          name="FieldU"
          type="text"
          :placeholder="$t('Digite seu CPF/CNPJ')"
          :value="form.FieldU"
          @input="updateFormField('FieldU', $event.target.value)"
        ></v-input>

        <v-field-error v-if="errors.has('FieldU')">{{
          errors.first("FieldU")
        }}</v-field-error>
      </v-field-container>

      <!-- Integration Field -->
      <!-- <v-field-container v-if="form.ProtocoloFieldC == 'pessoaFisica'">
        <v-label>{{ $t('CPF/CNPJ (campo integracao)') }}*</v-label>

        <integration-field
          placeholder="Digite seu CPF/CNPJ"
          :mask="['###.###.###.##','##.###.###/####-##']"
          name="FieldU"
          type="field"
          validate="required|cpfcnpj"
          @input="updateFormField('FieldU', $event)"
        />

        <v-field-error v-if="errors.has('FieldU')">{{ errors.first('FieldU') }}</v-field-error>
      </v-field-container> -->

      <v-field-container>
        <v-label>{{ $t("Número do Pedido") }}*</v-label>

        <v-input
          id="ProtocoloFieldA"
          key="ProtocoloFieldA"
          v-validate="'required'"
          name="ProtocoloFieldA"
          type="text"
          :placeholder="$t('Digite o Número do Pedido')"
          :value="form.ProtocoloFieldA"
          @input="updateFormField('ProtocoloFieldA', $event.target.value)"
        ></v-input>

        <v-field-error v-if="errors.has('ProtocoloFieldA')">{{
          errors.first("ProtocoloFieldA")
        }}</v-field-error>
      </v-field-container>

      <v-field-container>
        <v-label>{{ $t("Assunto") }}*</v-label>
        <v-select2
          id="mainCategory"
          name="mainCategory"
          :value="form.mainCategory"
          :placeholder="$t('Escolha um Assunto')"
          :has-error="errors.has('mainCategory')"
          :options="categories"
          :validate="'select'"
          @input="updateSelectField('mainCategory', $event)"
        ></v-select2>

        <v-field-error v-if="errors.has('mainCategory')">{{
          errors.first("mainCategory")
        }}</v-field-error>
      </v-field-container>

      <v-field-container v-if="form.mainCategory == 'reclamacao'">
        <v-label>{{ $t("Sub-assunto") }}*</v-label>
        <v-select2
          id="reclamacaoCategories"
          name="reclamacaoCategories"
          :value="form.reclamacaoCategories"
          :placeholder="$t('Escolha um sub-assunto')"
          :has-error="errors.has('reclamacaoCategories')"
          :options="reclamacaoCategories"
          :validate="'select'"
          @input="updateSelectField('reclamacaoCategories', $event)"
        ></v-select2>

        <v-field-error v-if="errors.has('reclamacaoCategories')">{{
          errors.first("reclamacaoCategories")
        }}</v-field-error>
      </v-field-container>

      <v-field-container>
        <v-label>{{ $t("Região") }}*</v-label>
        <v-radio-list
          ref="regiao"
          :options="regiao"
          class="-columns"
          name="regiao"
          :checked="form.regiao"
          validate="required"
          @input="
            updateRadioField('regiao', $event, $refs.regiao.options, 'concat')
          "
        />
        <v-field-error v-if="errors.has('regiao')">{{
          errors.first("regiao")
        }}</v-field-error>
      </v-field-container>

      <v-field-container v-if="form.regiao == 'capital'">
        <v-label>{{ $t("Bairro") }}</v-label>

        <v-input
          id="bairro"
          name="bairro"
          type="text"
          :placeholder="$t('Digite seu Bairro')"
          :value="form.bairro"
          @input="updateConcatQuestion('bairro', $event.target.value)"
        ></v-input>

        <v-field-error v-if="errors.has('bairro')">{{
          errors.first("bairro")
        }}</v-field-error>
      </v-field-container>

      <v-field-container>
        <v-label>{{ $t("Produtos") }}*</v-label>

        <v-checkbox-list
          :options="produtos"
          class="-columns"
          name="produtos"
          validate="required"
          @input="updateCheckboxField('produtos', $event, 'concat')"
        />
        <v-field-error v-if="errors.has('produtos')">{{
          errors.first("produtos")
        }}</v-field-error>
      </v-field-container>

      <v-field-container>
        <v-label>{{ $t("Anexo Obrigatório") }}*</v-label>

        <v-field-container :no-margin="true" :group="true">
          <component
            :is="attachmentComponent(key)"
            v-for="(attachment, key) in form.subAttachments
              .obrigatorioAttachment"
            :id="`attachments-${key}`"
            :key="key"
            v-validate="obrigatorioRequired"
            name="obrigatorioAttachment"
            :file="attachment"
            :placeholder="$t('Adicione alguma foto ou arquivo')"
            :reset-upload="resetUpload"
            @select="
              setAttachmentValue({
                name: 'obrigatorioAttachment',
                key,
                value: $event,
              })
            "
            @delete="
              removeAttachmentFile({ name: 'obrigatorioAttachment', key })
            "
          ></component>

          <v-button
            v-show="
              form.subAttachments &&
              form.subAttachments.obrigatorioAttachment.length <= 4
            "
            class="_floatright"
            type="button"
            :link="true"
            layout="primary"
            size="small"
            @click="addsAttachmentFile('obrigatorioAttachment')"
            >{{ $t("Adicionar mais") }}</v-button
          >
          <v-field-error v-if="errors.has('obrigatorioAttachment')">{{
            errors.first("obrigatorioAttachment")
          }}</v-field-error>
        </v-field-container>
      </v-field-container>

      <div v-html="variavel"></div>

      <v-field-container>
        <v-label>{{ $t("Anexo Opcional") }}</v-label>

        <v-field-container :no-margin="true" :group="true">
          <component
            :is="attachmentComponent(key)"
            v-for="(attachment, key) in form.subAttachments.opcionalAttachment"
            :id="`attachments-${key}`"
            :key="key"
            :file="attachment"
            name="opcionalAttachment"
            :placeholder="$t('Adicione alguma foto ou arquivo')"
            :reset-upload="resetUpload"
            @select="
              setAttachmentValue({
                name: 'opcionalAttachment',
                key,
                value: $event,
              })
            "
            @delete="removeAttachmentFile({ name: 'opcionalAttachment', key })"
          ></component>

          <v-button
            v-show="
              form.subAttachments &&
              form.subAttachments.opcionalAttachment.length <= 4
            "
            class="_floatright"
            type="button"
            :link="true"
            layout="primary"
            size="small"
            @click="addsAttachmentFile('opcionalAttachment')"
            >{{ $t("Adicionar mais") }}</v-button
          >
          <v-field-error v-if="errors.has('opcionalAttachment')">{{
            errors.first("opcionalAttachment")
          }}</v-field-error>
        </v-field-container>
      </v-field-container>

      <v-field-container>
        <v-label>{{ $t("Mensagem") }}*</v-label>

        <v-textarea
          id="question"
          v-validate="'required|min:3'"
          name="question"
          class="fieldQuestion"
          :value="form.question"
          :placeholder="$t('Digite aqui sua mensagem')"
          @input="updateFormField('question', $event.target.value)"
        ></v-textarea>

        <v-field-error v-if="errors.has('question')">{{
          errors.first("question")
        }}</v-field-error>
      </v-field-container>

      <v-field-container>
        <v-checkbox-list
          :options="privacyPolicy"
          class="-columns"
          name="privacyPolicy"
          validate="required"
          @input="updateCheckboxField('privacyPolicy', $event)"
        />
        <v-field-error v-if="errors.has('privacyPolicy')">{{
          errors.first("privacyPolicy")
        }}</v-field-error>
      </v-field-container>

      <v-field-container :submit="true">
        <p class="_infotext">
          * {{ $t("Campos de preenchimento obrigatório") }}
        </p>
        <v-button
          type="submit"
          :icon="loading ? ['fas', 'spinner'] : null"
          :pulse-icon="true"
          :disabled="loading"
          >{{ $t("Enviar") }}</v-button
        >
      </v-field-container>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import bus from "../../../support/validators/bus";
import uploadDeleteSelfForm from "../../support/components/upload-delete-self-form";

export default {
  name: "EmailForm",

  data() {
    return {
      loading: false,
      error: false,
      resetUpload: false,
      concatQuestion: {
        bairro: {
          label: "Bairro",
          value: "",
        },
        regiao: {
          label: "Região",
          value: "",
        },
        produtos: {
          label: "Produtos",
          value: "",
        },
      },
    };
  },

  methods: {
    /**
     * Update form field.
     *
     * @param field
     * @param value
     */
    updateFormField: function (field, value) {
      return this.$store.commit("customer/SET_FORM_FIELD", { field, value });
    },

    /**
     * Update select field value.
     *
     * @param field
     * @param option
     */
    updateSelectField: function (field, option) {
      option === null ? (option = { value: null }) : "";

      if (!option.enableSubItems) {
        this.$store.commit("customer/SET_FORM_FIELD", {
          field: field,
          value: null,
        });

        this.updateFormField("categoryId", option.value);
        return;
      }

      this.$store.commit("customer/SET_FORM_FIELD", {
        field: "categoryId",
        value: null,
      });

      this.updateFormField(field, option.value);
    },

    /**
     * Update checkbox field value.
     *
     * @param field
     * @param option
     * @param type
     */
    updateCheckboxField: function (field, option, type) {
      if (type == "concat") {
        this.concatQuestion[field].value = option;
      }

      this.updateFormField(field, option);
    },

    /**
     * Update radio field value.
     *
     * @param field
     * @param option
     */
    updateRadioField: function (field, option, options, type) {
      const hasChild = this.resetRadioChilds(options);

      if (type == "concat") {
        this.updateConcatQuestion(field, option);
        return;
      }

      this.updateFormField(field, option);
    },

    /**
     * Validate fields.
     */
    async validateFields() {
      const result = await this.$validator.validate();
      bus.$emit("veeValidate");

      return result;
    },

    /**
     * Component from attachment to be rendered.
     *
     * @param key
     * @returns {string}
     */
    attachmentComponent(key) {
      return key >= 1 ? "upload-delete-self-form" : "v-upload";
    },

    ...mapMutations("customer", {
      addsAttachmentFile: "CREATE_FORM_ATTACHMENT",
      removeAttachmentFile: "REMOVE_FORM_ATTACHMENT",
      setAttachmentValue: "SET_FORM_ATTACHMENT_VALUE",
      concatAttachments: "CONCAT_ATTACHMENTS",
    }),

    /**
     * Submit email.
     */
    async submit() {
      this.validationCounter = 0;

      try {
        const result = await this.validateFields();

        if (!result) {
          return;
        }
      } catch (e) {
        return;
      }

      this.loading = true;
      this.error = false;

      this.concatenateQuestion();
      this.concatAttachments();

      this.$sdk.Email.submit(this.form)
        .then((res) => {
          this.loading = false;
          this.resetUpload = true;

          this.$store.commit("email/SET_PROTOCOL", res.protocol);
          this.$router.replace("/email/final");
        })
        .catch((err) => {
          this.loading = false;
          this.error =
            err.errors[Object.keys(err.errors)[0]][0] || err.message || false;

          if (err.code === this.$sdk.Errors.EMAIL.CODES.VALIDATION_ERROR) {
            this.showSubmitValidationErrors(err.errors);
          }
        });
    },

    /**
     * Update concatQuestion.
     *
     * @param field
     * @param value
     */
    updateConcatQuestion: function (field, value) {
      this.concatQuestion[field].value = value;
      this.updateFormField(field, value);
    },

    /**
     * Concatenate question.
     */
    async concatenateQuestion() {
      if (Object.keys(this.concatQuestion) == 0) {
        return;
      }

      let newQuestion = "";

      for (let field in this.concatQuestion) {
        if (
          this.concatQuestion[field].value != "" &&
          this.concatQuestion[field].value != null
        ) {
          newQuestion +=
            this.$t(this.concatQuestion[field].label) +
            ": " +
            this.concatQuestion[field].value +
            "<br>";
        }
      }

      if (newQuestion != "") {
        newQuestion += `<br>${this.$t("Mensagem")}: <br>`;
      }
      newQuestion += this.form.question;

      this.updateFormField("question", newQuestion);

      await this.$store.commit("customer/SET_FORM_FIELD", {
        field: "question",
        value: newQuestion,
      });
    },

    /**
     * Show errors from validatino when submit.
     *
     * @param errors
     */
    showSubmitValidationErrors(errors) {
      errors.forEach((errors, key) => {
        const error = errors[0];
        const field = key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

        this.errors.add(field, error);
      });
    },

    /**
     * Show child of checkbox field.
     *
     * @param field
     * @param value
     */
    showCheckboxChild(field, value) {
      let checkedItems = this.form[field] || "";
      let isChecked = checkedItems.includes(value);
      return isChecked;
    },

    /**
     * Reset radio children values.
     */
    resetRadioChilds(options) {
      let resetFields = [];

      if (options) {
        options.forEach((option) => {
          if (option.children) {
            resetFields.push(option.children);
          }
        });

        if (resetFields.length > 0) {
          resetFields.forEach((field) => {
            this.$store.commit("customer/SET_FORM_FIELD", {
              field: field,
              value: null,
            });
          });

          return true;
        }
      }

      return false;
    },

    /**
     * Reset form field.
     *
     * @param fields (array)
     */
    resetFormField: function (fields) {
      for (let i in fields) {
        this.$store.commit("customer/SET_FORM_FIELD", {
          field: fields[i],
          value: null,
        });

        if (this.concatQuestion[fields[i]]) {
          this.concatQuestion[fields[i]].value = "";
        }
      }
    },
  },

  computed: {
    canShowAlertError() {
      return Boolean(this.error);
    },
    obrigatorioRequired() {
      return this.form.subAttachments.obrigatorioAttachment.filter(
        (file) => file.name
      ).length !== this.form.subAttachments.obrigatorioAttachment.length
        ? "required"
        : "";
    },
    ...mapState({
      pageType: (state) => state.customer.pageType,
      form: (state) => state.customer.form,
      attachmentCounter: (state) => state.customer.attachmentCounter,
      categories: (state) => {
        if (state.customer.pageType != "default") {
          return state.email.categories[state.customer.pageType];
        }
        return state.email.categoriesDefault;
      },
      reclamacaoCategories: (state) => state.email.reclamacaoCategories,
      tipoPessoa: (state) => state.email.tipoPessoa,
      regiao: (state) => state.email.regiao,
      produtos: (state) => state.email.produtos,
      privacyPolicy: (state) => state.email.privacyPolicy,
    }),
  },

  mounted() {
    this.$store.commit("email/RESET_PROTOCOL");
  },

  created() {
    const fields = {
      pt_BR: {
        name: "Nome",
        email: "E-mail",
        FieldU: "CPF",
        FieldA: "Telefone",
        ProtocoloFieldA: "Número do Pedido",
        mainCategory: "Assunto",
        reclamacaoCategories: "Sub-assunto",
        obrigatorioAttachment: "Anexo",
        question: "Mensagem",
        privacyPolicy: "Política de privacidade",
      },
      es: {
        name: "Nombre",
        email: "E-mail",
        FieldA: "Teléfono",
        FieldU: "Documento",
        mainCategory: "Asunto",
        reclamacaoCategories: "Asunto secundario",
        question: "Mesaje",
      },
      en: {
        name: "Name",
        email: "E-mail",
        FieldA: "Phone",
        FieldU: "Document",
        mainCategory: "Subject",
        reclamacaoCategories: "Second Subject",
        question: "Message",
      },
    };

    const locale = this.$root.locale;

    this.$validator.localize("pt_BR", {
      attributes: fields.pt_BR,
    });
    this.$validator.localize("en", {
      attributes: fields.en,
    });
    this.$validator.localize("es", {
      attributes: fields.es,
    });
    this.$validator.localize(locale);
  },

  components: {
    uploadDeleteSelfForm,
  },
};
</script>

<style lang="sass" scoped>
.email-form
  .fieldQuestion
    height: 80px
</style>
